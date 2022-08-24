import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Plane class
class gridHelper {
    constructor(props, scene) {
        this.position = props.position;
        this.scene = scene;
        this.dimension = props.dimension;
        this.rotation = props.rotation;
    }
    render() {
        this.gridHelper = new THREE.GridHelper(this.dimension.x, this.dimension.y);
        this.gridHelper.position.set(this.position.x, this.position.y, this.position.z);
        this.gridHelper.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.scene.add(this.gridHelper);
    }
    update() {
        // does nothing
    }
}
export { gridHelper };