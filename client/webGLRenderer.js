
// Our Javascript will go here.

//create scene, camera, renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  60, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//create immage
var geometry = new THREE.BoxGeometry(1,1,1);
//x planes
geometry.faces[0].color.setHex(0xffb200);
geometry.faces[1].color.setHex(0xffb200);
geometry.faces[2].color.setHex(0xffb200);
geometry.faces[3].color.setHex(0xffb200);
//y planes
geometry.faces[4].color.setHex(0xff3000);
geometry.faces[5].color.setHex(0xff3000);
geometry.faces[6].color.setHex(0xff3000);
geometry.faces[7].color.setHex(0xff3000);
//z planes
geometry.faces[8].color.setHex(0xff7000);
geometry.faces[9].color.setHex(0xff7000);
geometry.faces[10].color.setHex(0xff7000);
geometry.faces[11].color.setHex(0xff7000);
geometry.colorsNeedUpdate = true;

var material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: false});
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
window.onload = render;
