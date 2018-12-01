var gui;
var jar;
var chao;
const text1 = "wood";
const text2 = "steel";
const text3 = "glass";
//texutr
var texturaFinal = text1;
var texturaGav = text1;
var texturaPrat = text1;
var texturaCab = text1;
var texturaPorta = text1;
//textr
var baseCriado = false;
var xArmarioEscolhido = 0;
var yArmarioEscolhido = 0;
var zArmarioEscolhido = 0;
// dim slide bar
var armx = 1;
var army = 1;
var armz = 1;
//dim slide bar
//PRATELEIRA
var wPrat;
var hPrat;
var dPrat;
//AXIOS
var xPrat;
var yPrat;
var zPrat;
//PRATELEIRA  
//CABIDE
var alturaCabide;
//CABIDE  
//GAVETA
var wGav;
var hGav;
var dGav;
//AXIOS
var xGav;
var yGav;
var zGav;
//GAVETA
//PORTAS
var porta;
var estadoPorta = false;
//PORTAS
var itens = [];


var create_closet = {
    create_closet: function () {
        if (!baseCriado) {
            //CRIAR FOLDERS
            var texturaIP = { Textura: text1 };
            var texturas = [text1, text2, text3];
            var prat = gui.addFolder('shelf');
            var texturaP = prat.add(texturaIP, 'Textura').options(texturas);
            var wp = prat.add(parameters, 'f').min(0.1).max(armx).step(.1).name('width');
            var hp = prat.add(parameters, 'g').min(0.01).max(army / 20).step(.005).name('height');
            var dp = prat.add(parameters, 'h').min(0.1).max(armz).step(.1).name('depth');
            var xp = prat.add(parameters, 'i').min(0.1).max(armx).step(.1).name('x-pos');
            var yp = prat.add(parameters, 'j').min(0.1).max(army).step(.1).name('y-pos');
            var zp = prat.add(parameters, 'k').min(0.1).max(armz).step(.1).name('z-pos');
            wp.onChange(function (jar) { wPrat = jar });
            hp.onChange(function (jar) { hPrat = jar });
            dp.onChange(function (jar) { dPrat = jar });
            xp.onChange(function (jar) { xPrat = jar });
            yp.onChange(function (jar) { yPrat = jar });
            zp.onChange(function (jar) { zPrat = jar });
            texturaPrat = text1;
            texturaP.onChange(function () { texturaPrat = texturaIP.Textura });
            prat.add(criar_prateleira, 'criar_prateleira').name('Create shelf');

            var texturaIG = { Textura: text1 };
            var gav = gui.addFolder('drawer');
            var texturaG = gav.add(texturaIG, 'Textura').options(texturas);
            var wg = gav.add(parameters, 'l').min(0.1).max(armx).step(.1).name('width');
            var hg = gav.add(parameters, 'm').min(0.01).max(.2).step(.01).name('height');
            var dg = gav.add(parameters, 'n').min(0.1).max(armz).step(.1).name('depth');
            var xg = gav.add(parameters, 'o').min(0.1).max(armx).step(.1).name('x-pos');
            var yg = gav.add(parameters, 'p').min(0.1).max(army).step(.1).name('y-pos');
            var zg = gav.add(parameters, 'q').min(0.1).max(armz).step(.1).name('z-pos');
            wg.onChange(function (jar) { wGav = jar });
            hg.onChange(function (jar) { hGav = jar });
            dg.onChange(function (jar) { dGav = jar });
            xg.onChange(function (jar) { xGav = jar });
            yg.onChange(function (jar) { yGav = jar });
            zg.onChange(function (jar) { zGav = jar });
            texturaGav = text1;
            texturaG.onChange(function () { texturaGav = texturaIG.Textura });
            gav.add(criar_gaveta, 'criar_gaveta').name('Create drawer');

            //CABIDE
            var texturaIC = { Textura: text1 };
            var cab = gui.addFolder('hanger');
            var texturaC = cab.add(texturaIC, 'Textura').options(texturas);
            var altCab = cab.add(parameters, 'altura').min(0).max(army).step(.1).name('width');
            altCab.onChange(function (jar) { alturaCabide = jar });
            texturaCab = text1;
            texturaC.onChange(function () { texturaCab = texturaIC.Textura });
            cab.add(criar_cabide, 'criar_cabide').name('Create hanger');
            //Doors

            var por = gui.addFolder('doors');
            var texturaIPort = { Textura: text1 };
            var texturaPAux = por.add(texturaIPort, 'Textura').options(texturas);
            texturaPAux.onChange(function () { texturaPorta = texturaIPort.Textura });
            por.add(criar_portas, 'criar_portas').name('Create Doors');

            //Visualizacoes
            var visualizations = gui.addFolder('visualizations');
            visualizations.add(front_view, 'front_view').name('Front View');
            visualizations.add(top_view, 'top_view').name('Top View');
            visualizations.add(back_view, 'back_view').name('Back View');
            visualizations.add(left_side, 'left_side').name('Left Side');
            visualizations.add(right_side, 'right_side').name('Right Side');

            //CRIARFOLDER
            scene.remove(chao);
            xArmarioEscolhido = armx;
            yArmarioEscolhido = army;
            zArmarioEscolhido = armz;
            let materialCria = 1;
            if (texturaFinal == text1) {
                materialCria = 1;
            } else if (texturaFinal == text2) {
                materialCria = 2;
            } else {
                materialCria = 3;
            }
            baseCriado = true;
            criarArmarioBase(xArmarioEscolhido, yArmarioEscolhido, zArmarioEscolhido, materialCria, scene);
            
        } else {
            alert("Closet is already created!");
        }

    }
}

