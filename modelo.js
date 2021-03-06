const CLOSET = 0;
const GAVETA = 1;
const PRATELEIRA = 2;
const CABIDE = 3;
var portaEsquerda;
var portaDireita;
var portaDireitaPai;
var portaEsquerdaPai;
var macanetaPortaDireita;
var macanetaPortaEsquerda;

//MATERIAIS BASE
var LightWodd = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xffffff,
  shininess: 30,
  map: new THREE.TextureLoader().load('texturas/madeira-clara.jpg')
});

var metal = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0xdddddd,
  shininess: 100,
  map: new THREE.TextureLoader().load('texturas/metal.jpg')
});

var glass = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xffffff,
  shininess: 30,
  transparent: true,
  opacity: 0.5,
  map: new THREE.TextureLoader().load('texturas/vidro.jpg')
});

var createClosetBase = function (dimx, dimy, dimz, material, scene) {
  let geometryTopo = new THREE.BoxGeometry(dimx, .02, dimz);
  let mat = LightWodd;
  if (material == 1) { mat = LightWodd; }
  if (material == 2) { mat = metal; }
  if (material == 3) { mat = glass; }


  let closetTop = new THREE.Mesh(geometryTopo, mat);
  closetTop.position.set(0, dimy / 2, 0);
  scene.add(closetTop);

  // desenhar Base
  let geometryBottom = new THREE.BoxGeometry(dimx, .02, dimz);
  let closetBottom = new THREE.Mesh(geometryBottom, mat);
  closetBottom.position.set(0, -dimy / 2, 0);
  scene.add(closetBottom);

  // desenhar Lado Direito
  let geometryRightSide = new THREE.BoxGeometry(.02, dimy, dimz);

  let closetRightSide = new THREE.Mesh(geometryRightSide, mat);
  closetRightSide.position.set(dimx / 2, 0, 0);
  scene.add(closetRightSide);

  // desenhar Lado Esquerdo
  let geometryLeftSide = new THREE.BoxGeometry(.02, dimy, dimz);

  let closetLeftSide = new THREE.Mesh(geometryLeftSide, mat);
  closetLeftSide.position.set(-dimx / 2, 0, 0);
  scene.add(closetLeftSide);

  let geometry = new THREE.BoxGeometry(dimx, dimy, 0.02);

  let cube = new THREE.Mesh(geometry, mat);
  cube.position.set(0, 0, -dimz / 2);
  scene.add(cube);


  let geometryC = new THREE.BoxGeometry(15, 0, 15);


  let FloorMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 30,
    map: new THREE.TextureLoader().load('texturas/relva.jpg')
  });

  var floor = new THREE.Mesh(geometryC, FloorMaterial);
  scene.add(floor);
  floor.position.set(0, -(dimy / 2)-.5 , 0);
  const closet = [closetTop,closetBottom,closetRightSide,closetLeftSide,cube];
  return closet;
}

var createHanger = function (xArm, zArm, yArm, altura, dHanger, scene) {
  var geometry = new THREE.CylinderGeometry(0.02,0.02,xArm,32,5);
  var cylinder = new THREE.Mesh(geometry, metal);
  cylinder.position.set(0, (altura - yArm / 2)*0.85, (dHanger - zArm/2) );
  scene.add(cylinder);
  cylinder.rotation.z += 1.57
  return cylinder;
}
var createShelf = function (dx, dy, dz, x, y, z, material, scene) {
  let geometry = new THREE.BoxGeometry(dx - .04, dy, dz - .04);
  let mat = LightWodd;
  if (material == 1) { mat = LightWodd; }
  if (material == 2) { mat = metal; }
  if (material == 3) { mat = glass; }

  let cubo = new THREE.Mesh(geometry, mat);
  cubo.position.set(x, y, z);
  scene.add(cubo);
  return cubo;
}

var createDrawer = function (dx, dy, dz, x, y, z, m, scene) {
  let geometry = new THREE.BoxGeometry(dx - .04, dy, dz - .04); // de modo a encaixar na caixa do módulo de gavetas
  let mat = LightWodd;
  if (m == 1) { mat = LightWodd; }
  if (m == 2) { mat = metal; }
  if (m == 3) { mat = glass; }
  let mac = new THREE.Mesh(geometry, mat);
  mac.position.set(x, y, z);
  scene.add(mac);

  let mGeo = new THREE.BoxGeometry(.05, .05, .05);

  let macaneta = new THREE.Mesh(mGeo, glass);
  macaneta.position.set(x, y, (z + dz / 2) - 0.025);
  scene.add(macaneta);
  const drawer = [mac,macaneta];
  return drawer;
}

var closedDoor = function (armx, army, armz, m, scene) {
  let mat = LightWodd;


  if (m == 1) { mat = LightWodd; }
  if (m == 2) { mat = metal; }
  if (m == 3) { mat = glass; }

    var paiAuxDir = new THREE.Object3D();
    var paiAuxEsq = new THREE.Object3D();
    paiAuxDir.position.set(armx /2 + .01, 0, armz / 2);
    paiAuxEsq.position.set(-armx /2  + .01, 0, armz / 2);

    let porta = new THREE.BoxGeometry(armx / 2 - .01, army, .02, mat);
    let esquerda = new THREE.Mesh(porta, mat);
    let direita = new THREE.Mesh(porta, mat);
    esquerda.position.set(armx / 4 - .01, 0,0);
    direita.position.set(-armx / 4 + .01, 0, 0);
    paiAuxEsq.add(esquerda);
    paiAuxDir.add(direita);
    portaDireita = direita;
    portaEsquerda = esquerda;

    let mGeo = new THREE.BoxGeometry(.025, .1, .05);

    let macanetaEsq = new THREE.Mesh(mGeo, glass);
    macanetaEsq.position.set(+armx / 4, 0, 0.018);
    let macanetaDir = new THREE.Mesh(mGeo, glass);
    macanetaDir.position.set(-armx / 4, 0,0.018);
    paiAuxEsq.add(macanetaEsq);
    paiAuxDir.add(macanetaDir);
    macanetaPortaDireita=macanetaDir;
    macanetaPortaEsquerda=macanetaEsq;

    portaEsquerdaPai=paiAuxEsq;
    portaDireitaPai=paiAuxDir;

    scene.add(portaDireitaPai);
    scene.add(portaEsquerdaPai);
}
