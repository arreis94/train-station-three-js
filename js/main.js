import * as THREE from '../js-r132/build/three.module.js';
import { ParallaxBarrierEffect } from '../js-r132/examples/jsm/effects/ParallaxBarrierEffect.js';
import {OrbitControls} from '../js-r132/examples/jsm/controls/OrbitControls.js';
import { GUI } from '../js-r132/examples/jsm/libs/dat.gui.module.js';
import Stats from '../js-r132/examples/jsm/libs/stats.module.js';
import PoleLamp from './pole_lamp.js';
import Rails from './rails.js';
import Commons from './commons.js';
import Train from './train.js';
import Ground from './ground.js';
import RailwayStation from './railwayStation.js';
import LevelCrossing from './levelCrossing.js';

var Main = function ({container}) {

    const TOOLS = new Commons();
    var cont = document.getElementById(container),
        selectedCamera = 1,
        scene, 
        camera, camera2, camera3,
        ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 ),
        renderer,
        train,
        gate,
        crossing,
        lamps = [], 
        trees = [],
        loader = new THREE.CubeTextureLoader(),
        stats = new Stats(),
        gui,
        guiParams = {
            rotationX: 0.01,
            rotationY: 0.005,
            colorSolid: 0x0,
            colorWire: 0x0,
            setDay: function() {changeDay("day")},
            setNight: function() {changeDay("night")},
            cam: function() {setCam(1)},
            cam2: function() {setCam(2)},
            cam3: function() {setCam(3)},
            cam4: function() {setCam(4)},
            level: function() {crossing.toggleCrossing();}
        },
        effect;

    function setCam(v) {
        selectedCamera = v;
    }

    function init() {
        THREE.Cache.enabled = true;
        let treei = 0;
        trees.push(new THREE.Vector3(15,0,-15));
        trees.push(new THREE.Vector3(-15,0,-15));
        trees.push(new THREE.Vector3(15,0,15));
        trees.push(new THREE.Vector3(-15,0,15));
        trees.push(new THREE.Vector3(-7.5,0,15));
        while(treei < 50) {
            trees.push(
                new THREE.Vector3(
                    (Math.floor(Math.random() * 50) + 28)*(Math.round(Math.random()) ? 1 : -1),
                    0,
                    (Math.floor(Math.random() * 50) + 28)*(Math.round(Math.random()) ? 1 : -1)
                )
            );
            treei++;
        }
        renderer = new THREE.WebGLRenderer( { antialias: true, canvas: cont } );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild( renderer.domElement );

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0xffffff, 50, 90 );
        loadBackground("day");
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera3 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        
        camera.position.z = 15;
        camera.position.y = 15;

        camera2.position.y = 15;
        camera2.position.z = 45;
        camera2.position.x = 45;
        camera2.lookAt( scene.position );

        camera3.position.y = 15;
        camera3.position.z = 45;
        camera2.position.x = 35;
        camera3.lookAt( scene.position );

        const controls = new OrbitControls(camera, cont);
        controls.target.set(0, 0, 0);
        controls.update();

        window.addEventListener( 'resize', handleWindowResize, false );
        window.addEventListener( 'keydown', handleKeydowns, false );

        var axesHelper = new THREE.AxesHelper( 12 );
        scene.add( axesHelper );

        scene.add( ambientLight );

        effect = new ParallaxBarrierEffect( renderer );
		effect.setSize( window.innerWidth, window.innerHeight );
        
        let ground = new Ground({scene});
        ground.draw();

        let station = new RailwayStation({scene});
        station.draw();

        let lamp = new PoleLamp({scene,position:{x:12,y:0,z:10},rotation:0});
        lamp.draw();
        lamps.push(lamp);
        let lamp2 = new PoleLamp({scene,position:{x:12,y:0,z:0},rotation:0});
        lamp2.draw();
        lamps.push(lamp2);
        let lamp3 = new PoleLamp({scene,position:{x:12,y:0,z:-10},rotation:0});
        lamp3.draw();
        lamps.push(lamp3);
        let lamp4 = new PoleLamp({scene,position:{x:-12,y:0,z:10},rotation:180});
        lamp4.draw();
        lamps.push(lamp4);
        let lamp5 = new PoleLamp({scene,position:{x:-12,y:0,z:0},rotation:180});
        lamp5.draw();
        lamps.push(lamp5);
        let lamp6 = new PoleLamp({scene,position:{x:-12,y:0,z:-10},rotation:180});
        lamp6.draw();
        lamps.push(lamp6);

        let rails = new Rails({scene,position:{x:0,y:0.1,z:0}});
        rails.draw();

        train = new Train({scene,position:{x:34,y:3,z:0}});
        train.init();
        train.start();

        crossing = new LevelCrossing({scene,position:{x:-2.5,y:0,z:40}});
        crossing.draw();
        


        TOOLS.loadBlender({obj:'../../assets/models/tree.obj',mtl:'../../assets/models/tree.mtl'}).then((tree) => {
            tree.position.set(7.5,0,15);
            scene.add(tree);
            for(let i in trees) {
                let pos = trees[i];
                let clone = tree.clone();
                clone.position.set(pos.x,pos.y,pos.z);
                scene.add(clone);
            }
        })

        addControlGui();
        addStatsObject();
        toggleTitle();
        animate();
    }

    function changeDay(tod) {
        for(let lamp in lamps) {
            lamps[lamp].toggleLight();
        }
        train.toggleLight();
        loadBackground(tod);
        if(tod === "night") {
            scene.remove(ambientLight);
            ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
            scene.add(ambientLight);
            scene.fog = new THREE.Fog( 0x000000, 50, 90 );
        }
        else {
            scene.remove(ambientLight),
            ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
            scene.add(ambientLight);
            scene.fog = new THREE.Fog( 0xffffff, 50, 90 );
        }
        
    }

    function loadBackground(tod) {
        let texture = loader.load([
            '../../assets/texture/'+tod+'/posy.jpg',
            '../../assets/texture/'+tod+'/negy.jpg',
            '../../assets/texture/'+tod+'/posz.jpg',
            '../../assets/texture/'+tod+'/negz.jpg',
            '../../assets/texture/'+tod+'/posx.jpg',
            '../../assets/texture/'+tod+'/negx.jpg',
        ]);
        scene.background = texture;
    }

    function addControlGui() {
        gui = new GUI( { autoPlace: false });
        gui.add( guiParams, 'setDay').name( 'Change to daytime');
        gui.add( guiParams, 'setNight').name('Change to night' );
        gui.add( guiParams, 'cam').name('Spectator' );
        gui.add( guiParams, 'cam4').name('Train cam' );
        gui.add( guiParams, 'cam2').name('Security Cam 1' );
        gui.add( guiParams, 'cam3').name('Security Cam 2 ' );
        gui.add( guiParams, 'level').name('Railway Barrier' );
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = window.pageYOffset + 'px';
        gui.domElement.style.left = window.pageXOffset + window.innerWidth - gui.width + 'px';
        document.body.appendChild( gui.domElement );
    }

    function addStatsObject() {
        stats.setMode(0);
        stats.domElement.text
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = window.pageYOffset + 'px';
        stats.domElement.style.left = window.pageXOffset + 'px';

        let title = document.createElement("div");
        title.id = "title";
        title.classList.add("title");
        title.style.display = "none";
        title.innerHTML = "<b>Tamás Csizmadia</b><br>Molecular bionics engineer BSc<br>University of Szeged<br>2021";
        stats.domElement.appendChild(title);
        document.body.appendChild( stats.domElement );
    }

    function toggleTitle() {
        let nodes = document.body.lastElementChild.getElementsByTagName("canvas");
        if(document.getElementById("title").style.display === "block") {
            document.getElementById("title").style.display = "none";
            nodes[0].style.display = "block";
        }
        else {
            for(var i=0; i<nodes.length; i++) {
                nodes[i].style.display = "none";
            }
            document.getElementById("title").style.display = "block";
        }
    }

    function animate() {
        requestAnimationFrame( animate );
        stats.update();
        train.animate();
        crossing.animate();
        render();
    }

    function handleWindowResize() {
        let HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
        renderer.setSize( WIDTH, HEIGHT );
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

        camera2.aspect = WIDTH / HEIGHT;
        camera2.updateProjectionMatrix();

        camera3.aspect = WIDTH / HEIGHT;
        camera3.updateProjectionMatrix();

        effect.setSize( window.innerWidth, window.innerHeight );
        gui.domElement.style.top = window.pageYOffset + 'px';
        gui.domElement.style.left = window.pageXOffset + window.innerWidth - gui.width + 'px';
        
        render();
    }

    function handleKeydowns(event) {
        console.log(event)
        if( event.key === 'i') {
            toggleTitle();
        }
    }

	function render() {
        if(selectedCamera === 1) {
            renderer.render(scene, camera);
        }
        else if (selectedCamera === 2) {
            renderer.render(scene, camera2);
            effect.render( scene, camera2 );
        }
        else if (selectedCamera === 3){
            renderer.render(scene, camera3);
            effect.render( scene, camera3 );
        }
        else {
            renderer.render(scene, train.camera);
        }
	}

	return {
        init,
		render
	};
};

export default Main;
