import * as THREE from 'three';

// 1. SAHNE OLUŞTURMA (SCENE)
const scene = new THREE.Scene();
// Krem rengi arka plan
scene.background = new THREE.Color(0xf6f0e4);

// 2. KAMERA KURULUMU (PERSPECTIVE CAMERA)
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0.4, 4.5);
camera.lookAt(0, 0, 0);

// 3. RENDER ALICI (RENDERER)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// 4. IŞIKLANDIRMA (LIGHTS)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const frontLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
frontLight.position.set(5, 7, 6);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
backLight.position.set(-4, -2, -5);
scene.add(backLight);

// 5. BASİT 3D FOTOĞRAF MAKİNESİ (CAMERA MESH)
const cameraGroup = new THREE.Group();

// Materyaller
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x27272a, // Koyu antrasit gövde
  roughness: 0.4,
  metalness: 0.2
});

const silverMaterial = new THREE.MeshStandardMaterial({
  color: 0xd4d4d8, // Metalik gümüş (üst kapak, deklanşör, halkalar)
  roughness: 0.2,
  metalness: 0.8
});

const lensBarrelMaterial = new THREE.MeshStandardMaterial({
  color: 0x18181b, // Siyah objektif gövdesi
  roughness: 0.5,
  metalness: 0.3
});

const glassMaterial = new THREE.MeshStandardMaterial({
  color: 0x0284c7, // Mavi yansımalı lens camı
  roughness: 0.1,
  metalness: 0.9
});

const redAccentMaterial = new THREE.MeshStandardMaterial({
  color: 0xef4444, // Kırmızı deklanşör butonu
  roughness: 0.3,
  metalness: 0.3
});

const screenMaterial = new THREE.MeshStandardMaterial({
  color: 0x0f172a, // Arka LCD ekran
  roughness: 0.2,
  metalness: 0.4
});

// A) Gövde (Ana Kutu)
const bodyGeom = new THREE.BoxGeometry(2.0, 1.2, 0.8);
const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
cameraGroup.add(bodyMesh);

// B) Üst Metal Kapak (Klasik retro kamera görünümü)
const topPlateGeom = new THREE.BoxGeometry(2.02, 0.25, 0.82);
const topPlateMesh = new THREE.Mesh(topPlateGeom, silverMaterial);
topPlateMesh.position.y = 0.55;
cameraGroup.add(topPlateMesh);

// C) Objektif (Lens)
// 1. Dış Lens Silindiri
const lensGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.5, 32);
const lensMesh = new THREE.Mesh(lensGeom, lensBarrelMaterial);
lensMesh.rotation.x = Math.PI / 2;
lensMesh.position.set(0.1, 0, 0.55);
cameraGroup.add(lensMesh);

// 2. Gümüş Lens Halkası
const lensRingGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32);
const lensRingMesh = new THREE.Mesh(lensRingGeom, silverMaterial);
lensRingMesh.rotation.x = Math.PI / 2;
lensRingMesh.position.set(0.1, 0, 0.75);
cameraGroup.add(lensRingMesh);

// 3. Ön Lens Camı
const glassGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32);
const glassMesh = new THREE.Mesh(glassGeom, glassMaterial);
glassMesh.rotation.x = Math.PI / 2;
glassMesh.position.set(0.1, 0, 0.82);
cameraGroup.add(glassMesh);

// D) Deklanşör Butonu (Shutter Button)
const shutterGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 16);
const shutterMesh = new THREE.Mesh(shutterGeom, redAccentMaterial);
shutterMesh.position.set(0.65, 0.72, 0.1);
cameraGroup.add(shutterMesh);

// E) Mod Ayar Çarkı (Mode Dial)
const dialGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24);
const dialMesh = new THREE.Mesh(dialGeom, silverMaterial);
dialMesh.position.set(-0.65, 0.72, 0);
cameraGroup.add(dialMesh);

// F) Flaş (Flash Window)
const flashGeom = new THREE.BoxGeometry(0.35, 0.2, 0.1);
const flashMaterial = new THREE.MeshStandardMaterial({
  color: 0xfef08a,
  roughness: 0.2,
  metalness: 0.1
});
const flashMesh = new THREE.Mesh(flashGeom, flashMaterial);
flashMesh.position.set(-0.55, 0.35, 0.41);
cameraGroup.add(flashMesh);

// G) Arka LCD Ekran
const screenGeom = new THREE.BoxGeometry(1.3, 0.8, 0.02);
const screenMesh = new THREE.Mesh(screenGeom, screenMaterial);
screenMesh.position.set(0.1, 0, -0.41);
cameraGroup.add(screenMesh);

// H) Vizör Arkası (Gözleme Penceresi)
const eyepieceGeom = new THREE.BoxGeometry(0.3, 0.2, 0.08);
const eyepieceMesh = new THREE.Mesh(eyepieceGeom, bodyMaterial);
eyepieceMesh.position.set(-0.6, 0.35, -0.43);
cameraGroup.add(eyepieceMesh);

scene.add(cameraGroup);

// 6. PENCERE BOYUT DEĞİŞİMİ (RESPONSIVE)
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. ANİMASYON DÖNGÜSÜ (Sadece Sağa Doğru Yatay Dönüş)
function animate(time) {
  // X ve Z eksenleri sabit, sadece Y ekseninde sağa doğru döner
  cameraGroup.rotation.x = 0;
  cameraGroup.rotation.z = 0;
  cameraGroup.rotation.y = time / 1500;

  renderer.render(scene, camera);
}
