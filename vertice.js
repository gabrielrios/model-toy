function Vertice(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type // 0 = squared, 1 = roundedt
	this.over = false
}

Vertice.prototype = {
	draw: function(ctx) {

		ctx.lineWidth = 2.0;

		if (this.over) {
			ctx.fillStyle = "#000000";
		} else {
			ctx.fillStyle = "#999999";
		}

		switch(this.type) {
			case 0: //squaared				
				ctx.fillRect((this.x*20)-4,(this.y*20)-4,8,8)
				ctx.fillStyle = "#CCCCCC";
				ctx.fillRect((this.x*20)-2,(this.y*20)-2,4,4)
				break;
			case 1: //rounded
				ctx.beginPath();

				ctx.arc(this.x*20,this.y*20,4,0,Math.PI*2,true);
				ctx.closePath();
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle = "#CCCCCC";
				ctx.arc(this.x*20,this.y*20,2,0,Math.PI*2,true);
				ctx.closePath();
				ctx.fill();
				break;
		}
	},

	collided: function(mcoord) {
		mx = mcoord.x
		my = mcoord.y

		dx = mcoord.x-(this.x*20)
		dy = mcoord.y-(this.y*20)
		if (Math.sqrt(dx*dx + dy*dy) < 10) {
			return true
		}

		return false
	},

	move: function(mcoord) {
		this.x = Math.round(mcoord.x/20)
		this.y = Math.round(mcoord.y/20)
	}
}