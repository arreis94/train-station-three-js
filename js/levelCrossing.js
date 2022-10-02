import * as THREE from '../js-r132/build/three.module.js';

class LevelCrossing {
    constructor({scene,position,rotation}) {
        this.scene = scene,
        this.position = {
            x:position.x || 0,
            y:position.y || 0,
            z:position.z || 0
        },
        this.rotation = rotation || 0.0,
        this.geometry,
        this.material,
        this.mesh,
        this.timer,
        this.isClosed = false,
        this.redOne,
        this.redTwo,
        this.white
    }

    calculatePosition({r}) {
        let x = this.position.x-r*Math.sin(THREE.MathUtils.degToRad(this.rotation));
        let y = r+this.position.y+r*Math.cos(THREE.MathUtils.degToRad(this.rotation));
        return {
            z:this.position.z-0.15,
            x,
            y
        }
    }

    draw = () => {
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( '/train-station-three-js/assets/texture/stone.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 3,30 );

        /**
         * Ground
         */
         this.geometry = new THREE.PlaneGeometry( 5, 50);
         this.material = new THREE.MeshPhongMaterial(  { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
         this.material.map = texture;
         this.mesh = new THREE.Mesh( this.geometry, this.material );
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.position.set(this.position.x+1,this.position.y+0.11,this.position.z+23.5);
         this.mesh.rotation.x = THREE.MathUtils.degToRad(90);
         this.scene.add( this.mesh );
        
        texture = textureLoader.load( '/train-station-three-js/assets/texture/tablecross.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        
        /**
         * Table
         */
         this.geometry = new THREE.BoxGeometry( 0.1, 0.3, 1.3 );
         this.material = new THREE.MeshPhongMaterial(  { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
         this.material.map = texture;
         this.mesh = new THREE.Mesh( this.geometry, this.material );
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.rotation.y = THREE.MathUtils.degToRad(35);
         this.mesh.rotation.z = THREE.MathUtils.degToRad(90);
         this.mesh.rotation.x = THREE.MathUtils.degToRad(90);
         this.mesh.position.set(this.position.x,this.position.y + 4,this.position.z+0.05);
         this.scene.add( this.mesh );

         this.mesh = this.mesh.clone();
         this.mesh.rotation.y = THREE.MathUtils.degToRad(-35);
         this.scene.add( this.mesh );
        /**
        * Pole
        */
        texture = textureLoader.load( '/train-station-three-js/assets/texture/silver.jpg' );
        this.geometry = new THREE.CylinderGeometry( 0.1, 0.1, 5, Math.PI*8 );
        this.material = new THREE.MeshPhongMaterial(  { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
        this.material.map = texture;
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.set(this.position.x,this.position.y + 2.5,this.position.z);
        this.scene.add( this.mesh );

        /**
         * Lamps box
        */
         this.geometry = new THREE.BoxGeometry( 0.15, 1, 1.3 );
         this.material = new THREE.MeshPhongMaterial(  { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
         this.material.map = texture;
         this.mesh = new THREE.Mesh( this.geometry, this.material );
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.position.set(this.position.x,this.position.y + 5.5,this.position.z);
         this.mesh.rotation.y = THREE.MathUtils.degToRad(90);
         this.scene.add( this.mesh );

         this.geometry = new THREE.CylinderGeometry( 0.15, 0.1, 0.2, 32, 1, true, 0, Math.PI );
         this.material = new THREE.MeshPhongMaterial(  { color: 0x000000, specular: 0xffffff, side: THREE.DoubleSide } );
         this.mesh = new THREE.Mesh( this.geometry, this.material );
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.position.set(this.position.x-0.2,this.position.y + 5.7,this.position.z+0.1);
         this.mesh.rotation.y = THREE.MathUtils.degToRad(90);
         this.mesh.rotation.z = THREE.MathUtils.degToRad(90);
         this.scene.add( this.mesh );

         this.mesh = this.mesh.clone();
         this.mesh.position.set(this.position.x+0.2,this.position.y + 5.7,this.position.z+0.1);
         this.scene.add( this.mesh );

         this.mesh = this.mesh.clone();
         this.mesh.position.set(this.position.x,this.position.y + 5.3,this.position.z+0.1);
         this.scene.add( this.mesh );

         /**
          * Lamps
         */
          this.geometry = new THREE.SphereGeometry( 0.1, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
          this.material = new THREE.MeshPhongMaterial(  { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
          this.mesh = new THREE.Mesh( this.geometry, this.material );
          this.mesh.castShadow = true;
          this.mesh.receiveShadow = true;
          this.mesh.position.set(this.position.x,this.position.y + 5.25,this.position.z+0.05);
          this.mesh.rotation.y = THREE.MathUtils.degToRad(90);
          this.mesh.rotation.z = THREE.MathUtils.degToRad(90);
          this.scene.add( this.mesh );

          this.geometry = new THREE.SphereGeometry( 0.1, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
          this.material = new THREE.MeshPhongMaterial(  { color: 0xff0000, specular: 0xff0000, side: THREE.DoubleSide } );
          this.material.transparent = true;
          this.material.opacity = 0.7;
          this.mesh = new THREE.Mesh( this.geometry, this.material );
          this.mesh.castShadow = true;
          this.mesh.receiveShadow = true;
          this.mesh.position.set(this.position.x-0.2,this.position.y + 5.65,this.position.z+0.05);
          this.mesh.rotation.y = THREE.MathUtils.degToRad(90);
          this.mesh.rotation.z = THREE.MathUtils.degToRad(90);
          this.scene.add( this.mesh );

          this.mesh = this.mesh.clone();
          this.mesh.position.set(this.position.x+0.2,this.position.y + 5.65,this.position.z+0.05);
          this.scene.add( this.mesh );

        /**
         * Lights
         */
         this.redOne = new THREE.PointLight( 0xff0000, 1, 2 );
         this.redOne.name = "r1";
         this.redOne.position.set(this.position.x-0.2,this.position.y + 5.65,this.position.z+0.2);
         

         this.redTwo = new THREE.PointLight( 0xff0000, 1, 2 );
         this.redTwo.name = "r2";
         this.redTwo.position.set(this.position.x+0.2,this.position.y + 5.65,this.position.z+0.2);
         

         this.white = new THREE.PointLight( 0xffffff, 1, 2 );
         this.white.name = "w";
         this.white.position.set(this.position.x,this.position.y + 5.25,this.position.z+0.2);
         this.scene.add( this.white );
        /**
         * Start blinking
         */
         this.timer = setInterval(this.blink,1000);

         /**
          * Level
          */
         this.geometry = new THREE.BoxGeometry( 0.1, 0.3, 5 );
         this.material = new THREE.MeshPhongMaterial(  { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
         texture = textureLoader.load( '/train-station-three-js/assets/texture/level.jpg' );
         this.material.map = texture;
         this.mesh = new THREE.Mesh( this.geometry, this.material );
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.rotation.x = THREE.MathUtils.degToRad(90);
         this.mesh.rotation.z = THREE.MathUtils.degToRad(90);
         let c = this.calculatePosition({r:2.5})
         this.mesh.position.set(c.x,c.y,c.z);
         this.scene.add( this.mesh );
    }

    blink = () => {
        if(this.isClosed || this.rotation < -1) {
            this.scene.remove( this.white );
            if(this.scene.getObjectByName('r1')) {
                this.scene.remove( this.redOne );
                this.scene.add( this.redTwo );
            }
            else {
                this.scene.remove( this.redTwo );
                this.scene.add( this.redOne );
            }
        }
        else if(Math.ceil(this.rotation) === 0){
            this.scene.remove( this.redOne );
            this.scene.remove( this.redTwo );
            if(this.scene.getObjectByName('w')) {
                this.scene.remove( this.white );
            }
            else this.scene.add( this.white );
            
        }
    }

    toggleCrossing = () => {
        if(this.isClosed) {
            this.isClosed = false;
        }
        else{
            this.isClosed = true;
        }
    }

    animate = () => {
        /**
         * Closing
         */
        if(this.isClosed) {
            if(Math.ceil(this.rotation) <= 0 && Math.ceil(this.rotation >=-90)) {
                let c = this.calculatePosition({r:2.5});
                this.rotation -= 0.4;
                this.mesh.position.set(c.x,c.y,c.z);
                this.mesh.rotation.y = THREE.MathUtils.degToRad(this.rotation);
            }
        }
        else {
            if(Math.ceil(this.rotation) < 0) {
                let c = this.calculatePosition({r:2.5});
                this.rotation += 0.4;
                this.mesh.position.set(c.x,c.y,c.z);
                this.mesh.rotation.y = THREE.MathUtils.degToRad(this.rotation);
            }
            
        }
    }
}

export default LevelCrossing;
