var gui;
var jar;
var chao;
var texture = {
    wood: 'wood',
    steel: 'steel',
    glass: 'glass'
};
//textures
var closetTexture = texture.wood;
var drawerTexture = texture.wood;
var shelterTexture = texture.wood;
var doorTexture = texture.wood;
var createdCloset = false;
var armx = 0.5;
var army = 0.5;
var armz = 0.5;
//dim slide bar
var wPrat;
var hPrat;
var dPrat;
var xPrat;
var yPrat;
var zPrat;
var alturaCabide;
//HANGER  
var dHanger
//GAVETA
var wGav;
var hGav;
var xGav;
var yGav;
var porta;
var estadoPorta = false;
//Structures
var hangers = [];
var drawers = [];
var shelfs = [];
var objects = [];
var itens = [];
var texturesOptions = [texture.wood, texture.steel, texture.glass];

var create_closet = {
    create_closet: function () {
        if (!createdCloset) {
            var texturaIP = { Textura: texture.wood };
            var prat = gui.addFolder('shelf');
            var texturaP = prat.add(texturaIP, 'Textura').options(texturesOptions);
            var wp = prat.add(parameters, 'shelfWidth').min(0.1).max(armx).step(.1).name('Width');
            var hp = prat.add(parameters, 'shelfHeight').min(0.01).max(army / 20).step(.005).name('Heigth');
            var xp = prat.add(parameters, 'shelfX').min(0.1).max(armx).step(.1).name('x');
            var yp = prat.add(parameters, 'shelfY').min(0.1).max(army).step(.1).name('y');
            wp.onChange(function (jar) { wPrat = jar });
            hp.onChange(function (jar) { hPrat = jar });
            xp.onChange(function (jar) { xPrat = jar });
            yp.onChange(function (jar) { yPrat = jar });
            shelterTexture = texture.wood;
            texturaP.onChange(function () { shelterTexture = texturaIP.Textura });
            prat.add(create_shelf, 'create_shelf').name('Create shelf');

            var texturaIG = { Textura: texture.wood };
            var gav = gui.addFolder('drawer');
            var texturaG = gav.add(texturaIG, 'Textura').options(texturesOptions);
            var wg = gav.add(parameters, 'drawerWidth').min(0.1).max(armx).step(.1).name('Width');
            var hg = gav.add(parameters, 'drawerHeight').min(0.01).max(army).step(.01).name('Heigth');
            var xg = gav.add(parameters, 'drawerX').min(0.1).max(armx).step(.1).name('x');
            var yg = gav.add(parameters, 'drawerY').min(0.1).max(army).step(.1).name('y');
            wg.onChange(function (jar) { wGav = jar });
            hg.onChange(function (jar) { hGav = jar });
            xg.onChange(function (jar) { xGav = jar });
            yg.onChange(function (jar) { yGav = jar });
            drawerTexture = texture.wood;
            texturaG.onChange(function () { drawerTexture = texturaIG.Textura });
            gav.add(create_drawer, 'create_drawer').name('Create drawer');

            var texturaIC = { Textura: texture.wood };
            var cab = gui.addFolder('hanger');
            var depthHanger = cab.add(parameters, 'hangerDepth').min(0.1).max(armz-0.1).step(.1).name('Depth');
            depthHanger.onChange(function (jar) { dHanger = jar });
            cab.add(criar_cabide, 'criar_cabide').name('Create hanger');

            var por = gui.addFolder('doors');
            var texturaIPort = { Textura: texture.wood };
            var texturaPAux = por.add(texturaIPort, 'Textura').options(texturesOptions);
            texturaPAux.onChange(function () { doorTexture = texturaIPort.Textura });
            por.add(create_doors, 'create_doors').name('Create Doors');

            var visualizations = gui.addFolder('visualizations');
            visualizations.add(front_view, 'front_view').name('Front View');
            visualizations.add(top_view, 'top_view').name('Top View');
            visualizations.add(back_view, 'back_view').name('Back View');
            visualizations.add(left_side, 'left_side').name('Left Side');
            visualizations.add(right_side, 'right_side').name('Right Side');
            visualizations.add(parameters, 'door_slider').min(0).max(180).step(0.1).name('door_slider').onChange(move_doors);
            
            var deletion = gui.addFolder('deletions');
            deletion.add(delete_cylinder, 'delete_cylinder').name('Delete Hanger');
            deletion.add(delete_shelf, 'delete_shelf').name('Delete Shelf');
            deletion.add(delete_drawer, 'delete_drawer').name('Delete Drawer');

            scene.remove(chao);
            let materialCria = getMaterial(closetTexture);
            createdCloset = true;
            createClosetBase(armx, army, armz, materialCria, scene);
            
        } else {
            alert("Closet is already created!");
        }

    }
}

