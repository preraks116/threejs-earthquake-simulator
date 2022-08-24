import * as THREE from 'three';
import * as CANNON from 'cannon-es';

function addColliders(colliders, body) {
    for(let key in colliders) {
        let collider = colliders[key];
        let shape = new CANNON.Box(new CANNON.Vec3(collider.dimension.x/2, collider.dimension.y/2, collider.dimension.z/2));
        // position defined in ORC
        let offset = new CANNON.Vec3(collider.position.x, collider.position.y, collider.position.z);
        let orientation = new CANNON.Quaternion(0,0,0,1);
        // orientation.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI/2);
        collider.rotation = collider.rotation ? collider.rotation : {x: 0, y: 0, z: 0};
        orientation.setFromEuler(collider.rotation.x, collider.rotation.y, collider.rotation.z);    
        body.addShape(shape, offset, orientation);
        // console.log(body.quaternion)

    }
}

class Sprite {
    constructor(props, scene, world) {
        this.position = props.position;
        this.scene = scene;
        // this.dimension = props.dimension;
        this.world = world;
        this.rotation = props.rotation;
        this.mass = props.mass;
        this.material = new CANNON.Material();
        this.map = props.map;
        this.colliders = props.colliders;
        this.alphaMap = props.alphaMap;
    }
    render() {
        // three js rendering
        const map = new THREE.TextureLoader().load(this.map);
        const alphaMap = new THREE.TextureLoader().load(this.alphaMap);
        const material = new THREE.SpriteMaterial({ map: map, alphaMap: alphaMap });
        this.sprite = new THREE.Sprite(material);
        // this.sprite.scale.set(this.dimension.x, this.dimension.y, 1);
        this.sprite.scale.set(8/2.7,4.5/2.7);
        this.scene.add(this.sprite);

        // rotation and position are not set in the threejs part but in cannon part
        // and the threejs part copies cannon part in update

        // add offset to the position to center the sprite
        this.spriteOffset = new CANNON.Vec3(0.1,0,0.1);
        this.box = new THREE.Box3().setFromObject(this.sprite);
        // subtract the max and min of the box to get the half dimensions
        // console.log(this.sprite.geometry)
        // get dimensions from bounding
        this.dimension = new CANNON.Vec3(
            (this.sprite.geometry.boundingBox.max.x - this.sprite.geometry.boundingBox.min.x)/2,
            (this.sprite.geometry.boundingBox.max.y - this.sprite.geometry.boundingBox.min.y)/2,
            0.5
        );

        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x - this.spriteOffset.x, this.position.y - this.spriteOffset.y, this.position.z - this.spriteOffset.z),
            // shape: new CANNON.Box(new CANNON.Vec3(this.dimension.x, this.dimension.y, this.dimension.z)),
            linearDamping: this.linearDamping,
            material: this.material
        });
        addColliders(this.colliders, this.body);
        this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
        this.world.addBody(this.body);
    }
    update() {
        // threejs part copying cannon part
        this.sprite.position.copy(this.body.position.clone().vadd(this.spriteOffset));
        this.sprite.quaternion.copy(this.body.quaternion);
    }
}

export { Sprite };


