import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { keyDict } from '../../utils/keyControls';

// Cube class
class Player {
    constructor(props, scene, world) {
        this.position = props.position;
        this.color = props.color ? props.color : 0xffffff;
        this.scene = scene;
        this.dimension = props.dimension;
        this.outlineSize = props.outlineSize ? props.outlineSize : 0.05;
        this.speed = props.speed
        this.world = world;
        this.mass = props.mass
        this.linearDamping = props.linearDamping
        this.material = new CANNON.Material();
        this.type = props.type;
        this.textures = props.textures;
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            linearDamping: this.linearDamping,
            // angularDamping: 1,
            material: this.material
        });
    }
    render() {
        // three js rendering
        this.group = new THREE.Group();
        // const geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
        // const material = this.textures ? new THREE.MeshStandardMaterial(this.textures): new THREE.MeshPhongMaterial({ color: this.color });
        // this.mesh = new THREE.Mesh(geometry, material);
        // this.mesh.receiveShadow = true;
        // this.mesh.castShadow = true;
        // this.scene.add(this.mesh);
        // this.group.add(this.mesh);

        const outlineGeometry = new THREE.CylinderGeometry(this.dimension.radius, this.dimension.radius, this.dimension.height, this.dimension.radialSegments); 
        const outlineMaterial = new THREE.MeshPhongMaterial({ color: this.color });
        this.outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        this.outline.receiveShadow = true;
        this.outline.castShadow = true;
        // console.log(this.scene.children[0].children[0].position);
        this.outline.lookAt(this.scene.children[0].children[0].position);
        this.outline.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        // this.scene.add(this.outline);
        this.group.add(this.outline);

        const geometry = new THREE.CylinderGeometry(this.dimension.radius - this.outlineSize, this.dimension.radius - this.outlineSize, this.dimension.height, this.dimension.radialSegments);
        const material = this.textures ? new THREE.MeshStandardMaterial(this.textures): new THREE.MeshPhongMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(geometry, material);
        // console.log(this.scene.children[0].position);
        this.mesh.lookAt(this.scene.children[0].children[0].position);
        this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.group.add(this.mesh);

        this.scene.add(this.group);


        // rotation and position are not set in the threejs part but in cannon part
        // and the threejs part copies cannon part in update

        // this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        // this.scene.add(this.mesh);
        
        // cannon js rendering
        // this.body = new CANNON.Body({
        //     mass: this.mass,
        //     position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
        //     linearDamping: this.linearDamping,
        //     angularDamping: 1,
        //     material: this.material
        // });
        // get dimensions of mesh
        const box = new THREE.Box3().setFromObject(this.outline);
        // console.log(box);
        this.body.addShape(new CANNON.Box(new CANNON.Vec3(
            (box.max.x - box.min.x)/2, 
            (box.max.y - box.min.y)/2, 
            (box.max.z - box.min.z)/2
        )));
        // this.body.addShape(new CANNON.Sphere(this.dimension.x), new CANNON.Vec3(0, 1, 0));
        this.world.addBody(this.body);
    }
    update() {
        if(this.type === 'player') {
            for(let key in keyDict) {
                if(keyDict[key].pressed) {
                    this.body.velocity.x = -1*this.speed*keyDict[key].x;
                    this.body.velocity.z = -1*this.speed*keyDict[key].z;
                }
            }
        }
        // threejs part copying cannon part
        // console.log(this.body.position)
        this.group.position.copy(this.body.position);
        this.group.quaternion.copy(this.body.quaternion);
    }
}

export { Player };