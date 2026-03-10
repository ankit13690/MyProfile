/* =====================================================
KUBERNETES CLUSTER ANIMATION
===================================================== */

const clusterCanvas = document.createElement("canvas")
clusterCanvas.style.position="fixed"
clusterCanvas.style.right="40px"
clusterCanvas.style.bottom="40px"
clusterCanvas.width=220
clusterCanvas.height=220
clusterCanvas.style.opacity="0.6"

document.body.appendChild(clusterCanvas)

const clusterCtx = clusterCanvas.getContext("2d")

let nodes = []

for(let i=0;i<7;i++){
nodes.push({
x:110+Math.cos(i)*60,
y:110+Math.sin(i)*60
})
}

function drawCluster(){

clusterCtx.clearRect(0,0,220,220)

nodes.forEach((node,i)=>{

clusterCtx.fillStyle="#00d2ff"
clusterCtx.beginPath()
clusterCtx.arc(node.x,node.y,6,0,Math.PI*2)
clusterCtx.fill()

clusterCtx.fillStyle="white"
clusterCtx.font="10px Arial"
clusterCtx.fillText("Pod",node.x-10,node.y-10)

nodes.forEach(other=>{

clusterCtx.strokeStyle="rgba(0,210,255,0.3)"

clusterCtx.beginPath()
clusterCtx.moveTo(node.x,node.y)
clusterCtx.lineTo(other.x,other.y)
clusterCtx.stroke()

})

})

requestAnimationFrame(drawCluster)

}

drawCluster()



/* =====================================================
INTERACTIVE ARCHITECTURE HOVER
===================================================== */

document.querySelectorAll(".architecture-card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect = card.getBoundingClientRect()

const x=e.clientX-rect.left
const y=e.clientY-rect.top

const centerX=rect.width/2
const centerY=rect.height/2

const rotateX=-(y-centerY)/20
const rotateY=(x-centerX)/20

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

})

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"

})

})



/* =====================================================
CI/CD PIPELINE VISUAL
===================================================== */

const pipeline = document.createElement("div")

pipeline.style.position="fixed"
pipeline.style.top="80px"
pipeline.style.right="40px"
pipeline.style.padding="10px 14px"
pipeline.style.background="rgba(0,0,0,0.4)"
pipeline.style.border="1px solid rgba(0,210,255,0.4)"
pipeline.style.borderRadius="8px"
pipeline.style.fontSize="12px"
pipeline.style.color="#00d2ff"

document.body.appendChild(pipeline)

let stages=["Code","Build","Test","Deploy"]
let index=0

setInterval(()=>{

pipeline.innerText="Pipeline Stage: "+stages[index]

index++

if(index>=stages.length) index=0

},2000)



/* =====================================================
GITHUB CONTRIBUTION GRAPH
===================================================== */

const githubGraph=document.createElement("img")

githubGraph.src="https://ghchart.rshah.org/00d2ff/shashisingh007"

githubGraph.style.width="100%"
githubGraph.style.marginTop="40px"

const aboutSection=document.getElementById("about")

if(aboutSection){
aboutSection.appendChild(githubGraph)
}



/* =====================================================
FLOWING INFRASTRUCTURE LINES
===================================================== */

const infraCanvas=document.createElement("canvas")

infraCanvas.style.position="fixed"
infraCanvas.style.top="0"
infraCanvas.style.left="0"
infraCanvas.style.pointerEvents="none"

infraCanvas.width=window.innerWidth
infraCanvas.height=window.innerHeight

document.body.appendChild(infraCanvas)

const infraCtx=infraCanvas.getContext("2d")

let flows=[]

for(let i=0;i<20;i++){

flows.push({
x:Math.random()*infraCanvas.width,
y:Math.random()*infraCanvas.height,
speed:Math.random()*2
})

}

function animateFlows(){

infraCtx.clearRect(0,0,infraCanvas.width,infraCanvas.height)

flows.forEach(f=>{

infraCtx.strokeStyle="rgba(0,210,255,0.1)"

infraCtx.beginPath()

infraCtx.moveTo(f.x,f.y)
infraCtx.lineTo(f.x+40,f.y)

infraCtx.stroke()

f.x+=f.speed

if(f.x>infraCanvas.width) f.x=0

})

requestAnimationFrame(animateFlows)

}

animateFlows()