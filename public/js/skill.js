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
		var red = 5
		var orange = 4
		var yellow = 3
		var current;
		var color;

		var faces = []
		for(var i = 0; i < 3; ++i){
			if(i ===  0){
				current = red;
				color = "red"
			}
			else if(i === 1){
				current = orange;
				color = "orange"
			}
			else if(i === 2){
				current = yellow;
				color = "yellow"	
			}
			if(current === yellow){
				geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,0,current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(current,0,0);
				var v3 = new THREE.Vector3(0,10,0);   // 2d = all vertices in the same plane.. z = 0

				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));

			   	geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,0,current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(-current,0,0);
				var v3 = new THREE.Vector3(0,10,0);   // 2d = all vertices in the same plane.. z = 0

				// add new geometry based on the specified positions
				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));

			    geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,0,-current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(current,0,0);
				var v3 = new THREE.Vector3(0,10,0);   // 2d = all vertices in the same plane.. z = 0

				// add new geometry based on the specified positions
				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));

			    geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,0,-current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(-current,0,0);
				var v3 = new THREE.Vector3(0,10,0);   // 2d = all vertices in the same plane.. z = 0

				// add new geometry based on the specified positions
				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));
			}
			else{
				geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,5,current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(current,5,0);
				var v3 = new THREE.Vector3(0,-10,0);   // 2d = all vertices in the same plane.. z = 0

				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));

			   	geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,5,current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(-current,5,0);
				var v3 = new THREE.Vector3(0,-10,0);   // 2d = all vertices in the same plane.. z = 0

				// add new geometry based on the specified positions
				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));

			    geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,5,-current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(current,5,0);
				var v3 = new THREE.Vector3(0,-10,0);   // 2d = all vertices in the same plane.. z = 0

				// add new geometry based on the specified positions
				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));

			    geometry = new THREE.Geometry();
				var v1 = new THREE.Vector3(0,5,-current);   // Vector3 used to specify position
				var v2 = new THREE.Vector3(-current,5,0);
				var v3 = new THREE.Vector3(0,-10,0);   // 2d = all vertices in the same plane.. z = 0

				// add new geometry based on the specified positions
				geometry.vertices.push(v1);
				geometry.vertices.push(v2);
				geometry.vertices.push(v3);

				geometry.faces.push(new THREE.Face3(0, 2, 1));
			    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide});

			    faces.push(new THREE.Mesh( geometry, material ));
			}
		}

		return faces
	}
}










