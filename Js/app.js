import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js'; // คุณต้องโหลดไฟล์นี้เพิ่มด้วย

// สร้าง scene, camera และ renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// แสง
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// โหลดโมเดล
const loader = new GLTFLoader();
loader.load(
  './model/pomegranate.glb',
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);

    animate();
  },
  undefined,
  function (error) {
    console.error('เกิดข้อผิดพลาดในการโหลดโมเดล:', error);
  }
);

// วนภาพ
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
