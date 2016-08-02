class Skill {
	constructor(name){
		this.name = name;
		this.sprite = this.createSkillSprite();
	}

	createSkillSprite(){
		if(this.name === "fire"){
			return this.createFireSprite()
		}
	}

	createFireSprite(){ // plz fix tomorrrow
		var red = [5,-10,5]
		var orange = [4.5,-10,4.5]
		var red2 = [4,-10,4]
		var orange2 = [3.5,-10,3.5]
		var red3 = [3,-10,3]
		var orange3 = [2.5,-10,2.5]
		var yellow = [3,10,3]
		var current = [red,orange,red2,orange2,red3,orange3,yellow]
		var color = ["red","orange","red","orange","red","orange","yellow"]
		var offset = [10,10,12,12,14,14,8]

		var faces = []
		for(var i = 0; i < 7; ++i){
			faces.push(this.makeFace(current[i][0],current[i][1],current[i][2],color[i],offset[i]))
			faces.push(this.makeFace(-current[i][0],current[i][1],current[i][2],color[i],offset[i]))
			faces.push(this.makeFace(current[i][0],current[i][1],-current[i][2],color[i],offset[i]))
			faces.push(this.makeFace(-current[i][0],current[i][1],-current[i][2],color[i],offset[i]))
		}
		return faces
	}

	makeFace(x,y,z,color,ypos){
		geometry = new THREE.Geometry();
		var v1 = new THREE.Vector3(0,0,z);   // Vector3 used to specify position
		var v2 = new THREE.Vector3(x,0,0);
		var v3 = new THREE.Vector3(0,y,0);   // 2d = all vertices in the same plane.. z = 0

		geometry.vertices.push(v1);
		geometry.vertices.push(v2);
		geometry.vertices.push(v3);

		geometry.faces.push(new THREE.Face3(0, 2, 1));
	    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

    	var temp = new THREE.Mesh( geometry, material );
    	temp.position.y = ypos;
    	return temp
	}

}










