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
        this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshPhongMaterial({ color: this.color }));


        this.body = new CANNON.Body({
            mass: 0,
            // shape: CannonUtils.CreateConvexPolyhedron(this.geometry),
            shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x / 2, this.dimension.y / 2, 0.01)),
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            material: new CANNON.Material(),
            linearDamping: this.linearDamping
        });
        this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
    }
    render() {
        // this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        // this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        
        this.scene.add(this.mesh);
        this.world.addBody(this.body);
    }
    update() {
        // // follows sine wave
        // this.body.position.x += Math.sin(Date.now() / this.timePeriod) * this.amplitude;
        // this.body.position.y += Math.sin(Date.now() / this.timePeriod*this.factor) * this.amplitude/this.factor;
        // this.body.velocity.x = Math.sin(Date.now() / this.timePeriod) * this.amplitude;

        // // threejs part copying cannon part
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}

export { Island };