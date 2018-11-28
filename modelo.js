const ARMARIO = 0;
const GAVETA = 1;
const PRATELEIRA = 2;
const CABIDE = 3;

//MATERIAIS BASE
var MadeiraClara = new THREE.MeshPhongMaterial({
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

var vidro = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xffffff,
  shininess: 30,
  transparent: true,
  opacity: 0.5,
  map: new THREE.TextureLoader().load('texturas/vidro.jpg')
});
//MATERIAIS BASE

//MATERIAIS GAVETA
//MATERIAIS GAVETA


var criarArmarioBase = function (dimx, dimy, dimz, material, scene) {
  let geometryTopo = new THREE.BoxGeometry(dimx, .02, dimz);
  let mat = MadeiraClara;
  if (material == 1) { mat = MadeiraClara; }
  if (material == 2) { mat = metal; }
  if (material == 3) { mat = vidro; }


  let cuboTopo = new THREE.Mesh(geometryTopo, mat);
  cuboTopo.position.set(0, dimy / 2, 0);
  scene.add(cuboTopo);

  // desenhar Base
  let geometryBase = new THREE.BoxGeometry(dimx, .02, dimz);
  let cuboBase = new THREE.Mesh(geometryBase, mat);
  cuboBase.position.set(0, -dimy / 2, 0);
  scene.add(cuboBase);

  // desenhar Lado Direito
  let geometryDireito = new THREE.BoxGeometry(.02, dimy, dimz);

  let cuboDireito = new THREE.Mesh(geometryDireito, mat);
  cuboDireito.position.set(dimx / 2, 0, 0);
  scene.add(cuboDireito);

  // desenhar Lado Esquerdo
  let geometryEsquerdo = new THREE.BoxGeometry(.02, dimy, dimz);

  let cuboEsquerdo = new THREE.Mesh(geometryEsquerdo, mat);
  cuboEsquerdo.position.set(-dimx / 2, 0, 0);
  scene.add(cuboEsquerdo);

  let geometry = new THREE.BoxGeometry(dimx, dimy, 0.02);

  let cubo = new THREE.Mesh(geometry, mat);
  cubo.position.set(0, 0, -dimz / 2);
  scene.add(cubo);


  let geometryC = new THREE.BoxGeometry(15, 0, 15);


  let materialC = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 30,
    map: new THREE.TextureLoader().load('texturas/wood.jpg')
  });
  

  var teto = new THREE.Mesh(geometryC,materialC);
  var chao = new THREE.Mesh(geometryC, materialC);
  scene.add(chao);
  teto.position.set(0,3.5,0);
  chao.position.set(0, -(dimy / 2)-.5 , 0);
  
  
}

var criarCabide = function (xArm, yArm, altura, material, scene) {
  let mat = MadeiraClara;
  if (material == 1) { mat = MadeiraClara; }
  if (material == 2) { mat = metal; }
  if (material == 3) { mat = vidro; }
  if (altura > yArm - .3) { altura -= .3; }
  if (altura < 0 + 0.4) { altura += 0.4; }
  let geometry = new THREE.BoxGeometry(xArm, .03, .03);

  let cubo = new THREE.Mesh(geometry, mat);
  cubo.position.set(0, altura - yArm / 2, 0);
  scene.add(cubo);

}
var criarPrateleira = function (dx, dy, dz, x, y, z, material, scene) {
  let geometry = new THREE.BoxGeometry(dx - .04, dy, dz - .04);
  let mat = MadeiraClara;
  if (material == 1) { mat = MadeiraClara; }
  if (material == 2) { mat = metal; }
  if (material == 3) { mat = vidro; }

  let cubo = new THREE.Mesh(geometry, mat);
  cubo.position.set(x, y, z);
  scene.add(cubo);
}

var criarGaveta = function (dx, dy, dz, x, y, z, m, scene) {
  let geometry = new THREE.BoxGeometry(dx - .04, dy, dz - .04); // de modo a encaixar na caixa do módulo de gavetas
  let mat = MadeiraClara;
  if (m == 1) { mat = MadeiraClara; }
  if (m == 2) { mat = metal; }
  if (m == 3) { mat = vidro; }



  let mac = new THREE.Mesh(geometry, mat);
  mac.position.set(x, y, z);
  scene.add(mac);

  let mGeo = new THREE.BoxGeometry(.05, .05, .05);

  let macaneta = new THREE.Mesh(mGeo, vidro);
  macaneta.position.set(x, y, (z + dz / 2) - 0.025);
  scene.add(macaneta);
  return mac;
}

var portaFechada = function (armx, army, armz, m, scene) {
  let mat = MadeiraClara;
  if (m == 1) { mat = MadeiraClara; }
  if (m == 2) { mat = metal; }
  if (m == 3) { mat = vidro; }

  let porta = new THREE.BoxGeometry(armx / 2 - .01, army, .02, mat);
  let esquerda = new THREE.Mesh(porta, mat);
  let direita = new THREE.Mesh(porta, mat);
  esquerda.position.set(-armx / 4 - .01, 0, armz / 2);
  direita.position.set(armx / 4 + .01, 0, armz / 2);
  scene.add(esquerda);
  scene.add(direita);

  let mGeo = new THREE.BoxGeometry(.025, .1, .05);

  let macanetaEsq = new THREE.Mesh(mGeo, vidro);
  macanetaEsq.position.set(-armx / 8, 0, (armz / 2 + .04));
  let macanetaDir = new THREE.Mesh(mGeo, vidro);
  macanetaDir.position.set(+armx / 8, 0, (armz / 2 + .04));
  scene.add(macanetaEsq);
  scene.add(macanetaDir);


}
