var scene, camera, renderer, player;
var geometry, material, water, middle, helper;
var mouse = {"x": 0, "y" : 0};
var b = new THREE.Vector3(0,0,0);

var phi = Math.PI/2;
var theta = 0; // x and y move
var r = 1000;
var camPhi = Math.PI/4;
var camTheta = 1; // x and y move

var rows = 20;
var cols = 20;
var map = []
var playerSpot = [0,0]
var nextSpot = [0,0]

// $("body").mousemove(function(e) {
//     mouse.x = e.pageX;
//     mouse.y = e.pageY;
//     if(mouse.x > 450 && mouse.x < 825 && mouse.y > 70 && mouse.y < 450){
//         helper.material.visible = true;   
//     }
//     else{
//         helper.material.visible = false;
//     }
// })
console.log("ayy")
init();
animate();

function makeMap() {
    var test = [];
    for (var i = 0; i < rows; ++i ) {
        test = [];
        for (var j = 0; j < cols; ++j) {
            test.push(0);
        }
        map.push(test);
    }
}

function getNeg(){
    var neg
    if(Math.random() > 0.5){
        neg = -1;
    }
    else{
        neg = 1
    }
    return neg
}

$(document).keydown(function( event ) {
    if(event.which === 38){ //up
        moveCamera(0)
    }
    else if(event.which == 40){ //down
        moveCamera(1)
    }
    else if(event.which == 37){ //left
        moveCamera(2)

    }
    else if(event.which == 39){ //right
         moveCamera(3)       
    }
    else if(event.which == 87){ //w
        movePlayer(0)
    }
    else if(event.which == 83){ //s
        movePlayer(1)

    }
    else if(event.which == 65){ //a
         movePlayer(2)       
    }
    else if(event.which == 68){ //d
         movePlayer(3)       
    }
});

function valid(){
    if(nextSpot[0] >= 0 && nextSpot[0] < cols && nextSpot[1] >= 0 && nextSpot[1] < rows){
        return true;
    }
    return false;
}

function checkSpot(){
    var val = valid();
    if(val && map[nextSpot[1]][nextSpot[0]]){
        console.log("move")
        player.position.x = nextSpot[0] * 10
        player.position.z = nextSpot[1] * -10
        playerSpot[0] = nextSpot[0]
        playerSpot[1] = nextSpot[1]
    }
    else{
        console.log(playerSpot)
        nextSpot[0] = playerSpot[0]
        nextSpot[1] = playerSpot[1]
    }
    console.log(playerSpot)
    console.log(nextSpot)
}

function movePlayer(direction){
    if(direction === 0){
        nextSpot[1]++;
        checkSpot()
    }
    else if(direction == 1){
        nextSpot[1]--;
        checkSpot()
    }
    else if(direction == 2){
        nextSpot[0]--;
        checkSpot()
    }
    else if(direction == 3){
        nextSpot[0]++;
        checkSpot()
    }
    camera.position.x = playerSpot[0] * 10
    camera.position.z = 20 + playerSpot[1] * -10
    // moveCam()
}

function moveCamera(direction){
    if(direction === 0){
        camera.position.z-=10;
    }
    else if(direction == 1){
        camera.position.z+=10;
    }
    else if(direction == 2){
        camera.position.x-=10;
    }
    else if(direction == 3){
        camera.position.x+=10;
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
    console.log(prob)
    if(Math.random() > 0.5){
        return true;
    }
    return false
}

function addBlock(i,j){
    instance = middle.clone();
    console.log(i + " and " + j)
    instance.position.set( i*10, 0, j*-10 );
    helper = new THREE.EdgesHelper( instance, "black" ); // or THREE.WireframeHelper
    helper.material.linewidth = 3;
    scene.add( instance );
    scene.add( helper );
    map[j][i] = 1;
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

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    // moveCam()
    camera.up = new THREE.Vector3(0,1,0);
    camera.position.y = 300
    camera.position.z = 150
    camera.lookAt(b)
    camera.position.y = 80
    camera.position.z = 20

    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    material = new THREE.MeshBasicMaterial( { color: "green"} );
    middle = new THREE.Mesh( geometry, material );

    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    material = new THREE.MeshBasicMaterial( { color: "blue"} );
    water = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    material = new THREE.MeshBasicMaterial( { color: "red"} );
    player = new THREE.Mesh( geometry, material );
    player.position.x = 0;
    player.position.y = 10;
    player.position.z = 0;
    scene.add(player)

    helper = new THREE.EdgesHelper( player, "black" ); // or THREE.WireframeHelper
    helper.material.linewidth = 2;
    scene.add( helper );

    makeMap();

    for (var i = 0; i < 3; ++i ) {
      for (var j = 0; j < 3; ++j) {
        addBlock(i,j)
      }
    }
    addALotOfBlocks()

    // for (var i = 0; i < rows; ++i ) {
    //   for (var j = 0; j < cols; ++j) {
    //     if(Math.abs(i-j) < 3){
    //         instance = middle.clone();
    //         console.log(i + " and " + j)
    //         instance.position.set( i*10, 0, j*-10 );
    //         helper = new THREE.EdgesHelper( instance, "black" ); // or THREE.WireframeHelper
    //         helper.material.linewidth = 2;
    //         scene.add( instance );
    //         scene.add( helper );
    //         map[i][j] = 1;
    //     }
    //   }
    // }

    console.log(map)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( $(document).width(), $(document).height() );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}