class Egg {
  constructor () {
    this.mesh = new THREE.Object3D();

    let blobMovement = true;

    const icosahedronGeometry = new THREE.IcosahedronGeometry(9.5, 4);
    const icosahedronGeometry2 = new THREE.IcosahedronGeometry(4, 4);
    const icosahedronGeometry3 = new THREE.IcosahedronGeometry(10, 4);

    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0xccfffd,
      emissive: 0x333333,
      wireframe: false,
      transparent: true,
      opacity: .8
    });

    const lambertMaterial2 = new THREE.MeshLambertMaterial({
      color: 0x999999,
      emissive: 0x222222,
      wireframe: false,
      transparent: true,
      opacity: 0.0,
        //map: texture
    });

    const lambertMaterial3 = new THREE.MeshLambertMaterial({
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

    const ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.x = 0;
    ball.position.y = 5;
    ball.position.z = 0;
    ball.castShadow = true;
    //ball.receiveShadow = true;
    //scene.add(ball);

    const ball2 = new THREE.Mesh(icosahedronGeometry2, lambertMaterial2);
    ball2.position.x = 0;
    ball2.position.y = 3;
    ball2.position.z = 0;
    ball2.castShadow = true;
    // ball2.scale.multiplyScalar(20);
    //scene.add(ball2);

    const ball3 = new THREE.Mesh(icosahedronGeometry3, lambertMaterial3);
    ball3.position.x = 0;
    ball3.position.y = 5;
    ball3.position.z = 0;
    ball3.castShadow = true;

    this.mesh.add(ball);
    this.mesh.add(ball2);
    this.mesh.add(ball3);
  }

  animateEgg = () => {
    makeRoughBall(this.ball);
    makeRoughBall(this.ball2);
    makeRoughBall(this.ball3);
  }

  fertilize = () => {

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

  fertile = () => {

    // 20 JAAR - VRUCHTBAARSTE PERIODE

    new TWEEN.Tween(this.pointLight.color)
      .to({r: 1, g: 0, b: 0}, 2000)
      .start();

    new TWEEN.Tween(this.lambertMaterial.emissive)
      .to({r: 45 / 255, g: 16 / 255, b: 55 / 255}, 2000)
      .start();

  }

  freeze = () => {

    // 30 JAAR - START DALIG - INVRIEZEN?

    if (this.iceShard.material.opacity >= .05) {
      this.blobMovement = false;
    }

    new TWEEN.Tween(this.iceShard.material)
        .to({opacity: 0.1}, 5000)
        .start();

  }

  unfreeze = () => {

    if (this.iceShard.material.opacity <= .1) {
      this.blobMovement = true;
    }

    new TWEEN.Tween(this.iceShard.material)
        .to({opacity: 0.0}, 2000)
        .start();

  }

  infertilize = () => {

    // 35 JAAR - STERKE DALING ONVRUCHTBAARHEID

  }

  infertilizeProgression = () => {

    // 40 JAAR - KLEINE KANS

  }

  infertile = () => {

    // 50 JAAR - MENOPAUZE

  }


}
