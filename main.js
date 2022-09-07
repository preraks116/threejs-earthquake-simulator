import "./style.css";

import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { textures } from "./src/utils/textures";
import { setKey } from "./src/utils/keyControls";
import { setZoom } from "./src/components/camera/orthographicCamera";
import * as GSAP from "gsap";
// import CannonDebugger from 'cannon-es-debugger'

import {
  sceneObjects,
  lighting,
  // camera,
  scene,
  world,
  cannonDebugger,
} from "./src/scenes/perspective";
// import { sceneObjects, lighting, camera, scene, world, cannonDebugger } from './src/scenes/isometric';

let camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
camera.position.set( 30, 30, 100 );
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
let controls, stats;
let intersects = [];
const player = sceneObjects["player"];
var mouse, raycaster;

let sun = new THREE.Vector3();
const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
// make cylinder geometry
const cylinderGeometry = new THREE.CylinderGeometry(100, 100, 10, 32);
// sphere geometry
const sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
// convex polyhedron
const convexGeometry = new ConvexGeometry( [ new THREE.Vector3( 10, 0, 0 ), new THREE.Vector3( 0, 10, 0 ), new THREE.Vector3( 0, 0, 10 ) ] );

let water = new Water(
  waterGeometry,
  // cylinderGeometry,
  // sphereGeometry,
  // convexGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( 'src/assets/textures/waternormals.jpg', function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x00ffff,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);

water.rotation.x = - Math.PI / 2;

scene.add( water );

const sky = new Sky();
sky.scale.setScalar( 10000 );
scene.add( sky );

const skyUniforms = sky.material.uniforms;

skyUniforms[ 'turbidity' ].value = 10;
skyUniforms[ 'rayleigh' ].value = 2;
skyUniforms[ 'mieCoefficient' ].value = 0.005;
skyUniforms[ 'mieDirectionalG' ].value = 0.8;

const parameters = {
  elevation: 1,
  azimuth: 180
};

const pmremGenerator = new THREE.PMREMGenerator( renderer );
let renderTarget;


function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  getIntersects();
}

// function onClick() {
//   // console.log(intersects);
//   if (intersects.length > 0 && intersects[1].object.name === "plane") {
//     // console.log('plane clicked');
//     let coordinate = intersects[1].point;
//     console.log(coordinate);
//     // tween the players position to this coordinate
//     var tween = GSAP.gsap.to(player.body.position, {
//       duration: 1,
//       x: coordinate.x,
//       z: coordinate.z,
//       ease: "power3.out",
//     });
//   }
//   if (intersects.length > 0 && intersects[0].object.userData.isClickable) {
//     intersects[0].object.userData.onClick();
//   }
// }

function updateSun() {

  const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
  const theta = THREE.MathUtils.degToRad( parameters.azimuth );

  sun.setFromSphericalCoords( 1, phi, theta );

  sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
  water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

  if ( renderTarget !== undefined ) renderTarget.dispose();

  renderTarget = pmremGenerator.fromScene( sky );

  scene.environment = renderTarget.texture;
}
updateSun();

// define island class
class Island {
  constructor(props, scene) {
    this.points = props.points;
    this.scale = props.scale ? props.scale : 1;
    this.extrudeSettings = props.extrudeSettings;
    this.color = props.color ? props.color : 0x00ff00;
    this.position = props.position ? props.position : { x: 0, y: 0, z: 0 };
    this.rotation = props.rotation ? props.rotation : { x: 0, y: 0, z: 0 };
    this.scene = scene;

    this.geometryPoints = [];

    for (let i = 0; i < this.points.length; i++) {
      this.geometryPoints.push(
        new THREE.Vector2(this.points[i].x, this.points[i].y)
      );
      this.geometryPoints[i].multiplyScalar(this.scale);
    }

    this.shape = new THREE.Shape(this.geometryPoints);

    let geometry = new THREE.ExtrudeGeometry(this.shape, this.extrudeSettings);

    let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: this.color }));
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    
    this.scene.add(mesh);
  }
}

// const island = new Island(
// {
//   points: [
//     { x: 610, y: 320 },
//     { x: 450, y: 300 },
//     { x: 392, y: 392 },
//     { x: 266, y: 438 },
//     { x: 190, y: 570 },
//     { x: 190, y: 600 },
//     { x: 160, y: 620 },
//     { x: 160, y: 650 },
//     { x: 180, y: 640 },
//     { x: 165, y: 680 },
//     { x: 150, y: 670 },
//     { x: 90, y: 737 },
//     { x: 80, y: 795 },
//     { x: 50, y: 835 },
//     { x: 64, y: 870 },
//     { x: 60, y: 945 },
//     { x: 300, y: 945 },
//     { x: 300, y: 743 },
//     { x: 600, y: 473 },
//     { x: 626, y: 425 },
//     { x: 600, y: 370 },
//     { x: 610, y: 320 },
//   ],
//   scale: 0.125, 
//   extrudeSettings: {
//     depth: 10,
//     bevelEnabled: true,
//     bevelSegments: 2,
//     steps: 2,
//     bevelSize: 1,
//     bevelThickness: 1,
//   },
//   color: 0xf08000,
//   position: { x: -90, y: 5, z: -150 },
//   rotation: { x: Math.PI / 2, y: 0, z: 0 },
// }, scene);

