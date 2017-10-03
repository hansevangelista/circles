class Circle {
	constructor(left, top) {

		this.left = left
		this.top = top
		this.color = colors[Math.floor(Math.random()*colors.length)]

		this.el = this.createDiv()

		this.pos = this.calculePos()
		this.dis = this.calculeDis()
		this.size = this.calculeSize()

		this.setSize()
	}

	createDiv() {
		var iDiv = document.createElement('div')
		iDiv.className = 'point'
		iDiv.style.left = `${this.left}px`
		iDiv.style.top = `${this.top}px`
		iDiv.style.background = this.color

		container.appendChild(iDiv)

		return iDiv
	}

	scroll() {
		this.updatePos()
		this.updateDis()
		this.updateSize()

		this.setSize()
	}

	setSize() {
		this.el.style.transform = `scale(${this.size})`
	}

	calculePos() {
		var p = this.el.getBoundingClientRect()
		return { x: p.x, y: p.y}
	}
	updatePos() {
		this.pos = this.calculePos()
	}
	calculeDis() {
		var a = this.pos.x - C.x
		var b = this.pos.y - C.y
		var d = Math.sqrt( a*a + b*b)
		return d
	}
	updateDis() {
		this.dis = this.calculeDis()
	}
	calculeSize() {
		if (this.dis < C.r) {
			var r = this.dis/C.r
			// return (1-r) * 42
			return (1-r) * 28
		}
		return 1
	}
	updateSize() {
		this.size = this.calculeSize()
	}
}

var C = {x: 650, y: 350, r: 300}
var colors = ['#FC2D79', '#c1c1c1', '#4A90E2', '#FCB635']
var container = document.querySelector('.container')
var dist = 100
var rows = Math.trunc(container.offsetWidth / dist)
var columns = Math.trunc(container.offsetHeight / dist)

var circles = []

for (var i = 0; i < rows; i++) {
	for (var j = 0; j < columns; j++) {

		var x, y = i*dist + dist/2

		if(i % 2 == 0) x = (j + 1) * dist
		else x = j*dist + dist/2

		if( x == container.offsetWidth) break

		circles.push(new Circle(x, y))
	}
}

window.addEventListener("scroll", function () {
	for (var i = 0; i < circles.length; i++) {
		var circle = circles[i]
		circle.scroll()
	}
});
