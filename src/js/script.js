import OpenSimplexNoise from 'open-simplex-noise';

let camera;
const canvas = document.getElementById(`c`);
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
const scene = new THREE.Scene();
let startCameraAnimation = true;

let ball, ball2, ball3, iceShard;
let ballGroup, ballGroup2, ballGroup3, ballGroup4, ballGroup5, ballGroup6, ballGroup7, ballGroup8, ballGroup9;
let lambertMaterial, lambertMaterial2, lambertMaterial3;

let pointLight;

const blobSpeed = 0.0007;
let blobMovement = true;

const spheres = [];

let textureCube;

let particleCloud;
let particleGeometry;

const textureLoader = new THREE.TextureLoader();

let materialDepth;
const sunPosition = new THREE.Vector3(0, 1000, - 1000);
const screenSpacePosition = new THREE.Vector3();

const postprocessing = {enabled: true};
const bgColor = 0x3a3d46;
scene.fog = new THREE.FogExp2(0x3a3d46, 0.008);
const sunColor = 0xff0000;

const colorStages = [
  {r: 0 / 255, g: 0 / 255, b: 0 / 255}, // 0 jaar
  {r: 25 / 255, g: 0 / 255, b: 35 / 255}, // 12 jaar
  {r: 45 / 255, g: 16 / 255, b: 55 / 255}, // 20 jaar
  {r: 25 / 255, g: 0 / 255, b: 35 / 255}, // 30 jaar
  {r: 10 / 255, g: 0 / 255, b: 25 / 255}, // 35 jaar
  {r: 5 / 255, g: 0 / 255, b: 10 / 255}, // 40 jaar
  {r: 0 / 255, g: 0 / 255, b: 0 / 255} // 50 jaar
];

/* vars light --------------------------------------*/
//let bulbLight, bulbLight2;

const noise = new OpenSimplexNoise();

