var LivingCreature = require("./class.Parent");

////////////////////////////////////
//Grass
////////////////////////////////////
module.exports = class grass extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.color = "green";
		this.multiply = 8;
	}
	mul() {
        this.multiply++;
		var newCel = random(this.chooseCell(0));
		if (this.multiply >= 3 && newCel) {
			var newGrass = new grass(newCel[0], newCel[1], this.index);
			grassArr.push(newGrass);
			matrix[newCel[1]][newCel[0]] = this.index;
			this.multiply = 0;
		}
	}

}