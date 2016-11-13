// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  90, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(600,600);

//create scene, camera, renderer
const drawGraphics = () => {
  document.body.appendChild(renderer.domElement);

  //create immage
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshLambertMaterial({color: 0xf49e42, wireframe: false});
  // var texture = THREE.ImageUtils.loadTexture('img/map.png');
  var habBox = new THREE.Mesh(geometry,material);
  scene.add(habBox);
  camera.position.z = 5;

  var pointLight = new THREE.DirectionalLight(0xFFFFFF);
    pointLight.position.y = 150;
    pointLight.position.z = 200;
    scene.add(pointLight);



  //render function
  function render() {
    habBox.rotation.x = roll;
    habBox.rotation.y = pitch;
    habBox.rotation.z = heading;
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }

  render();
};



window.onload = drawGraphics;
