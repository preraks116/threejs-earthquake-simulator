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

let buildings = {};

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
      position: { x: -30, z: 30 },
      linearDamping: 0.3,
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  // human2: new GLTFModel(
  //   {
  //     position: { x: 11, z: 30 },
  //     linearDamping: 0.3,
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human3: new GLTFModel(
  //   {
  //     position: { x: 9, z: 30 },
  //     linearDamping: 0.3,
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human4: new GLTFModel(
  //   {
  //     position: { x: 13, z: 30 },
  //     linearDamping: 0.3,
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  

  

  // human6: new GLTFModel(
  //   {
  //     position: { x: 20, y: 19, z: 20 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),


  model2: new GLTFModel(
    {
      position: { x: 10, z: 10 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),
  // model3: new GLTFModel(
  //   {
  //     position: { x: 20, z: 10 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model4: new GLTFModel(
  //   {
  //     position: { x: 30, z: 10 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  //   },
  //   scene,
  //   world
  // ),
  // model5: new GLTFModel(
  //   {
  //     position: { x: 40, z: 10 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model6: new GLTFModel(
  //   {
  //     position: { x: 10, z: 20 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model7: new GLTFModel(
  //   {
  //     position: { x: 20, z: 20 },
  //     mass: 50,
  //     resourceURL: gltfModels.hospital,
  //   },
  //   scene,
  //   world
  // ),

  // human5: new GLTFModel(
  //   {
  //     position: { x: 40, y: 14, z: 18 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human6: new GLTFModel(
  //   {
  //     position: { x: 37, y: 14, z: 18 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human7: new GLTFModel(
  //   {
  //     position: { x: 43, y: 14, z: 18 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // model8: new GLTFModel(
  //   {
  //     position: { x: 40, z: 20 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),
  // model9: new GLTFModel(
  //   {
  //     position: { x: 25, z: 30 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model11: new GLTFModel(
  //   {
  //     position: { x: 30, z: 30 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),
  // model12: new GLTFModel(
  //   {
  //     position: { x: 40, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model12h1: new GLTFModel(
  //   {
  //     position: { x: 39, y: 14, z: 30 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model12h2: new GLTFModel(
  //   {
  //     position: { x: 41, y: 14, z: 30 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model13: new GLTFModel(
  //   {
  //     position: { x: 40, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model13h1: new GLTFModel(
  //   {
  //     position: { x: 39, y: 14, z: 40 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model13h2: new GLTFModel(
  //   {
  //     position: { x: 41, y: 14, z: 40 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model14: new GLTFModel(
  //   {
  //     position: { x: 10, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model15: new GLTFModel(
  //   {
  //     position: { x: 20, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model16: new GLTFModel(
  //   {
  //     position: { x: 30, z: 40 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model17: new GLTFModel(
  //   {
  //     position: { x: 7, z: 30 },
  //     rotation: { x: 0, y: Math.PI/2, z: 0 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),



  // model2_1: new GLTFModel(
  //   {
  //     position: { x: 10, z: -10 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  //   },
  //   scene,
  //   world
  // ),
  // model3_1: new GLTFModel(
  //   {
  //     position: { x: 20, z: -10 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),

  // human8: new GLTFModel(
  //   {
  //     position: { x: 30, y: 14, z: -8 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human9: new GLTFModel(
  //   {
  //     position: { x: 27, y: 14, z: -8 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human10: new GLTFModel(
  //   {
  //     position: { x: 33, y: 14, z: -8 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human17: new GLTFModel(
  //   {
  //     position: { x: 30, y: 14, z: -12 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human18: new GLTFModel(
  //   {
  //     position: { x: 27, y: 14, z: -12 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human19: new GLTFModel(
  //   {
  //     position: { x: 33, y: 14, z: -12 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // model4_1: new GLTFModel(
  //   {
  //     position: { x: 30, z: -10 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),
  // model5_1: new GLTFModel(
  //   {
  //     position: { x: 40, z: -10 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model6_1: new GLTFModel(
  //   {
  //     position: { x: 10, z: -20 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model7_1: new GLTFModel(
  //   {
  //     position: { x: 20, z: -20 },
  //     mass: 50,
  //     resourceURL: gltfModels.hospital,
  //   },
  //   scene,
  //   world
  // ),

  // human11: new GLTFModel(
  //   {
  //     position: { x: 40, y: 14, z: -18 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human12: new GLTFModel(
  //   {
  //     position: { x: 37, y: 14, z: -18 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human13: new GLTFModel(
  //   {
  //     position: { x: 43, y: 14, z: -18 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  
  // human14: new GLTFModel(
  //   {
  //     position: { x: 40, y: 14, z: -22 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human15: new GLTFModel(
  //   {
  //     position: { x: 37, y: 14, z: -22 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human16: new GLTFModel(
  //   {
  //     position: { x: 43, y: 14, z: -22 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  

  

  // model8_1: new GLTFModel(
  //   {
  //     position: { x: 40, z: -20 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),
  // model9_1: new GLTFModel(
  //   {
  //     position: { x: 25, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model11_1: new GLTFModel(
  //   {
  //     position: { x: 30, z: -30 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),
  // model12_1: new GLTFModel(
  //   {
  //     position: { x: 40, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model12_1h1: new GLTFModel(
  //   {
  //     position: { x: 39, y: 14, z: -30 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model12_1h2: new GLTFModel(
  //   {
  //     position: { x: 41, y: 14, z: -30 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model13_1: new GLTFModel(
  //   {
  //     position: { x: 40, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model13_1h1: new GLTFModel(
  //   {
  //     position: { x: 39, y: 14, z: -40 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model13_1h2: new GLTFModel(
  //   {
  //     position: { x: 41, y: 14, z: -40 },
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model14_1: new GLTFModel(
  //   {
  //     position: { x: 10, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model15_1: new GLTFModel(
  //   {
  //     position: { x: 20, z: -40 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model16_1: new GLTFModel(
  //   {
  //     position: { x: 30, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model17_1: new GLTFModel(
  //   {
  //     position: { x: 7, z: -30 },
  //     rotation: { x: 0, y: Math.PI/2, z: 0 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),

  // model30: new GLTFModel(
  //   {
  //     position: { x: -10, z: -7 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),

  // human20: new GLTFModel(
  //   {
  //     position: { x: -25, y: 14, z: -9 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human21: new GLTFModel(
  //   {
  //     position: { x: -22, y: 14, z: -9 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // human22: new GLTFModel(
  //   {
  //     position: { x: -27, y: 14, z: -5 },
  //     linearDamping: 0.3,
  //     mass: 1,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),

  // model31: new GLTFModel(
  //   {
  //     position: { x: -25, z: -7 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),
  // model32: new GLTFModel(
  //   {
  //     position: { x: -35, z: -7 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model33: new GLTFModel(
  //   {
  //     position: { x: -42, z: -7 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model34: new GLTFModel(
  //   {
  //     position: { x: -9, z: -17 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model35: new GLTFModel(
  //   {
  //     position: { x: -19, z: -17 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  //   },
  //   scene,
  //   world
  // ),
  // model36: new GLTFModel(
  //   {
  //     position: { x: -43, z: -20 },
  //     mass: 50,
  //     resourceURL: gltfModels.hospital,
  //   },
  //   scene,
  //   world
  // ),
  // model37: new GLTFModel(
  //   {
  //     position: { x: -28, z: -17 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model38: new GLTFModel(
  //   {
  //     position: { x: -9, z: -27 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model39: new GLTFModel(
  //   {
  //     position: { x: -40, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  //   },
  //   scene,
  //   world
  // ),
  // model40: new GLTFModel(
  //   {
  //     position: { x: -28, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),
  // model41: new GLTFModel(
  //   {
  //     position: { x: -17, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model42: new GLTFModel(
  //   {
  //     position: { x: -8, z: -40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model43: new GLTFModel(
  //   {
  //     position: { x: -38, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model44: new GLTFModel(
  //   {
  //     position: { x: -45, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model45: new GLTFModel(
  //   {
  //     position: { x: -25, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model46: new GLTFModel(
  //   {
  //     position: { x: -27, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model47: new GLTFModel(
  //   {
  //     position: { x: -29, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model48: new GLTFModel(
  //   {
  //     position: { x: -23, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model49: new GLTFModel(
  //   {
  //     position: { x: -21, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model50: new GLTFModel(
  //   {
  //     position: { x: -19, z: -30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model51: new GLTFModel(
  //   {
  //     position: { x: -21, z: -25 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),
  // model52: new GLTFModel(
  //   {
  //     position: { x: -27, z: -25 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),
  // model30a: new GLTFModel(
  //   {
  //     position: { x: -10, z:7 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model31a: new GLTFModel(
  //   {
  //     position: { x: -25, z:7 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model31aa: new GLTFModel(
  //   {
  //     position: { x: -18, z:7 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model32a: new GLTFModel(
  //   {
  //     position: { x: -35, z:7 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model33a: new GLTFModel(
  //   {
  //     position: { x: -42, z:7 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model34a: new GLTFModel(
  //   {
  //     position: { x: -9, z: 17 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene,
  //   world
  // ),
  // model35a: new GLTFModel(
  //   {
  //     position: { x: -19, z: 17 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  //   },
  //   scene,
  //   world
  // ),
  // model36a: new GLTFModel(
  //   {
  //     position: { x: -43, z: 20 },
  //     mass: 50,
  //     resourceURL: gltfModels.hospital,
  //   },
  //   scene,
  //   world
  // ),
  // model37a: new GLTFModel(
  //   {
  //     position: { x: -28, z: 17 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model38a: new GLTFModel(
  //   {
  //     position: { x: -9, z: 27 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model39a: new GLTFModel(
  //   {
  //     position: { x: -40, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.skyE,
  //   },
  //   scene,
  //   world
  // ),
  // model40a: new GLTFModel(
  //   {
  //     position: { x: -28, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building4,
  //   },
  //   scene,
  //   world
  // ),
  // model41a: new GLTFModel(
  //   {
  //     position: { x: -17, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model42a: new GLTFModel(
  //   {
  //     position: { x: -8, z: 40 },
  //     mass: 50,
  //     resourceURL: gltfModels.building2,
  //   },
  //   scene,
  //   world
  // ),
  // model43a: new GLTFModel(
  //   {
  //     position: { x: -38, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model44a: new GLTFModel(
  //   {
  //     position: { x: -45, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.smallA,
  //   },
  //   scene,
  //   world
  // ),
  // model45a: new GLTFModel(
  //   {
  //     position: { x: -25, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model46a: new GLTFModel(
  //   {
  //     position: { x: -27, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model47a: new GLTFModel(
  //   {
  //     position: { x: -29, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model48a: new GLTFModel(
  //   {
  //     position: { x: -23, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model49a: new GLTFModel(
  //   {
  //     position: { x: -21, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model50a: new GLTFModel(
  //   {
  //     position: { x: -19, z: 30 },
  //     mass: 50,
  //     resourceURL: gltfModels.human,
  //   },
  //   scene,
  //   world
  // ),
  // model51a: new GLTFModel(
  //   {
  //     position: { x: -21, z: 25 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),
  // model52a: new GLTFModel(
  //   {
  //     position: { x: -27, z: 25 },
  //     mass: 5,
  //     resourceURL: gltfModels.wideA,
  //   },
  //   scene,
  //   world
  // ),



text: new Text(
  {
    width: 25.2,
    height: 8.5,
    padding: 0.5,
    justifyContent: "center",
    textAlign: "left",
    fontFamily: FontJSON,
    fontTexture: FontImage,
    position: { x: 20, y: 35, z: 90 },
    rotation: { x: 0, y: 0, z: 0 },
    text: [
      {
        content: "THREEJS EARTHQUAKE SIMULATOR\n",
        fontSize: 0.855,
      },
      {
        content:
          "You can use the sliders from the GUI to control the earthquake.\n\n",
        fontSize: 0.58,
      },
      {
        content: "Press I to view collision hitboxes\n",
        fontSize: 0.56,
      },
      {
        content: "Press 'Start' to start simulation",
        fontSize: 0.56,
      }
    ],
  },
  scene
),
};

for(let key in sceneObjects) {
  let object = sceneObjects[key];
  // key has model name then add to buildings
  if(key.includes('model')) {
    buildings[key] = object;
  }
}
console.log(buildings)
// for (let i = -20; i < 23; i++) {
//   sceneObjects[`road1${i}}`] = new GLTFModel(
//     {
//       position: { x: 1.2, z: i * 2.4 },
//       mass: 50,
//       resourceURL: gltfModels.road,
//     },
//     scene,
//     world
//   );
//   sceneObjects[`road2${i}}`] = new GLTFModel(
//     {
//       position: { x: -1.2, z: i * 2.4 },
//       mass: 50,
//       resourceURL: gltfModels.road,
//     },
//     scene,
//     world
//   );
// }

// for (let i = 0; i < 20; i++) {
//   sceneObjects[`road3${i}}`] = new GLTFModel(
//     {
//       position: { x: 3.61 + 2.4 * i, z: 0 },
//       mass: 50,
//       resourceURL: gltfModels.road,
//     },
//     scene,
//     world
//   );
//   sceneObjects[`road4${i}}`] = new GLTFModel(
//     {
//       position: { x: 3.61 + 2.4 * i, z: 2.4 },
//       mass: 50,
//       resourceURL: gltfModels.road,
//     },
//     scene,
//     world
//   );
//   sceneObjects[`road5${i}}`] = new GLTFModel(
//     {
//       position: { x: -3.61 - 2.4 * i, z: 0 },
//       mass: 50,
//       resourceURL: gltfModels.road,
//     },
//     scene,
//     world
//   );
//   sceneObjects[`road6${i}}`] = new GLTFModel(
//     {
//       position: { x: -3.61 - 2.4 * i, z: 2.4 },
//       mass: 50,
//       //type: 'road',
//       resourceURL: gltfModels.road,
//     },
//     scene,
//     world
//   );
// }

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
    position: { x: 0, y: 14, z: 20 },
    lookAt: new Vector3(0, 0, 0),
    up: { x: 0, y: 1, z: 0 },
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    fov: 75,
  },
  scene
);

export { sceneObjects, buildings, lighting, camera, scene, world, cannonDebugger };
