import * as THREE from '../js-r132/build/three.module.js';

class RailwayStation {
    constructor({scene}) {
        this.scene = scene,
        this.loader  = new THREE.TextureLoader(),
        this.brick = this.loader.load( '../assets/texture/brick2.jpg' ),
        this.tile = this.loader.load( '../assets/texture/tile.jpg' ),
        this.gate = this.loader.load( '../assets/texture/gate.jpg' ),
        this.gatetop = this.loader.load( '../assets/texture/gatetop.jpg' ),
        this.window = this.loader.load( '../assets/texture/topwindow.jpg' )
    }

    draw() {
        this.brick.wrapS = THREE.MirroredRepeatWrapping;
        this.brick.wrapT = THREE.MirroredRepeatWrapping;
        this.brick.repeat.set( 1, 1 );
        this.tile.wrapS = THREE.MirroredRepeatWrapping;
        this.tile.wrapT = THREE.MirroredRepeatWrapping;
        this.tile.repeat.set( 4, 3 );
        this.gate.wrapS = THREE.RepeatWrapping;
        this.gate.wrapT = THREE.RepeatWrapping;
        this.window.wrapS = THREE.MirroredRepeatWrapping;
        this.window.wrapT = THREE.MirroredRepeatWrapping;
        // Tornyok
        let geometry = new THREE.BoxGeometry( 2, 10, 2, 2, 10, 2);
        let material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.brick;
        var toronymesh = new THREE.Mesh( geometry, material );
        toronymesh.position.set( -8, 5, 9 );
        toronymesh.castShadow = true;
        toronymesh.receiveShadow = false;
        this.scene.add( toronymesh );

        geometry = new THREE.ConeGeometry( Math.sqrt(2), 3, 4, 4, true); //square root of the box's diameter
        material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.tile;
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( -8, 11.5, 9 );
        mesh.rotation.y = THREE.MathUtils.degToRad( 45.0 );
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );

        geometry = new THREE.BoxGeometry( 2, 10, 2, 2, 10, 2);
        material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.brick;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 8, 5, 9 );
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );

        geometry = new THREE.ConeGeometry( Math.sqrt(2), 3, 4, 4, true); //square root of the box's diameter
        material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.tile;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 8, 11.5, 9 );
        mesh.rotation.y = THREE.MathUtils.degToRad( 45.0 );
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );

        //Tető
        const points = [];
        for ( let i = 0; i < 10; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.1 ) * 10 + 5, ( i - 5 ) * 0.8 ) );
        }
        geometry = new THREE.LatheGeometry( points, 4 );
        material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );

        material.map = this.tile;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0.05, 13.2, -2 );
        mesh.rotation.y = THREE.MathUtils.degToRad( 45.0 );
        mesh.rotation.z = THREE.MathUtils.degToRad( 180.0 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

        geometry = new THREE.PlaneGeometry( 7.3, 7.3 );
        material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.tile;
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = THREE.MathUtils.degToRad( 90.0 );
        mesh.position.set( 0.05, 17, -2.0 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

        //Fő falak
        geometry = new THREE.BoxGeometry( 18, 10, 19.25, 18, 10, 19.25);
        material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide });
        
        material.map = this.brick;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 5, -1.25);
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );

       //Tetőablak
        geometry = new THREE.CylinderGeometry( 2.5, 2.5, 0.25, 32, 5, false, 0, Math.PI );
        material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.window;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 10, 8.25);
        mesh.rotation.y = THREE.MathUtils.degToRad( 90.0 );
        mesh.rotation.z = THREE.MathUtils.degToRad( 90.0 );
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );

        geometry = new THREE.CylinderGeometry( 2.5, 2.5, 5.25, 32, 5, false, 0, Math.PI );
        material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        material.map = this.tile;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 10, 5.74);
        mesh.rotation.y = THREE.MathUtils.degToRad( 90.0 );
        mesh.rotation.z = THREE.MathUtils.degToRad( 90.0 );
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );

        //Bejárat
        geometry = new THREE.CylinderGeometry( 3.75, 3.75, 1, 32, 5, false, 0, Math.PI );
        material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide });
        material.map = this.gatetop;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 5, 9);
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        mesh.rotation.y = THREE.MathUtils.degToRad( 90.0 );
        mesh.rotation.z = THREE.MathUtils.degToRad( 90.0 );
        this.scene.add( mesh );
 
        geometry = new THREE.BoxGeometry( 7.5, 5, 1, 4, 4, 4);
        material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide });
        material.map = this.gate;
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 2.5, 9);
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.scene.add( mesh );
    }
}

export default RailwayStation;