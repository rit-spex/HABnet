let camera;
let renderer;
let geometry;
let material;
let habBox;
let pointLight;
let scene;
//create scene, camera, renderer


//render function
const render = () => {
  console.log('running render function');
  habBox.rotation.x = roll;
  habBox.rotation.y = pitch;
  habBox.rotation.z = heading;
  requestAnimationFrame( render );
  renderer.render( scene, camera );
};

const setupScene = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
  60, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //create immage
  geometry = new THREE.BoxGeometry(1,1,1);
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

  material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: false});
  // var texture = THREE.ImageUtils.loadTexture('img/map.png');
  habBox = new THREE.Mesh(geometry,material);

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

  habBox.add( arrowHelperX );
  habBox.add( arrowHelperY );
  habBox.add( arrowHelperZ );

  scene.add(habBox);
  camera.position.z = 5;

  pointLight = new THREE.DirectionalLight(0xFFFFFF);
  pointLight.position.y = 150;
  pointLight.position.z = 200;
  scene.add(pointLight);

  console.log('finished scene setup, calling render');
  render();
};

const setupPage = () => {
  init(); // client Socket init function; overwritten by this onload assignment
  setupScene(); // sets up renderer
};
window.onload = setupPage;
