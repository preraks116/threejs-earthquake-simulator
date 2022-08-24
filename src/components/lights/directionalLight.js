import * as THREE from 'three';

// directionalLight class
class directionalLight {
    constructor(props, scene) {
        this.color = props.color;
        this.intensity = props.intensity;
        this.shadow = props.shadow;
        this.position = props.position;
        this.scene = scene;
    }
    render() {
        this.light = new THREE.DirectionalLight(this.color, this.intensity);
        this.light.position.set(this.position.x, this.position.y, this.position.z);
        this.light.castShadow = this.shadow;
        this.scene.add(this.light);
    }
}

export { directionalLight };