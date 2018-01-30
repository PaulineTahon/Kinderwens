import OpenSimplexNoise from 'open-simplex-noise';

let ball, ball2;
let camera;
const canvas = document.getElementById(`c`);
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});

const scene = new THREE.Scene();

const spheres = [];

let uniforms;
let startTime;

let textureCube;

/* vars light --------------------------------------*/
let bulbLight, bulbLight2;

const noise = new OpenSimplexNoise();

const init = () => {

  startTime = Date.now();

  createScene();
  createLights();
  createAudio();
  createSpheres();
  createBackground();

  onWindowResize();

  animate();

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
  const texture = new THREE.TextureLoader().load(`./assets/img/dirt_spec.jpg`);

  //texture.repeat.set(0.2, 0.2);

  const lambertMaterial = new THREE.MeshLambertMaterial({
    color: `white`,
    emissive: 0x471764,
    // wireframe: true,
    refractionRatio: 0.985,
    // transparent: true,
    // opacity: 0.3,
    //map: texture
  });

  textureCube = new THREE.CubeTextureLoader()
    .setPath(`./assets/img/`)
    .load([ `nx.jpg`, `px.jpg`, `ny.jpg`, `py.jpg`, `nz.jpg`, `pz.jpg` ]);

  textureCube.mapping = THREE.CubeRefractionMapping;

//  const phongMaterial = new THREE.MeshPhongMaterial({color: 0xccfffd, envMap: textureCube, refractionRatio: 0.985, transparent: true, opacity: 0.3});

  const lambertMaterial2 = new THREE.MeshLambertMaterial({
    color: `beige`,
    wireframe: false,
    transparent: true,
    opacity: 0.4,
    map: texture
  });

  // lambertMaterial.depthWrite = false;
  // lambertMaterial2.depthWrite = false;

  ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  ball.position.x = 0;
  ball.position.y = 5;
  ball.position.z = 0;
  ball.castShadow = true;
  //ball.receiveShadow = true;

  ball2 = new THREE.Mesh(icosahedronGeometry2, lambertMaterial2);
  ball2.position.x = - 2;
  ball2.position.y = 3;
  ball2.position.z = 0;
  ball2.castShadow = true;
  scene.add(ball2);
  scene.add(ball);

  /* AmbientLight
  --------------------------------------*/
  const ambientLight = new THREE.AmbientLight(0x999999); //0x999999
  scene.add(ambientLight);

  /* SpotLight
  --------------------------------------*/
  const spotLight = new THREE.SpotLight(0xaaaaaaa); //0xaaaaaaa
  spotLight.intensity = 0.8;
  spotLight.position.set(- 10, 40, 20);
  spotLight.lookAt(ball);
  spotLight.castShadow = true;
  scene.add(spotLight);


  //orbitcontrols;
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 500;
  controls.enablePan = true;

//  renderer.sortObject = false;

};

const createLights = () => {


  /* Light1
  --------------------------------------*/
  const bulbGeometry = new THREE.SphereGeometry(.2, 16, 8);
  bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
  const bulbMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  });

  bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(10, 10, 10);
  bulbLight.castShadow = true;
  scene.add(bulbLight);

  /* Light2
  --------------------------------------*/

  bulbLight2 = new THREE.PointLight(0xffee88, 1, 100, 2);
  const bulbMat2 = new THREE.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  });
  bulbLight2.add(new THREE.Mesh(bulbGeometry, bulbMat2));
  bulbLight2.position.set(10, 10, 10);
  bulbLight2.castShadow = true;
  scene.add(bulbLight2);

};

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

const animate = () => {

  requestAnimationFrame(animate);
  render();
};

const render = () => {
  animateLights();
  makeRoughBall(ball);
  makeRoughBall(ball2);
  animateSpheres();
  const currentTime = Date.now();
  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.0001;

  renderer.render(scene, camera);

};

const animateLights = () => {
  const time = Date.now() * 0.0005;
  bulbLight.position.x = Math.sin(time * 0.7) * 20;
  bulbLight.position.y = Math.cos(time * 0.5) * 10;


  bulbLight2.position.x = Math.sin(time * 0.5) * 20;
  bulbLight2.position.y = Math.cos(time * 0.3) * 10;
};

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
        vertex.x + time * 0.0007,
        vertex.y + time * 0.0008,
        vertex.z + time * 0.0009
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
