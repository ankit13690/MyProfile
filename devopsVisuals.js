/* =========================
SUBTLE DEVOPS NETWORK
========================= */

const canvas = document.createElement("canvas")

canvas.style.position = "fixed"
canvas.style.top = "0"
canvas.style.left = "0"
canvas.style.width = "100%"
canvas.style.height = "100%"
canvas.style.zIndex = "-1"
canvas.style.pointerEvents = "none"

document.body.appendChild(canvas)

const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let points = []

for(let i=0;i<40;i++){

points.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.2,
vy:(Math.random()-0.5)*0.2
})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

points.forEach(p=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width) p.vx*=-1
if(p.y<0||p.y>canvas.height) p.vy*=-1

ctx.fillStyle="rgba(0,210,255,0.4)"
ctx.beginPath()
ctx.arc(p.x,p.y,2,0,Math.PI*2)
ctx.fill()

points.forEach(o=>{

const dx=p.x-o.x
const dy=p.y-o.y
const dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.strokeStyle="rgba(0,210,255,0.08)"
ctx.beginPath()
ctx.moveTo(p.x,p.y)
ctx.lineTo(o.x,o.y)
ctx.stroke()

}

})

})

requestAnimationFrame(animate)

}

animate()