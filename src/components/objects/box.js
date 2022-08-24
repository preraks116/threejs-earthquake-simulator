import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { keyDict } from '../../utils/keyControls';
import { EventDispatcher } from 'three';


class Box {
    constructor(props, scene, world) {
        // super();
        this.position = props.position;
        this.color = props.color ? props.color : 0xffffff;
        this.hoverColor = props.hoverColor ? props.hoverColor : 0xffff00;
        this.clickColor = props.clickColor ? props.clickColor : 0xf00000;
        this.scene = scene;
        this.dimension = props.dimension;
        this.speed = props.speed
        this.world = world;
        this.type = props.type;
        this.density = props.density ? props.density : 1;
        this.isHoverable = props.isHoverable ? props.isHoverable : false;
        this.isClickable = props.isClickable ? props.isClickable : false;
        this.linearDamping = props.linearDamping
        this.angularDamping = props.angularDamping
        this.material = new CANNON.Material();
        this.textures = props.textures;
        this.mass = this.dimension.x * this.dimension.y * this.dimension.z * this.density;
    }
    render() {
        // three js rendering
        const geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
        const material = this.textures ? new THREE.MeshStandardMaterial(this.textures): new THREE.MeshPhongMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.mesh.transparent = true;
        // Hover userData
        this.mesh.userData.isHoverable = this.isHoverable;
        this.mesh.userData.onHover = this.onHover.bind(this);
        this.mesh.userData.resetHover = this.resetHover.bind(this);
        // Click userData
        this.mesh.userData.isClickable = this.isClickable;
        this.mesh.userData.onClick = this.onClick.bind(this);
        this.scene.add(this.mesh);

        console.log(this.mass);
        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping,
            material: this.material
        });
        // get dimensions of mesh
        const box = new THREE.Box3().setFromObject(this.mesh);
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
        // this.body.position.x = Math.sin(Date.now() / 1000) * 3;

        // threejs part copying cannon part
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
    onHover() {
        this.mesh.material.color.setHex(this.hoverColor);
    }
    resetHover() {
        this.mesh.material.color.setHex(this.color);
    }
    onClick() {
        // if the color is not the click color, change it to the click color
        if (this.mesh.material.color.getHex() !== this.clickColor) {
            this.mesh.material.color.setHex(this.clickColor);
        }
        else {
            this.mesh.material.color.setHex(this.color);
        }
    }
}

export { Box };