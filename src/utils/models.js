
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
    }
}

for ( let key in fbxModels ) {
    fbxModels[key].file = fbxPath + fbxModels[key].file;
}

for ( let key in gltfModels ) {
    gltfModels[key].file = gltfPath + gltfModels[key].file;
}

export { fbxModels, gltfModels }