class Egg {
  constructor () {
    this.mesh = new THREE.Object3D();

    const icosahedronGeometry = new THREE.IcosahedronGeometry(9.5, 4);
    const icosahedronGeometry2 = new THREE.IcosahedronGeometry(4, 4);
    const icosahedronGeometry3 = new THREE.IcosahedronGeometry(10, 4);

    lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0xccfffd,
      emissive: 0x333333,
      wireframe: false,
      transparent: true,
      opacity: .8
    });

    lambertMaterial2 = new THREE.MeshLambertMaterial({
      color: 0x999999,
      emissive: 0x222222,
      wireframe: false,
      transparent: true,
      opacity: 0.0,
        //map: texture
    });

    lambertMaterial3 = new THREE.MeshLambertMaterial({
      color: 0x999999,
      emissive: `white`,
      wireframe: false,
      transparent: true,
      opacity: 0.1,
        //map: texture
    });

    lambertMaterial.depthWrite = false;
    lambertMaterial2.depthWrite = false;
    lambertMaterial3.depthWrite = false;

    ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.x = 0;
    ball.position.y = 5;
    ball.position.z = 0;
    ball.castShadow = true;
    //ball.receiveShadow = true;
    //scene.add(ball);

    ball2 = new THREE.Mesh(icosahedronGeometry2, lambertMaterial2);
    ball2.position.x = 0;
    ball2.position.y = 3;
    ball2.position.z = 0;
    ball2.castShadow = true;
    // ball2.scale.multiplyScalar(20);
    //scene.add(ball2);

    ball3 = new THREE.Mesh(icosahedronGeometry3, lambertMaterial3);
    ball3.position.x = 0;
    ball3.position.y = 5;
    ball3.position.z = 0;
    ball3.castShadow = true;

    this.mesh.add(ball);
    this.mesh.add(ball2);
    this.mesh.add(ball3);
  }

  animateEgg = () => {
    makeRoughBall(ball);
    makeRoughBall(ball2);
    makeRoughBall(ball3);
  }

  fertilize = () => {

    // PUBERTEIT

    new TWEEN.Tween(lambertMaterial)
        .to({opacity: .7}, 3000)
        .start();

    new TWEEN.Tween(lambertMaterial2)
        .to({opacity: .3}, 3000)
        .start();

    new TWEEN.Tween(pointLight.color)
          .to({r: 45 / 255, g: 16 / 255, b: 55 / 255}, 2000)
          .start();

    new TWEEN.Tween(lambertMaterial.emissive)
          .to({r: 46 / 255, g: 26 / 255, b: 53 / 255}, 2000)
          .start();

  }

  fertile = () => {

    // 20 JAAR - VRUCHTBAARSTE PERIODE

    new TWEEN.Tween(pointLight.color)
      .to({r: 1, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(lambertMaterial.emissive)
      .to({r: 45 / 255, g: 16 / 255, b: 55 / 255}, 2000)
      .start();

  }

  freeze = () => {

    // 30 JAAR - START DALIG - INVRIEZEN?

    if (iceShard.material.opacity >= .05) {
      blobMovement = false;
    }

    new TWEEN.Tween(iceShard.material)
        .to({opacity: 0.1}, 5000)
        .start();

    new TWEEN.Tween(pointLight.color)
      .to({r: .5, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(lambertMaterial.emissive)
      .to({r: 40 / 255, g: 11 / 255, b: 50 / 255}, 2000)
      .start();

  }

  unfreeze = () => {

    if (iceShard.material.opacity <= .1) {
      blobMovement = true;
    }

    new TWEEN.Tween(iceShard.material)
        .to({opacity: 0.0}, 2000)
        .start();

  }

  infertilize = () => {

    new TWEEN.Tween(pointLight.color)
      .to({r: 0, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(lambertMaterial.emissive)
      .to({r: 35 / 255, g: 6 / 255, b: 45 / 255}, 2000)
      .start();

    // 35 JAAR - STERKE DALING ONVRUCHTBAARHEID

  }

  infertilizeProgression = () => {

    new TWEEN.Tween(pointLight.color)
      .to({r: 0, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(lambertMaterial.emissive)
      .to({r: 30 / 255, g: 1 / 255, b: 40 / 255}, 2000)
      .start();

    // 40 JAAR - KLEINE KANS

  }

  infertile = () => {

    new TWEEN.Tween(pointLight.color)
      .to({r: 0, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(lambertMaterial.emissive)
      .to({r: 25 / 255, g: 0 / 255, b: 35 / 255}, 2000)
      .start();

    // 50 JAAR - MENOPAUZE

  }


}

const init = () => {

  if (!window.storyIndex) {
    window.storyIndex = 0;
    window.innerIndex = 0;
  }

  //startTime = Date.now();
  createTerrain();
  createScene();
  createIce();
  initPostprocessing();
  // console.log(storyIndex);
  // createLights();
  createAudio();
  createSpheres();
  //createBackground();
  createParticles();
  onWindowResize();

  camera.rotation.x = 0.6;
  camera.rotation.y = 0.6;
  camera.rotation.z = 0.6;

  animate();

  //document.addEventListener(`click`, handleClick);
  window.addEventListener(`resize`, onWindowResize, false);
};

const createTerrain = () => {
  const terrainSize = 150;

  const geometry = new THREE.Geometry();
  let vertex;
  for (let i = 0;i < terrainSize;i ++) {
    for (let j = 0;j < terrainSize;j ++) {
      vertex = new THREE.Vector3();
      vertex.x = (i - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
      vertex.y = - 155 + Math.random() * 100;
      vertex.z = (j - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
      geometry.vertices.push(vertex);
    }
  }

  // const material = new THREE.PointsMaterial({
  //   color: 0xffdb8f,
  //   size: 5,
  //   map: textureLoader.load(`./assets/img/light.png`),
  //   blending: THREE.AdditiveBlending,
  //   transparent: true
  // });
  // Добавляем систему частиц на сцену
  // const particles = new THREE.Points(geometry, material);

  // scene.add(particles);
};

const createScene = () => {

  materialDepth = new THREE.MeshDepthMaterial();

  /* Camera
  --------------------------------------*/
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.x = 0;
  camera.position.y = - 200;
  camera.position.z = 100;

  /* Ball
  --------------------------------------*/

  textureCube = new THREE.CubeTextureLoader()
    .setPath(`./assets/img/`)
    .load([ `nx.jpg`, `px.jpg`, `ny.jpg`, `py.jpg`, `nz.jpg`, `pz.jpg` ]);

  textureCube.mapping = THREE.CubeRefractionMapping;

  renderer.sortObject = false;

  ballGroup = new Egg();
  scene.add(ballGroup.mesh);

  // ballGroup2 = new Egg();
  // ballGroup2.mesh.position.x = 50;
  // ballGroup2.mesh.position.y = - 30;
  // ballGroup2.mesh.position.z = - 40;
  // scene.add(ballGroup2.mesh);
  //
  // ballGroup3 = ballGroup2.mesh.clone();
  // ballGroup3.position.x = - 70;
  // ballGroup3.position.y = - 25;
  // ballGroup3.position.z = - 100;
  // scene.add(ballGroup3);
  //
  // ballGroup4 = ballGroup2.mesh.clone();
  // ballGroup4.position.x = - 70;
  // ballGroup4.position.y = 95;
  // ballGroup4.position.z = - 150;
  // scene.add(ballGroup4);
  //
  // ballGroup5 = new Egg();
  // ballGroup5.mesh.position.x = 70;
  // ballGroup5.mesh.position.y = 112;
  // ballGroup5.mesh.position.z = - 200;
  // scene.add(ballGroup5.mesh);
  //
  // ballGroup6 = ballGroup5.mesh.clone();
  // ballGroup6.position.x = - 150;
  // ballGroup6.position.y = 30;
  // ballGroup6.position.z = - 140;
  // scene.add(ballGroup6);
  //
  // ballGroup7 = ballGroup5.mesh.clone();
  // ballGroup7.position.x = - 100;
  // ballGroup7.position.y = - 50;
  // ballGroup7.position.z = - 30;
  // scene.add(ballGroup7);
  //
  // ballGroup8 = new Egg();
  // ballGroup8.mesh.position.x = - 50;
  // ballGroup8.mesh.position.y = - 100;
  // ballGroup8.mesh.position.z = 0;
  // scene.add(ballGroup8.mesh);
  //
  // ballGroup9 = ballGroup8.mesh.clone();
  // ballGroup9.position.x = - 30;
  // ballGroup9.position.y = - 180;
  // ballGroup9.position.z = 70;
  // scene.add(ballGroup9);
  //

  //ALL CLONES

  ballGroup2 = ballGroup.mesh.clone();
  ballGroup2.position.x = 50;
  ballGroup2.position.y = - 30;
  ballGroup2.position.z = - 40;
  scene.add(ballGroup2);

  ballGroup3 = ballGroup.mesh.clone();
  ballGroup3.position.x = - 70;
  ballGroup3.position.y = - 25;
  ballGroup3.position.z = - 100;
  scene.add(ballGroup3);

  ballGroup4 = ballGroup.mesh.clone();
  ballGroup4.position.x = - 70;
  ballGroup4.position.y = 95;
  ballGroup4.position.z = - 150;
  scene.add(ballGroup4);

  ballGroup5 = ballGroup.mesh.clone();
  ballGroup5.position.x = 70;
  ballGroup5.position.y = 112;
  ballGroup5.position.z = - 200;
  scene.add(ballGroup5);

  ballGroup6 = ballGroup.mesh.clone();
  ballGroup6.position.x = - 150;
  ballGroup6.position.y = 30;
  ballGroup6.position.z = - 140;
  scene.add(ballGroup6);

  ballGroup7 = ballGroup.mesh.clone();
  ballGroup7.position.x = - 100;
  ballGroup7.position.y = - 50;
  ballGroup7.position.z = - 30;
  scene.add(ballGroup7);

  ballGroup8 = ballGroup.mesh.clone();
  ballGroup8.position.x = - 50;
  ballGroup8.position.y = - 100;
  ballGroup8.position.z = 0;
  scene.add(ballGroup8);

  ballGroup9 = ballGroup.mesh.clone();
  ballGroup9.position.x = - 30;
  ballGroup9.position.y = - 180;
  ballGroup9.position.z = 70;
  scene.add(ballGroup9);

  // ballGroup9.children.forEach(ball => {
  //   ball.material.opacity = .2;
  //   console.log(ball.material.opacity);
  // });

  //ball.receiveShadow = true;

  /* AmbientLight
  --------------------------------------*/
  const ambientLight = new THREE.AmbientLight(0x999999); //0x999999
  scene.add(ambientLight);
  camera.add(ambientLight);

  pointLight = new THREE.PointLight(0xccfffd, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // const pointLight = new THREE.PointLight(0x999999); //0x999999
  // pointLight.position.set(0, 0, 10);
  // camera.add(pointLight);


  //
  /* SpotLight
  // --------------------------------------*/
  const spotLight = new THREE.SpotLight(0xaaaaaaa); //0xaaaaaaa
  spotLight.intensity = 0.8;
  spotLight.position.set(0, 1000, 20);
  spotLight.lookAt(ball);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  // camera.add(spotLight);


  //orbitcontrols;
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 500;
  controls.enablePan = true;

  // new TWEEN.Tween(camera.position)
  //     .to({x: 0, y: - 200, z: 100}, 20000)
  //     .start();
  //
  // // new TWEEN.Tween(camera.rotation)
  // //     .to({x: .3, y: 1, z: .3}, 10000)
  // //     .start();
  //
  // const A = new TWEEN.Tween(camera.rotation).to({x: .3, y: .3, z: .3}, 5000);
  // const B = new TWEEN.Tween(camera.rotation).to({x: .6, y: .6, z: .6}, 5000);
  // //
  // A.chain(B);
  // A.start();
  //
  // const C = new TWEEN.Tween(camera.position).to({x: 0, y: - 200, z: 100}, 20000);
  // const D = new TWEEN.Tween(camera.position).to({x: 0, y: - 200, z: 100}, 20000);
  // //
  // C.chain(D);
  // C.start();

// <<<<<<< HEAD
//   new TWEEN.Tween(spotLight.position)
//       .to({x: 0, y: 0, z: 400}, 10000)
//       .start();


  //
  // console.log(lambertMaterial);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;


  //RIJPE EICEL
};

const initPostprocessing = () => {
  postprocessing.scene = new THREE.Scene();
  postprocessing.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, - 10000, 10000);
  postprocessing.camera.position.z = 100;
  postprocessing.scene.add(postprocessing.camera);
  const pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat};
  postprocessing.rtTextureColors = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);

  postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);
  // Aggressive downsize god-ray ping-pong render targets to minimize cost
  const w = window.innerWidth / 4.0;
  const h = window.innerHeight / 4.0;
  postprocessing.rtTextureGodRays1 = new THREE.WebGLRenderTarget(w, h, pars);
  postprocessing.rtTextureGodRays2 = new THREE.WebGLRenderTarget(w, h, pars);
  // god-ray shaders
  const godraysGenShader = THREE.ShaderGodRays[ `godrays_generate` ];
  postprocessing.godrayGenUniforms = THREE.UniformsUtils.clone(godraysGenShader.uniforms);
  postprocessing.materialGodraysGenerate = new THREE.ShaderMaterial({
    uniforms: postprocessing.godrayGenUniforms,
    vertexShader: godraysGenShader.vertexShader,
    fragmentShader: godraysGenShader.fragmentShader
  });
  const godraysCombineShader = THREE.ShaderGodRays[ `godrays_combine` ];
  postprocessing.godrayCombineUniforms = THREE.UniformsUtils.clone(godraysCombineShader.uniforms);
  postprocessing.materialGodraysCombine = new THREE.ShaderMaterial({
    uniforms: postprocessing.godrayCombineUniforms,
    vertexShader: godraysCombineShader.vertexShader,
    fragmentShader: godraysCombineShader.fragmentShader
  });
  const godraysFakeSunShader = THREE.ShaderGodRays[ `godrays_fake_sun` ];
  postprocessing.godraysFakeSunUniforms = THREE.UniformsUtils.clone(godraysFakeSunShader.uniforms);
  postprocessing.materialGodraysFakeSun = new THREE.ShaderMaterial({
    uniforms: postprocessing.godraysFakeSunUniforms,
    vertexShader: godraysFakeSunShader.vertexShader,
    fragmentShader: godraysFakeSunShader.fragmentShader
  });
  postprocessing.godraysFakeSunUniforms.bgColor.value.setHex(bgColor);
  postprocessing.godraysFakeSunUniforms.sunColor.value.setHex(sunColor);
  postprocessing.godrayCombineUniforms.fGodRayIntensity.value = 0.15;
  postprocessing.quad = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight),
    postprocessing.materialGodraysGenerate
  );
  postprocessing.quad.position.z = - 9900;
  postprocessing.scene.add(postprocessing.quad);
};

// const createLights = () => {
//
//   /* Light1
//   --------------------------------------*/
//   const bulbGeometry = new THREE.SphereGeometry(.2, 16, 8);
//   bulbLight = new THREE.PointLight(0x471764, 1, 100, 2);
//   const bulbMat = new THREE.MeshStandardMaterial({
//     emissive: 0x471764,
//     emissiveIntensity: .1,
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
//   bulbLight2 = new THREE.PointLight(0x471764, 1, 100, 2);
//   const bulbMat2 = new THREE.MeshStandardMaterial({
//     emissive: 0x471764,
//     emissiveIntensity: .1,
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
  audio.volume = 0.0;
};

// const createBackground = () => {
//
//   const geometry = new THREE.PlaneBufferGeometry(280, 200);
//
//   //const planeTexture = textureLoader.load(`./assets/img/dirt_spec.jpg`);
//
//   uniforms = {
//     iGlobalTime: {type: `f`, value: 1.0},
//     iResolution: {type: `v1`, value: new THREE.Vector2()}
//   };
//
//   const material = new THREE.ShaderMaterial({
//     uniforms: uniforms,
//     vertexShader: document.getElementById(`vertexShader`).textContent,
//     fragmentShader: document.getElementById(`fragmentShader`).textContent,
//   });
//
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.position.z = - 120;
//   scene.add(mesh);
//
// };

const createIce = () => {
  const geometry = new THREE.DodecahedronGeometry(12.5, 1);
  const material = new THREE.MeshLambertMaterial({
    // uniforms: {
    //   time: {value: 1.0}
    // },
    // vertexShader: document.getElementById(`vertexShader2`).textContent,
    // fragmentShader: document.getElementById(`fragmentShader2`).textContent,
    // side: THREE.DoubleSide,
    // transparent: true,
    color: `white`,
    emissive: 0x007a87,
    transparent: true,
    opacity: 0.0
  });

  iceShard = new THREE.Mesh(geometry, material);
  iceShard.position.y = 5;
  scene.add(iceShard);
};

// const createIce = () => {
//   const triangles = 50;
//   const geometry = new THREE.BufferGeometry();
//   const positions = [];
//   const colors = [];
//   for (let i = 0;i < triangles;i ++) {
//     positions.push(Math.random() - 0.5);
//     positions.push(Math.random() - 0.5);
//     positions.push(Math.random() - 0.5) + 100;
//     colors.push(Math.random() * 255);
//     colors.push(Math.random() * 255);
//     colors.push(Math.random() * 255);
//     colors.push(Math.random() * 255);
//   }
//   const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
//   const colorAttribute = new THREE.Uint8BufferAttribute(colors, 4);
//   colorAttribute.normalized = true;
//   geometry.addAttribute(`position`, positionAttribute);
//   geometry.addAttribute(`color`, colorAttribute);
// 				// material
//   const material = new THREE.RawShaderMaterial({
//     uniforms: {
//       time: {value: 1.0}
//     },
//     vertexShader: document.getElementById(`vertexShader2`).textContent,
//     fragmentShader: document.getElementById(`fragmentShader2`).textContent,
//     side: THREE.DoubleSide,
//     transparent: true
//   });
//   const iceShard = new THREE.Mesh(geometry, material);
//   iceShard.scale.multiplyScalar(30);
//
//   scene.add(iceShard);
// };

const createParticles = () => {
  particleGeometry = new THREE.Geometry();

  const lightImg = textureLoader.load(`./assets/img/light.png`);

  for (let i = 0;i < 50;i ++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 200 - 100;
    vertex.y = Math.random() * 200 - 100;
    vertex.z = Math.random() * 200 - 100;

    vertex.direction = {
      x: Math.random(),
      y: Math.random()
    };

    particleGeometry.vertices.push(vertex);
  }

  const material = new THREE.PointsMaterial({size: 7, map: lightImg, blending: THREE.AdditiveBlending, depthTest: false, transparent: true, opacity: .3});

  particleCloud = new THREE.Points(particleGeometry, material);

  particleCloud.rotation.x = Math.random() * 6;
  particleCloud.rotation.y = Math.random() * 6;
  particleCloud.rotation.z = Math.random() * 6;

  scene.add(particleCloud);
};

const animate = () => {

  requestAnimationFrame(animate);
  render();
};

const render = time => {

  //animateLights();
  animateSpheres();
  animateParticles();
  createLightRays();
  // animateEggs();

  if (blobMovement) {
    ballGroup.animateEgg();
    // ballGroup2.animateEgg();
    // ballGroup5.animateEgg();
    // ballGroup8.animateEgg();
  }

  TWEEN.update(time);

  if (window.storyIndex === 2) {

    animateCamera();
    updateSceneColor();

  }

  if (window.storyIndex === 3) {

    ballGroup.fertilize();
    updateSceneColor();

  }

  if (window.storyIndex === 4) {

    ballGroup.fertile();
    updateSceneColor();

  }

  if (window.storyIndex === 5) {

    updateSceneColor();

    if (window.innerIndex !== 0) {
      console.log(`freezing`);
      ballGroup.freeze();
    }

  }

  if (window.storyIndex === 6) {

    ballGroup.unfreeze();
    ballGroup.infertilize();
    updateSceneColor();

  }

  if (window.storyIndex === 7) {

    ballGroup.infertilizeProgression();
    updateSceneColor();

  }

  if (window.storyIndex === 8) {

    ballGroup.infertile();
    updateSceneColor();

  }

  //const currentTime = Date.now();

  //uniforms.iGlobalTime.value = (currentTime - startTime) * 0.0005;
};

// const animateEggs = () => {
//   for (let i = 0;i < scene.children.length;i ++) {
//     const object = scene.children[ i ];
//     if (object.name === `egg`) {
//       object.children.forEach(child => {
//         if (blobMovement) {
//           makeRoughBall(child);
//         }
//       });
//     }
//   }
// };

const updateSceneColor = () => {

  new TWEEN.Tween(postprocessing.godraysFakeSunUniforms.bgColor.value)
    .to(colorStages[window.storyIndex - 2], 2000)
    .start();

  new TWEEN.Tween(scene.fog.color)
    .to(colorStages[window.storyIndex - 2], 2000)
    .start();

};

const animateCamera = () => {

  if (startCameraAnimation) {
    new TWEEN.Tween(camera.position)
        .to({x: 0, y: 0, z: 50}, 20000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();

    const A = new TWEEN.Tween(camera.rotation).to({x: .0, y: .0, z: .0}, 20000).easing(TWEEN.Easing.Cubic.InOut);
    const B = new TWEEN.Tween(camera.rotation).to({x: 0, y: 0, z: 0}, 5000);
    //
    A.chain(B);
    A.start();
    startCameraAnimation = false;
  }

};

// const updateIceMaterial = () => {
//   //const time = Date.now();
//   for (let i = 0;i < scene.children.length;i ++) {
//     const object = scene.children[ i ];
//
//     }
//     //  object.material.uniforms.time.value = time * 0.005;
//   //  }
//   }
// };

const createLightRays = () => {
  // const time = Date.now() / 4000;
  // sphereMesh.position.x = orbitRadius * Math.cos(time);
  // sphereMesh.position.z = orbitRadius * Math.sin(time) - 100;

  if (postprocessing.enabled) {
      // Find the screenspace position of the sun
    screenSpacePosition.copy(sunPosition).project(camera);
    screenSpacePosition.x = (screenSpacePosition.x + 1) / 2;
    screenSpacePosition.y = (screenSpacePosition.y + 1) / 2;
      // Give it to the god-ray and sun shaders
    postprocessing.godrayGenUniforms[ `vSunPositionScreenSpace` ].value.x = screenSpacePosition.x;
    postprocessing.godrayGenUniforms[ `vSunPositionScreenSpace` ].value.y = screenSpacePosition.y;
    postprocessing.godraysFakeSunUniforms[ `vSunPositionScreenSpace` ].value.x = screenSpacePosition.x;
    postprocessing.godraysFakeSunUniforms[ `vSunPositionScreenSpace` ].value.y = screenSpacePosition.y;
      // -- Draw sky and sun --
      // Clear colors and depths, will clear to sky color
    renderer.clearTarget(postprocessing.rtTextureColors, true, true, false);
      // Sun render. Runs a shader that gives a brightness based on the screen
      // space distance to the sun. Not very efficient, so i make a scissor
      // rectangle around the suns position to avoid rendering surrounding pixels.
    const sunsqH = 0.74 * window.innerHeight; // 0.74 depends on extent of sun from shader
    const sunsqW = 0.74 * window.innerHeight; // both depend on height because sun is aspect-corrected
    screenSpacePosition.x *= window.innerWidth;
    screenSpacePosition.y *= window.innerHeight;
    renderer.setScissor(screenSpacePosition.x - sunsqW / 2, screenSpacePosition.y - sunsqH / 2, sunsqW, sunsqH);
    renderer.setScissorTest(true);
    postprocessing.godraysFakeSunUniforms[ `fAspect` ].value = window.innerWidth / window.innerHeight;
    postprocessing.scene.overrideMaterial = postprocessing.materialGodraysFakeSun;
    renderer.render(postprocessing.scene, postprocessing.camera, postprocessing.rtTextureColors);
    renderer.setScissorTest(false);
      // -- Draw scene objects --
      // Colors
    scene.overrideMaterial = null;
    renderer.render(scene, camera, postprocessing.rtTextureColors);
      // Depth
    scene.overrideMaterial = materialDepth;
    renderer.render(scene, camera, postprocessing.rtTextureDepth, true);
      // -- Render god-rays --
      // Maximum length of god-rays (in texture space [0,1]X[0,1])
    const filterLen = 1.0;
      // Samples taken by filter
    const TAPS_PER_PASS = 6.0;
      // Pass order could equivalently be 3,2,1 (instead of 1,2,3), which
      // would start with a small filter support and grow to large. however
      // the large-to-small order produces less objectionable aliasing artifacts that
      // appear as a glimmer along the length of the beams
      // pass 1 - render into first ping-pong target
    let pass = 1.0;
    let stepLen = filterLen * Math.pow(TAPS_PER_PASS, - pass);
    postprocessing.godrayGenUniforms[ `fStepSize` ].value = stepLen;
    postprocessing.godrayGenUniforms[ `tInput` ].value = postprocessing.rtTextureDepth.texture;
    postprocessing.scene.overrideMaterial = postprocessing.materialGodraysGenerate;
    renderer.render(postprocessing.scene, postprocessing.camera, postprocessing.rtTextureGodRays2);
      // pass 2 - render into second ping-pong target
    pass = 2.0;
    stepLen = filterLen * Math.pow(TAPS_PER_PASS, - pass);
    postprocessing.godrayGenUniforms[ `fStepSize` ].value = stepLen;
    postprocessing.godrayGenUniforms[ `tInput` ].value = postprocessing.rtTextureGodRays2.texture;
    renderer.render(postprocessing.scene, postprocessing.camera, postprocessing.rtTextureGodRays1);
      // pass 3 - 1st RT
    pass = 3.0;
    stepLen = filterLen * Math.pow(TAPS_PER_PASS, - pass);
    postprocessing.godrayGenUniforms[ `fStepSize` ].value = stepLen;
    postprocessing.godrayGenUniforms[ `tInput` ].value = postprocessing.rtTextureGodRays1.texture;
    renderer.render(postprocessing.scene, postprocessing.camera, postprocessing.rtTextureGodRays2);
      // final pass - composite god-rays onto colors
    postprocessing.godrayCombineUniforms[`tColors`].value = postprocessing.rtTextureColors.texture;
    postprocessing.godrayCombineUniforms[`tGodRays`].value = postprocessing.rtTextureGodRays2.texture;
    postprocessing.scene.overrideMaterial = postprocessing.materialGodraysCombine;
    renderer.render(postprocessing.scene, postprocessing.camera);
    postprocessing.scene.overrideMaterial = null;
  } else {
    renderer.clear();
    renderer.render(scene, camera);
  }
};

const animateParticles = () => {

  const time = Date.now() * 0.0000007;

  for (let i = 0;i < scene.children.length;i ++) {
    const object = scene.children[ i ];
    if (object instanceof THREE.Points) {
      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
    }
  }
  particleCloud.geometry.verticesNeedUpdate = true;
};

// const animateLights = () => {
//   const time = Date.now() * 0.0005;
//   bulbLight.position.x = Math.sin(time * 0.7) * 20;
//   bulbLight.position.y = Math.cos(time * 0.5) * 10;
//
//   bulbLight2.position.x = Math.sin(time * 0.5) * 20;
//   bulbLight2.position.y = Math.cos(time * 0.3) * 10;
// };

const animateSpheres = () => {
  const time = 0.00001 * Date.now();

  for (let i = 0, il = spheres.length;i < il;i ++) {
    const sphere = spheres[ i ];
    // sphere.position.x = (5000 * Math.cos(timer + i)) / 10;
    // sphere.position.y = (2500 * Math.sin(timer + i * 1.1)) / 10;
    sphere.position.x = 200 * Math.cos(time);
    sphere.position.z = 200 * Math.cos(time) - 100;
  }
};

const createSpheres = () => {

  const geometry = new THREE.SphereBufferGeometry(4, 32, 16);

  const material = new THREE.MeshBasicMaterial({color: 0x999999, envMap: textureCube, refractionRatio: 0.95, transparent: true, opacity: 0.3});

  for (let i = 0;i < 30;i ++) {

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5000 - 2500;
    mesh.position.y = Math.random() * 5000 - 2500;
    mesh.position.z = Math.random() * 0 - 100;
    scene.add(mesh);

    spheres.push(mesh);

  }
};

const makeRoughBall = mesh => {
  mesh.geometry.vertices.forEach(function(vertex) {
    const offset = mesh.geometry.parameters.radius;

    const time = Date.now();
    vertex.normalize();
    const distance = offset + noise.noise3D(
        vertex.x + time / 2 * blobSpeed,
        vertex.y + time / 2 * (blobSpeed * 1.1),
        vertex.z + time / 2 * (blobSpeed * 1.2)
    ) * 2;
    vertex.multiplyScalar(distance);
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // uniforms.iResolution.value.x = window.innerWidth;
  // uniforms.iResolution.value.y = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
};


init();
