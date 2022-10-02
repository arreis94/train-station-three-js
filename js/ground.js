import * as THREE from '../js-r132/build/three.module.js';

class Ground {
    constructor({scene}) {
        this.scene = scene
    }

    draw() {
        /**
         * Create base
         */
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( '/train-station-three-js/assets/texture/stone.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 50, 50 );
        let geometry = new THREE.CircleGeometry( 40, 100, 30, 30 );
        let material = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
        material.map = texture;
        let mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = -1.0 * Math.PI / 2.0;
        mesh.receiveShadow = true;
        mesh.castShadow = false;
        this.scene.add( mesh );

        let texture2 = textureLoader.load( '/train-station-three-js/assets/texture/grass.jpg' );
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set( 50, 50 );
        let geometry2 = new THREE.RingGeometry( 39, 100, 30, 30 );
        let material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
        material2.map = texture2;
        let mesh2 = new THREE.Mesh( geometry2, material2 );
        mesh2.position.y = 0.1;
        mesh2.rotation.x = -1.0 * Math.PI / 2.0;
        mesh2.receiveShadow = true;
        mesh2.castShadow = false;
        this.scene.add( mesh2 );
    }
}

export default Ground;
