import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Plane class

// todo: make mass acc to volume
class Plane {
  constructor(props, scene, world) {
    this.position = props.position;
    this.color = props.color;
    this.scene = scene;
    this.dimension = props.dimension;
    this.rotation = props.rotation;
    this.world = world;
    this.mass = props.mass;
    this.density = props.density ? props.density : 1;
    this.amplitude = props.amplitude;
    this.timePeriod = props.timePeriod;
    this.linearDamping = props.linearDamping;
    this.material = new CANNON.Material();
  }
  render() {
    // three js rendering
    const geometry = new THREE.PlaneGeometry(this.dimension.x, this.dimension.y);
    const material = new THREE.MeshPhongMaterial({ color: this.color, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(geometry, material);  
    this.mesh.name = 'plane';
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
    // rotation and position are not set in the threejs part but in cannon part
    // and the threejs part copies cannon part in update

    // this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    // this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    

    // cannon js rendering
    this.body = new CANNON.Body({
      mass: this.mass,
      position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
      shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, 0.01)),
      linearDamping: this.linearDamping,
      material: this.material
    });
    this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
    this.world.addBody(this.body);
  }
  update() {
    // follows sine wave
    // this.body.position.x = Math.sin(Date.now() / this.timePeriod) * this.amplitude;
    this.body.position.y = Math.sin(Date.now() / this.timePeriod) * this.amplitude;


    // threejs part copying cannon part
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
  }
}

export { Plane };