class Player {
	constructor(){
		this.sprite;
		this.spot = [0,0];
		this.nextSpot = [0,0];
		this.nextSelectSpot = [0,0];
		this.selectSpot = [];
		this.skills = [];
		this.selectedSkill = 0;
		this.affectedSpot;
	}

	moveCamWithPlayer(){
	    camera.position.x = 50 + this.spot[0] * 10
	    camera.position.z = 50 + this.spot[1] * -10
	}

	valid(spot){
	    if(spot[0] >= 0 && spot[0] < cols && spot[1] >= 0 && spot[1] < rows){
	    	if(this.selectSpot.length > 0){
	    		this.removeSelect(); //sketchy?
	    	}
	        return true;
	    }
	    return false;
	}

	checkSpot(){
	    if(this.valid(this.nextSpot) && map[this.nextSpot[1]][this.nextSpot[0]].movable){
	        this.sprite.position.x = this.nextSpot[0] * 10
	        this.sprite.position.z = this.nextSpot[1] * -10
	        this.spot[0] = this.nextSpot[0]
	        this.spot[1] = this.nextSpot[1]
	    }
	    else{
	        this.nextSpot[0] = this.spot[0]
	        this.nextSpot[1] = this.spot[1]
	    }
	}

	movePlayer(direction){
	    if(direction === 0){
	        this.nextSpot[1]++;
	        this.checkSpot()
	    }
	    else if(direction == 1){
	        this.nextSpot[1]--;
	        this.checkSpot()
	    }
	    else if(direction == 2){
	        this.nextSpot[0]--;
	        this.checkSpot()
	    }
	    else if(direction == 3){
	        this.nextSpot[0]++;
	        this.checkSpot()
	    }
	    this.moveCamWithPlayer()
	}

	moveSelect(direction){
		this.nextSelectSpot[0] = this.spot[0];
		this.nextSelectSpot[1] = this.spot[1];
		if(direction === 0){
	        this.nextSelectSpot[1]++;
	        this.checkSelect()
	    }
	    else if(direction == 1){
	        this.nextSelectSpot[1]--;
	        this.checkSelect()
	    }
	    else if(direction == 2){
	        this.nextSelectSpot[0]--;
	        this.checkSelect()
	    }
	    else if(direction == 3){
	        this.nextSelectSpot[0]++;
	        this.checkSelect()
	    }
	}
	checkSelect(){
	    if(this.valid(this.nextSelectSpot)){
	    	this.oldSelectMaterial = map[this.nextSelectSpot[1]][this.nextSelectSpot[0]].sprite[0].material
	    	map[this.nextSelectSpot[1]][this.nextSelectSpot[0]].sprite[0].material = new THREE.MeshBasicMaterial( { color: "red"} );
	        this.selectSpot[0] = this.nextSelectSpot[0]
	        this.selectSpot[1] = this.nextSelectSpot[1]
	    }
	    else{
	        this.nextSelectSpot[0] = this.selectSpot[0]
	        this.nextSelectSpot[1] = this.selectSpot[1]
	    }
	}

	removeSelect(){
		console.log(map[this.selectSpot[1]][this.selectSpot[0]].sprite[0].material)
		if(map[this.selectSpot[1]][this.selectSpot[0]].sprite[0].material !== map[this.selectSpot[1]][this.selectSpot[0]].originalMaterial){
			map[this.selectSpot[1]][this.selectSpot[0]].sprite[0].material = map[this.selectSpot[1]][this.selectSpot[0]].originalMaterial;
			this.selectSpot = [];
		}
	}

	addSkill(name){
		var tempSkill = new Skill(name);
		var skillBox = document.getElementById("skill-" + this.skills.length)
		var div = document.createElement('div'); // future gabe plz make this an svg at some point
		div.id = name;
		div.style.top = "25px"
		div.style.left = "20px"
		skillBox.appendChild(div);
		this.skills.push(tempSkill);
	}
	useSkill(){
		if(this.selectSpot.length > 0){
			var skill = this.skills[this.selectedSkill].sprite;
			for(let x of skill){
				x.position.x = this.selectSpot[0] * 10;
			    x.position.z = this.selectSpot[1] * -10;
			    scene.add(x);
			    addHelper(x);
			}
		    map[this.selectSpot[1]][this.selectSpot[0]].interactedWith(this.skills[this.selectedSkill].name);
		    if(this.affectedSpot !== map[this.selectSpot[1]][this.selectSpot[0]]){
		    	if(this.affectedSpot){
		    		this.affectedSpot.movable = this.affectedSpot.defaultMovable;
		    	}
		    	this.affectedSpot = map[this.selectSpot[1]][this.selectSpot[0]]
			}
		    this.removeSelect(); // i might need this
		}
	}

}