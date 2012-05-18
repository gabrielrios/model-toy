function Shape () {
	this.vertices = []


	this.vertices.push(new Vertice( 3, 2, 0))
	this.vertices.push(new Vertice( 4, 3, 0))
	this.vertices.push(new Vertice( 3, 4, 0))
	this.vertices.push(new Vertice( 2, 3, 0))

	
}

Shape.prototype= { 
	draw: function(ctx) {
		ctx.beginPath();  
		
		ctx.moveTo(this.vertices[0].x*20,this.vertices[0].y*20);  
		this.vertices[0].draw(ctx)
 		for (var i = 1; i < this.vertices.length; i++) {
 			var v = this.vertices[i]
 			if (v.type == 1) {
 			} else {
				ctx.lineTo(v.x*20, v.y*20); 
			}
		}
		ctx.fill();
		ctx.closePath()

		for (var i = 0; i < this.vertices.length; i++) {
 			var v = this.vertices[i]
 			v.draw(ctx)
		}

	},

	collided: function(coord) {

	},

	move: function(coord) {

	}
}