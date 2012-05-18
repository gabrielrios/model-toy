function App () {
	var canvas = $('#sheet')[0]
	if (!canvas) return
	var ctx = canvas.getContext("2d")
	if (!ctx) return

	this.canvas = canvas
	this.ctx = ctx

	this.shapes = []

	
		v = new Shape()
		this.shapes.push(v)


	this.snapDiv = 20.0;
	this.dragging = null;

	var in_app = this

	this.canvas.addEventListener("mousedown", function(ev) {
		ev = ev || window.event;
		if (ev.preventDefault)
			ev.preventDefault();

		mcoord = getMouseOffset(in_app.canvas, ev)

		in_app.shapes.forEach(function(s){
			s.vertices.forEach(function(v){
				if (v.collided(mcoord)) {
					in_app.dragging = v
				} 
			})
		})
	})

	this.canvas.addEventListener("mousemove", function(ev) {
		ev = ev || window.event;
		if (ev.preventDefault)
			ev.preventDefault();

		mcoord = getMouseOffset(in_app.canvas, ev)
		if (in_app.dragging) {
			in_app.dragging.move(mcoord)
		}

		in_app.shapes.forEach(function(s) {
			s.vertices.forEach(function(v){
				if (v.collided(mcoord)) {
					v.over = true
				} else {
					v.over = false
				}
			})
		})
		in_app.draw()
	})

	this.canvas.addEventListener("mouseup", function(ev){
		ev = ev || window.event;
		if (ev.preventDefault)
			ev.preventDefault();

		in_app.dragging = null;
	})
}

App.prototype = {
	draw : function() {
		if (!this.ctx)
			return;
		var ctx = this.ctx;
		var cw = this.canvas.width;
		var ch = this.canvas.height;

		// Clear bg.
		ctx.fillStyle = "#eee";
		ctx.fillRect(0,0,cw,ch);

		ctx.beginPath();  
		for (var i = 0; i < cw; i += this.snapDiv) {
			ctx.moveTo(i+0.5,0);
			ctx.lineTo(i+0.5,ch);
		}
		for (var i = 0; i < ch; i += this.snapDiv) {
			ctx.moveTo(0,i+0.5);
			ctx.lineTo(cw,i+0.5);
		}
		ctx.lineWidth = 1.0;
		ctx.strokeStyle = "rgba(255,255,255,0.8)";
		ctx.stroke();

		this.shapes.forEach(function(i) {
			i.draw(ctx)
		})

		// for (var i = 0; i < this.shapes.length; i++) {
		// 	this.shapes[i].draw(ctx, this.tanType);
		// }

		// if (this.hit !== null) {
		// 	this.shapes[this.hit.shape].drawHit(ctx, this.hit.vert);	
		// }

	}

}

function mouseCoords(ev) {
	if (ev.pageX || ev.pageY) {
		return {
			x:ev.pageX,
			y:ev.pageY
		};
	}
	return {
		x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y: ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

function getMouseOffset(target, ev) {
	ev = ev || window.event;
	var targetOrig = getElementOrigin(target);
	var mousePos  = mouseCoords(ev);
	return {
		x: mousePos.x - targetOrig.x,
		y: mousePos.y - targetOrig.y
	};
}

function getElementOrigin(e) {
	var left = 0;
	var top = 0;
	while (e) {
		left += e.offsetLeft;
		top  += e.offsetTop;
		e = e.offsetParent;
	}
	return {
		x: left,
		y: top
	};
}

$(document).ready(function() {

	app = new App();
	app.draw()

});
