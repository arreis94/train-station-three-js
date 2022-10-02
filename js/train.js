import * as THREE from '../js-r132/build/three.module.js';
import Commons from './commons.js';

class Train {
    constructor({scene,position}) {
        this.scene = scene,
        this.train,
        this.r = position.x || 0,
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
        this.TOOLS = new Commons(),
        this.isOn = false,
        this.move = false,
        this.position = {
            x:position.x || 0,
            y:position.y || 0,
            z:position.z || 0
        },
        this.rotation = 0,
        this.geometry,
        this.material,
        this.light,
        this.light2,
        this.light3,
        this.mesh
    }
    
    toggleLight() {
        if(this.isOn) {
            this.isOn = !this.isOn;
            this.scene.remove( this.topPointLight );
            this.scene.remove( this.leftPointLight );
            this.scene.remove( this.rightPointLight );
            this.scene.remove( this.topSpotLight );
            this.scene.remove( this.leftSpotLight );
            this.scene.remove( this.rightSpotLight );         
        }
        else {
            this.isOn = !this.isOn;
            this.scene.add( this.topPointLight );
            this.scene.add( this.leftPointLight );
            this.scene.add( this.rightPointLight );
            this.scene.add( this.topSpotLight );
            this.scene.add( this.leftSpotLight );
            this.scene.add( this.rightSpotLight ); 
        }
    }

    stop() {
        this.move = false;
    }

    start() {
        this.move = true;
    }

    /**
     * Calculate new coordinates after rotation with parametric equation of a circle.
     * @param {r,position} r - radius, position - mesh position (center of the circle)
     * @returns New positions
     */
    calculatePosition({r,rotation}) {
        let x = r * Math.cos(THREE.MathUtils.degToRad(rotation));
        let z = r * Math.sin(THREE.MathUtils.degToRad(rotation));
        return {
            ...this.position,
            x,
            z
        }
    }
    
    animate() {
        if(this.train && this.move) {
            this.rotation = this.rotation + 0.2;
            let trainPosition = this.calculatePosition({r:this.r,rotation:this.rotation});
            let camPosition = this.calculatePosition({r:this.r+5,rotation:this.rotation+40});
            let topPointLight = this.calculatePosition({r:this.r+0.3,rotation:this.rotation+14});
            let leftPointLight = this.calculatePosition({r:this.r+1,rotation:this.rotation+14});
            let rightPointLight = this.calculatePosition({r:this.r-0.4,rotation:this.rotation+14.3});

            let topSpotLightTarget = this.calculatePosition({r:this.r+0.3,rotation:this.rotation+24});
            let leftSpotLightTarget = this.calculatePosition({r:this.r+1,rotation:this.rotation+24});
            let rightSpotLightTarget = this.calculatePosition({r:this.r-0.4,rotation:this.rotation+24.3});

            this.train.position.set(trainPosition.x,trainPosition.y,trainPosition.z);
            this.train.rotation.y = -THREE.MathUtils.degToRad(95+this.rotation);
            this.camera.position.set(camPosition.x,camPosition.y+5,camPosition.z);
            this.camera.lookAt( this.train.position );

            this.topPointLight.position.set(topPointLight.x,topPointLight.y+0.3,topPointLight.z);
            this.leftPointLight.position.set(leftPointLight.x,leftPointLight.y-1.3,leftPointLight.z);
            this.rightPointLight.position.set(rightPointLight.x,rightPointLight.y-1.3,rightPointLight.z);
            
            this.topSpotLightTarget.position.set(topSpotLightTarget.x,topSpotLightTarget.y+0.3,topSpotLightTarget.z);
            this.leftSpotLightTarget.position.set(leftSpotLightTarget.x,leftSpotLightTarget.y-1.3,leftSpotLightTarget.z);
            this.rightSpotLightTarget.position.set(rightSpotLightTarget.x,rightSpotLightTarget.y-1.3,rightSpotLightTarget.z);

            this.topSpotLight.position.set(topPointLight.x,topPointLight.y+0.3,topPointLight.z);
            this.topSpotLight.target = this.topSpotLightTarget;

            this.leftSpotLight.position.set(leftPointLight.x,leftPointLight.y-1.3,leftPointLight.z);
            this.leftSpotLight.target = this.leftSpotLightTarget;
            
            this.rightSpotLight.position.set(rightPointLight.x,rightPointLight.y-1.3,rightPointLight.z);
            this.rightSpotLight.target = this.rightSpotLightTarget;
        }
    }

    init() {
        let camPosition = this.calculatePosition({r:this.r+5,rotation:this.rotation+40});
        this.camera.position.set(camPosition.x,camPosition.y+5,camPosition.z);

        this.TOOLS.loadBlender({obj:'./assets/models/train.obj',mtl:'./assets/models/train.mtl'}).then((train) => {
            this.train = train;
            let c = this.calculatePosition({r:this.r,rotation:this.rotation});
            this.train.position.set(c.x,c.y,c.z);
            this.train.rotation.y = THREE.MathUtils.degToRad(-95);
            this.scene.add(this.train);
        });

        this.topSpotLightTarget = new THREE.Object3D();
        this.topSpotLightTarget.position.set( 31.3, 3, 14.06 );
        this.scene.add( this.topSpotLightTarget );

        this.leftSpotLightTarget = new THREE.Object3D();
        this.scene.add( this.leftSpotLightTarget );

        this.rightSpotLightTarget = new THREE.Object3D();
        this.scene.add( this.rightSpotLightTarget );

        this.topPointLight = new THREE.PointLight( 0xfc9803, 1, 0.5 );
        this.topPointLight.position.set( 33.3, 3, 8.4 );

        this.leftPointLight = new THREE.PointLight( 0xfc9803, 1, 0.5 );
        this.leftPointLight.position.set( 33.3, 3, 8.4 );

        this.rightPointLight = new THREE.PointLight( 0xfc9803, 1, 0.5 );
        this.rightPointLight.position.set( 32, 3, 8.1 );

        this.topSpotLight = new THREE.SpotLight( 0xfc9803, 1 );
        this.topSpotLight.position.set( 33.3, 3, 8.4 );
        this.topSpotLight.angle = Math.PI / 4;
        this.topSpotLight.target = this.topSpotLightTarget;
        this.topSpotLight.distance = 15;
        this.topSpotLight.castShadow = true;

        this.leftSpotLight = new THREE.SpotLight( 0xfc9803, 1 );
        this.leftSpotLight.position.set( 33.3, 3, 8.4 );
        this.leftSpotLight.angle = Math.PI / 4;
        this.leftSpotLight.target = this.leftSpotLightTarget;
        this.leftSpotLight.distance = 15;
        this.leftSpotLight.castShadow = true;

        this.rightSpotLight = new THREE.SpotLight( 0xfc9803, 1 );
        this.rightSpotLight.position.set( 33.3, 3, 8.4 );
        this.rightSpotLight.angle = Math.PI / 4;
        this.rightSpotLight.target = this.rightSpotLight;
        this.rightSpotLight.distance = 15;
        this.rightSpotLight.castShadow = true;

    }

}

export default Train;
