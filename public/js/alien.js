var scene, camera, renderer;
var player = new Player();
var interface = document.getElementById("interface");
var geometry, material;
var tree, grass, middle, helper, trunk;
var leaves = [];
var b = new THREE.Vector3(0,0,0);

var phi = Math.PI/2;
var theta = 0; // x and y move
var r = 1000;
var camPhi = Math.PI/4;
var camTheta = 1; // x and y move

var rows = 20;
var cols = 20;
var map = []

// var mouse = {"x": 0, "y" : 0};
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

$(document).keydown(function( event ) {
    if(event.which === 38){ //up
        player.moveSelect(0)
    }
    else if(event.which == 40){ //down
        player.moveSelect(1)
    }
    else if(event.which == 37){ //left
        player.moveSelect(2)

    }
    else if(event.which == 39){ //right
        player.moveSelect(3)       
    }
    else if(event.which == 87){ //w
        player.movePlayer(0)
    }
    else if(event.which == 83){ //s
        player.movePlayer(1)

    }
    else if(event.which == 65){ //a
        player.movePlayer(2)       
    }
    else if(event.which == 68){ //d
        player.movePlayer(3)     
    }
    else if(event.which == 69){ //e
        player.useSkill()
    }
});

// function moveCamera(direction){
//     if(direction === 0){
//         camera.position.z-=10;
//     }
//     else if(direction == 1){
//         camera.position.z+=10;
//     }
//     else if(direction == 2){
//         camera.position.x-=10;
//     }
//     else if(direction == 3){
//         camera.position.x+=10;
//     }
// }



function init() {
    scene = new THREE.Scene();

    initerface(); //xd

    createCamera();

    createOriginalBlocks();

    createAndAddPlayer();

    makeMap();

    createTree();

    createMap();

    player.addSkill("fire");

    console.log(map)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( $(document).width(), $(document).height() );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}