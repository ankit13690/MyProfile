/* =========================================
INITIALIZE VISUAL EFFECTS
========================================= */

function initVisualEffects(){

createDevOpsNetwork()
createPipelineAnimation()

}



/* =========================================
DEVOPS NETWORK BACKGROUND
========================================= */

function createDevOpsNetwork(){

const canvas = document.createElement("canvas")

canvas.id = "devops-network"

canvas.style.position = "fixed"
canvas.style.top = "0"
canvas.style.left = "0"
canvas.style.width = "100%"
canvas.style.height = "100%"
canvas.style.pointerEvents = "none"
canvas.style.zIndex = "-4"

document.body.appendChild(canvas)

const ctx = canvas.getContext("2d")

function resizeCanvas(){

canvas.width = window.innerWidth
canvas.height = window.innerHeight

}

resizeCanvas()

window.addEventListener("resize", resizeCanvas)



/* NETWORK NODES */

const nodes = []

const NODE_COUNT = 80

for(let i=0;i<NODE_COUNT;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.35,
vy:(Math.random()-0.5)*0.35,

size:Math.random()*2+1

})

}



/* ANIMATION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

nodes.forEach(node=>{

node.x += node.vx
node.y += node.vy

if(node.x<0 || node.x>canvas.width) node.vx *= -1
if(node.y<0 || node.y>canvas.height) node.vy *= -1



/* NODE GLOW */

const gradient = ctx.createRadialGradient(

node.x,
node.y,
0,
node.x,
node.y,
10

)

gradient.addColorStop(0,"rgba(56,189,248,0.9)")
gradient.addColorStop(1,"rgba(56,189,248,0)")

ctx.fillStyle = gradient

ctx.beginPath()
ctx.arc(node.x,node.y,node.size,0,Math.PI*2)
ctx.fill()



/* CONNECTION LINES */

nodes.forEach(other=>{

const dx = node.x-other.x
const dy = node.y-other.y

const distance = Math.sqrt(dx*dx + dy*dy)

if(distance < 140){

ctx.strokeStyle = "rgba(56,189,248,0.10)"

ctx.beginPath()
ctx.moveTo(node.x,node.y)
ctx.lineTo(other.x,other.y)
ctx.stroke()

}

})

})

requestAnimationFrame(animate)

}

animate()

}



/* =========================================
CI/CD PIPELINE FLOW
========================================= */

function createPipelineAnimation(){

const canvas = document.createElement("canvas")

canvas.id = "pipeline-flow"

canvas.style.position = "fixed"
canvas.style.top = "0"
canvas.style.left = "0"
canvas.style.width = "100%"
canvas.style.height = "100%"
canvas.style.pointerEvents = "none"
canvas.style.zIndex = "-3"

document.body.appendChild(canvas)

const ctx = canvas.getContext("2d")

function resizeCanvas(){

canvas.width = window.innerWidth
canvas.height = window.innerHeight

}

resizeCanvas()

window.addEventListener("resize", resizeCanvas)



/* FLOW PARTICLES */

const flows = []

const FLOW_COUNT = 35

for(let i=0;i<FLOW_COUNT;i++){

flows.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

length:Math.random()*60+40,

speed:Math.random()*1.6+0.4

})

}



/* ANIMATION */

function animateFlow(){

ctx.clearRect(0,0,canvas.width,canvas.height)

flows.forEach(flow=>{

const gradient = ctx.createLinearGradient(

flow.x,
flow.y,
flow.x + flow.length,
flow.y

)

gradient.addColorStop(0,"rgba(56,189,248,0)")
gradient.addColorStop(0.5,"rgba(56,189,248,0.20)")
gradient.addColorStop(1,"rgba(56,189,248,0)")

ctx.strokeStyle = gradient

ctx.lineWidth = 2

ctx.beginPath()

ctx.moveTo(flow.x, flow.y)
ctx.lineTo(flow.x + flow.length, flow.y)

ctx.stroke()

flow.x += flow.speed

if(flow.x > canvas.width){

flow.x = -flow.length
flow.y = Math.random()*canvas.height

}

})

requestAnimationFrame(animateFlow)

}

animateFlow()

}



/* =========================================
START VISUAL EFFECTS
========================================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

initVisualEffects()

},300)

})