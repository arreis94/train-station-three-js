import * as THREE from '../js-r132/build/three.module.js';
import { OBJLoader } from '../js-r132/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../js-r132/examples/jsm/loaders/MTLLoader.js';

var Commons = function () {
    
    function loadBlender({obj,mtl}) {
        const loadingPromise = function(resolve,reject) {
            new MTLLoader()
            .load(mtl, function (materials) {
                materials.preload();
                new OBJLoader()
                    .setMaterials(materials)
                    .load(obj, function (object) {
                        object.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                child.material.side = THREE.DoubleSide;
                            }
                        });
                        resolve(object);
                    });
            },
            function(xhr) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded.' );
            },
            function(error) {
                reject(error);
            });
          return;
        }
        return new Promise(loadingPromise);
    }

    return {
        loadBlender
    }
}

export default Commons;