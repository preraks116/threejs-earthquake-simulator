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
  /////////////////////// ISLAND
  cube6: new Box(
    {
      // position: { x: 5, y: 0, z: -1.75 },
      position: { x: 1, y: 8, z: 3 },
      color: 0xffffff,
      dimension: { x: 100, y: 5, z: 100 },
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
  ////////////////////////
  human1: new GLTFModel(
    {
      position: { x: -30, y: 10, z: 30 },
      linearDamping: 0.3,
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model2: new GLTFModel(
    {
      position: { x: 10, y: 20, z: 10 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),
};

for (let i = -20; i < 23; i++) {
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

for (let i = 0; i < 20; i++) {
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
