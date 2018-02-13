// import Velocity from 'velocity-animate';
// import 'velocity-animate/velocity.ui';
// console.log(Velocity);
import './storyScript.js';
import Egg from './Egg.js';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
const intensity = 0;
let camera;
const canvas = document.getElementById(`c`);
const renderer = new THREE.WebGLRenderer({canvas, antialias: false});
const scene = new THREE.Scene();

let startCameraAnimation = true;

let ballGroup, ballGroup2, ballGroup3, ballGroup4, ballGroup5, ballGroup6, ballGroup7, ballGroup8, ballGroup9;

let particleCloud;
let particleGeometry;

const textureLoader = new THREE.TextureLoader();

let materialDepth;

const sunPosition = new THREE.Vector3(0, 1000, - 1000);
const screenSpacePosition = new THREE.Vector3();

const postprocessing = {enabled: true};

// const colorStages = [
//   {r: 5 / 255, g: 0 / 255, b: 10 / 255}, // 0 jaar
//   {r: 15 / 255, g: 0 / 255, b: 20 / 255}, // 12 jaar
//   {r: 35 / 255, g: 6 / 255, b: 45 / 255}, // 20 jaar
//   {r: 15 / 255, g: 0 / 255, b: 20 / 255}, // 30 jaar
//   {r: 10 / 255, g: 0 / 255, b: 15 / 255}, // 35 jaar
//   {r: 5 / 255, g: 0 / 255, b: 10 / 255}, // 50 jaar
// ];

// const colorStages = [
//   {r: 22 / 255, g: 18 / 255, b: 22 / 255}, // 0 jaar
//   {r: 15 / 255, g: 0 / 255, b: 20 / 255}, // 12 jaar
//   {r: 35 / 255, g: 6 / 255, b: 45 / 255}, // 20 jaar
//   {r: 15 / 255, g: 0 / 255, b: 20 / 255}, // 30 jaar
//   {r: 40 / 255, g: 49 / 255, b: 121 / 255}, // 35 jaar
//   {r: 13 / 255, g: 19 / 255, b: 61 / 255}, // 50 jaar
// ];


const colorStages = [
  {r: 22 / 255, g: 18 / 255, b: 22 / 255}, // 0 jaar
  {r: 15 / 255, g: 0 / 255, b: 20 / 255}, // 12 jaar
  {r: 35 / 255, g: 6 / 255, b: 45 / 255}, // 20 jaar
  {r: 40 / 255, g: 49 / 255, b: 120 / 255}, // 30 jaar
  {r: 13 / 255, g: 19 / 255, b: 61 / 255}, // 35 jaar
  {r: 23 / 255, g: 18 / 255, b: 24 / 255}, // 50 jaar
];

const bgColor = colorStages[0];
const sunColor = colorStages[0];
scene.fog = new THREE.FogExp2(0x161216, 0.008);

//const globalPlane = new THREE.Plane(new THREE.Vector3(- 1, 0, 0), 0.1);

/* vars light --------------------------------------*/
//let bulbLight, bulbLight2;

const init = () => {

  console.log(`[SCRIPT INITIATED]`);

  if (!window.storyIndex) {
    window.storyIndex = 0;
    window.innerIndex = 0;
  }

  createScene();
  createParticles();
  initPostprocessing();
  animate();

  camera.rotation.x = 0.6;
  camera.rotation.y = 0.6;
  camera.rotation.z = 0.6;

  window.addEventListener(`resize`, onWindowResize, false);
  onWindowResize();

};

const createScene = () => {

  materialDepth = new THREE.MeshDepthMaterial();

  /* Camera
  --------------------------------------*/
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = - 200;
  camera.position.z = 100;

  renderer.sortObject = false;

  /* Ball
  --------------------------------------*/
  ballGroup = new Egg();
  scene.add(ballGroup.mesh);

  ballGroup9 = ballGroup.mesh.clone();
  ballGroup9.position.x = - 30;
  ballGroup9.position.y = - 180;
  ballGroup9.position.z = 70;
  scene.add(ballGroup9);

  createEggs();

  /* AmbientLight
  --------------------------------------*/
  const ambientLight = new THREE.AmbientLight(0x999999); //0x999999
  scene.add(ambientLight);
  camera.add(ambientLight);

  /* SpotLight
  // --------------------------------------*/
  const spotLight = new THREE.SpotLight(0xaaaaaaa); //0xaaaaaaa
  spotLight.intensity = 0.8;
  spotLight.lookAt(ballGroup.mesh);
  spotLight.castShadow = true;
  if (window.STATE === `eicel`) {
    spotLight.position.set(0, 1000, 20);
  } else if (window.STATE === `home`) {
    spotLight.position.set(0, 1000, 20);
  }
  scene.add(spotLight);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
};

