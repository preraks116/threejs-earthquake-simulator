import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { CannonUtils } from '../../utils/cannonUtils';

// define island class
class Island {
    constructor(props, scene, world) {
        this.points = props.points;
        this.scale = props.scale ? props.scale : 1;
        this.extrudeSettings = props.extrudeSettings;
        this.color = props.color ? props.color : 0x00ff00;
        this.position = props.position ? props.position : { x: 0, y: 0, z: 0 };
        this.dimension = props.dimension;
        this.rotation = props.rotation ? props.rotation : { x: 0, y: 0, z: 0 };
        this.amplitude = props.amplitude;
        this.timePeriod = props.timePeriod;
        this.factor = props.factor ? props.factor : 1;
        this.linearDamping = props.linearDamping;
        this.scene = scene;
        this.textures = props.textures;
        this.world = world;
    
        this.geometryPoints = [];
    
        for (let i = 0; i < this.points.length; i++) {
            this.geometryPoints.push(
            new THREE.Vector2(this.points[i].x, this.points[i].y)
            );
            this.geometryPoints[i].multiplyScalar(this.scale);
        }

        this.shape = new THREE.Shape(this.geometryPoints);
        this.geometry = new THREE.ExtrudeGeometry(this.shape, this.extrudeSettings);
        this.material = this.textures ? new THREE.MeshStandardMaterial(this.textures): new THREE.MeshPhongMaterial({ color: this.color });
        console.log(this.material);
        this.mesh = new THREE.Mesh(this.geometry, this.material);


        this.body = new CANNON.Body({
            mass: 0,
            // shape: CannonUtils.CreateConvexPolyhedron(this.geometry),
            shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, 0.01)),
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            material: new CANNON.Material(),
            linearDamping: this.linearDamping
        });
        this.body.position.set(0, this.position.y, 0);
        this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
    }
    render() {
        this.scene.add(this.mesh);
        this.world.addBody(this.body);
    }
    update() {
        // // follows sine wave
        this.body.position.x = Math.sin(Date.now() / this.timePeriod) * this.amplitude;
        this.body.position.y += Math.sin(Date.now() / this.timePeriod*this.factor) * this.amplitude/this.factor;
        this.body.velocity.x = Math.sin(Date.now() / this.timePeriod) * this.amplitude;
    
        // // threejs part copying cannon part
        this.mesh.position.copy(this.body.position.vadd(new CANNON.Vec3(this.position.x, this.position.y - 2.5, this.position.z)));
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}

export { Island };

////////////////////////////////// DONT REMOVE
  // plane : new Island(
  // {
  //     points: [
  //     { x: 610, y: 320 },
  //     { x: 450, y: 300 },
  //     { x: 392, y: 392 },
  //     { x: 266, y: 438 },
  //     { x: 190, y: 570 },
  //     { x: 190, y: 600 },
  //     { x: 160, y: 620 },
  //     { x: 160, y: 650 },
  //     { x: 180, y: 640 },
  //     { x: 165, y: 680 },
  //     { x: 150, y: 670 },
  //     { x: 90, y: 737 },
  //     { x: 80, y: 795 },
  //     { x: 50, y: 835 },
  //     { x: 64, y: 870 },
  //     { x: 60, y: 945 },
  //     { x: 300, y: 945 },
  //     { x: 300, y: 743 },
  //     { x: 600, y: 473 },
  //     { x: 626, y: 425 },
  //     { x: 600, y: 370 },
  //     { x: 610, y: 320 },
  //     ],
  //     scale: 0.125,
  //     extrudeSettings: {
  //         depth: 10,
  //         bevelEnabled: true,
  //         bevelSegments: 2,
  //         steps: 2,
  //         bevelSize: 1,
  //         bevelThickness: 1,
  //     },
  //     color: 0xf08000,
  //     textures: textures.brick,
  //     position: { x: -30, y: 1.5, z: -90 },
  //     dimension: { x: 50, y: 50 },
  //     rotation: { x: Math.PI / 2, y: 0, z: 0 },
  //     linearDamping: 0.3,
  //     // amplitude: 0.4,
  //     factor: 7.5,
  //     amplitude: 0,
  //     timePeriod: 100
  // }, scene, world)
  //////////////////////////////////