var criar_prateleira = {
    criar_prateleira: function () {
        if (baseCriado) {
            var xAux = xPrat - xArmarioEscolhido / 2;
            var yAux = yPrat - yArmarioEscolhido / 2;
            var zAux = zPrat - zArmarioEscolhido / 2;
            if (xAux - wPrat / 2 < - xArmarioEscolhido / 2) {
                xAux = (-xArmarioEscolhido / 2 + wPrat / 2);
            }
            if (xAux + wPrat / 2 > xArmarioEscolhido / 2) {
                xAux = (xArmarioEscolhido / 2 - wPrat / 2);
            }

            if (zAux - dPrat / 2 < -zArmarioEscolhido / 2) {
                zAux = (-zArmarioEscolhido / 2 + dPrat / 2);
            }
            if (zAux + dPrat / 2 > zArmarioEscolhido / 2) {
                zAux = (zArmarioEscolhido / 2 - dPrat / 2);
            }

            if ((yAux + hPrat / 2) > yArmarioEscolhido / 2) {
                yAux = yArmarioEscolhido / 2 - .2;
            }
            if ((yAux - hPrat / 2) < -yArmarioEscolhido / 2) {
                yAux = -yArmarioEscolhido / 2 + .2;
            }

            if ((xAux - wPrat / 2) > - xArmarioEscolhido / 2 && xAux + wPrat / 2 < xArmarioEscolhido / 2) {
                if ((zAux - dPrat / 2) > - zArmarioEscolhido / 2) {
                    zAux = -zArmarioEscolhido / 2 + dPrat / 2;

                }
            }
            let materialCria = 1;
            if (texturaPrat == text1) {
                materialCria = 1;
            } else if (texturaPrat == text2) {
                materialCria = 2;
            } else {
                materialCria = 3;
            }

            criarPrateleira(wPrat, hPrat, dPrat, xAux, yAux, zAux, materialCria, scene);
        } else {
            alert("TEM DE CRIAR UMA BASE");
        }
    }
}

var criar_gaveta = {
    criar_gaveta: function () {
        if (baseCriado) {

            var xAux = xGav - xArmarioEscolhido / 2;
            var yAux = yGav - yArmarioEscolhido / 2;
            var zAux = zGav - zArmarioEscolhido / 2;

            if (xAux - wGav / 2 < - xArmarioEscolhido / 2) {
                xAux = (-xArmarioEscolhido / 2 + wGav / 2);
            }
            if (xAux + wGav / 2 > xArmarioEscolhido / 2) {
                xAux = (xArmarioEscolhido / 2 - wGav / 2);
            }

            if (zAux - dGav / 2 < -zArmarioEscolhido / 2) {
                zAux = (-zArmarioEscolhido / 2 + dGav / 2);
            }
            if (zAux + dGav / 2 > zArmarioEscolhido / 2) {
                zAux = (zArmarioEscolhido / 2 - dGav / 2);
            }

            if ((yAux + hGav / 2) > yArmarioEscolhido / 2) {
                yAux = yArmarioEscolhido / 2 - .2;
            }
            if ((yAux - hGav / 2) < -yArmarioEscolhido / 2) {
                yAux = -yArmarioEscolhido / 2 + .2;
            }

            if ((xAux - wGav / 2) > - xArmarioEscolhido / 2 && xAux + wGav / 2 < xArmarioEscolhido / 2) {
                if ((zAux - dGav / 2) > - zArmarioEscolhido / 2) {
                    zAux = -zArmarioEscolhido / 2 + dGav / 2;

                }
            }
            let materialCria = 1;
            if (texturaGav == text1) {
                materialCria = 1;
            } else if (texturaGav == text2) {
                materialCria = 2;
            } else {
                materialCria = 3;
            }
            gaveta = true;

            criarGaveta(wGav, hGav, dGav, xAux, yAux, zAux, materialCria, scene);
        } else {
            alert("TEM DE CRIAR UMA BASE");
        }

    }
}

