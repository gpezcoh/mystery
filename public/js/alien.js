var scene, camera, renderer, player;
var geometry, material, water, middle, helper;
var mouse = {"x": 0, "y" : 0};
var b = new THREE.Vector3(00,0,0);

var phi = Math.PI/2;
var theta = 0; // x and y move
var r = 1000;
var camPhi = Math.PI/4;
var camTheta = 1; // x and y move

var rows = 10;
var cols = 10;

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

function movePlayer(direction){
    if(direction === 0){
        if(player.position.z > -90){
            player.position.z-=10;
        }
    }
    else if(direction == 1){
        if(player.position.z < 0){
            player.position.z+=10;
        }
    }
    else if(direction == 2){
        if(player.position.x > 0){
            player.position.x-=10;
        }
    }
    else if(direction == 3){
        if(player.position.x < 90){
            player.position.x+=10;
        }
    }
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
    // moveCam()
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    // moveCam()
    camera.up = new THREE.Vector3(0,1,0);
    camera.position.y = 100
    camera.position.z = 150
    camera.lookAt(b)
    camera.position.z = 50
    camera.position.x = 50

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

    for ( i = 0; i < rows; ++i ) {
      for ( j = 0; j < cols; ++j) {
        if(Math.abs(i-j) < 3){
            instance = middle.clone();
        }
        else{
            instance = water.clone();
        }
        instance.position.set( i*10, 0, j*-10 );
        helper = new THREE.EdgesHelper( instance, "black" ); // or THREE.WireframeHelper
        helper.material.linewidth = 2;
        scene.add( instance );
        scene.add( helper );
      }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( $(document).width(), $(document).height() );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}