let camera;
let renderer;
let geometry;
let material;
let allGroup;
let cubesat;
let nasasat;
let pointLight;
let scene;
//create scene, camera, renderer


//render function
const render = () => {
  console.log('running render function');
  allGroup.rotation.x = roll;
  allGroup.rotation.y = pitch;
  allGroup.rotation.z = heading;
  requestAnimationFrame( render );
  renderer.render( scene, camera );
};


const setupModels = () => {
  var colladaLoader = new THREE.ColladaLoader();
  colladaLoader.options.convertUpAxis = true;
  colladaLoader.load("/assets/models/cubesat.dae", function( collada ) {
    cubesat = collada.scene;
    cubesat.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material.color.setHex('0xff7b00');
      }
    });
    cubesat.scale.set(1000,1000,1000);
    cubesat.updateMatrix();
  });

  var mtlLoader = new THREE.MTLLoader();
  var url = "/assets/models/nasa_cubesat.mtl";
  mtlLoader.load(url, function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load("/assets/models/nasa_cubesat.obj", function (obj) {
      nasasat = obj;
      nasasat.scale.set(50,50,50);
    });
  });

}

const setupAxis = () => {
  var xDir = new THREE.Vector3( 1, 0, 0 );
  var yDir = new THREE.Vector3( 0, 1, 0 );
  var zDir = new THREE.Vector3( 0, 0, 1 );

  var origin = new THREE.Vector3( 0, 0, 0 );
  var length = 3;
  var red = 0xff0000;
  var green = 0x00ff00;
  var blue = 0x0000ff;

  var arrowHelperX = new THREE.ArrowHelper( xDir, origin, length, red );
  var arrowHelperY = new THREE.ArrowHelper( yDir, origin, length, green );
  var arrowHelperZ = new THREE.ArrowHelper( zDir, origin, length, blue );

  //put these in their own group so we can add/remove easily
  axisGroup = new THREE.Group();
  axisGroup.add(arrowHelperX);
  axisGroup.add(arrowHelperY);
  axisGroup.add(arrowHelperZ);
}

const setupScene = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
  60, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);


  camera.position.z = 5;

  pointLight = new THREE.DirectionalLight(0xFFFFFF);
  pointLight.position.y = 150;
  pointLight.position.z = 200;
  scene.add(pointLight);

  console.log('finished scene setup, calling render');
};

const setupButtons = () => {
  modelToggleState = true;
  axisToggleState = true;
  document.getElementById("toggleModelBtn").onclick = function() {
    if(modelToggleState) {
      allGroup.add(nasasat);
      allGroup.remove(cubesat);
    } else {
      allGroup.add(cubesat);
      allGroup.remove(nasasat);
    }
    modelToggleState = !modelToggleState;
  }
  document.getElementById("toggleAxisBtn").onclick = function() {
    if(axisToggleState) {
      allGroup.remove(axisGroup);
    } else {
      allGroup.add(axisGroup);
    }
    axisToggleState = !axisToggleState;
  }
}

const setupPage = () => {
  init(); // client Socket init function; overwritten by this onload assignment
  setupScene(); // sets up renderer
  allGroup = new THREE.Group();
  setupAxis();
  setupModels();
  setupButtons();

  //add stuff to groups and to the scene
  allGroup.add(axisGroup);
  allGroup.add(nasasat);
  //allGroup.add(cubesat); //toggled off to start
  scene.add(allGroup);
  render();
};
window.onload = setupPage;
