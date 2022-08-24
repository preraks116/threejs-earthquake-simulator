import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger'
import { Vector3 } from 'three';
import { Player } from "../components/objects/player";
import { Plane } from "../components/objects/plane";
import { Box } from '../components/objects/box';
import { GLTFModel } from '../components/objects/models/gltfModel';
import { FBXModel } from '../components/objects/models/fbxModel';
import { OBJModel } from '../components/objects/models/objModel';
import { Sprite } from '../components/objects/sprite';
import { gridHelper } from '../components/objects/grid';
import { OrthoCamera } from '../components/camera/orthographicCamera';
import { ambientLight } from '../components/lights/ambientLight';
import { directionalLight } from '../components/lights/directionalLight';
import { textures } from '../utils/textures';
import { ShapeType } from 'three-to-cannon';

const scene = new THREE.Scene();

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();

const cannonDebugger = new CannonDebugger(scene, world, {
  onInit(body, mesh) {
    // Toggle visibiliy on "d" press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'i') {
        mesh.visible = !mesh.visible
      }
    })
  },
})

// dictionary of all objects
const sceneObjects = {
  player: new Player({
    position: { x: 0, y: 0, z: 0 },
    color: 0x00ff00,
    // dimension: { x: 0.3, y: 0.3, z: 0.3 },
    outlineSize: 0.05,
    dimension: {
      radius: 0.25,
      height: 0.1,
      radialSegments: 32
    },
    speed: 1,
    mass: 1,
    linearDamping: 0.9,
    type: "player",
    textures: textures.brick,
    // isHoverable: true,
  }, scene, world),
  plane: new Plane({
    scene: scene,
    position: { x: 0, y: -0.5, z: 0 },
    color: 0xffffff,
    dimension: { x: 25, y: 25 },
    rotation: { x: -Math.PI / 2, y: 0, z: 0 },
    mass: 0,
    linearDamping: 0.3
  }, scene, world),
  box: new Box({
    position: { x: 1, y: 0, z: 0 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    textures: textures.brick,
  }, scene, world),
  box2: new Box({
    position: { x: 2, y: 0, z: 0 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    hoverColor: 0x00fff0,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    isHoverable: true,
  }, scene, world),
  box3: new Box({
    position: { x: 3, y: 0, z: 0 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    isClickable: true
  }, scene, world),
  box4: new Box({
    position: { x: 3, y: 0, z: 1 },
    dimension: { x: 0.3, y: 0.3, z: 0.3 },
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.1,
    type: "player",
    isHoverable: true,
    isClickable: true
  }, scene, world),
};


// const with all collision behaviors
const collisions = {
  cubePlane: new CANNON.ContactMaterial(
    // sceneObjects['cube'].material,
    sceneObjects['player'].material,
    // sceneObjects['coin'].material,
    sceneObjects['plane'].material,
    {
      friction: 0
    }
  )
}
// addCube(sceneObjects);


for (let key in collisions) {
  world.addContactMaterial(collisions[key]);
}

// lighting
const lighting = {
  ambientLight: new ambientLight({
    color: 0xffffff,
    intensity: 0.5
  }, scene),
  directionalLight: new directionalLight({
    color: 0xffffff,
    intensity: 0.5,
    position: { x: -1, y: 3, z: 4 },
    shadow: true
  }, scene)
}

// camera
const camera = new OrthoCamera({
  position: { x: 20, y: 20, z: 20 },
  rotation: {
    order: 'YXZ',
    x: Math.atan(- 1 / Math.sqrt(2)),
    y: - Math.PI / 4,
    z: 0
  },
  lookAt: new Vector3(0, 0, 0),
  up: { x: 0, y: 1, z: 0 },
  width: window.innerWidth / 100,
  height: window.innerHeight / 100,
  near: 1,
  far: 1000
}, scene)

export { sceneObjects, lighting, camera, scene, world, cannonDebugger };