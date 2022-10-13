
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
        scale: 6
    },
    building2: {
        file: 'building/untitled.glb',
        scale: 6
    },
    hospital: {
        file: 'building/hospital.glb',
        scale: 6
    },
    building4: {
        file: 'building/pubg.glb',
        scale: 6
    },
    road: {
        file: 'building/road.glb',
        scale: 6
    },
    tower: {
        file: 'building/tower.glb',
        scale: 12
    },
    skyE: {
        file: 'building/skyE.glb',
        scale: 6
    },
    wideA: {
        file: 'building/wideAwning.glb',
        scale: 6
    },
    smallA: {
        file: 'building/smallA.glb',
        scale: 5
    },
    human: {
        file: 'inhabitants/human.glb',
        scale: 0.35
    }
}

for ( let key in fbxModels ) {
    fbxModels[key].file = fbxPath + fbxModels[key].file;
}

for ( let key in gltfModels ) {
    gltfModels[key].file = gltfPath + gltfModels[key].file;
}

export { fbxModels, gltfModels }