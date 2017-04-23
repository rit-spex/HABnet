import React from 'react';
import * as THREE from 'three';
import ColladaLoader from 'three-collada-loader';
import MTLLoader from 'three-mtl-loader';
import OBJLoader from 'three-obj-loader';

const OrientationCanvas = React.createClass({
  componentDidMount() {
    this.setupScene();
    this.setupLight();
    this.allGroup = new THREE.Group();
    this.setupAxis();
    this.models = this.setupModels();

    this.scene.add(this.allGroup);
    this.renderScene()
  },

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  },

  setupLight() {
    this.camera.position.z = 7;

    this.pointLight = new THREE.DirectionalLight();
    this.pointLight.position.set(0.75, 0.75, 1.0).normalize();
    this.scene.add(this.pointLight);
    this.scene.add(new THREE.DirectionalLightHelper(this.pointLight));
    console.log('finished scene setup, calling render');
  },

  setupAxis() {
    const xDir = new THREE.Vector3( 1, 0, 0 );
    const yDir = new THREE.Vector3( 0, 1, 0 );
    const zDir = new THREE.Vector3( 0, 0, 1 );

    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = 3;
    const red = 0xff0000;
    const green = 0x00ff00;
    const blue = 0x0000ff;

    const arrowHelperX = new THREE.ArrowHelper(xDir, origin, length, red);
    const arrowHelperY = new THREE.ArrowHelper(yDir, origin, length, green);
    const arrowHelperZ = new THREE.ArrowHelper(zDir, origin, length, blue);

    //put these in their own group so we can add/remove easily
    this.axisGroup = new THREE.Group();
    this.axisGroup.add(arrowHelperX);
    this.axisGroup.add(arrowHelperY);
    this.axisGroup.add(arrowHelperZ);

    this.allGroup.add(this.axisGroup);
  },

  setupModels() {
    const modelsAdded = [];
    const addModel1 = {
      file: 'cubesat.dae',
      surface: '0xff7b00',
      scale: 20,
    };
    const added1 = this.addModel('dae', addModel1, null);
    if (added1) {
      modelsAdded.push(added1);
    }

    const addModel2 = {
      file: 'nasa_cubesat.obj',
      surface: 'nasa_cubesat.mtl',
      scale: 1,
    };

    const added2 = this.addModel('obj', addModel2, this.allGroup);
    if (added2) {
      modelsAdded.push(added2);
    }

    return modelsAdded;
  },

  addModel(modelType, modelInfo, group) {
    let modelAdded = null;
    switch (modelType.toLowerCase()) {
      case 'collada':
      case 'dae':
        modelAdded = this.addCollada(modelInfo, group);
        break;
      case 'obj':
        modelAdded = this.addOBJ(modelInfo, group);
        break;
      default:
        return null;
    }
    return modelAdded;
  },

  addCollada(modelInfo, addToGroup) {
    const colladaLoader = new ColladaLoader();
    colladaLoader.options.convertUpAxis = true;
    let colladaModel = null;
    const daeUrl = `/assets/models/${modelInfo.file}`;
    colladaLoader.load(daeUrl, (collada) => {
      colladaModel = collada.scene;
      colladaModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.color.setHex(modelInfo.surface);
        }
      });
      const scale = modelInfo.scale;
      colladaModel.scale.set(scale, scale, scale);
      colladaModel.updateMatrix();
      if (addToGroup) {
        addToGroup.add(colladaModel);
      }
    });
    return colladaModel;
  },

  addOBJ(modelInfo, addToGroup) {
    const mtlLoader = new MTLLoader();
    const mtlUrl = `/assets/models/${modelInfo.surface}`;
    let objModel = null;
    mtlLoader.load(mtlUrl, (materials) => {
      materials.preload();

      // const objLoader = new THREE.OBJLoader();
      const objLoader = OBJLoader(THREE);
      objLoader.setMaterials(materials);
      const objUrl = `/assets/models/${modelInfo.file}`;
      objLoader.load(objUrl, (obj) => {
        objModel = obj;
        const scale = modelInfo.scale;
        objModel.scale.set(scale, scale, scale);
        if (addToGroup) {
          addToGroup.add(objModel);
        }
      });
    });
    return objModel;
  },

  toggleAxis(visible) {
    if (visible) {
      this.allGroup.add(this.axisGroup);
    } else {
      this.allGroup.remove(this.axisGroup);
    }
  },

  swithcModel(modelIndex) {
    for (let i = 0; i < this.models.length; i++) {
      if (i === modelIndex){
        this.allGroup.add(this.models[i]);
      } else {
        this.allGroup.remove(this.models[i]);
      }
    }
  },

  renderScene() {
    console.log('running render function');
    /*
    this.allGroup.rotation.x = roll;
    this.allGroup.rotation.y = pitch;
    this.allGroup.rotation.z = heading;
    */
    this.allGroup.rotation.x = 0;
    this.allGroup.rotation.y = 0;
    this.allGroup.rotation.z = 0;
    window.requestAnimationFrame(this.renderScene);
    this.renderer.render(this.scene, this.camera);
  
  },

  render() {
    return (null);
  },
});

export default OrientationCanvas;
