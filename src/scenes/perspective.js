import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger'
import { Vector3 } from 'three';    
import { Box } from "../components/objects/box";
import { Ball } from "../components/objects/ball";
import { Plane } from "../components/objects/plane";
import { Island } from '../components/objects/island';
import { GLTFModel } from '../components/objects/models/gltfModel';
import { FBXModel } from '../components/objects/models/fbxModel';
import { PerspCamera } from "../components/camera/perspectiveCamera";
import { ambientLight } from '../components/lights/ambientLight';
import { directionalLight } from '../components/lights/directionalLight';
import { textures } from '../utils/textures';
import { fbxModels, gltfModels } from '../utils/models';

const scene = new THREE.Scene();

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();

const cannonDebugger = new CannonDebugger(scene, world, {
    onInit(body, mesh) {
      // Toggle visibiliy on "d" press
      mesh.visible = false;
      document.addEventListener('keydown', (event) => {
        if (event.key === 'i') {
          mesh.visible = !mesh.visible
        }
      })
    },
  })

// dictionary of all objects
const sceneObjects = {
    // cube2: new Box({
    //     // position: { x: 5, y: 0, z: -1.75 },
    //     position: { x: 3, y: 6.5, z: 5 },
    //     color: 0xff0000,
    //     dimension: { x: 1, y: 3, z: 1 },
    //     speed: 1,
    //     mass: 5,
    //     linearDamping: 0.3,
    //     type: "wall",
    //     textures: textures.brick
    // }, scene, world),
    // cube3: new Box({
    //     // position: { x: 5, y: 0, z: -1.75 },
    //     position: { x: -5, y: 9, z: -1.75 },
    //     color: 0xff0000,
    //     dimension: { x: 2, y: 8, z: 2 },
    //     speed: 1,
    //     mass: 5,
    //     linearDamping: 0.3,
    //     type: "wall",
    //     textures: textures.brick
    // }, scene, world),
    // cube4: new Box({
    //     // position: { x: 5, y: 0, z: -1.75 },
    //     position: { x: 6, y: 8, z: 5 },
    //     color: 0xff0000,
    //     dimension: { x: 3, y: 5, z: 3 },
    //     speed: 1,
    //     mass: 5,
    //     linearDamping: 0.3,
    //     type: "wall",
    //     textures: textures.brick
    // }, scene, world),
    // cube5: new Box({
    //     // position: { x: 5, y: 0, z: -1.75 },
    //     position: { x: -2.5, y: 9, z: 3 },
    //     color: 0xff0000,
    //     dimension: { x: 3.5, y: 7, z: 4.5 },
    //     speed: 1,
    //     mass: 5,
    //     linearDamping: 0.3,
    //     type: "wall",
    //     textures: textures.brick
    // }, scene, world),
    // cube6: new Box({
    //     // position: { x: 5, y: 0, z: -1.75 },
    //     position: { x: 1, y: 8, z: 3 },
    //     color: 0xff0000,
    //     dimension: { x: 2, y: 5, z: 2 },
    //     speed: 1,
    //     mass: 5,
    //     linearDamping: 0.3,
    //     type: "wall",
    //     textures: textures.brick
    // }, scene, world),
    plane: new Plane({
        scene: scene,
        position: { x: 3, y: 5, z: 3 },
        color: 0xffffff,
        dimension: { x: 50, y: 50 },
        rotation: {
            x: -Math.PI / 2,
            y: 0,
            z: 0
        },
        mass: 0,
        linearDamping: 0.3,
        // amplitude: 0.4,
        factor: 7.5,
        amplitude: 0,
        timePeriod: 100
    }, scene, world),
    model: new GLTFModel({
        scene: scene,
        position: { x: 0, y: 5, z: 0 },
        // scale: { x: 0.1, y: 0.1, z: 0.1 },
        linearDamping: 0.3,
        mass: 5,
        resourceURL: gltfModels.building,
    }, scene, world),

    // plane : new Island(
    // {
    //     points: [
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
    //     ],
    //     scale: 0.125, 
    //     extrudeSettings: {
    //         depth: 10,
    //         bevelEnabled: true,
    //         bevelSegments: 2,
    //         steps: 2,
    //         bevelSize: 1,
    //         bevelThickness: 1,
    //     },
    //     color: 0xf08000,
    //     textures: textures.brick,
    //     position: { x: -30, y: 1.5, z: -90 },
    //     dimension: { x: 50, y: 50 },
    //     rotation: { x: Math.PI / 2, y: 0, z: 0 },
    //     linearDamping: 0.3,
    //     // amplitude: 0.4,
    //     factor: 7.5,
    //     amplitude: 0,
    //     timePeriod: 100
    // }, scene, world)
};

const lighting = {
    ambientLight: new ambientLight({
        color: 0xffffff,
        intensity: 0.5
    }, scene),
    directionalLight: new directionalLight({
        color: 0xffffff,
        intensity: 0.5,
        position: { x: -1, y: 2, z: 4 },
        shadow: true
    }, scene)
}

// // const with all collision behaviors
const collisions = {
    // cubePlane1: new CANNON.ContactMaterial(
    //     sceneObjects['cube2'].material,
    //     sceneObjects['plane'].material,
    //     {
    //         friction: 0.5,
    //         // restitution: 0.9
    //     }
    // ),
}

// adding collision behaviors to world
for (let key in collisions) {
    world.addContactMaterial(collisions[key]);
}

// camera
const camera = new PerspCamera({
    position: { x: 0, y: 20, z: 20 },
    lookAt: new Vector3(0, 0, 0),
    up: { x: 0, y: 1, z: 0 },
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    fov: 75
}, scene);

export { sceneObjects, lighting, camera, scene, world, cannonDebugger };