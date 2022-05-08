import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { initialCamera, initLights, resize } from './Functions';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Main = () => {
  const mainCanvas = useRef();
  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(
    () =>
      new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        30
      ),
    []
  );
  const renderer = useMemo(() => new THREE.WebGLRenderer(), []);
  const render = () => renderer.render(scene, camera);
  const request = useRef();

  const resizeEvent = () => {
    resize(camera, renderer);
  };

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    mainCanvas.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    initialCamera(camera);
    initLights(scene);
    window.addEventListener('resize', resizeEvent);

    const helper = new THREE.AxesHelper(5, 5, 5);
    scene.add(helper);

    const animate = () => {
      request.current = requestAnimationFrame(animate);
      controls.update();
      render();
    };
    request.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(request.current);
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <>
      <div ref={mainCanvas}></div>
    </>
  );
};

export default Main;
