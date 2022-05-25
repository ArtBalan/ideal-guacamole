import * as THREE from 'three';
import vertexShader from './shader/vertex.glsl'
import fragmentShader from './shader/fragment.glsl'
import atmosphereVertexShader from './shader/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shader/atmosphereFragment.glsl'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth/innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const widthSegment = 50;
const heightSegment = 50;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,widthSegment,heightSegment),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/globe.jpeg')
      }
    }
  })
);

const group = new THREE.Group();
sphere.rotateX(0.2);
group.add(sphere);
scene.add(group);

// create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,widthSegment,heightSegment),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
);

atmosphere.scale.set(1.2,1.2,1.2);
scene.add(atmosphere);

camera.position.z = 15;

const mouse = {
  x: undefined,
  y: undefined
};

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  sphere.rotateY(0.004);
  group.rotation.y = mouse.x * Math.PI * 0.5;
  group.rotation.x = mouse.y * Math.PI * 0.5;
}
animate();

// Normalise la position de la souri mais pas par PI
addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 - 1;
});