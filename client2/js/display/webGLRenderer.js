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
//  console.log('running render function');
  allGroup.rotation.x = roll;
  allGroup.rotation.y = pitch;
  allGroup.rotation.z = heading;
  requestAnimationFrame( render );
  renderer.render( scene, camera );
//  console.log("Sine(roll): " + Math.sin(roll));
//  console.log("Cosine(pitch): " + Math.cos(pitch));
  var rawCalc = Math.sin(roll) * Math.cos(pitch);
  var adjustedCalc = (rawCalc+1)/2; // [-1,1] -> [0,1]
//  console.log("raw # [-1,1]: " + rawCalc);
//  console.log("adjusted # [-1,1]: " + adjustedCalc);
//  progressBar.set(adjustedCalc);
};

const addModel = (modelType,modelInfo,group) => {
  var modelAdded = null;
  switch(modelType.toLowerCase()) {
    case 'collada':
    case 'dae':
      modelAdded = addCollada(modelInfo,group);
      break;
    case 'obj':
      modelAdded = addOBJ(modelInfo,group);
      break;
  }
//  console.log(modelAdded);
  return modelAdded;
};

const addOBJ = (modelInfo,addToGroup) => {
  console.log("OBJ");
  var mtlLoader = new THREE.MTLLoader();
  var mtlUrl = "/assets/models/" + modelInfo.surface;
  mtlLoader.load(mtlUrl, function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    var objUrl = "/assets/models/" + modelInfo.file;
    objLoader.load(objUrl, function (obj) {
      //console.log(objModel);
      var objModel = obj;
      models.push(objModel);
      console.log(models);
      var scale = modelInfo.scale;
      objModel.scale.set(scale,scale,scale);
      allGroup.add(objModel);
      if(addToGroup) { addToGroup.add(objModel) };
    });
  });
};

const addCollada = (modelInfo,addToGroup) => {
  console.log("collada");
  var colladaLoader = new THREE.ColladaLoader();
  colladaLoader.options.convertUpAxis = true;
  var daeUrl = "/assets/models/" + modelInfo.file;
  colladaLoader.load(daeUrl, function( collada ) {
    var colladaModel = collada.scene;
    models.push(colladaModel);
    console.log(models);
    colladaModel.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
      child.material.color.setHex(modelInfo.surface);
    }
    });
    var scale = modelInfo.scale;
    colladaModel.scale.set(scale,scale,scale);
    colladaModel.updateMatrix();
    if(addToGroup) { addToGroup.add(colladaModel) };
  });
};

const setupModels = (models) => {
  var addModel1 = {
  file: "cubesat.dae",
  surface: "0xff7b00",
  scale: 20
  };

  console.log("adding cubesat.dae");

  var added1 = addModel('dae',addModel1,null);
  console.log(added1);
  var addModel2 = {
    file: "nasa_cubesat.obj",
    surface: "nasa_cubesat.mtl",
    scale: 1
  };

  console.log("adding nasa_cubesat.obj");
  
  var added2 = addModel('obj',addModel2,null);
  console.log(added2);

  console.log("here");
  console.log(models);
};

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
  axisGroup.name = "axisGroup";
  axisGroup.add(arrowHelperX);
  axisGroup.add(arrowHelperY);
  axisGroup.add(arrowHelperZ);

  allGroup.add(axisGroup);
};

const setupScene = () => {
  var space = document.getElementById('modelSpace');
  var width = space.clientWidth;
  var height = space.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
  60, width/height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width,height);
  space.appendChild(renderer.domElement);

  var planeGeo = new THREE.PlaneGeometry(12,9);
  var planeMat = new THREE.MeshBasicMaterial( {color: 0x222222} );
  var plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotateX(-Math.PI /3);
  plane.position.y = -5;
  scene.add( plane );

  camera.position.z = 7;

  dirLight = new THREE.DirectionalLight();
  dirLight.castShadow = true;
  dirLight.position.set( 0.5, 0.5, 1.0 ).normalize();
  scene.add(dirLight);
  scene.add(new THREE.DirectionalLightHelper(dirLight));
  console.log('finished scene setup, calling render');
};

const setupButtons = () => {
  $('#modelChanger').change(function(event){
    var ele = event.target;
    if(ele.name == "modelSelect" && ele.checked) {
      toggleModel(ele.value);
    } else {
      toggleAxis(ele.checked);
    }
  });
};

const toggleAxis = (visible) => {
  if(visible) {
    allGroup.add(axisGroup);
  } else {
    allGroup.remove(axisGroup);
  }
}

const toggleModel = (val) => {
  for(var i=0 ; i<models.length ; i++) {
    if(i==val){
      allGroup.add(models[i]);
    } else {
      allGroup.remove(models[i]);
    }
  }
}

const setupPage = () => {
  init(); // client Socket init function; overwritten by this onload assignment
  setupScene(); // sets up renderer
  var space = document.getElementById("modelSpace");
  //space.style.backgroundImage = "url('/assets/img/space.jpg'";
//  setupProgressMeter();
  allGroup = new THREE.Group();
  allGroup.name = "allGroup";
  setupAxis();
  models = new Array;
  console.log("setupModels");
  setupModels(models);
  setupButtons();
  console.log(allGroup.children);
  //add stuff to groups and to the scene
  //allGroup.add(models[0]);
  scene.add(allGroup);
  console.log(scene.children);
  render();
};
window.onload = setupPage;
