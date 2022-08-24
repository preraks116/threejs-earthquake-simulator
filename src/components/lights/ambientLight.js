import * as THREE from 'three';

// AmbientLight class
class ambientLight {
    constructor(props, scene) {
        this.color = props.color;
        this.intensity = props.intensity;
        this.scene = scene;
    }
    render() {
        this.light = new THREE.AmbientLight(this.color, this.intensity);
        this.scene.add(this.light);
    }
}

export { ambientLight };