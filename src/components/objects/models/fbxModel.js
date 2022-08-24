import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CannonUtils } from '../../../utils/cannonUtils';
import { threeToCannon, ShapeType } from 'three-to-cannon';

const fbxLoader = new FBXLoader();

// recursive function that traverses through this.model and enables shadows for all meshes, and for groups, it calls itself
function enableShadows(object) {
    for( let i = 0; i < object.children.length; i++ ) {
        let child = object.children[i];
        if(child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        else {
            enableShadows(child);
        }
    }
}

// recursive function to add shapes to the body 
function addShapes(object, body) {
    for( let i = 0; i < object.children.length; i++ ) {
        let child = object.children[1];
        if(child.isMesh) {
            // console.log(child);
            let result = threeToCannon(child, {type : ShapeType.HULL});
            let { shape, offset, quaterniion } = result;
            // console.log(result);
            // console.log(offset)
            // console.log(shape);
            // offset.y = 5;
            body.addShape(shape, offset, quaterniion);
        }
        else {
            addShapes(child, body);
        }
    }
}

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

class FBXModel {
    constructor(props, scene, world) {
        this.position = props.position;
        this.scale = props.scale;
        this.scene = scene;
        this.world = world;
        this.mass = props.mass;
        this.linearDamping = props.linearDamping;
        this.rotation = props.rotation;
        this.material = new CANNON.Material();
        this.isLoaded = false;
        this.colliders = props.colliders;
        this.resourceURL = props.resourceURL;
    }
    render() {
        // wait for the fbxLoader to load the model
        // following function is called when the model is loaded
        fbxLoader.load(this.resourceURL, (fbx) => {
            // threejs rendering
            this.isLoaded = true;
            // the loaded model
            this.model = fbx;
            // set the position and scale
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
            // add the model to the scene
            // console.log(this.model);
            this.model.receiveShadow = true;
            this.model.castShadow = true;

            this.body = new CANNON.Body({
                mass: this.mass,
                position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
                linearDamping: this.linearDamping,
                material: this.material
            });        

            addColliders(this.colliders, this.body);

            // addShapes(this.model, this.body);   
            // const result = threeToCannon(this.model, {type: ShapeType.HULL});
            // const { shape, offset, quaterniion } = result;
            // this.body.addShape(shape, offset, quaterniion);

            enableShadows(this.model);
            this.scene.add(this.model);
            this.body.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
            this.world.addBody(this.body);
        });
    }
    update() {
        if (this.isLoaded) {
            // this.model.position.copy(this.body.position);
            // this.model.quaternion.copy(this.body.quaternion);
        }
    }
}
export { FBXModel };