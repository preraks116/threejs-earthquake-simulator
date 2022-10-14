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

import ThreeMeshUI from 'three-mesh-ui'
import FontJSON from "./src/utils/Roboto-msdf.json";
import FontImage from "./src/utils/Roboto-msdf.png";
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

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

let initScene = scene;
let initWorld = world;
let camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
camera.position.set( 0, 50, 130 );
let casualties = 0, deaths = 0, damages = 0;
let amplitudeController, timePeriodController, factorController;
// camera.position.set( 0, 400, 0 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const statsDOM = document.getElementById('stats');
const start = document.getElementById('start');
const stop = document.getElementById('stop');

start.onclick = () => {
  let tl = GSAP.gsap.timeline();
  tl.to(sceneObjects.cube6, { duration: 30, amplitude: 3.5 });
  tl.to(sceneObjects.cube6, { duration: 0.5, timePeriod: 200 });
  tl.to({}, 5, {});
  tl.to(sceneObjects.cube6, { duration: 0.5, timePeriod: 300 });
  tl.to({}, 5, {});
  tl.to(sceneObjects.cube6, { duration: 0.5, timePeriod: 400 });
  tl.to({}, 5, {});
  tl.to(sceneObjects.cube6, { duration: 0.5, timePeriod: 500 });
  tl.to({}, 5, {});
  tl.to(sceneObjects.cube6, { duration: 30, factor: 4 });
  tl.to({}, 5, {});
}

stop.onclick = () => {
  GSAP.gsap.to(sceneObjects.cube6, { duration: 1, amplitude: 0, onComplete: () => {
    GSAP.gsap.killTweensOf(sceneObjects.cube6);
  } });
}



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


async function init() {
  // initialization
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  // console.log(renderer.shadowMap)
  renderer.xr.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( VRButton.createButton( renderer ) );
  document.body.appendChild(renderer.domElement);

  // mouse pointer
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  updateSun();

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
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3: mem, 4: calls, 5: raf, 6: all
  document.body.appendChild(stats.dom);

  // add gui
  const gui = new GUI();
  const earthquakeFolder = gui.addFolder("Earthquake");
  const earthquakeFolderProps = {
    get Amplitude() {
      return sceneObjects.cube6.amplitude;
    },
    set Amplitude(value) {
      sceneObjects.cube6.amplitude = value;
    },
    get TimePeriod() {
      return sceneObjects.cube6.timePeriod;
    },
    set TimePeriod(value) {
      sceneObjects.cube6.timePeriod = value;
    },
    get Factor() {
      return sceneObjects.cube6.factor;
    },
    set Factor(value) {
      sceneObjects.cube6.factor = value;
    }
  }
  factorController = earthquakeFolder.add(earthquakeFolderProps, "Factor", 0.1, 10, 0.1);
  timePeriodController = earthquakeFolder.add(earthquakeFolderProps, "TimePeriod", 10, 1000, 10);
  amplitudeController = earthquakeFolder.add(earthquakeFolderProps, "Amplitude", 0, 5, 0.01);

  amplitudeController.onChange(function(value) {
    console.log(value);
  })
  
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

function getStats() {
  casualties = 0;
  deaths = 0;
  damages = 0;
  for(let key in sceneObjects) {
    let object = sceneObjects[key];
    if(object.type === 'human') {
      if(object.isDead) {
        deaths += 1;
      }
      else if(object.isFallen) {
        casualties += 1;
      }
    }
    else if(object.type === 'building' && object.isFallen) {
      damages += object.cost;
      // deaths += 0.2*object.population;
      // casualties += 0.8*object.population;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  onHover();
  stats.begin();
  ThreeMeshUI.update();
  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  amplitudeController.updateDisplay();
  timePeriodController.updateDisplay();
  factorController.updateDisplay();
  // renderer.render(scene, camera.camera);
  renderer.render(scene, camera);
  stats.end();
  resetFromHover();
  // controls.update();
  if (player) {
    camera.update(player.body);
  }
  world.step(1 / 60);
  getStats();
  statsDOM.innerHTML = `
    <div>
      <p>Draw Calls: ${renderer.info.render.calls}</p>
      <p>Triangles: ${(renderer.info.render.triangles)}</p>
      <br>
      <p>Casualties: ${casualties*10} </p>
      <p>Deaths: ${deaths*10} </p>
      <p>Damages (INR): ${damages.toFixed(3)} Cr</p>
    </div>
  `;

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
