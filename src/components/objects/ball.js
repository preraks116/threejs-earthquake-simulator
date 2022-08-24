import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { keyDict } from '../../utils/keyControls';

class Ball {
    constructor(props, scene, world) {
        this.position = props.position;
        this.color = props.color ? props.color : 0xffffff;
        this.hoverColor = props.hoverColor ? props.hoverColor : 0xffff00;
        this.clickColor = props.clickColor ? props.clickColor : 0xf00000;
        this.scene = scene;
        this.radius = props.radius;
        this.speed = props.speed
        this.world = world;
        this.mass = props.mass;
        this.type = props.type;
        this.isHoverable = props.isHoverable ? props.isHoverable : false;
        this.isClickable = props.isClickable ? props.isClickable : false;
        this.linearDamping = props.linearDamping
        this.angularDamping = props.angularDamping
        this.material = new CANNON.Material();
        this.textures = props.textures;
    }
    render() {
        // three js rendering
        const geometry = new THREE.SphereGeometry(this.radius.x);
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

        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping,
            material: this.material
        });
        // get dimensions of mesh
        this.body.addShape(new CANNON.Sphere(this.radius*2));
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

export { Ball };