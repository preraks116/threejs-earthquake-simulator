import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { keyDict } from '../../utils/keyControls';
import { EventDispatcher } from 'three';
import { data } from '../../assets/data/ahmedabad/20221116_1668621506.68514_1/data'
// import { data } from '../../assets/data/indonesia/data'
import * as GSAP from "gsap";

// var GROUP1 = 1;
// var GROUP2 = 2;
// var GROUP3 = 4;

const deltaTime = 0.005;
const timeStep = 0.5;
let index = 0;
const startTime = Date.now();

class Box {
    constructor(props, scene, world) {
        // super();
        this.position = props.position;
        this.color = props.color ? props.color : 0xffffff;
        this.hoverColor = props.hoverColor ? props.hoverColor : 0xffff00;
        this.clickColor = props.clickColor ? props.clickColor : 0xf00000;
        this.scene = scene;
        this.dimension = props.dimension;
        this.speed = props.speed ? props.speed : 0.1;
        this.isMoving = 0;
        this.world = world;
        this.type = props.type;
        this.faultLineLength = props.faultLineLength ? props.faultLineLength : 5;
        this.density = props.density ? props.density : 1;
        this.isHoverable = props.isHoverable ? props.isHoverable : false;
        this.isClickable = props.isClickable ? props.isClickable : false;
        this.linearDamping = props.linearDamping ? props.linearDamping : 0.9;
        this.angularDamping = props.angularDamping ? props.angularDamping : 0.1;
        this.amplitude = props.amplitude ? props.amplitude : 0;
        this.timePeriod = props.timePeriod ? props.timePeriod : 0;
        this.factor = props.factor ? props.factor : 1;
        this.material = new CANNON.Material();
        this.textures = props.textures;

        // this.mass = this.dimension.x * this.dimension.y * this.dimension.z * this.density;
        this.mass = props.mass;

        this.data = data
        var contents = this.data.x
        // split contents with space and \n as delimiter
        this.axes = {}
        if(this.data.location === 'ahmedabad'){
            this.axes = {
                x: this.data.x.split(/[\s\n]+/).map(Number),
                y: this.data.y.split(/[\s\n]+/).map(Number),
                z: this.data.z.split(/[\s\n]+/).map(Number)
            }
        }
        else if(this.data.location === 'indonesia'){
            this.axes = {
                displacement: {
                    x: this.data.displacement.x.split(/[\s\n]+/).map(Number),
                    y: this.data.displacement.y.split(/[\s\n]+/).map(Number),
                    z: this.data.displacement.z.split(/[\s\n]+/).map(Number)
                },
                velocity: {
                    x: this.data.velocity.x.split(/[\s\n]+/).map(Number),
                    y: this.data.velocity.y.split(/[\s\n]+/).map(Number),
                    z: this.data.velocity.z.split(/[\s\n]+/).map(Number)
                }
            }
        }
        // var lines = contents.split(/[\s\n]+/);
        console.log(this.axes)


        
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

        // console.log(this.mass);
        // cannon js rendering
        this.body = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping,
            // collisionFilterGroup: GROUP1,
            material: new CANNON.Material()
        });

        this.base = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(this.position.x, this.position.y - 17.5, this.position.z),
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping,
            // collisionFilterGroup: GROUP1,
            material: new CANNON.Material()
        });
        this.velocity_ = {
            x: 0,
            y: 0,
            z: 0
        }
        // get dimensions of mesh
        const box = new THREE.Box3().setFromObject(this.mesh);
        // console.log(box)
        // console.log(box);
        this.body.addShape(new CANNON.Box(new CANNON.Vec3(
            (box.max.x - box.min.x)/2, 
            (box.max.y - box.min.y)/2, 
            (box.max.z - box.min.z)/2
        )));
        this.base.addShape(new CANNON.Box(new CANNON.Vec3(
            (box.max.x - box.min.x),
            (box.max.y - box.min.y)*3,
            (box.max.z - box.min.z)
        )));
        // this.body.addShape(new CANNON.Sphere(this.dimension.x), new CANNON.Vec3(0, 1, 0));
        this.world.addContactMaterial(
            new CANNON.ContactMaterial(
                this.body.material,
                this.base.material,
                {
                    friction: 0.0,
                    restitution: 1.0,
                }
            )
        )
        this.world.addBody(this.body);
        this.world.addBody(this.base);
    }
    update() {
        if(this.isMoving) {
            if(this.data.location === 'ahmedabad'){
                console.log(this.isMoving)
                let accn = {
                    x: this.axes.x[index],
                    y: this.axes.y[index],
                    z: this.axes.z[index]
                }
                index++;
                this.body.position.x = accn.x*timeStep;
                this.body.position.y = accn.y*timeStep;
                this.body.position.z = accn.z*timeStep;
            }
            else if(this.data.location === 'indonesia'){
                this.velocity_.x = this.axes.velocity.x[index];
                this.velocity_.y = this.axes.velocity.y[index];
                this.velocity_.z = this.axes.velocity.z[index];
                this.body.velocity.x = this.velocity_.x;
                this.body.velocity.y = this.velocity_.y;
                this.body.velocity.z = this.velocity_.z;
                this.body.position.x = this.axes.displacement.x[index];
                this.body.position.y = this.axes.displacement.y[index];
                this.body.position.z = this.axes.displacement.z[index];
                index++;
            }
        }
        if(this.body) {
            this.mesh.position.copy(this.body.position);
            this.mesh.quaternion.copy(this.body.quaternion);
        }
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