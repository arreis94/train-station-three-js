import * as THREE from '../js-r132/build/three.module.js';

class Rails {
    constructor({scene,position}) {
        this.scene = scene,
        this.position = {
            x:position.x || 0,
            y:position.y || 0,
            z:position.z || 0
        },
        this.geometry,
        this.material,
        this.mesh
    }

    /**
     * Calculate new coordinates after rotation with parametric equation of a circle.
     * @param {r,position} r - radius, position - mesh position (center of the circle)
     * @returns New positions
     */
    calculatePosition({r,position,rotation}) {
        let x = position.x + r * Math.cos(THREE.MathUtils.degToRad(rotation));
        let z = position.z + r * -Math.sin(THREE.MathUtils.degToRad(rotation));
        return {
            ...position,
            x,
            z
        }
    }

    draw() {

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( '../assets/texture/coal.jpg' );
        texture.repeat.set( 50, 50 );
        texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;

        this.geometry = new THREE.RingGeometry( 36, 32, 360 );
        this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        this.material.map = texture;
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set(this.position.x,this.position.y,this.position.z);
        this.mesh.rotation.x = THREE.MathUtils.degToRad(90);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.scene.add( this.mesh );

        this.geometry = new THREE.RingGeometry( 35.4, 35.2, 360 );
        this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        texture = textureLoader.load( '../assets/texture/silver.jpg' );
        this.material.map = texture;
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set(this.position.x,this.position.y+0.18,this.position.z);
        this.mesh.rotation.x = THREE.MathUtils.degToRad(90);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = false;
        this.scene.add( this.mesh );

        this.geometry = new THREE.RingGeometry( 33, 32.8, 360 );
        this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        texture = textureLoader.load( '../assets/texture/silver.jpg' );
        this.material.map = texture;
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set(this.position.x,this.position.y+0.18,this.position.z);
        this.mesh.rotation.x = THREE.MathUtils.degToRad(90);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = false;
        this.scene.add( this.mesh );

        texture = textureLoader.load( '../assets/texture/darkwood.jpg' );
        
        this.geometry = new THREE.BoxGeometry( 0.1, 3, 0.5 );
        this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, side: THREE.DoubleSide } );
        this.material.map = texture;
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.rotation.z = THREE.MathUtils.degToRad(90);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        let c = this.calculatePosition({r:34,position:this.mesh.position,rotation:0});
        this.mesh.position.set(c.x,c.y+0.18,c.z);
        this.scene.add( this.mesh );

        let i = 5;
        for(i;i<=355;i=i+5) {
            let clone = this.mesh.clone();
            c = this.calculatePosition({r:34,position:this.position,rotation:i});
            clone.position.set(c.x,c.y+0.05,c.z);
            clone.rotation.set(0,THREE.MathUtils.degToRad(i),THREE.MathUtils.degToRad(90));
            clone.receiveShadow = true;
            clone.castShadow = true;
            this.scene.add( clone );
        }
        
    }
}

export default Rails;