var criar_cabide = {
    criar_cabide: function () {
        if (baseCriado) {
            let materialCria = 1;
            if (texturaCab == text1) {
                materialCria = 1;
            } else if (texturaCab == text2) {
                materialCria = 2;
            } else {
                materialCria = 3;
            }
            criarCabide(xArmarioEscolhido, yArmarioEscolhido, alturaCabide, materialCria, scene);
        } else {
            alert("TEM DE CRIAR UMA BASE");
        }

    }
}

var criar_portas = {
    criar_portas: function () {

        for (const i in this.itens) {
            alert(i.x);
        }


        if (!estadoPorta) {
            if (baseCriado) {
                let materialCria = 1;
                if (texturaPorta == text1) {
                    materialCria = 1;
                } else if (texturaPorta == text2) {
                    materialCria = 2;
                } else {
                    materialCria = 3;
                }
                this.estadoPorta = true;
                portaFechada(xArmarioEscolhido, yArmarioEscolhido, zArmarioEscolhido, materialCria, scene);


            } else {
                alert("TEM DE CRIAR UMA BASE");
            }
        } else {
            alert("JA CRIOU PORTAS PARA O ARMARIO");
        }

    }
}

var front_view = {
    front_view: function () {
        controls.reset();
        camera.position.set(0,-2,3);
        controls.update();
    }
}


var left_side = {
    left_side: function () {
        controls.reset();
        camera.position.set(3, 0, 0);
        controls.update();
    }
}

var right_side = {
    right_side: function () {
        controls.reset();
        camera.position.set(-3, 0, 0);
        controls.update();
    }
}


var top_view = {
    top_view: function () {
        controls.reset();
        camera.position.set(0, 0, 0);
        controls.update();
    }
}

var back_view = {
    back_view: function () {
        controls.reset();
        camera.position.set(0,-2,-3);
        controls.update();
    }
}

function displayGui() {
    gui = new dat.GUI();
    parameters = {
        c: 0, d: 0, e: 0,

        //prte
        f: 0, g: 0, h: 0,
        i: 0, j: 0, k: 0,
        //gaveta
        l: 0, m: 0, n: 0,
        o: 0, p: 0, q: 0,
        //cabide
        altura: 0,
        //porta

    }

    let geometryC = new THREE.BoxGeometry(15, 0, 15);
    let paredeF = new THREE.BoxGeometry(17, 7, 0);
    let paredeL = new THREE.BoxGeometry(0, 7, 17);
    let materialC = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 30,
        map: new THREE.TextureLoader().load('../texturas/relva.jpg')
    });
    let materialparede = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 30,
        map: new THREE.TextureLoader().load('../texturas/wood.jpg')
    });
    chao = new THREE.Mesh(geometryC, materialC);
    pf = new THREE.Mesh(paredeF, materialparede);
    pt = new THREE.Mesh(paredeF, materialparede);
    pe = new THREE.Mesh(paredeL, materialparede);
    pd = new THREE.Mesh(paredeL, materialparede);
    scene.add(pf);
    scene.add(pt);
    scene.add(pe);
    scene.add(pd);
    scene.add(chao);
    pf.position.set(0, 1.5, -7.5);
    pt.position.set(0, 1.5, 7.5);
    pd.position.set(7.5, 1.5, 0);
    pe.position.set(-7.5, 1.5, 0);

    chao.position.set(0, -0.2, 0);
    //scene.remove(chao);


    var texturaInit = { Textura: text1 };
    var texturas = [text1, text2, text3];

    //var textura = gui.add(texturaInit, 'Textura').options(texturas);
    var arm = gui.addFolder('closet');
    var textura = arm.add(texturaInit, 'Textura').options(texturas);
    var dax = arm.add(parameters, 'c').min(.5).max(2).step(.1).name('width');
    var day = arm.add(parameters, 'd').min(.5).max(4).step(.10).name('height');
    var daz = arm.add(parameters, 'e').min(.5).max(2).step(.10).name('depth');

    arm.add(create_closet, 'create_closet').name('create closet');
    dax.onChange(function (jar) { armx = jar });
    day.onChange(function (jar) { army = jar });
    daz.onChange(function (jar) { armz = jar });
    texturaFinal = text1;
    textura.onChange(function () { texturaFinal = texturaInit.Textura });



    gui.open();
}