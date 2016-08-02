class MapPiece {
	constructor(type,sprite,movable,material){
		this.type = type;
		this.sprite = sprite;
		this.movable = movable;
		this.defaultMovable = movable;
		this.originalMaterial = material;
	}

	interactedWith(name){
		if(name === "fire"){
			if(this.type === "grass"){
				this.type = "ground";
				this.sprite[0].material = ground.material;
				this.originalMaterial = this.sprite[0].material;
			}
			else if(this.type === "tree"){
				console.log(this.sprite)
				this.type = "ground";
				this.sprite[0].material = ground.material;
				this.originalMaterial = this.sprite[0].material;
				this.defaultMovable = true;
				scene.remove(this.sprite[1])
				scene.remove(this.sprite[2])
				scene.remove(this.sprite[3])
				scene.remove(this.sprite[4])
				for(var x of this.sprite[5]){
					console.log(x)
					scene.remove(x)
				}
				this.sprite = [this.sprite[0]]
			}
			this.movable = false;
		}
	}
}