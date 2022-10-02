import * as THREE from '../js-r132/build/three.module.js';

class PoleLamp {
    constructor({scene,position,rotation}) {
        this.scene = scene,
        this.isOn = false,
        this.position = {
            x:position.x || 0,
            y:position.y || 0,
            z:position.z || 0
        },
        this.rotation = rotation || 0,
        this.geometry,
        this.material,
        this.light,
        this.mesh
    }
      
    toggleLight() {
        if(this.isOn) {
            this.isOn = !this.isOn;
            this.scene.remove( this.light );
        }
        else {
            this.isOn = !this.isOn;
            this.scene.add( this.light );
        }
    }

    /**
     * Calculate new coordinates after rotation with parametric equation of a circle.
     * @param {r,position} r - radius, position - mesh position (center of the circle)
     * @returns New positions
     */
    calculatePosition({r,position}) {
        let x = position.x + r * Math.cos(THREE.MathUtils.degToRad(this.rotation));
        let z = position.z + r * -Math.sin(THREE.MathUtils.degToRad(this.rotation));
        return {
            ...position,
            x,
            z
        }
    }

    draw() {
        /**
         * Set the light target coordinates
         */
        const targetObject = new THREE.Object3D();
        targetObject.position.set( this.position.x+2.25, this.position.y, this.position.z );
        let c = this.calculatePosition({r:Math.abs(targetObject.position.x-this.position.x),position:targetObject.position});
        targetObject.position.set(c.x-2.25,c.y,c.z);
        this.scene.add(targetObject);

        /**
         * Pole
         */
        this.geometry = new THREE.CylinderGeometry( 0.1, 0.1, 10, Math.PI*8 );
        this.material = new THREE.MeshPhongMaterial(  { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.set(this.position.x,this.position.y + 5,this.position.z);
        this.scene.add( this.mesh );
        
        /**
         * Lamp holder pole
         */
        this.geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1.5, Math.PI*8 );
        this.material = new THREE.MeshPhongMaterial(  { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.set(this.position.x,this.position.y + 9.95,this.position.z);
        this.mesh.rotation.set(0,THREE.MathUtils.degToRad(this.rotation),THREE.MathUtils.degToRad(90));
        c = this.calculatePosition({r:0.75,position:this.mesh.position});
        this.mesh.position.set(c.x,c.y,c.z);
        this.scene.add( this.mesh );
        
        /**
         * Lamp shade
         */
        this.geometry = new THREE.SphereGeometry( 0.5, 32, 32, 4, 6.3, 2, 1.6 );
        this.material = new THREE.MeshPhongMaterial( { color: 0xbdbdbd, specular: 0xffffff, side: THREE.DoubleSide } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set(this.position.x + 1.25,this.position.y + 9.5,this.position.z);
        this.mesh.rotation.set(0,0,THREE.MathUtils.degToRad(180));
        c = this.calculatePosition({r:Math.abs(this.mesh.position.x-this.position.x),position:this.mesh.position});
        this.mesh.position.set(c.x-1.25,c.y,c.z);
        this.scene.add( this.mesh );
        
        /**
         * Light bulb
         */
        this.geometry = new THREE.SphereGeometry( 0.25, 32, 32 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xe3dfd5 } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set(this.position.x + 1.25,this.position.y + 9.75,this.position.z);
        c = this.calculatePosition({r:Math.abs(this.mesh.position.x-this.position.x),position:this.mesh.position});
        this.mesh.position.set(c.x-1.25,c.y,c.z);
        this.scene.add( this.mesh );
        
        /**
         * Spotlight
         */
        this.light = new THREE.SpotLight( 0xfc9803, 1.5 );
        this.light.position.set( this.position.x+1.25, this.position.y+9.5, this.position.z );
        c = this.calculatePosition({r:Math.abs(this.mesh.position.x-this.position.x),position:this.mesh.position});
        this.light.position.set(c.x+1.25,c.y,c.z);
        this.light.target = targetObject;
        this.light.angle = Math.PI / 6;
        this.light.distance = 11;
        this.light.castShadow = true;
    }
}

export default PoleLamp;