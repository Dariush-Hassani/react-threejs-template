import * as THREE from 'three';

export const initialCamera = (camera) => {
  camera.position.z = 10;
  camera.position.x = 10;
  camera.position.y = 10;
  camera.lookAt(0, 0, 0);
};

export const initLights = (scene) => {
  const light = new THREE.DirectionalLight(0xffffff, 0.7);
  light.position.set(0, 0, 10);
  light.target.position.set(0, 0, 0);
  scene.add(light);
  scene.add(light.target);
};

export const resize = (camera, renderer) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
