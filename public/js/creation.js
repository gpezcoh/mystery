function makeMap() {
    var test = [];
    for (var i = 0; i < rows; ++i ) {
        test = [];
        for (var j = 0; j < cols; ++j) {
            test.push(new MapPiece());
        }
        map.push(test);
    }
}

function checkNeighbors(i,j){
    if(i === 0){
        return false
    }
    else if(i === cols-1){
        return false
    }
    if(j === 0){
        return false
    }
    else if(j === rows-1){
        return false
    }
    var prob =  map[i][j-1] + map[i-1][j];
    if(Math.random() > 0.5){
        return true;
    }
    return false
}

function addBlock(i,j,block,type){
    instance = block.clone();
    // console.log(i + " and " + j)
    instance.position.set( i*10, 0, j*-10 );
    addHelper(instance)
    scene.add( instance );
    map[j][i]["type"] = type;
    map[j][i]["sprite"] = instance;
    map[j][i]["spriteNum"] = 1;  
}

function addALotOfBlocks(){
    for (var i = 0; i < rows; ++i ) {
      for (var j = 0; j < cols; ++j) {
        if(i > 2 || j > 2){
            if(checkNeighbors(i,j)){
                addBlock(i,j);
            }
        }
      }
    }
}

function createTree(){
    geometry = new THREE.BoxGeometry( 10, 20, 10 );
    material = new THREE.MeshBasicMaterial( { color: "brown"} );
    trunk =  new THREE.Mesh( geometry, material );

    geometry = new THREE.BoxGeometry( 20, 5, 20 );
    material = new THREE.MeshBasicMaterial( { color: "green"} );
    leaves[0] =  new THREE.Mesh( geometry, material );

    geometry = new THREE.BoxGeometry( 15, 5, 15 );
    material = new THREE.MeshBasicMaterial( { color: "green"} );
    leaves[1] =  new THREE.Mesh( geometry, material );

    geometry = new THREE.BoxGeometry( 10, 5, 10 );
    material = new THREE.MeshBasicMaterial( { color: "green"} );
    leaves[2] =  new THREE.Mesh( geometry, material );
}

function makeTree(x,z){
    var tempTrunk =  trunk.clone();
    tempTrunk.position.x = x*10;
    tempTrunk.position.y = 15;
    tempTrunk.position.z = z*-10;
    scene.add(tempTrunk);
    addHelper(tempTrunk)

    var leaves0 =  leaves[0].clone()
    leaves0.position.x = x*10;
    leaves0.position.y = 20;
    leaves0.position.z = z*-10;
    scene.add(leaves0);
    addHelper(leaves0);

    var leaves1 =  leaves[1].clone()
    leaves1.position.x = x*10;
    leaves1.position.y = 25;
    leaves1.position.z = z*-10;
    scene.add(leaves1);
    addHelper(leaves1);

    var leaves2 =  leaves[2].clone()
    leaves2.position.x = x*10;
    leaves2.position.y = 30;
    leaves2.position.z = z*-10;
    scene.add(leaves2);
    addHelper(leaves2);

    return [tempTrunk,leaves0,leaves1,leaves2]
}

function addHelper(where){
    helper = new THREE.EdgesHelper( where, "black" ); // or THREE.WireframeHelper
    helper.material.linewidth = 2;
    scene.add( helper );
}

function createCamera(){
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    // moveCam()
    camera.up = new THREE.Vector3(0,1,0);
    camera.position.y = 200
    camera.position.z = 200
    camera.lookAt(b)
    camera.position.x = 50
    camera.position.y = 100
    camera.position.z = 50
}

function createOriginalBlocks(){
    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    material = new THREE.MeshBasicMaterial( { color: "#EEC45D"} );
    middle = new THREE.Mesh( geometry, material );

    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    material = new THREE.MeshBasicMaterial( { color: "green"} );
    grass = new THREE.Mesh( geometry, material );
}

function createAndAddPlayer(){
    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    material = new THREE.MeshBasicMaterial( { color: "red"} );
    player.sprite = new THREE.Mesh( geometry, material );
    player.sprite.position.x = 0;
    player.sprite.position.y = 10;
    player.sprite.position.z = 0;
    scene.add(player.sprite)
    addHelper(player.sprite);
}

function createMap(){
    for (var i = 0; i < rows; ++i ) {
      for (var j = 0; j < cols; ++j) {
        if(Math.abs(i-j) < 4){
            addBlock(i,j, middle,"path")
        }
        else{
            addBlock(i,j,grass,"grass")
            if(Math.random() > .9 && (i > 0 && j > 0) && (map[j-1][i] !== 0 && map[j-1][i-1] !== 0 && map[j][i-1] !== 0)){
                var tempTree = makeTree(i,j);
                map[j][i]["type"] = "tree";
                map[j][i]["sprite"] = tempTree;
                map[j][i]["spriteNum"] = 4;  
            }
        }
      }
    }
}

function initerface(){
	var max = 5;
	for(var i = 0; i < max; ++i){
		var div = document.createElement('div');
		div.id = "skill-" + i;
		div.className = "skill";
		div.style.top = $(document).height() - 150 + "px"; // sketchy?
		div.style.left = ($(document).width()/2) - (max*100/2) + i * 100 + "px"; // this is way more complicated than it needs to be
		interface.appendChild(div);
		// var tempSkill = new Skill() // not sure if I should add this here
	}
}





