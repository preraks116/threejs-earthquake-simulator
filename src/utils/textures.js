import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

const textures = {
    brick: {
        map: './src/assets/textures/brick/PavingStones092_1K_Color.jpg',
        normalMap: './src/assets/textures/brick/PavingStones092_1K_NormalDX.jpg',
        roughnessMap: './src/assets/textures/brick/PavingStones092_1K_Roughness.jpg',
        // displacementMap: './src/assets/textures/brick/PavingStones092_1K_Displacement.jpg',
        ambientOcclusionMap: './src/assets/textures/brick/PavingStones092_1K_AmbientOcclusion.jpg',
    },
    ball: {
        map: './src/assets/textures/ball/ChristmasTreeOrnament002_1K_Color.jpg',
        normalMap: './src/assets/textures/ball/ChristmasTreeOrnament002_1K_NormalDX.jpg',
        roughnessMap: './src/assets/textures/ball/ChristmasTreeOrnament002_1K_Roughness.jpg',
        // displacementMap: './src/assets/textures/ball/ChristmasTreeOrnament002_1K_Displacement.jpg',
        // ambientOcclusionMap: './src/assets/textures/ball/ChristmasTreeOrnament002_1K_AmbientOcclusion.jpg',
    }
}

for ( let key in textures ) {
    for( let key2 in textures[key] ) {
        textures[key][key2] = textureLoader.load(textures[key][key2]);
    }
}

export { textures }