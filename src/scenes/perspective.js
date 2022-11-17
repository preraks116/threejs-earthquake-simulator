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
      position: { x: 1, y: 0, z: 3 },
      color: 0xffffff,
      dimension: { x: 100, y: 5, z: 100 },
      speed: 1000,
      mass: 1000,
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

  human2: new GLTFModel(
    {
      position: { x: 11, z: 30 },
      linearDamping: 0.3,
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human3: new GLTFModel(
    {
      position: { x: 9, z: 30 },
      linearDamping: 0.3,
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human4: new GLTFModel(
    {
      position: { x: 13, z: 30 },
      linearDamping: 0.3,
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  

  

  human6: new GLTFModel(
    {
      position: { x: 20, y: 19, z: 20 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

///////////////////
  model2: new GLTFModel(
    {
      position: { x: 10, z: 10 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),

  // human1_1: new GLTFModel({ 
  //   position: { x: 10, y: 0, z: 10 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1_2: new GLTFModel({
  //   position: { x: 20, y: 15, z: 10 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1_3: new GLTFModel({
  //   position: { x: 10, y: 12, z: 10 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human500: new GLTFModel({ 
  //   position: { x: 12, y: 5, z: 12 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1000: new GLTFModel({
  //   position: { x: 12, y: 15, z: 12 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1001: new GLTFModel({
  //   position: { x: 9, y: 12, z: 8},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1002: new GLTFModel({
  //   position: { x: 8, y: 15, z: 9 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1003: new GLTFModel({
  //   position: { x: 7, y: 15, z: 7 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human1004: new GLTFModel({
  //   position: { x: 9, y: 5, z:  8 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // table1: new GLTFModel({
  //   position: { x: 9, y: 0, z:  13 },
  //   mass: 1,
  //   resourceURL: gltfModels.table,
  // }, scene, world),

  // chair1: new GLTFModel({
  //   position: { x: 12, y: 0, z:  7 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  // table2: new GLTFModel({
  //   position: { x: 11, y: 12, z:  11 },
  //   mass: 1,
  //   resourceURL: gltfModels.table,
  // }, scene, world),

  // chair2: new GLTFModel({
  //   position: { x: 10, y: 12, z:  8 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  // table3: new GLTFModel({
  //   position: { x: 11, y: 15, z:  9 },
  //   mass: 1,
  //   resourceURL: gltfModels.table,
  // }, scene, world),

  // chair3: new GLTFModel({
  //   position: { x: 9, y: 15, z:  9 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  
////////////////////////
  model3: new GLTFModel(
    {
      position: { x: 20, z: 10 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501: new GLTFModel({ 
    position: { x: 20, y: 10, z: 10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  // human502: new GLTFModel({ 
  //   position: { x: 18, y: 13, z: 11},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  human503: new GLTFModel({ 
    position: { x: 18, y: 6, z: 9 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504: new GLTFModel({ 
    position: { x: 19, y: 10, z: 9},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505: new GLTFModel({ 
    position: { x: 21, y: 6, z: 11},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4: new GLTFModel({
    position: { x: 22, y: 10, z:  11 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5: new GLTFModel({
    position: { x: 19, y: 0, z:  10 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5: new GLTFModel({
    position: { x: 22, y: 0, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

////////////////////////
  model6: new GLTFModel(
    {
      position: { x: 10, z: 20 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),

  human2000: new GLTFModel({ 
    position: { x: 10, y: 10, z: 20},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2001: new GLTFModel({ 
    position: { x: 11, y: 10, z: 19},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  ////////////////////////
  model7: new GLTFModel(
    {
      position: { x: 20, z: 20 },
      mass: 50,
      resourceURL: gltfModels.hospital,
    },
    scene,
    world
  ),

  human2500: new GLTFModel({ 
    position: { x: 18, y: 5, z: 22},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2501: new GLTFModel({ 
    position: { x: 18, y: 10, z: 23},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2502: new GLTFModel({ 
    position: { x: 20, y: 5, z: 20},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2503: new GLTFModel({ 
    position: { x: 21, y: 10, z: 24},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2504: new GLTFModel({ 
    position: { x: 22, y: 5, z: 24},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2503: new GLTFModel({ 
    position: { x: 19, y: 10, z: 21},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2504: new GLTFModel({ 
    position: { x: 22, y: 10, z: 24},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2505: new GLTFModel({ 
    position: { x: 23, y: 5, z: 23},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2506: new GLTFModel({ 
    position: { x: 25, y: 10, z: 18},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2507: new GLTFModel({ 
    position: { x: 19, y: 13, z: 21},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human2508: new GLTFModel({ 
    position: { x: 22, y: 13, z: 18},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  chair8: new GLTFModel({
    position: { x: 21, y: 0, z:  19 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table8: new GLTFModel({
    position: { x: 21, y: 0, z:  21 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair9: new GLTFModel({
    position: { x: 19, y: 0, z:  21 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair10: new GLTFModel({
    position: { x: 23, y: 0, z:  19 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair11: new GLTFModel({
    position: { x: 19, y: 10, z:  19 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair12: new GLTFModel({
    position: { x: 19, y: 10, z:  19 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table9: new GLTFModel({
    position: { x: 21, y: 10, z:  18 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair13: new GLTFModel({
    position: { x: 21, y: 10, z:  21 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

////////////////////////
  model8: new GLTFModel(
    {
      position: { x: 40, z: 20 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),

  human3000: new GLTFModel({ 
    position: { x: 37, y: 5, z: 21},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3001: new GLTFModel({ 
    position: { x: 44, y: 5, z: 22},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3002: new GLTFModel({ 
    position: { x: 43, y: 5, z: 18,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3003: new GLTFModel({ 
    position: { x: 42, y: 10, z: 19,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3004: new GLTFModel({ 
    position: { x: 44, y: 10, z: 21,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3005: new GLTFModel({ 
    position: { x: 38, y: 10, z: 18,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3006: new GLTFModel({ 
    position: { x: 41, y: 14, z: 19,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3007: new GLTFModel({ 
    position: { x: 45, y: 14, z: 20,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3008: new GLTFModel({ 
    position: { x: 37, y: 14, z: 22,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  chair15: new GLTFModel({
    position: { x: 38, y: 5, z:  19 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair16: new GLTFModel({
    position: { x: 40, y: 5, z:  22 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table10: new GLTFModel({
    position: { x: 40, y: 0, z:  18 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair17: new GLTFModel({
    position: { x: 42, y: 5, z:  20 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table11: new GLTFModel({
    position: { x: 40, y: 10, z:  20 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair18: new GLTFModel({
    position: { x: 38, y: 5, z:  20 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair19: new GLTFModel({
    position: { x: 40, y: 10, z:  22 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair20: new GLTFModel({
    position: { x: 37, y: 10, z:  20 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  ///////////////// MODEL 9
  // model9: new GLTFModel(
  //   {
  //     position: { x: 25, z: 30 },
  //     mass: 150,
  //     resourceURL: gltfModels.tower,
  //   },
  //   scene, 
  //   world
  // ),

  // human4000: new GLTFModel({ 
  //   position: { x: 26, y: 5, z: 29,},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human4001: new GLTFModel({ 
  //   position: { x: 27, y: 5, z: 31,},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),
  
  // human4003: new GLTFModel({ 
  //   position: { x: 23, y: 11, z: 30,},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human4004: new GLTFModel({ 
  //   position: { x: 25, y: 11, z: 32,},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),
  
  // human4005: new GLTFModel({ 
  //   position: { x: 24, y: 17, z: 29,},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human4006: new GLTFModel({ 
  //   position: { x: 26, y: 17, z: 31,},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // chair24: new GLTFModel({
  //   position: { x: 26, y: 17, z:  29 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  // chair22: new GLTFModel({
  //   position: { x: 25, y: 5, z:  29 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

///////////////////////////////////////////////////////////////
  model4: new GLTFModel(
    {
      position: { x: 30, z: 10 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),
  
  human1_1_4: new GLTFModel({ 
    position: { x: 30, y: 5, z: 10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_2_4: new GLTFModel({
    position: { x: 30, y: 15, z: 10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_3_4: new GLTFModel({
    position: { x: 30, y: 12, z: 10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human500_4: new GLTFModel({ 
    position: { x: 32, y: 5, z: 11 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1000_4: new GLTFModel({
    position: { x: 32, y: 15, z: 12 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1001_4: new GLTFModel({
    position: { x: 29, y: 12, z: 8},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1002_4: new GLTFModel({
    position: { x: 28, y: 15, z: 9 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1003_4: new GLTFModel({
    position: { x: 27, y: 15, z: 7 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1004_4: new GLTFModel({
    position: { x: 29, y: 5, z:  8 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  table1_4: new GLTFModel({
    position: { x: 29, y: 0, z:  13 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  // chair1_4_4: new GLTFModel({
  //   position: { x: 52, y: 0, z:  7 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  table2_4: new GLTFModel({
    position: { x: 31, y: 12, z:  11 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair2_4: new GLTFModel({
    position: { x: 30, y: 12, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table3_4: new GLTFModel({
    position: { x: 31, y: 15, z:  9 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair3_4: new GLTFModel({
    position: { x: 29, y: 15, z:  9 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),



///////////////////////
  model5: new GLTFModel(
    {
      position: { x: 40, z: 10 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_5: new GLTFModel({ 
    position: { x: 40, y: 10, z: 10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_5: new GLTFModel({ 
    position: { x: 38, y: 13, z: 11},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_5: new GLTFModel({ 
    position: { x: 38, y: 6, z: 9 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_5: new GLTFModel({ 
    position: { x: 39, y: 10, z: 9},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_5: new GLTFModel({ 
    position: { x: 41, y: 6, z: 11},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_5: new GLTFModel({
    position: { x: 42, y: 10, z:  11 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_5: new GLTFModel({
    position: { x: 39, y: 0, z:  10 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_5: new GLTFModel({
    position: { x: 42, y: 0, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model11: new GLTFModel(
    {
      position: { x: 30, z: 30 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),
  model12: new GLTFModel(
    {
      position: { x: 40, z: 30 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_12: new GLTFModel({ 
    position: { x: 40, y: 10, z: 30 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_12: new GLTFModel({ 
    position: { x: 38, y: 13, z: 31},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_12: new GLTFModel({ 
    position: { x: 38, y: 6, z: 29 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_12: new GLTFModel({ 
    position: { x: 39, y: 10, z: 29},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_12: new GLTFModel({ 
    position: { x: 41, y: 6, z: 31},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_12: new GLTFModel({
    position: { x: 42, y: 10, z:  31 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_12: new GLTFModel({
    position: { x: 39, y: 0, z:  30 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_12: new GLTFModel({
    position: { x: 42, y: 0, z:  28 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model12h1: new GLTFModel(
    {
      position: { x: 39, y: 14, z: 30 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model12h2: new GLTFModel(
    {
      position: { x: 41, y: 14, z: 30 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model13: new GLTFModel(
    {
      position: { x: 40, z: 40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  // human501_13: new GLTFModel({ 
  //   position: { x: 40, y: 10, z: 40 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human502_13: new GLTFModel({ 
  //   position: { x: 38, y: 13, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human503_13: new GLTFModel({ 
  //   position: { x: 38, y: 6, z: 39 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human504_13: new GLTFModel({ 
  //   position: { x: 39, y: 10, z: 39},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human505_13: new GLTFModel({ 
  //   position: { x: 41, y: 6, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),


  // chair4_13: new GLTFModel({
  //   position: { x: 42, y: 10, z:  41 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  // table5_13: new GLTFModel({
  //   position: { x: 39, y: 0, z:  40 },
  //   mass: 1,
  //   resourceURL: gltfModels.table,
  // }, scene, world),

  // chair5_13: new GLTFModel({
  //   position: { x: 42, y: 0, z:  38 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

 

  model13h1: new GLTFModel(
    {
      position: { x: 39, y: 14, z: 40 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model13h2: new GLTFModel(
    {
      position: { x: 41, y: 14, z: 40 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model14: new GLTFModel(
    {
      position: { x: 10, z: 40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_14: new GLTFModel({ 
    position: { x: 10, y: 15, z: 10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_14: new GLTFModel({ 
    position: { x:8, y: 15, z: 11},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_14: new GLTFModel({ 
    position: { x: 18, y: 6, z: 9 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_14: new GLTFModel({ 
    position: { x: 9, y: 5, z: 9},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_14: new GLTFModel({ 
    position: { x: 11, y: 5, z: 11},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  // chair4_14: new GLTFModel({
  //   position: { x: 12, y: 10, z:  11 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  table5_14: new GLTFModel({
    position: { x: 9, y: 5, z:  10 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_14: new GLTFModel({
    position: { x: 12, y: 5, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  // // human501_14: new GLTFModel({ 
  // //   position: { x: 10, y: 10, z: 40 },
  // //   mass: 1,
  // //   resourceURL: gltfModels.human,
  // // }, scene, world),

  // human502_14: new GLTFModel({ 
  //   position: { x: 8, y: 13, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human503_14: new GLTFModel({ 
  //   position: { x: 8, y: 6, z: 39 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human504_14: new GLTFModel({ 
  //   position: { x: 9, y: 10, z: 39},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human505_14: new GLTFModel({ 
  //   position: { x: 11, y: 6, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),


  // chair4_14: new GLTFModel({
  //   position: { x: 12, y: 10, z:  41 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  // table5_14: new GLTFModel({
  //   position: { x: 9, y: 0, z:  40 },
  //   mass: 1,
  //   resourceURL: gltfModels.table,
  // }, scene, world),

  // chair5_14: new GLTFModel({
  //   position: { x: 12, y: 0, z:  38 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),



  // human501_14: new GLTFModel({ 
  //   position: { x: 40, y: 10, z: 40 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human502_14: new GLTFModel({ 
  //   position: { x: 38, y: 13, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human503_14: new GLTFModel({ 
  //   position: { x: 38, y: 6, z: 39 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human504_14: new GLTFModel({ 
  //   position: { x: 39, y: 10, z: 39},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  // human505_14: new GLTFModel({ 
  //   position: { x: 41, y: 6, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),


  // chair4_14: new GLTFModel({
  //   position: { x: 42, y: 10, z:  41 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  // table5_14: new GLTFModel({
  //   position: { x: 39, y: 0, z:  40 },
  //   mass: 1,
  //   resourceURL: gltfModels.table,
  // }, scene, world),

  // chair5_14: new GLTFModel({
  //   position: { x: 42, y: 0, z:  38 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  model15: new GLTFModel(
    {
      position: { x: 20, z: 40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_15: new GLTFModel({ 
    position: { x: 20, y: 10, z: 40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_15: new GLTFModel({ 
    position: { x: 18, y: 13, z: 41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_15: new GLTFModel({ 
    position: { x: 18, y: 6, z: 39 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_15: new GLTFModel({ 
    position: { x: 19, y: 10, z: 39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_15: new GLTFModel({ 
    position: { x: 21, y: 6, z: 41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_15: new GLTFModel({
    position: { x: 22, y: 10, z:  41 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_15: new GLTFModel({
    position: { x: 19, y: 0, z:  40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_15: new GLTFModel({
    position: { x: 22, y: 0, z:  38 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model16: new GLTFModel(
    {
      position: { x: 30, z: 40 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model17: new GLTFModel(
    {
      position: { x: 7, z: 30 },
      rotation: { x: 0, y: Math.PI/2, z: 0 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),



  model2_1: new GLTFModel(
    {
      position: { x: 10, z: -10 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),

  human1_1_2_1: new GLTFModel({ 
    position: { x: 10, y: 5, z: -10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_2_2_1: new GLTFModel({
    position: { x: 10, y: 15, z: -10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_3_2_1: new GLTFModel({
    position: { x: 10, y: 12, z: -10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human500_2_1: new GLTFModel({ 
    position: { x: 12, y: 5, z: -9 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1000_2_1: new GLTFModel({
    position: { x: 12, y: 15, z: -8 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1001_2_1: new GLTFModel({
    position: { x: 9, y: 12, z: -12},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1002_2_1: new GLTFModel({
    position: { x: 8, y: 15, z: -11 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1003_2_1: new GLTFModel({
    position: { x: 7, y: 15, z: -13 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1004_2_1: new GLTFModel({
    position: { x: 9, y: 5, z:  -12 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  table1_2_1: new GLTFModel({
    position: { x: 9, y: 0, z:  -7 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair1_2_1: new GLTFModel({
    position: { x: 12, y: 0, z: -13 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table2_2_1: new GLTFModel({
    position: { x: 11, y: 12, z:  -9 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair2_2_1: new GLTFModel({
    position: { x: 10, y: 12, z:  -12 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table3_2_1: new GLTFModel({
    position: { x: 11, y: 15, z:  -11 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair3_2_1: new GLTFModel({
    position: { x: 9, y: 15, z:  -11 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model3_1: new GLTFModel(
    {
      position: { x: 20, z: -10 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),

  human8: new GLTFModel(
    {
      position: { x: 30, y: 14, z: -8 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human9: new GLTFModel(
    {
      position: { x: 27, y: 14, z: -8 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human10: new GLTFModel(
    {
      position: { x: 33, y: 14, z: -8 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human17: new GLTFModel(
    {
      position: { x: 30, y: 14, z: -12 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human18: new GLTFModel(
    {
      position: { x: 27, y: 14, z: -12 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human19: new GLTFModel(
    {
      position: { x: 33, y: 14, z: -12 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  model4_1: new GLTFModel(
    {
      position: { x: 30, z: -10 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),

  human3000_4_1: new GLTFModel({ 
    position: { x: 27, y: 5, z: -9},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3001_4_1: new GLTFModel({ 
    position: { x: 34, y: 5, z: -8},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3002_4_1: new GLTFModel({ 
    position: { x: 33, y: 5, z: -12,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3003_4_1: new GLTFModel({ 
    position: { x: 32, y: 10, z: -11,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3004_4_1: new GLTFModel({ 
    position: { x: 34, y: 10, z: -9,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3005_4_1: new GLTFModel({ 
    position: { x: 28, y: 10, z: -12,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3006_4_1: new GLTFModel({ 
    position: { x: 31, y: 14, z: -11,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3007_4_1: new GLTFModel({ 
    position: { x: 35, y: 14, z: -10,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human3008_4_1: new GLTFModel({ 
    position: { x: 27, y: 14, z: -8,},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  chair15_4_1: new GLTFModel({
    position: { x: 28, y: 5, z:  -11 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair16_4_1: new GLTFModel({
    position: { x: 30, y: 5, z:  -8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table10_4_1: new GLTFModel({
    position: { x: 30, y: 0, z:  -12 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair17_4_1: new GLTFModel({
    position: { x: 32, y: 5, z:  -10 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table11_4_1: new GLTFModel({
    position: { x: 30, y: 10, z:  -10 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair18_4_1: new GLTFModel({
    position: { x: 28, y: 5, z:  -10 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair19_4_1: new GLTFModel({
    position: { x: 30, y: 10, z:  -8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair20_4_1: new GLTFModel({
    position: { x: 27, y: 10, z:  -10 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model5_1: new GLTFModel(
    {
      position: { x: 40, z: -10 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_5_1: new GLTFModel({ 
    position: { x: 40, y: 10, z: -10 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_5_1: new GLTFModel({ 
    position: { x: 38, y: 13, z: -9},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_5_1: new GLTFModel({ 
    position: { x: 38, y: 6, z: -11 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_5_1: new GLTFModel({ 
    position: { x: 39, y: 10, z: -11},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_5_1: new GLTFModel({ 
    position: { x: 41, y: 6, z: -9},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_5_1: new GLTFModel({
    position: { x: 42, y: 10, z:  -9 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_5_1: new GLTFModel({
    position: { x: 39, y: 0, z:  -10 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_5_1: new GLTFModel({
    position: { x: 42, y: 0, z:  -12 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model6_1: new GLTFModel(
    {
      position: { x: 10, z: -20 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model7_1: new GLTFModel(
    {
      position: { x: 20, z: -20 },
      mass: 50,
      resourceURL: gltfModels.hospital,
    },
    scene,
    world
  ),

  human11: new GLTFModel(
    {
      position: { x: 40, y: 14, z: -18 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human12: new GLTFModel(
    {
      position: { x: 37, y: 14, z: -18 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human13: new GLTFModel(
    {
      position: { x: 43, y: 14, z: -18 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  
  human14: new GLTFModel(
    {
      position: { x: 40, y: 14, z: -22 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human15: new GLTFModel(
    {
      position: { x: 37, y: 14, z: -22 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human16: new GLTFModel(
    {
      position: { x: 43, y: 14, z: -22 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  

  humanhuman: new GLTFModel(
    {
      position: { x: 0, y: 14, z: 10 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  

  model8_1: new GLTFModel(
    {
      position: { x: 40, z: -20 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),
  model9_1: new GLTFModel(
    {
      position: { x: 25, z: -30 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model11_1: new GLTFModel(
    {
      position: { x: 30, z: -30 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),
  model12_1: new GLTFModel(
    {
      position: { x: 40, z: -30 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_12_1: new GLTFModel({ 
    position: { x: 40, y: 10, z: -30 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_12_1: new GLTFModel({ 
    position: { x: 38, y: 13, z: -29},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_12_1: new GLTFModel({ 
    position: { x: 38, y: 6, z: -31 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_12_1: new GLTFModel({ 
    position: { x: 39, y: 10, z: -31},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_12_1: new GLTFModel({ 
    position: { x: 41, y: 6, z: -29},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_12_1: new GLTFModel({
    position: { x: 42, y: 10, z:  -29 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_12_1: new GLTFModel({
    position: { x: 39, y: 0, z:  -30 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_12_1: new GLTFModel({
    position: { x: 42, y: 0, z:  -32 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model12_1h1: new GLTFModel(
    {
      position: { x: 39, y: 14, z: -30 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model12_1h2: new GLTFModel(
    {
      position: { x: 41, y: 14, z: -30 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model13_1: new GLTFModel(
    {
      position: { x: 40, z: -40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_13_1: new GLTFModel({ 
    position: { x: 40, y: 10, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_13_1: new GLTFModel({ 
    position: { x: 38, y: 13, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_13_1: new GLTFModel({ 
    position: { x: 38, y: 6, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_13_1: new GLTFModel({ 
    position: { x: 39, y: 10, z: -41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_13_1: new GLTFModel({ 
    position: { x: 41, y: 6, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_13_1: new GLTFModel({
    position: { x: 42, y: 10, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  chair5_13_1: new GLTFModel({
    position: { x: 39, y: 0, z:  -40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_13_1: new GLTFModel({
    position: { x: 42, y: 0, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model13_1h1: new GLTFModel(
    {
      position: { x: 39, y: 14, z: -40 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model13_1h2: new GLTFModel(
    {
      position: { x: 41, y: 14, z: -40 },
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model14_1: new GLTFModel(
    {
      position: { x: 10, z: -40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_14_1: new GLTFModel({ 
    position: { x: 10, y: 10, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_14_1: new GLTFModel({ 
    position: { x: 8, y: 13, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_14_1: new GLTFModel({ 
    position: { x: 8, y: 6, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_14_1: new GLTFModel({ 
    position: { x: 9, y: 10, z: -41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_14_1: new GLTFModel({ 
    position: { x: 11, y: 6, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_14_1: new GLTFModel({
    position: { x: 12, y: 10, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_14_1: new GLTFModel({
    position: { x: 9, y: 0, z:  -40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_14_1: new GLTFModel({
    position: { x: 12, y: 0, z:  -421 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model15_1: new GLTFModel(
    {
      position: { x: 20, z: -40 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model16_1: new GLTFModel(
    {
      position: { x: 30, z: -40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_16_1: new GLTFModel({ 
    position: { x: 30, y: 10, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_16_1: new GLTFModel({ 
    position: { x: 28, y: 13, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_16_1: new GLTFModel({ 
    position: { x: 28, y: 6, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_16_1: new GLTFModel({ 
    position: { x: 29, y: 10, z: -41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_16_1: new GLTFModel({ 
    position: { x: 31, y: 6, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_16_1: new GLTFModel({
    position: { x: 32, y: 10, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_16_1: new GLTFModel({
    position: { x: 29, y: 0, z:  -40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_16_1: new GLTFModel({
    position: { x: 32, y: 0, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model17_1: new GLTFModel(
    {
      position: { x: 7, z: -30 },
      rotation: { x: 0, y: Math.PI/2, z: 0 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),

  model30: new GLTFModel(
    {
      position: { x: -10, z: -7 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),

  human20: new GLTFModel(
    {
      position: { x: -25, y: 14, z: -9 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human21: new GLTFModel(
    {
      position: { x: -22, y: 14, z: -9 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  human22: new GLTFModel(
    {
      position: { x: -27, y: 14, z: -5 },
      linearDamping: 0.3,
      mass: 1,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),

  model31: new GLTFModel(
    {
      position: { x: -25, z: -7 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),
  model32: new GLTFModel(
    {
      position: { x: -35, z: -7 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model33: new GLTFModel(
    {
      position: { x: -42, z: -7 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model34: new GLTFModel(
    {
      position: { x: -9, z: -17 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model35: new GLTFModel(
    {
      position: { x: -19, z: -17 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),

  human1_1_35: new GLTFModel({ 
    position: { x: -19, y: 5, z: -17 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_2_35: new GLTFModel({
    position: { x: -19, y: 15, z: -17 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_3_35: new GLTFModel({
    position: { x: -19, y: 12, z: -17 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human500_35: new GLTFModel({ 
    position: { x: -17, y: 5, z: -16 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1000_35: new GLTFModel({
    position: { x: -17, y: 15, z: -15 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  // human1001_35: new GLTFModel({
  //   position: { x: -20, y: 12, z: -15},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  human1002_35: new GLTFModel({
    position: { x: -21, y: 15, z: -18 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1003_35: new GLTFModel({
    position: { x: -22, y: 15, z: -20 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1004_35: new GLTFModel({
    position: { x: -20, y: 5, z:  -19 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  table1_35: new GLTFModel({
    position: { x: -20, y: 0, z:  -15 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair1_35: new GLTFModel({
    position: { x: -17, y: 0, z:  -20 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table2_35: new GLTFModel({
    position: { x: -18, y: 12, z:  -16 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair2_35: new GLTFModel({
    position: { x: -19, y: 12, z:  -19 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table3_35: new GLTFModel({
    position: { x: -18, y: 15, z:  -18 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair3_35: new GLTFModel({
    position: { x: -20, y: 15, z:  -18 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),



  model36: new GLTFModel(
    {
      position: { x: -43, z: -20 },
      mass: 50,
      resourceURL: gltfModels.hospital,
    },
    scene,
    world
  ),
  model37: new GLTFModel(
    {
      position: { x: -28, z: -17 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model38: new GLTFModel(
    {
      position: { x: -9, z: -27 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_38: new GLTFModel({ 
    position: { x: -9, y: 10, z: -27 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502: new GLTFModel({ 
    position: { x: -11, y: 13, z: -26},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_38: new GLTFModel({ 
    position: { x: -11, y: 6, z: -28 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_38: new GLTFModel({ 
    position: { x: -10, y: 10, z: -28},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_38: new GLTFModel({ 
    position: { x: -8, y: 6, z: -26},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_38: new GLTFModel({
    position: { x: -7, y: 10, z:  -26 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_38: new GLTFModel({
    position: { x: -10, y: 0, z:  -27 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_38: new GLTFModel({
    position: { x: -7, y: 0, z:  -29 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model39: new GLTFModel(
    {
      position: { x: -40, z: -40 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),

  human1_1_39: new GLTFModel({ 
    position: { x: -40, y: 5, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_2_39: new GLTFModel({
    position: { x: -40, y: 15, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_3_39: new GLTFModel({
    position: { x: -40, y: 12, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human500_39: new GLTFModel({ 
    position: { x: -38, y: 5, z: -39 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1000_39: new GLTFModel({
    position: { x: -38, y: 15, z: -38 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1001_39: new GLTFModel({
    position: { x: -41, y: 12, z: -42},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1002_39: new GLTFModel({
    position: { x: -42, y: 15, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1003_39: new GLTFModel({
    position: { x: -43, y: 15, z: -43 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1004_39: new GLTFModel({
    position: { x: -41, y: 5, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  table1_39: new GLTFModel({
    position: { x: -41, y: 0, z:  -37 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair1_39: new GLTFModel({
    position: { x: -38, y: 0, z:  -43 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table2_39: new GLTFModel({
    position: { x: -39, y: 12, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair2_39: new GLTFModel({
    position: { x: -40, y: 12, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table3_39: new GLTFModel({
    position: { x: -39, y: 15, z:  -41 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair3_39: new GLTFModel({
    position: { x: -41, y: 15, z:  -41 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model40: new GLTFModel(
    {
      position: { x: -28, z: -40 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),
  model41: new GLTFModel(
    {
      position: { x: -17, z: -40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_41: new GLTFModel({ 
    position: { x: -17, y: 10, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  // human502_41: new GLTFModel({ 
  //   position: { x: -19, y: 13, z: -39},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  human503_41: new GLTFModel({ 
    position: { x: -19, y: 6, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_41: new GLTFModel({ 
    position: { x: -18, y: 10, z: -41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_41: new GLTFModel({ 
    position: { x: -16, y: 6, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_41: new GLTFModel({
    position: { x: -15, y: 10, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_41: new GLTFModel({
    position: { x: -18, y: 0, z:  -40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_41: new GLTFModel({
    position: { x: -15, y: 0, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  // human501_41: new GLTFModel({ 
  //   position: { x: -17, y: 10, z: -40 },
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  human502_41: new GLTFModel({ 
    position: { x: -19, y: 13, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_41: new GLTFModel({ 
    position: { x: -19, y: 6, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_41: new GLTFModel({ 
    position: { x: -18, y: 10, z: -41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_41: new GLTFModel({ 
    position: { x: -16, y: 6, z: 1-39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_41: new GLTFModel({
    position: { x: -15, y: 10, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_41: new GLTFModel({
    position: { x: -18, y: 0, z:  -40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_41: new GLTFModel({
    position: { x: -15, y: 0, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model42: new GLTFModel(
    {
      position: { x: -8, z: -40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_42: new GLTFModel({ 
    position: { x: -8, y: 10, z: -40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_42: new GLTFModel({ 
    position: { x: -10, y: 13, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_42: new GLTFModel({ 
    position: { x: -10, y: 6, z: -41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_42: new GLTFModel({ 
    position: { x: -9, y: 10, z: -41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_42: new GLTFModel({ 
    position: { x: -7, y: 6, z: -39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_42: new GLTFModel({
    position: { x: -6, y: 10, z:  -39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_42: new GLTFModel({
    position: { x: -9, y: 0, z:  -40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_42: new GLTFModel({
    position: { x: -6, y: 0, z:  -42 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model43: new GLTFModel(
    {
      position: { x: -38, z: -30 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model44: new GLTFModel(
    {
      position: { x: -45, z: -30 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model45: new GLTFModel(
    {
      position: { x: -25, z: -30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model46: new GLTFModel(
    {
      position: { x: -27, z: -30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model47: new GLTFModel(
    {
      position: { x: -29, z: -30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model48: new GLTFModel(
    {
      position: { x: -23, z: -30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model49: new GLTFModel(
    {
      position: { x: -21, z: -30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model50: new GLTFModel(
    {
      position: { x: -19, z: -30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model51: new GLTFModel(
    {
      position: { x: -21, z: -25 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),
  model52: new GLTFModel(
    {
      position: { x: -27, z: -25 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),
  model30a: new GLTFModel(
    {
      position: { x: -10, z:7 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_30a: new GLTFModel({ 
    position: { x: -10, y: 10, z: 7 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_30a: new GLTFModel({ 
    position: { x: -12, y: 13, z: 8},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_30a: new GLTFModel({ 
    position: { x: -12, y: 6, z: 6 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_30a: new GLTFModel({ 
    position: { x: -11, y: 10, z: 6},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_30a: new GLTFModel({ 
    position: { x: -9, y: 6, z: 8},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_30a: new GLTFModel({
    position: { x: -8, y: 10, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_30a: new GLTFModel({
    position: { x: -11, y: 0, z:  7 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_30a: new GLTFModel({
    position: { x: -8, y: 0, z:  5 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model31a: new GLTFModel(
    {
      position: { x: -25, z:7 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_31a: new GLTFModel({ 
    position: { x: -25, y: 10, z: 7 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_31a: new GLTFModel({ 
    position: { x: -27, y: 13, z: 8},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_31a: new GLTFModel({ 
    position: { x: -27, y: 6, z: 6 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_31a: new GLTFModel({ 
    position: { x: -26, y: 10, z: 6},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_31a: new GLTFModel({ 
    position: { x: -24, y: 6, z: 8},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_31a: new GLTFModel({
    position: { x: -23, y: 10, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_31a: new GLTFModel({
    position: { x: -26, y: 0, z:  7 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  table6_31a: new GLTFModel({
    position: { x: -23, y: 0, z:  5 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model31aa: new GLTFModel(
    {
      position: { x: -18, z:7 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model32a: new GLTFModel(
    {
      position: { x: -35, z:7 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model33a: new GLTFModel(
    {
      position: { x: -42, z:7 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model34a: new GLTFModel(
    {
      position: { x: -9, z: 17 },
      mass: 150,
      resourceURL: gltfModels.tower,
    },
    scene,
    world
  ),
  model35a: new GLTFModel(
    {
      position: { x: -19, z: 17 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),

  human1_1_35a: new GLTFModel({ 
    position: { x: -19, y: 5, z: 17 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_2_35a: new GLTFModel({
    position: { x: -19, y: 15, z: 17 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_3_35a: new GLTFModel({
    position: { x: -19, y: 12, z: 17 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human500_35a: new GLTFModel({ 
    position: { x: -17, y: 5, z: 18 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1000_35a: new GLTFModel({
    position: { x: -19, y: 15, z: 19 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1001_35a: new GLTFModel({
    position: { x: -20, y: 12, z: 15},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1002_35a: new GLTFModel({
    position: { x: -21, y: 15, z: 16 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1003_35a: new GLTFModel({
    position: { x: -22, y: 15, z: 14 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1004_35a: new GLTFModel({
    position: { x: -20, y: 5, z:  15 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  table1_35a: new GLTFModel({
    position: { x: -20, y: 0, z:  20 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair1_35a: new GLTFModel({
    position: { x: -17, y: 0, z:  14 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table2_35a: new GLTFModel({
    position: { x: -18, y: 12, z:  18 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair2_35a: new GLTFModel({
    position: { x: -19, y: 12, z:  15 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table3_35a: new GLTFModel({
    position: { x: -18, y: 15, z:  16 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair3_35a: new GLTFModel({
    position: { x: -20, y: 15, z:  16 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model36a: new GLTFModel(
    {
      position: { x: -43, z: 20 },
      mass: 50,
      resourceURL: gltfModels.hospital,
    },
    scene,
    world
  ),
  model37a: new GLTFModel(
    {
      position: { x: -28, z: 17 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model38a: new GLTFModel(
    {
      position: { x: -9, z: 27 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_38a: new GLTFModel({ 
    position: { x: -9, y: 10, z: 27 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_38a: new GLTFModel({ 
    position: { x: -11, y: 13, z: 28},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_38a: new GLTFModel({ 
    position: { x: -11, y: 6, z: 27 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_38a: new GLTFModel({ 
    position: { x: -10, y: 10, z: 26},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_38a: new GLTFModel({ 
    position: { x: -8, y: 6, z: 28},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_38a: new GLTFModel({
    position: { x: -7, y: 10, z:  28 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_38a: new GLTFModel({
    position: { x: -10, y: 0, z:  27 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_38a: new GLTFModel({
    position: { x: -7, y: 0, z:  25 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

///////////////////

  model39a: new GLTFModel(
    {
      position: { x: -40, z: 40 },
      mass: 50,
      resourceURL: gltfModels.skyE,
    },
    scene,
    world
  ),

  human1_1_39a: new GLTFModel({ 
    position: { x: -40, y: 5, z: 40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_2_39a: new GLTFModel({
    position: { x: -40, y: 15, z: 40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1_3_39a: new GLTFModel({
    position: { x: -40, y: 12, z: 40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human500_39a: new GLTFModel({ 
    position: { x: -38, y: 5, z: 41 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1000_39a: new GLTFModel({
    position: { x: -38, y: 15, z: 42 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1001_39a: new GLTFModel({
    position: { x: -41, y: 12, z: 38},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1002_39a: new GLTFModel({
    position: { x: -42, y: 15, z: 39 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1003_39a: new GLTFModel({
    position: { x: -43, y: 15, z: 37 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human1004_39a: new GLTFModel({
    position: { x: -41, y: 5, z:  38 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  table1_39a: new GLTFModel({
    position: { x: -41, y: 0, z:  43 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair1_39a: new GLTFModel({
    position: { x: -38, y: 0, z:  37 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table2_39a: new GLTFModel({
    position: { x: -39, y: 12, z:  41 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  // _39a: new GLTFModel({
  //   position: { x: 10, y: 12, z:  8 },
  //   mass: 1,
  //   resourceURL: gltfModels.chair,
  // }, scene, world),

  table3_39a: new GLTFModel({
    position: { x: -39, y: 15, z:  39 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair3_39a: new GLTFModel({
    position: { x: -41, y: 15, z:  39 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model40a: new GLTFModel(
    {
      position: { x: -28, z: 40 },
      mass: 50,
      resourceURL: gltfModels.building4,
    },
    scene,
    world
  ),
  model41a: new GLTFModel(
    {
      position: { x: -17, z: 40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_41a: new GLTFModel({ 
    position: { x: -17, y: 10, z: 40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human502_41a: new GLTFModel({ 
    position: { x: -19, y: 13, z: 41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human503_41a: new GLTFModel({ 
    position: { x: -19, y: 6, z: 39 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_41a: new GLTFModel({ 
    position: { x: -18, y: 10, z: 39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_41a: new GLTFModel({ 
    position: { x: -16, y: 6, z: 41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_41a: new GLTFModel({
    position: { x: -15, y: 10, z:  41 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_41a: new GLTFModel({
    position: { x: -18, y: 0, z:  40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_41a: new GLTFModel({
    position: { x: -15, y: 0, z:  38 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model42a: new GLTFModel(
    {
      position: { x: -8, z: 40 },
      mass: 50,
      resourceURL: gltfModels.building2,
    },
    scene,
    world
  ),

  human501_42a: new GLTFModel({ 
    position: { x: -8, y: 10, z: 40 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  // human502_42a: new GLTFModel({ 
  //   position: { x: -10, y: 13, z: 41},
  //   mass: 1,
  //   resourceURL: gltfModels.human,
  // }, scene, world),

  human503_42a: new GLTFModel({ 
    position: { x: -10, y: 6, z: 39 },
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human504_42a: new GLTFModel({ 
    position: { x: -9, y: 10, z: 39},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),

  human505_42a: new GLTFModel({ 
    position: { x: -7, y: 6, z: 41},
    mass: 1,
    resourceURL: gltfModels.human,
  }, scene, world),


  chair4_42a: new GLTFModel({
    position: { x: -6, y: 10, z:  41 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  table5_42a: new GLTFModel({
    position: { x: -9, y: 0, z:  40 },
    mass: 1,
    resourceURL: gltfModels.table,
  }, scene, world),

  chair5_42a: new GLTFModel({
    position: { x: 22, y: 0, z:  8 },
    mass: 1,
    resourceURL: gltfModels.chair,
  }, scene, world),

  model43a: new GLTFModel(
    {
      position: { x: -38, z: 30 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model44a: new GLTFModel(
    {
      position: { x: -45, z: 30 },
      mass: 50,
      resourceURL: gltfModels.smallA,
    },
    scene,
    world
  ),
  model45a: new GLTFModel(
    {
      position: { x: -25, z: 30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model46a: new GLTFModel(
    {
      position: { x: -27, z: 30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model47a: new GLTFModel(
    {
      position: { x: -29, z: 30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model48a: new GLTFModel(
    {
      position: { x: -23, z: 30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model49a: new GLTFModel(
    {
      position: { x: -21, z: 30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model50a: new GLTFModel(
    {
      position: { x: -19, z: 30 },
      mass: 50,
      resourceURL: gltfModels.human,
    },
    scene,
    world
  ),
  model51a: new GLTFModel(
    {
      position: { x: -21, z: 25 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),
  model52a: new GLTFModel(
    {
      position: { x: -27, z: 25 },
      mass: 5,
      resourceURL: gltfModels.wideA,
    },
    scene,
    world
  ),



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
