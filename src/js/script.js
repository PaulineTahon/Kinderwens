import OpenSimplexNoise from 'open-simplex-noise';


let ball, ball2, ball3, ball4, ball5, ball6, ball7, ball8;
let camera;
const canvas = document.getElementById(`c`);
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0x0f0d29, 0.01);

const spheres = [];

let uniforms;
let startTime;
//const index = 0;
let textureCube;

let particleCloud;
let particleGeometry;

/* vars light --------------------------------------*/
//et bulbLight, bulbLight2;


const noise = new OpenSimplexNoise();

const init = () => {
  startTime = Date.now();

  createScene();
//  createLights();
  createAudio();
  createSpheres();
  createBackground();
  createParticles();
  onWindowResize();

  animate();

  console.log(particleCloud);
  // document.addEventListener(`mousemove`, onDocumentMouseMove, false);
  window.addEventListener(`resize`, onWindowResize, false);
};

const createScene = () => {

  // scene.background = new THREE.CubeTextureLoader()
  //   .setPath(`./assets/img/`)
  //   .load([ `px.jpg`, `nx.jpg`, `py.jpg`, `ny.jpg`, `nz.jpg`, `pz.jpg` ]);

  //scene.background = new THREE.TextureLoader().load(`./assets/img/black.jpg`);
  //scene.fog = new THREE.FogExp2(0xe8d1b5, 0.01);

  /* Camera
  --------------------------------------*/
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;

  /* Ball
  --------------------------------------*/
  const icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
  const icosahedronGeometry2 = new THREE.IcosahedronGeometry(4, 4);
  //const texture = new THREE.TextureLoader().load(`./assets/img/sand.jpg`);

  //texture.repeat.set(0.2, 0.2);

  const lambertMaterial = new THREE.MeshLambertMaterial({
    // color: 0xF6318C,
    // emissive: 0x471764,
    color: 0xccfffd,
    emissive: 0x471764,
    opacity: 4,
    wireframe: false,
    transparent: true
  });

  // const shaderMaterial = new THREE.RawShaderMaterial({
  //   uniforms: this.uniforms,
  //   vertexShader: `#define GLSLIFY 1\nattribute vec3 position;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform float time;\n\nvarying vec3 vPosition;\n\nmat4 rotateMatrixX(float radian) {\n  return mat4(\n    1.0, 0.0, 0.0, 0.0,\n    0.0, cos(radian), -sin(radian), 0.0,\n    0.0, sin(radian), cos(radian), 0.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n}\n\n//\n// GLSL textureless classic 3D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\nvoid main(void) {\n  vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;\n  float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));\n  vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);\n  float noise1 = cnoise(noisePosition * 0.08);\n  float noise2 = cnoise(noisePosition * 0.06);\n  float noise3 = cnoise(noisePosition * 0.4);\n  vec3 lastPosition = updatePosition + vec3(0.0,\n    noise1 * sin1 * 8.0\n    + noise2 * sin1 * 8.0\n    + noise3 * (abs(sin1) * 2.0 + 0.5)\n    + pow(sin1, 2.0) * 40.0, 0.0);\n\n  vPosition = lastPosition;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);\n}\n`,
  //   fragmentShader: `precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vPosition;\n\nvoid main(void) {\n  float opacity = (96.0 - length(vPosition)) / 150.0 ;\n  vec3 color = vec3(0.6);\n  gl_FragColor = vec4(color, opacity);\n}\n`,
  //   transparent: true,
  //   emissive: 0x471764,
  //   color: `blue`
  // });


  textureCube = new THREE.CubeTextureLoader()
    .setPath(`./assets/img/`)
    .load([ `nx.jpg`, `px.jpg`, `ny.jpg`, `py.jpg`, `nz.jpg`, `pz.jpg` ]);

  textureCube.mapping = THREE.CubeRefractionMapping;

//  const phongMaterial = new THREE.MeshPhongMaterial({color: 0xccfffd, envMap: textureCube, refractionRatio: 0.985, transparent: true, opacity: 0.3});

  const lambertMaterial2 = new THREE.MeshLambertMaterial({
    color: 0x999999,
    emissive: 0x471764,
    wireframe: false,
    transparent: true,
    opacity: 0.0,
    //map: texture
  });

  lambertMaterial.depthWrite = false;
  lambertMaterial2.depthWrite = false;

  renderer.sortObject = false;

  ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball.position.x = 0;
  ball.position.y = 5;
  ball.position.z = 0;
  ball.castShadow = true;
  //ball.receiveShadow = true;

  ball2 = new THREE.Mesh(icosahedronGeometry2, lambertMaterial2);
  ball2.position.x = 0;
  ball2.position.y = 3;
  ball2.position.z = 0;
  ball2.castShadow = true;
  scene.add(ball2);
  scene.add(ball);

  ball3 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball3.position.x = - 50;
  ball3.position.y = 5;
  ball3.position.z = - 70;
  ball3.castShadow = true;
//  scene.add(ball3);

  ball4 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball4.position.x = 60;
  ball4.position.y = - 20;
  ball4.position.z = - 60;
  ball4.castShadow = true;
//  scene.add(ball4);

  ball5 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball5.position.x = - 10;
  ball5.position.y = 5;
  ball5.position.z = 100;
  ball5.castShadow = true;
//  scene.add(ball5);

  ball6 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball6.position.x = - 70;
  ball6.position.y = 5;
  ball6.position.z = 80;
  ball6.castShadow = true;
//  scene.add(ball6);

  ball7 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball7.position.x = - 70;
  ball7.position.y = 5;
  ball7.position.z = - 100;
  ball7.castShadow = true;
  //scene.add(ball7);

  ball8 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball8.position.x = - 70;
  ball8.position.y = 5;
  ball8.position.z = - 100;
  ball8.castShadow = true;
//  scene.add(ball8);
  //ball.receiveShadow = true;

  /* AmbientLight
  --------------------------------------*/
  // const ambientLight = new THREE.AmbientLight(0x999999); //0x999999
  // scene.add(ambientLight);
  // camera.add(ambientLight);


  const pointLight = new THREE.PointLight(0xff0000, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // const sphereSize = 1;
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  // scene.add(pointLightHelper);
  //
  // const pointLight = new THREE.PointLight(0x999999); //0x999999
  // pointLight.position.set(0, 0, 10);
  // camera.add(pointLight);
  //
  // const sphereSize = 1;
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  // scene.add(pointLightHelper);


  console.log(ball.material);
  //
  /* SpotLight
  // --------------------------------------*/
  const spotLight = new THREE.SpotLight(0xccfffd); //0xaaaaaaa
  spotLight.intensity = 0.8;
  spotLight.position.set(- 10, 40, 20);
  spotLight.lookAt(ball);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // camera.add(spotLight);


  //orbitcontrols;
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 500;
  controls.enablePan = true;

  // new TWEEN.Tween(camera.position)
  //     .to({x: 0, y: 0, z: 400}, 10000)
  //     .start();

  //RIJPE EICEL

  new TWEEN.Tween(lambertMaterial)
      .to({opacity: .9}, 10000)
      .start();


  new TWEEN.Tween(lambertMaterial2)
      .to({opacity: .5}, 10000)
      .start();

};

// const createLights = () => {
//
//
//   /* Light1
//   --------------------------------------*/
//   const bulbGeometry = new THREE.SphereGeometry(.2, 16, 8);
//   bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
//   const bulbMat = new THREE.MeshStandardMaterial({
//     emissive: 0xffffee,
//     emissiveIntensity: 1,
//     color: 0x000000
//   });
//
//   bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
//   bulbLight.position.set(10, 10, 10);
//   bulbLight.castShadow = true;
//   scene.add(bulbLight);
//
//   /* Light2
//   --------------------------------------*/
//
//   bulbLight2 = new THREE.PointLight(0xffee88, 1, 100, 2);
//   const bulbMat2 = new THREE.MeshStandardMaterial({
//     emissive: 0xffffee,
//     emissiveIntensity: 1,
//     color: 0x000000
//   });
//   bulbLight2.add(new THREE.Mesh(bulbGeometry, bulbMat2));
//   bulbLight2.position.set(10, 10, 10);
//   bulbLight2.castShadow = true;
//   scene.add(bulbLight2);
//
// };

const createAudio = () => {
  const audio = document.querySelector(`.audio`);
  audio.volume = 0.1;
};

const createBackground = () => {

  const geometry = new THREE.PlaneBufferGeometry(280, 200);

  uniforms = {
    iGlobalTime: {type: `f`, value: 1.0},
    iResolution: {type: `v1`, value: new THREE.Vector2()}
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById(`vertexShader`).textContent,
    fragmentShader: document.getElementById(`fragmentShader`).textContent
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = - 120;
  scene.add(mesh);

};

const createParticles = () => {
  particleGeometry = new THREE.Geometry();

  const textureLoader = new THREE.TextureLoader();
  const lightImg = textureLoader.load(`./assets/img/light.png`);

  for (let i = 0;i < 100;i ++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 200 - 100;
    vertex.y = Math.random() * 200 - 100;
    vertex.z = Math.random() * 200 - 100;
    particleGeometry.vertices.push(vertex);
  }

  const material = new THREE.PointsMaterial({size: 5, map: lightImg, blending: THREE.AdditiveBlending, depthTest: false, transparent: true});

  particleCloud = new THREE.Points(particleGeometry, material);
  console.log(particleCloud);

  scene.add(particleCloud);
};

const animate = time => {
  TWEEN.update(time);

  requestAnimationFrame(animate);
  render();
};

const render = () => {
  //animateLights();
  makeRoughBall(ball);
  makeRoughBall(ball2);
  animateSpheres();
  //animateParticles();
  const currentTime = Date.now();

  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.0001;

  renderer.render(scene, camera);

};

// let index = 0;
//
// const animateParticles = () => {
//   for (let x = 0;x < window.innerWidth;x ++) {
//     for (let z = 0;z < window.innerHeight;z ++) {
//       //particleCloud.geometry.vertices[index].y ++;
//       index ++;
//       //particleCloud.geometry.vertices[index].y = (Math.cos((ix / window.innerWidth * Math.PI * 8)) + Math.sin((iz / window.innerHeight * Math.PI * 8)));
//     }
//   }
//
//   particleCloud.geometry.verticesNeedUpdate = true;
// };

// const animateLights = () => {
//   const time = Date.now() * 0.0005;
//   bulbLight.position.x = Math.sin(time * 0.7) * 20;
//   bulbLight.position.y = Math.cos(time * 0.5) * 10;
//
//
//   bulbLight2.position.x = Math.sin(time * 0.5) * 20;
//   bulbLight2.position.y = Math.cos(time * 0.3) * 10;
// };


const animateSpheres = () => {
  const timer = 0.00001 * Date.now();
  //
  // camera.position.x += (mouseX - camera.position.x) * .05;
  // camera.position.y += (- mouseY - camera.position.y) * .05;
  // camera.lookAt(scene.position);
  for (let i = 0, il = spheres.length;i < il;i ++) {
    const sphere = spheres[ i ];
    sphere.position.x = (5000 * Math.cos(timer + i)) / 10;
    sphere.position.y = (2500 * Math.sin(timer + i * 1.1)) / 10;
  }
};

const createSpheres = () => {

  const geometry = new THREE.SphereBufferGeometry(6, 32, 16);

  const material = new THREE.MeshBasicMaterial({color: 0xffffff, envMap: textureCube, refractionRatio: 0.95, transparent: true, opacity: 0.3});

  for (let i = 0;i < 30;i ++) {

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5000 - 2500;
    mesh.position.y = Math.random() * 5000 - 2500;
    mesh.position.z = - 100;
    //mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
    scene.add(mesh);

    spheres.push(mesh);

  }
};


  // const geometry = new THREE.SphereBufferGeometry(100, 32, 16);
  //
  // const texture = new THREE.TextureLoader()
  //   .load(`assets/img/sand.jpg`);
  //
  // texture.mapping = THREE.RefractionMapping;
  //
  // const material = new THREE.MeshBasicMaterial({color: 0xffffff, envMap: texture, refractionRatio: 0.95});
  //
  // for (let i = 0;i < 500;i ++) {
  //
  //   const mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.x = Math.random() * 10000 - 5000;
  //   mesh.position.y = Math.random() * 10000 - 5000;
  //   mesh.position.z = Math.random() * 10000 - 5000;
  //   mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
  //   scene.add(mesh);
  //   spheres.push(mesh);
  // }

//};

// const onDocumentMouseMove = event => {
//
//   mouseX = (event.clientX - windowHalfX) * 10;
//   mouseY = (event.clientY - windowHalfY) * 10;
//
// };

const makeRoughBall = mesh => {
  mesh.geometry.vertices.forEach(function(vertex) {
    const offset = mesh.geometry.parameters.radius;
    // const amp = guiControls.amp;
    const time = Date.now();
    vertex.normalize();
    const distance = offset + noise.noise3D(
        vertex.x + time / 2 * 0.0007,
        vertex.y + time / 2 * 0.0008,
        vertex.z + time / 2 * 0.0009
    ) * 2;
    vertex.multiplyScalar(distance);
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
};

// const onWindowResize = () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// };

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
};


init();