async function init() {
  // initialization
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  // console.log(renderer.shadowMap)
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // mouse pointer
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // load camera
  // camera.render();

  // orbit controls
  // controls = new OrbitControls(camera.camera, renderer.domElement);
  controls = new OrbitControls( camera, renderer.domElement );
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set( 0, 10, 0 );
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();
  // controls.listenToKeyEvents(window); // optional

  // lighting
  for (let key in lighting) {
    lighting[key].render();
  }

  // renders all objects in scene
  for (let key in sceneObjects) {
    sceneObjects[key].render();
  }

  stats = new Stats();
  // add custom panel
  // add memory panel
  // stats.addPanel(new Stats.Panel('Memory', '#ff8', '#221'));
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3: mem, 4: calls, 5: raf, 6: all
  document.body.appendChild(stats.dom);

  // lighting.ambientLight.intensity = 1;
  // add gui
  const gui = new GUI();
  const earthquakeFolder = gui.addFolder("Earthquake");
  const earthquakeFolderProps = {
    get Amplitude() {
      return sceneObjects.plane.amplitude;
    },
    set Amplitude(value) {
      sceneObjects.plane.amplitude = value;
    },
    get TimePeriod() {
      return sceneObjects.plane.timePeriod;
    },
    set TimePeriod(value) {
      sceneObjects.plane.timePeriod = value;
    },
    get Factor() {
      return sceneObjects.plane.factor;
    },
    set Factor(value) {
      sceneObjects.plane.factor = value;
    }
  }
  earthquakeFolder.add(earthquakeFolderProps, "Factor", 0.1, 10, 0.1);
  earthquakeFolder.add(earthquakeFolderProps, "TimePeriod", 10, 1000, 10);
  earthquakeFolder.add(earthquakeFolderProps, "Amplitude", 0, 5, 0.01);
  const lightingFolder = gui.addFolder("Lighting");
  const directionalLightFolder = lightingFolder.addFolder("Directional Light");
  const directionalLightPositionFolder =
  directionalLightFolder.addFolder("Position");
  const ambientLightFolder = lightingFolder.addFolder("Ambient Light");
  const propsAmbientLight = {
    get Intensity() {
      return lighting.ambientLight.light.intensity;
    },
    set Intensity(value) {
      lighting.ambientLight.light.intensity = value;
    },
    get Color() {
      return lighting.ambientLight.light.color.getHex();
    },
    set Color(value) {
      lighting.ambientLight.light.color.setHex(value);
    },
  };
  const propsDirectionalLight = {
    get Intensity() {
      return lighting.directionalLight.light.intensity;
    },
    set Intensity(value) {
      lighting.directionalLight.light.intensity = value;
    },
    get Color() {
      return lighting.directionalLight.light.color.getHex();
    },
    set Color(value) {
      lighting.directionalLight.light.color.setHex(value);
    },
  };
  const propsDirectionalLightPosition = {
    get X() {
      return lighting.directionalLight.light.position.x;
    },
    set X(value) {
      lighting.directionalLight.light.position.x = value;
    },
    get Y() {
      return lighting.directionalLight.light.position.y;
    },
    set Y(value) {
      lighting.directionalLight.light.position.y = value;
    },
    get Z() {
      return lighting.directionalLight.light.position.z;
    },
    set Z(value) {
      lighting.directionalLight.light.position.z = value;
    },
  };
  ambientLightFolder.add(propsAmbientLight, "Intensity", 0, 1).step(0.01);
  ambientLightFolder
    .addColor(propsAmbientLight, "Color")
    .onChange(function (value) {
      lighting.ambientLight.light.color.setHex(value);
    });
  directionalLightFolder
    .add(propsDirectionalLight, "Intensity", 0, 1)
    .step(0.01);
  directionalLightFolder
    .addColor(propsDirectionalLight, "Color")
    .onChange(function (value) {
      lighting.directionalLight.light.color.setHex(value);
    });
  directionalLightPositionFolder
    .add(propsDirectionalLightPosition, "X", -100, 100)
    .step(0.01);
  directionalLightPositionFolder
    .add(propsDirectionalLightPosition, "Y", -100, 100)
    .step(0.01);
  directionalLightPositionFolder
    .add(propsDirectionalLightPosition, "Z", -100, 100)
    .step(0.01);

  // event listeners
  // window.addEventListener("click", onClick);
  window.addEventListener("mousemove", onMouseMove, false);
  // window.addEventListener("wheel", (e) => setZoom(e, camera));
  window.addEventListener("keydown", (e) => setKey(e, true));
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("keyup", (e) => setKey(e, false));
}

function resetFromHover() {
  for (let i = 0; i < intersects.length; i++) {
    let object = intersects[i].object;
    if (object.userData.isHoverable) {
      object.userData.resetHover();
    }
  }
}

function getIntersects() {
  // raycaster.setFromCamera(mouse, camera.camera);
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(scene.children);
}

function onHover() {
  for (let i = 0; i < intersects.length; i++) {
    let object = intersects[i].object;
    if (object.userData.isHoverable) {
      object.userData.onHover();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  onHover();
  stats.begin();
  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  // renderer.render(scene, camera.camera);
  renderer.render(scene, camera);
  stats.end();
  resetFromHover();
  // controls.update();
  if (player) {
    camera.update(player.body);
  }
  world.step(1 / 60);

  for (let key in sceneObjects) {
    sceneObjects[key].update();
  }
  cannonDebugger.update();
}

function onWindowResize() {
  // camera.camera.aspect = window.innerWidth / window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // camera.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
