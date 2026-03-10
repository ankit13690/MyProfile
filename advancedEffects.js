/* =================================================
AI NETWORK BACKGROUND
================================================= */

const canvas = document.getElementById("devopsBackground")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let nodes = []

for(let i=0;i<80;i++){

nodes.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5
})

}

function drawNetwork(){

ctx.clearRect(0,0,canvas.width,canvas.height)

nodes.forEach(node => {

node.x += node.vx
node.y += node.vy

if(node.x<0||node.x>canvas.width) node.vx*=-1
if(node.y<0||node.y>canvas.height) node.vy*=-1

ctx.fillStyle="rgba(0,210,255,0.8)"
ctx.beginPath()
ctx.arc(node.x,node.y,2,0,Math.PI*2)
ctx.fill()

nodes.forEach(other=>{

const dx=node.x-other.x
const dy=node.y-other.y

const dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.strokeStyle="rgba(0,210,255,0.1)"
ctx.beginPath()
ctx.moveTo(node.x,node.y)
ctx.lineTo(other.x,other.y)
ctx.stroke()

}

})

})

requestAnimationFrame(drawNetwork)

}

drawNetwork()



/* =================================================
CURSOR GLOW TRAIL
================================================= */

const cursor = document.createElement("div")

cursor.style.position="fixed"
cursor.style.width="20px"
cursor.style.height="20px"
cursor.style.borderRadius="50%"
cursor.style.pointerEvents="none"
cursor.style.background="rgba(0,210,255,0.7)"
cursor.style.boxShadow="0 0 20px rgba(0,210,255,0.8)"

document.body.appendChild(cursor)

document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"

})



/* =================================================
MAGNETIC BUTTONS
================================================= */

document.querySelectorAll(".resume-btn,.icon-btn").forEach(btn=>{

btn.addEventListener("mousemove",e=>{

const rect = btn.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width/2
const centerY = rect.height/2

const moveX=(x-centerX)/6
const moveY=(y-centerY)/6

btn.style.transform=`translate(${moveX}px,${moveY}px)`

})

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translate(0,0)"

})

})



/* =================================================
DEVOPS TOOLS ORBIT
================================================= */

const tools = document.querySelectorAll(".tool-card")

let angle=0

function orbitTools(){

angle+=0.002

tools.forEach((tool,i)=>{

const radius=10

tool.style.transform=`
translateY(${Math.sin(angle+i)*radius}px)
`

})

requestAnimationFrame(orbitTools)

}

orbitTools()



/* =================================================
SCROLL PROGRESS BAR
================================================= */

const progress=document.createElement("div")

progress.style.position="fixed"
progress.style.top="0"
progress.style.left="0"
progress.style.height="4px"
progress.style.background="#00d2ff"
progress.style.zIndex="9999"

document.body.appendChild(progress)

window.addEventListener("scroll",()=>{

const scrollTop=window.scrollY
const height=document.body.scrollHeight-window.innerHeight

const percent=(scrollTop/height)*100

progress.style.width=percent+"%"

})



/* =================================================
CI/CD PIPELINE VISUAL ANIMATION
================================================= */

const pipeline = document.createElement("div")

pipeline.style.position="fixed"
pipeline.style.bottom="20px"
pipeline.style.left="20px"
pipeline.style.color="#00d2ff"
pipeline.style.fontSize="12px"
pipeline.style.opacity="0.6"

pipeline.innerHTML="CI/CD Pipeline Running..."

document.body.appendChild(pipeline)

setInterval(()=>{

pipeline.innerHTML="CI/CD Pipeline Running" + ".".repeat(Math.floor(Math.random()*4))

},700)