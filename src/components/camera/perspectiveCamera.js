import * as THREE from 'three';
import { Vector3 } from 'three';

// perspective camera class 
// orbit controls dont work with this camera
// window resize stops working as well - fixed: change camera to camera.camera

const forward = new Vector3(0, 0, -1);

class PerspCamera {
  constructor(props, scene) {
    this.cameraOffset = new Vector3(props.position.x, props.position.y , props.position.z);
    this.position = props.position;
    this.lookAt = props.lookAt;
    this.up = props.up;
    this.aspect = props.aspect;
    this.near = props.near;
    this.far = props.far;
    this.fov = props.fov;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    this.scene = scene;
  }
  render() {
    this.camera.position.set(this.position.x, this.position.y, this.position.z);
    this.camera.lookAt(this.lookAt);
    this.camera.up = this.up;
    this.scene.add(this.camera);
  }
  update(target) {
    // this.camera.position.copy(target.position).add(this.cameraOffset);
  }
}

export { PerspCamera };