import * as THREE from 'three';
import { Vector3 } from 'three';

// perspective camera class 
// orbit controls dont work with this camera

// function that increments camera zoom 
function setZoom(e, camera) {
    if(camera.camera.zoom <= 16 && camera.camera.zoom >= 0.4) {
        camera.camera.zoom -= e.deltaY * 0.01;
        // console.log(camera.camera.zoom);
    }
    if(camera.camera.zoom < 0.4) {
        camera.camera.zoom = 0.4;
    }
    if(camera.camera.zoom > 16) {
        camera.camera.zoom = 16;
    }
}

class OrthoCamera {
    constructor(props, scene) {
        this.cameraOffset = new Vector3(props.position.x, props.position.y , props.position.z);
        this.position = props.position;
        this.lookAt = props.lookAt;
        this.up = props.up;
        this.rotation = props.rotation;
        this.width = props.width;
        this.height = props.height;
        this.near = props.near;
        this.far = props.far;
        this.group = new THREE.Group();
        this.camera = new THREE.OrthographicCamera(this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, this.near, this.far);
        // this.camera = new THREE.OrthographicCamera(this.left, this.right, this.top, this.bottom, this.near, this.far);
        this.scene = scene;
    }
    render() {
        this.camera.rotation.order = this.rotation.order;
        this.camera.position.set(this.position.x, this.position.y, this.position.z);
        this.camera.rotation.y = this.rotation.y;
        this.camera.rotation.x = this.rotation.x;
        this.camera.lookAt(this.lookAt);
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.camera.up = this.up;
        this.group.add(this.camera);
        this.scene.add(this.group);
        console.log(this.group);
    }
    update(target) {
        // this.group.position.copy(target.position).add(this.cameraOffset);
        // this.camera.updateProjectionMatrix();
    }
}

export { OrthoCamera, setZoom };