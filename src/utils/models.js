
const fbxPath = 'src/assets/models/fbx/';
const gltfPath = 'src/assets/models/gltf/';

const fbxModels = {
    testScene: {
        file: 'testScene/test-scene.fbx',
        scale: 0.05
    },
    building: {
        file: 'building/low_buildingB.fbx',
        scale: 0.05
    }
}

const gltfModels = {
    boat: {
        file: 'boat/scene2.gltf',
        scale: 2
    },
    building: {
        file: 'building/large_buildingB.glb',
        type: 'building',
        scale: 6,
        fallVal: 15
    },
    building2: {
        file: 'building/untitled.glb',
        type: 'building',
        Y: 7.5,
        mass: 7.5,
        scale: 6,
        fallVal: 15,
        cost: 50
    },
    hospital: {
        file: 'building/hospital.glb',
        type: 'building',
        Y: 10,
        mass: 20,
        scale: 6,
        fallVal: 15,
        cost: 300
    },
    building4: {
        file: 'building/pubg.glb',
        type: 'building',
        Y: 7.5,
        mass: 15,
        scale: 6,
        fallVal: 15,
        cost: 150
    },
    road: {
        file: 'building/road.glb',
        type: 'road',
        mass: 0.5,
        Y: 3,
        scale: 6,
        fallVal: 15,
        cost: 0.01
    },
    tower: {
        file: 'building/tower.glb',
        type: 'building',
        Y: 13,
        mass: 15,
        scale: 12,
        fallVal: 15,
        cost: 200
    },
    skyE: {
        file: 'building/skyE.glb',
        type: 'building',
        mass: 10,
        Y: 12,
        scale: 6,
        fallVal: 15,
        cost: 100,
    },
    wideA: {
        file: 'building/wideAwning.glb',
        type: 'building',
        Y: 4,
        mass: 0.5,
        scale: 6,
        fallVal: 15,
        cost: 0.001
    },
    smallA: {
        file: 'building/smallA.glb',
        type: 'building',
        mass: 2,
        Y: 6,
        scale: 5,
        fallVal: 15,
        cost: 20
    },
    human: {
        file: 'inhabitants/human.glb',
        type: 'human',
        mass: 0.1,
        Y: 3.5,
        scale: 0.35,
        fallVal: 9,
        killVal: 20
    },
    chair: {
        file: 'building/low_poly_chair.glb',
        type: 'chair',
        mass: 0.1,
        Y: 3.5,
        scale: 0.2,
        fallVal: 9,
        killVal: 20
    },
    table: {
        file: 'building/table.glb',
        type: 'table',
        mass: 0.1,
        Y: 3.5,
        scale: 0.75,
        fallVal: 9,
        killVal: 20
    }
}

for ( let key in fbxModels ) {
    fbxModels[key].file = fbxPath + fbxModels[key].file;
}

for ( let key in gltfModels ) {
    gltfModels[key].file = gltfPath + gltfModels[key].file;
}

export { fbxModels, gltfModels }