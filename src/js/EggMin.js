import OpenSimplexNoise from 'open-simplex-noise';
const noise = new OpenSimplexNoise();
const blobSpeed = 0.0007;

export default class EggsMin {
  constructor () {
    this.mesh = new THREE.Object3D();

    this.blobMovement = true;

    this.icosahedronGeometry = new THREE.IcosahedronGeometry(9.5, 4);

    this.lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0xccfffd,
      emissive: 0x333333,
      wireframe: false,
      transparent: true,
      opacity: 0.8
    });

    this.lambertMaterial.depthWrite = false;

    this.ball = new THREE.Mesh(this.icosahedronGeometry, this.lambertMaterial);
    this.ball.position.x = 0;
    this.ball.position.y = 5;
    this.ball.position.z = 0;
    this.ball.castShadow = true;

    this.pointLight = new THREE.PointLight(0xccfffd, 1, 100);
    this.pointLight.position.set(10, 10, 10);
    this.mesh.add(this.pointLight);

    this.mesh.add(this.ball);

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
  }

}

const makeRoughBall = mesh => {

  const time = Date.now();
  const halfTime = time * .5;
  const xOffset = halfTime * blobSpeed;
  const yOffset = halfTime * blobSpeed * 1.1;
  const zOffset = halfTime * blobSpeed * 1.2;

  mesh.geometry.vertices.forEach(function(vertex) {
    const offset = mesh.geometry.parameters.radius;
    vertex.normalize();
    const distance = offset + noise.noise3D(
        vertex.x + xOffset,
        vertex.y + yOffset,
        vertex.z + zOffset
    ) * 2;
    vertex.multiplyScalar(distance);
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();

};