const createEggs = () => {

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

};

const initPostprocessing = () => {

  postprocessing.scene = new THREE.Scene();
  postprocessing.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, - 10000, 10000);
  postprocessing.camera.position.z = 100;
  postprocessing.scene.add(postprocessing.camera);
  const pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat};
  postprocessing.rtTextureColors = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);

  postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);

  const w = window.innerWidth / 4.0;
  const h = window.innerHeight / 4.0;
  postprocessing.rtTextureGodRays1 = new THREE.WebGLRenderTarget(w, h, pars);
  postprocessing.rtTextureGodRays2 = new THREE.WebGLRenderTarget(w, h, pars);

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
  postprocessing.godraysFakeSunUniforms.bgColor.value = bgColor;
  postprocessing.godraysFakeSunUniforms.sunColor.value = sunColor;
  postprocessing.godrayCombineUniforms.fGodRayIntensity.value = intensity;
  postprocessing.quad = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight),
    postprocessing.materialGodraysGenerate
  );
  postprocessing.quad.position.z = - 9900;
  postprocessing.scene.add(postprocessing.quad);
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
  stats.begin();
  render();
  stats.end();
  requestAnimationFrame(animate);
};

const render = time => {

  // console.log(window.storyAudio.currentTime);

  TWEEN.update(time);

  animateParticles();
  createLightRays();

  if (ballGroup.blobMovement) {
    ballGroup.roughBall();
  }

  // if (window.storyIndex === 1) {
  //   new TWEEN.Tween(postprocessing.godrayCombineUniforms.fGodRayIntensity)
  //     .to({value: 0.15}, 500)
  //     .start();
  //   // renderer.localClippingEnabled = false;
  //   // scene.remove(ballGroup2, ballGroup3, ballGroup4, ballGroup5, ballGroup6, ballGroup7, ballGroup8);
  //
  // }

  if (window.storyIndex === 2) {
    animateCamera();
    updateSceneColor();
    new TWEEN.Tween(postprocessing.godrayCombineUniforms.fGodRayIntensity)
      .to({value: 0.15}, 2000)
      .start();
    // renderer.localClippingEnabled = false;
    // scene.remove(ballGroup2, ballGroup3, ballGroup4, ballGroup5, ballGroup6, ballGroup7, ballGroup8);

  }

  if (window.storyIndex === 3) {
    scene.remove(ballGroup9, ballGroup8, ballGroup7, ballGroup5, ballGroup4);
    ballGroup.fertilize();
    updateSceneColor();

  }

  if (window.storyIndex === 4) {

    ballGroup.fertile();
    updateSceneColor();

  }

  if (window.storyIndex === 6) {

    updateSceneColor();
    if (window.innerIndex > 1) {
      ballGroup.freeze();
      ballGroup.infertilize();
    }
  }

  if (window.storyIndex === 7) {

    ballGroup.unfreeze();
    ballGroup.infertilizeProgression();
    updateSceneColor();


  }

  if (window.storyIndex === 8) {

    ballGroup.infertile();
    updateSceneColor();
    new TWEEN.Tween(postprocessing.godrayCombineUniforms.fGodRayIntensity)
      .to({value: 0}, 2000)
      .start();

  }

  if (window.storyIndex === 9) {
    ballGroup.blobMovement = false;
    scene.remove(ballGroup);

  }

};

const updateSceneColor = () => {

  if (postprocessing.godraysFakeSunUniforms.bgColor.value !== colorStages[window.storyIndex - 2]) {
    new TWEEN.Tween(postprocessing.godraysFakeSunUniforms.bgColor.value)
      .to(colorStages[window.storyIndex - 2], 2000)
      .start();

    new TWEEN.Tween(scene.fog.color)
      .to(colorStages[window.storyIndex - 2], 2000)
      .start();
  }
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

const createLightRays = () => {

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

    scene.overrideMaterial = null;
    renderer.render(scene, camera, postprocessing.rtTextureColors);

    scene.overrideMaterial = materialDepth;
    renderer.render(scene, camera, postprocessing.rtTextureDepth, true);

    const filterLen = 1.0;

    const TAPS_PER_PASS = 6.0;

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

  const time = Date.now() * 0.000003;

  for (let i = 0;i < scene.children.length;i ++) {
    const object = scene.children[ i ];
    if (object instanceof THREE.Points) {
      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
    }
  }

  particleCloud.geometry.verticesNeedUpdate = true;

};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // uniforms.iResolution.value.x = window.innerWidth;
  // uniforms.iResolution.value.y = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
};

init();
