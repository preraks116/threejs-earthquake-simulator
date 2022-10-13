import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { Vector3 } from "three";
import { Box } from "../components/objects/box";
import { Ball } from "../components/objects/ball";
import { Plane } from "../components/objects/plane";
import { Island } from "../components/objects/island";
import { GLTFModel } from "../components/objects/models/gltfModel";
import { FBXModel } from "../components/objects/models/fbxModel";
import { PerspCamera } from "../components/camera/perspectiveCamera";
import { ambientLight } from "../components/lights/ambientLight";
import { directionalLight } from "../components/lights/directionalLight";
import { textures } from "../utils/textures";
import { Text } from "../components/objects/text";
import FontJSON from "../utils/Roboto-msdf.json";
import FontImage from "../utils/Roboto-msdf.png";
import { fbxModels, gltfModels } from "../utils/models";

const scene = new THREE.Scene();

const world = new CANNON.World();
world.gravity.set(0, -39.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();

const cannonDebugger = new CannonDebugger(scene, world, {
  onInit(body, mesh) {
    // Toggle visibiliy on "d" press
    mesh.visible = false;
    document.addEventListener("keydown", (event) => {
      if (event.key === "i") {
        mesh.visible = !mesh.visible;
      }
    });
  },
});

// dictionary of all objects
const sceneObjects = {
  cube6: new Box(
    {
      // position: { x: 5, y: 0, z: -1.75 },
      position: { x: 1, y: 8, z: 3 },
      color: 0xffffff,
      dimension: { x: 200, y: 5, z: 200 },
      speed: 1000,
      mass: 0,
      linearDamping: 0.3,
      type: "ground",
      // textures: textures.brick,
      factor: 7.5,
      amplitude: 0,
      timePeriod: 100,
    },
    scene,
    world
  ),
  //   model: new GLTFModel({
  //     position: { x: 0, y: 10, z: 0 },
  //     linearDamping: 0.3,
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   }, scene, world),
  //   model2: new GLTFModel({
  //     position: { x: 10, y: 20, z: 10 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  // }, scene, world),
  // road1: new GLTFModel(
  //   {
  //     position: { x: 3.61, y: 3, z: 0 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road2: new GLTFModel(
  //   {
  //     position: { x: 3.61, y: 3, z: 2.4 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road3: new GLTFModel(
  //   {
  //     position: { x: 3.61+2.4, y: 3, z: 0 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road4: new GLTFModel(
  //   {
  //     position: { x: 3.61+2.4, y: 3, z: 2.4 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road2: new GLTFModel(
  //   {
  //     position: { x: -1.2, y: 3, z: 0 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road3: new GLTFModel(
  //   {
  //     position: { x: 1.2, y: 3, z: 2.4 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road4: new GLTFModel(
  //   {
  //     position: { x: -1.2, y: 3, z: 2.4 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road5: new GLTFModel(
  //   {
  //     position: { x: 1.2, y: 3, z: 4.8 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),
  // road6: new GLTFModel(
  //   {
  //     position: { x: -1.2, y: 3, z: 4.8 },
  //     mass: 50,
  //     resourceURL: gltfModels.road,
  //   },
  //   scene,
  //   world
  // ),

  // text: new Text({
  //     width: 10.2,
  //     height: 8.5,
  //     padding: 1.5,
  //     justifyContent: 'center',
  //     textAlign: 'left',
  //     fontFamily: FontJSON,
  //     fontTexture: FontImage,
  //     position: { x: 25, y: 25, z: 80.8 },
  //     rotation: { x: 0, y: 0.3, z: 0 },
  //     text: [
  //       {
  //         content: 'This library supports line-break-friendly-characters,',
  //         fontSize: 0.555
  //       },
  //       {
  //         content: 'As well as multi-font-size lines with consistent vertical spacing.',
  //         fontSize: 0.58
  //       },
  //       {
  //         content: 'This library supports line-break-friendly-characters,',
  //         fontSize: 0.56
  //       }
  //     ]
  // }, scene)

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

for (let i = -40; i < 43; i++) {
  sceneObjects[`road1${i}}`] = new GLTFModel(
    {
      position: { x: 1.2, y: 9, z: i * 2.4 },
      mass: 50,
      resourceURL: gltfModels.road,
    },
    scene,
    world
  );
  sceneObjects[`road2${i}}`] = new GLTFModel(
    {
      position: { x: -1.2, y: 9, z: i * 2.4 },
      mass: 50,
      resourceURL: gltfModels.road,
    },
    scene,
    world
  );
}

for (let i = 0; i < 40; i++) {
  sceneObjects[`road3${i}}`] = new GLTFModel(
    {
      position: { x: 3.61 + 2.4 * i, y: 9, z: 0 },
      mass: 50,
      resourceURL: gltfModels.road,
    },
    scene,
    world
  );
  sceneObjects[`road4${i}}`] = new GLTFModel(
    {
      position: { x: 3.61 + 2.4 * i, y: 9, z: 2.4 },
      mass: 50,
      resourceURL: gltfModels.road,
    },
    scene,
    world
  );
  sceneObjects[`road5${i}}`] = new GLTFModel(
    {
      position: { x: -3.61 - 2.4 * i, y: 9, z: 0 },
      mass: 50,
      resourceURL: gltfModels.road,
    },
    scene,
    world
  );
  sceneObjects[`road6${i}}`] = new GLTFModel(
    {
      position: { x: -3.61 - 2.4 * i, y: 9, z: 2.4 },
      mass: 50,
      resourceURL: gltfModels.road,
    },
    scene,
    world
  );
}

const lighting = {
  ambientLight: new ambientLight(
    {
      color: 0xffffff,
      intensity: 0.5,
    },
    scene
  ),
  directionalLight: new directionalLight(
    {
      color: 0xffffff,
      intensity: 0.5,
      position: { x: -1, y: 2, z: 4 },
      shadow: true,
    },
    scene
  ),
};

// // const with all collision behaviors
const collisions = {
  // cubePlane1: new CANNON.ContactMaterial(
  //   sceneObjects['cube6'].material,
  //   sceneObjects['model2'].material,
  //   {
  //       friction: 1,
  //       restitution: 0.9
  //   }
  // ),
};

// any key with 'model' in it this property is added
for (let key in sceneObjects) {
  // if key has model in it
  if (key.includes("model")) {
    collisions[`cube6${key}`] = new CANNON.ContactMaterial(
      sceneObjects["cube6"].material,
      sceneObjects[key].material,
      {
        friction: 5,
        restitution: 0.2,
      }
    );
  }
}

// adding collision behaviors to world
for (let key in collisions) {
  world.addContactMaterial(collisions[key]);
}

// camera
const camera = new PerspCamera(
  {
    position: { x: 0, y: 20, z: 20 },
    lookAt: new Vector3(0, 0, 0),
    up: { x: 0, y: 1, z: 0 },
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    fov: 75,
  },
  scene
);

export { sceneObjects, lighting, camera, scene, world, cannonDebugger };
