import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { CannonUtils } from '../../../utils/cannonUtils';
import { threeToCannon, ShapeType } from 'three-to-cannon';

const gltfLoader = new GLTFLoader();

// dimension in model is Vec3

function enableShadows(object) {
  for (let i = 0; i < object.children.length; i++) {
    let child = object.children[i];
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
    else {
      enableShadows(child);
    }
  }
}

function addShapes(object, body) {
  for (let i = 0; i < object.children.length; i++) {
    let child = object.children[i];
    if (child.isMesh) {
      let shape = CannonUtils.CreateTrimesh(child.geometry);
      body.addShape(shape);
    }
    else {
      addShapes(child, body);
    }
  }
}


class GLTFModel {
  constructor(props, scene, world) {
    this.position = props.position;
    this.scale = props.scale;
    this.rotation = props.rotation;
    this.scene = scene;
    this.world = world;
    this.mass = props.mass;
    this.linearDamping = props.linearDamping;
    this.material = new CANNON.Material();
    this.isLoaded = false;
    this.resourceURL = props.resourceURL;
  }
  render() {
    // wait for the gltfLoader to load the model
    // following function is called when the model is loaded
    gltfLoader.load(this.resourceURL, (gltf) => {
      // threejs rendering
      this.isLoaded = true;
      // the loaded model
      this.model = gltf.scene;
      // set the position and scale
      this.model.position.set(this.position.x, this.position.y, this.position.z);
      this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
      // add the model to the scene

      this.model.castShadow = true;
      this.model.receiveShadow = true;

      this.body = new CANNON.Body({
        mass: this.mass,
        position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
        linearDamping: this.linearDamping,
        material: this.material
      });

      enableShadows(this.model);
      // console.log(this.model);
      addShapes(this.model, this.body);
      // const result = threeToCannon(this.model, {type: ShapeType.HULL});
      // const { shape, offset, quaterniion } = result;
      // this.body.addShape(shape, offset, quaterniion);


      this.scene.add(this.model);

      // preprocessing to get the model's bounding box
      // const box = new THREE.Box3().setFromObject(this.model);
      // // subtract max and min vectors
      // this.dimension = new THREE.Vector3().subVectors(box.max, box.min);

      // // cannon js rendering
      // this.body = new CANNON.Body({
      //   mass: this.mass,
      //   position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
      //   shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, this.dimension.z / 2)),
      //   linearDamping: this.linearDamping,
      //   material: this.material
      // });
      this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
      this.world.addBody(this.body);
    });
  }
  update() {
    if (this.isLoaded) {
      this.model.position.copy(this.body.position);
      this.model.quaternion.copy(this.body.quaternion);
    }
  }
}

export { GLTFModel };