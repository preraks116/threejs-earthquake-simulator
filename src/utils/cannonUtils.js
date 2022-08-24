//MIT License
//Copyright (c) 2020-2022 Sean Bradley
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
var CannonUtils = /** @class */ (function () {
    function CannonUtils() {
    }
    CannonUtils.CreateTrimesh = function (geometry) {
        var vertices = geometry.attributes.position.array;
        var indices = Object.keys(vertices).map(Number);
        return new CANNON.Trimesh(vertices, indices);
    };
    CannonUtils.CreateConvexPolyhedron = function (geometry) {
        var position = geometry.attributes.position;
        var normal = geometry.attributes.normal;
        var vertices = [];
        for (var i = 0; i < position.count; i++) {
            vertices.push(new THREE.Vector3().fromBufferAttribute(position, i));
        }
        var faces = [];
        for (var i = 0; i < position.count; i += 3) {
            var vertexNormals = normal === undefined
                ? []
                : [
                    new THREE.Vector3().fromBufferAttribute(normal, i),
                    new THREE.Vector3().fromBufferAttribute(normal, i + 1),
                    new THREE.Vector3().fromBufferAttribute(normal, i + 2),
                ];
            var face = {
                a: i,
                b: i + 1,
                c: i + 2,
                normals: vertexNormals,
            };
            faces.push(face);
        }
        var verticesMap = {};
        var points = [];
        var changes = [];
        for (var i = 0, il = vertices.length; i < il; i++) {
            var v = vertices[i];
            var key = Math.round(v.x * 100) + '_' + Math.round(v.y * 100) + '_' + Math.round(v.z * 100);
            if (verticesMap[key] === undefined) {
                verticesMap[key] = i;
                points.push(new CANNON.Vec3(vertices[i].x, vertices[i].y, vertices[i].z));
                changes[i] = points.length - 1;
            }
            else {
                changes[i] = changes[verticesMap[key]];
            }
        }
        var faceIdsToRemove = [];
        for (var i = 0, il = faces.length; i < il; i++) {
            var face = faces[i];
            face.a = changes[face.a];
            face.b = changes[face.b];
            face.c = changes[face.c];
            var indices = [face.a, face.b, face.c];
            for (var n = 0; n < 3; n++) {
                if (indices[n] === indices[(n + 1) % 3]) {
                    faceIdsToRemove.push(i);
                    break;
                }
            }
        }
        for (var i = faceIdsToRemove.length - 1; i >= 0; i--) {
            var idx = faceIdsToRemove[i];
            faces.splice(idx, 1);
        }
        var cannonFaces = faces.map(function (f) {
            return [f.a, f.b, f.c];
        });
        return new CANNON.ConvexPolyhedron({
            vertices: points,
            faces: cannonFaces,
        });
    };
    CannonUtils.offsetCenterOfMass = function (body, centreOfMass) {
        body.shapeOffsets.forEach(function (offset) {
            centreOfMass.vadd(offset, centreOfMass);
        });
        centreOfMass.scale(1 / body.shapes.length, centreOfMass);
        body.shapeOffsets.forEach(function (offset) {
            offset.vsub(centreOfMass, offset);
        });
        var worldCenterOfMass = new CANNON.Vec3();
        body.vectorToWorldFrame(centreOfMass, worldCenterOfMass);
        body.position.vadd(worldCenterOfMass, body.position);
    };
    return CannonUtils;
}());

export { CannonUtils };