var create_shelf = {
    create_shelf: function () {
        if (createdCloset) {
            var xAux = xPrat - armx / 2;
            var yAux = yPrat - army / 2;
            var zAux = armz / 2;
            if (xAux - wPrat / 2 < - armx / 2) {
                xAux = (-armx / 2 + wPrat / 2);
            }
            if (xAux + wPrat / 2 > armx / 2) {
                xAux = (armx / 2 - wPrat / 2);
            }

            if (zAux - armz / 2 < -armz / 2) {
                zAux = (-armz / 2 + armz / 2);
            }
            if (zAux + armz / 2 > armz / 2) {
                zAux = (armz / 2 - armz / 2);
            }

            if ((yAux + hPrat / 2) > army / 2) {
                yAux = army / 2 - .2;
            }
            if ((yAux - hPrat / 2) < -army / 2) {
                yAux = -army / 2 + .2;
            }

            if ((xAux - wPrat / 2) > - armx / 2 && xAux + wPrat / 2 < armx / 2) {
                if ((zAux - armz / 2) > - armz / 2) {
                    zAux = -armz / 2 + armz / 2;

                }
            }
            let materialCria = getMaterial(shelterTexture);
            let object = createShelf(wPrat, hPrat, armz, xAux, yAux, zAux, materialCria, scene);
            shelfs.push(object);
            objects.push(object);
        } else {
            alert("You have to create a base!");
        }
    }
}

var create_drawer = {
    create_drawer: function () {
        if (createdCloset) {

            var xAux = xGav - armx / 2;
            var yAux = yGav - army / 2;
            var zAux = armz / 2;

            if (xAux - wGav / 2 < - armx / 2) {
                xAux = (-armx / 2 + wGav / 2);
            }
            if (xAux + wGav / 2 > armx / 2) {
                xAux = (armx / 2 - wGav / 2);
            }

            if (zAux - armz / 2 < -armz / 2) {
                zAux = (-armz / 2 + armz / 2);
            }
            if (zAux + armz / 2 > armz / 2) {
                zAux = (armz / 2 - armz / 2);
            }

            if ((yAux + hGav / 2) > army / 2) {
                yAux = army / 2 - .2;
            }
            if ((yAux - hGav / 2) < -army / 2) {
                yAux = -army / 2 + .2;
            }

            if ((xAux - wGav / 2) > - armx / 2 && xAux + wGav / 2 < armx / 2) {
                if ((zAux - armz / 2) > - armz / 2) {
                    zAux = -armz / 2 + armz / 2;

                }
            }
            let materialCria = getMaterial(drawerTexture);
            gaveta = true;
            drawers.push(createDrawer(wGav, hGav, armz, xAux, yAux, zAux, materialCria, scene));
        } else {
            alert("You have to create a base!");
        }

    }
}

var criar_cabide = {
    criar_cabide: function () {
        if (createdCloset) {
            hangers.push(createHanger(armx,armz, army, army, dHanger, scene));
        } else {
            alert("You have to create a base!");
        }

    }
}

var create_doors = {
    create_doors: function () {

        for (const i in this.itens) {
            alert(i.x);
        }


        if (!estadoPorta) {
            if (createdCloset) {
                let materialCria = getMaterial(doorTexture);
                this.estadoPorta = true;
                closedDoor(armx, army, armz, materialCria, scene);
            } else {
                alert("You have to create a base!");
            }
        } else {
            alert("Already created the doors of closet!");
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

var delete_cylinder = {
    delete_cylinder: function () {
        scene.remove(hangers.pop());
    }
}

var delete_shelf = {
    delete_shelf: function () {
        scene.remove(shelfs.pop());
    }
}

var delete_drawer = {
    delete_drawer: function () {
        var drawer = drawers.pop();
        drawer.forEach((mesh) => {
            scene.remove(mesh);
        })
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

function move_doors(){
    // if(baseCriado)
    // {
        //(M_PI*(x)/180)
    portaDireitaPai.rotation.y=(Math.PI*this.getValue()/180);
    portaEsquerdaPai.rotation.y=-(Math.PI*this.getValue()/180);
        // translate da macaneta com a porta
    //
    //
    // }
    // else
    // {
    //     alert("TEM DE CRIAR UMA BASE");
    // }
}


function displayGui() {
    gui = new dat.GUI();
    parameters = {
        closetWidth: armx, closetHeight: army, closetDepth: armz,
        shelfWidth: 0, shelfHeight: 0, shelfX: 0,
        shelfY: 0,
        //drawer
        door_slider: 0,
        drawerWidth: 0, drawerHeight: 0, drawerX: 0,
        drawerY: 0,
        //hanger
        hangerDepth: 0,
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


    var texturaInit = { Textura: texture.wood };

    var arm = gui.addFolder('Closet Skeletton');
    var textura = arm.add(texturaInit, 'Textura').options(texturesOptions);
    var dax = arm.add(parameters, 'closetWidth').min(.5).max(2).step(.1).name('Width');
    var day = arm.add(parameters, 'closetHeight').min(.5).max(2).step(.1).name('Heigth');
    var daz = arm.add(parameters, 'closetDepth').min(.5).max(2).step(.1).name('Depth');

    arm.add(create_closet, 'create_closet').name('create closet');
    dax.onChange(function (jar) { armx = jar });
    day.onChange(function (jar) { army = jar });
    daz.onChange(function (jar) { armz = jar });
    closetTexture = texture.wood;
    textura.onChange(function () { closetTexture = texturaInit.Textura });

    gui.open();
    return objects;
}

function getMaterial(textureMaterial) {
    if (textureMaterial === texture.wood) {
        return 1;
    } else if (textureMaterial === texture.steel) {
        return 2;
    } else {
        return 3;
    }
}