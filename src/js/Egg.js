import OpenSimplexNoise from 'open-simplex-noise';
const noise = new OpenSimplexNoise();
const blobSpeed = 0.0007;

export default class Egg {
  constructor () {
    this.mesh = new THREE.Object3D();

    this.blobMovement = true;

    this.localPlane = new THREE.Plane(new THREE.Vector3(- .01, .01, 0), 0.8);
    //localPlane.rotation.x = 180;

    this.icosahedronGeometry = new THREE.IcosahedronGeometry(9.5, 4);
    this.icosahedronGeometry2 = new THREE.IcosahedronGeometry(4, 4);
    this.icosahedronGeometry3 = new THREE.IcosahedronGeometry(10, 4);

    this.lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0xccfffd,
      emissive: 0x333333,
      wireframe: false,
      clippingPlanes: [ window.localPlane ],
      transparent: true,
      opacity: .8
    });

    this.lambertMaterial2 = new THREE.MeshLambertMaterial({
      color: 0x999999,
      emissive: 0x222222,
      wireframe: false,
      transparent: true,
      opacity: 0.0,
        //map: texture
    });

    this.lambertMaterial3 = new THREE.MeshLambertMaterial({
      color: 0x999999,
      emissive: `white`,
      wireframe: false,
      clippingPlanes: [ window.localPlane ],
      transparent: true,
      opacity: 0.1,
      //map: texture
    });

    this.lambertMaterial.depthWrite = false;
    this.lambertMaterial2.depthWrite = false;
    this.lambertMaterial3.depthWrite = false;

    this.ball = new THREE.Mesh(this.icosahedronGeometry, this.lambertMaterial);
    this.ball.position.x = 0;
    this.ball.position.y = 5;
    this.ball.position.z = 0;
    this.ball.castShadow = true;
    //ball.receiveShadow = true;
    //scene.add(ball);

    this.ball2 = new THREE.Mesh(this.icosahedronGeometry2, this.lambertMaterial2);
    this.ball2.position.x = 0;
    this.ball2.position.y = 3;
    this.ball2.position.z = 0;
    this.ball2.castShadow = true;
    // ball2.scale.multiplyScalar(20);
    //scene.add(ball2);

    this.ball3 = new THREE.Mesh(this.icosahedronGeometry3, this.lambertMaterial3);
    this.ball3.position.x = 0;
    this.ball3.position.y = 5;
    this.ball3.position.z = 0;
    this.ball3.castShadow = true;

    this.pointLight = new THREE.PointLight(0xccfffd, 1, 100);
    this.pointLight.position.set(10, 10, 10);
    this.mesh.add(this.pointLight);

    this.mesh.add(this.ball);
    this.mesh.add(this.ball2);
    this.mesh.add(this.ball3);

    this.iceGeometry = new THREE.DodecahedronGeometry(12.5, 1);
    this.iceMaterial = new THREE.MeshLambertMaterial({
      color: `white`,
      emissive: 0x007a87,
      transparent: true,
      opacity: 0.0
    });

    this.iceShard = new THREE.Mesh(this.iceGeometry, this.iceMaterial);
    this.iceShard.position.y = 5;
    this.mesh.add(this.iceShard);
  }

  roughBall() {
    makeRoughBall(this.ball);
    makeRoughBall(this.ball2);
    makeRoughBall(this.ball3);
  }

  fertilize() {

    // PUBERTEIT

    new TWEEN.Tween(this.lambertMaterial)
        .to({opacity: .7}, 3000)
        .start();

    new TWEEN.Tween(this.lambertMaterial2)
        .to({opacity: .3}, 3000)
        .start();

    new TWEEN.Tween(this.pointLight.color)
          .to({r: 45 / 255, g: 16 / 255, b: 55 / 255}, 2000)
          .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
          .to({r: 46 / 255, g: 26 / 255, b: 53 / 255}, 2000)
          .start();

  }

  fertile() {

    // 20 JAAR - VRUCHTBAARSTE PERIODE

    new TWEEN.Tween(this.pointLight.color)
      .to({r: 1, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
      .to({r: 45 / 255, g: 16 / 255, b: 55 / 255}, 2000)
      .start();

  }

  freeze() {

    // 30 JAAR - START DALIG - INVRIEZEN?

    if (this.iceShard.material.opacity >= .05) {
      this.blobMovement = false;
    }

    new TWEEN.Tween(this.iceShard.material)
        .to({opacity: 0.1}, 5000)
        .start();

    new TWEEN.Tween(this.pointLight.color)
      .to({r: .5, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
      .to({r: 40 / 255, g: 11 / 255, b: 50 / 255}, 2000)
      .start();

  }

  unfreeze() {

    if (this.iceShard.material.opacity <= .1) {
      this.blobMovement = true;
    }

    new TWEEN.Tween(this.iceShard.material)
        .to({opacity: 0.0}, 2000)
        .start();

  }

  infertilize() {

    new TWEEN.Tween(this.pointLight.color)
      .to({r: 0, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
      .to({r: 35 / 255, g: 6 / 255, b: 45 / 255}, 2000)
      .start();

    // 35 JAAR - STERKE DALING ONVRUCHTBAARHEID

  }

  infertilizeProgression() {

    new TWEEN.Tween(this.pointLight.color)
      .to({r: 0, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
      .to({r: 30 / 255, g: 1 / 255, b: 40 / 255}, 2000)
      .start();

    // 40 JAAR - KLEINE KANS

  }

  infertile() {

    new TWEEN.Tween(this.pointLight.color)
      .to({r: 0, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
      .to({r: 25 / 255, g: 0 / 255, b: 35 / 255}, 2000)
      .start();

    // 50 JAAR - MENOPAUZE

  }


}

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
