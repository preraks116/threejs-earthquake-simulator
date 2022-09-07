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
        this.rotation = props.rotation ? props.rotation : { x: 0, y: 0, z: 0 };
        this.scene = scene;
        this.world = world;
    
        this.geometryPoints = [];
    
        for (let i = 0; i < this.points.length; i++) {
            this.geometryPoints.push(
            new THREE.Vector2(this.points[i].x, this.points[i].y)
            );
            this.geometryPoints[i].multiplyScalar(this.scale);
        }

        // this.body = new CANNON.Body({
        //     mass: 0,
        //     shape: CannonUtils.CreateConvexPolyhedron(this.geometryPoints),
        //     position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
        //     material: new CANNON.Material()
        // });

        this.shape = new THREE.Shape(this.geometryPoints);
        this.geometry = new THREE.ExtrudeGeometry(this.shape, this.extrudeSettings);

        this.body = new CANNON.Body({
            mass: 0,
            shape: CannonUtils.CreateConvexPolyhedron(this.geometry),
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            material: new CANNON.Material()
        });
        this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);

    }
    render() {
  
    
        let mesh = new THREE.Mesh(this.geometry, new THREE.MeshPhongMaterial({ color: this.color }));
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        
        this.scene.add(mesh);
        this.world.addBody(this.body);
    }
    update() {
        // does nothing
    }
}

export { Island };