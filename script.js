const App = {

data:null,

init: async function(){

this.consoleBanner()

await this.loadComponents()
await this.loadData()

this.renderAll()

this.initializeInteractions()
this.initializeCursorGlow()
this.initializeScrollEffects()
this.initializeNavbarEffects()
this.initializeHeroParallax()

setTimeout(()=>{

this.initializeAnimations()
this.initializePipelineAnimation()
this.initializeJourneyAnimation()
this.initializeToolAnimations()
this.initialize3DHovers()

},300)

},

/* =============================== */

consoleBanner(){

console.log(
"%c DevOps Portfolio Platform Loaded ",
"background:#38bdf8;color:#020617;font-weight:bold;padding:8px;border-radius:6px"
)

},

/* =============================== */

loadComponents: async function(){

await Promise.all([

this.loadComponent("header","components/header.html"),
this.loadComponent("footer","components/footer.html")

])

},

loadComponent: async function(id,file){

try{

const res=await fetch(file)
const html=await res.text()

const el=document.getElementById(id)

if(el) el.innerHTML=html

}catch(e){

console.error("Component load error:",file)

}

},

/* =============================== */

loadData: async function(){

try{

const res=await fetch("data.json")
this.data=await res.json()

}catch(e){

console.error("Failed loading data.json")

}

},

/* =============================== */

renderAll(){

if(!this.data) return

this.renderHero()
this.renderHeaderLinks()
this.renderFooterLinks()

this.renderMetrics()
this.renderContact()
this.renderSummary()

this.renderCompetencies()
this.renderSkills()
this.renderTools()

this.renderCompanies()
this.renderExperience()

this.renderProjects()

this.renderCertifications()
this.renderEducation()
this.renderAchievements()
this.renderTraining()

this.renderGitHubActivity()

},

/* =============================== */

setText(id,value){

const el=document.getElementById(id)
if(el) el.innerText=value

},

setHref(id,value){

const el=document.getElementById(id)
if(el) el.href=value

},

setSrc(id,value){

const el=document.getElementById(id)
if(el) el.src=value

},

stars(level){

let stars=""

for(let i=1;i<=5;i++){

stars += i<=level ? "★":"☆"

}

return stars

},

/* =============================== */

renderHero(){

const p=this.data.personal

this.setText("name",p.name)
this.setText("title",p.title)
this.setText("tagline",p.tagline)

this.setSrc("profileImage",p.profileImage)

this.setHref("downloadResume",p.resume)
this.setHref("linkedinBtn",p.linkedin)
this.setHref("githubBtn",p.github)
this.setHref("whatsappBtn",p.whatsapp)

},

/* =============================== */

renderHeaderLinks(){

const p=this.data.personal

this.setText("headerName",p.name)

this.setHref("headerLinkedin",p.linkedin)
this.setHref("headerGithub",p.github)
this.setHref("headerEmail","mailto:"+p.email)
this.setHref("headerWhatsapp",p.whatsapp)

this.setText("headerPhone",p.phone)
this.setText("headerLocation",p.location)

},

/* =============================== */

renderFooterLinks(){

const p=this.data.personal

this.setText("footerName",p.name)
this.setText("footerNameBottom",p.name)

this.setHref("footerLinkedin",p.linkedin)
this.setHref("footerGithub",p.github)
this.setHref("footerEmail","mailto:"+p.email)
this.setHref("footerWhatsapp",p.whatsapp)

this.setHref("footerPhone","tel:"+p.phone)

this.setText("footerPhone",p.phone)
this.setText("footerEmailText",p.email)

},

/* =============================== */

renderMetrics(){

const container=document.querySelector(".metrics-container")

if(!container || !this.data.metrics) return

container.innerHTML=this.data.metrics.map(m=>`

<div class="metric">

<h3 class="metric-number" data-value="${m.value.replace('+','')}">0</h3>

<p>${m.label}</p>

</div>

`).join("")

},

/* =============================== */

renderContact(){

const p=this.data.personal

this.setText("emailText",p.email)
this.setText("phoneText",p.phone)
this.setText("locationText",p.location)

this.setHref("contactEmailBtn","mailto:"+p.email)
this.setHref("contactLinkedinBtn",p.linkedin)
this.setHref("contactGithubBtn",p.github)

},

/* =============================== */

renderSummary(){

this.setText("summaryText",this.data.summary)

},

/* =============================== */

renderCompetencies(){

const container=document.getElementById("competenciesContainer")

if(!container) return

container.innerHTML=this.data.coreCompetencies
.map(c=>`<span class="competency">${c}</span>`)
.join("")

},

/* =============================== */

renderSkills(){

const container=document.getElementById("skillsContainer")

if(!container) return

let html=""

for(const category in this.data.skills){

html+=`<div class="skill-card"><h3>${category}</h3>`

this.data.skills[category].forEach(skill=>{

html+=`

<div class="skill">

<span>${skill.name}</span>

<span class="skill-stars">${this.stars(skill.level)}</span>

</div>

`

})

html+=`</div>`

}

container.innerHTML=html

},

/* =============================== */

renderTools(){

const container=document.getElementById("toolsContainer")

if(!container) return

let tools=[]

for(const cat in this.data.skills){

this.data.skills[cat].forEach(s=>tools.push(s.name))

}

tools=[...new Set(tools)]

container.innerHTML=tools.map(t=>{

const icon=t.toLowerCase().replace(/\s/g,"-")

return `

<div class="tool-card">

<img
src="assets/tools/${icon}.png"
alt="${t}"
class="tool-icon"
onerror="this.src='assets/tools/default.png'"

>

<span class="tool-name">${t}</span>

</div>

`

}).join("")

},

/* =============================== */

initializeAnimations(){

const counters=document.querySelectorAll(".metric-number")

counters.forEach(counter=>{

const target=+counter.dataset.value
let count=0

const update=()=>{

count+=Math.ceil(target/80)

if(count<target){

counter.innerText=count
requestAnimationFrame(update)

}else{

counter.innerText=target

}

}

update()

})

},

/* =============================== */

initializePipelineAnimation(){

const nodes=document.querySelectorAll(".pipeline-node")

nodes.forEach((node,i)=>{

setTimeout(()=>{

node.classList.add("pipeline-active")

},i*350)

})

},

/* =============================== */

initializeJourneyAnimation(){

const nodes=document.querySelectorAll(".company-node")

nodes.forEach((node,i)=>{

setTimeout(()=>{

node.classList.add("journey-visible")

},i*450)

})

},

/* =============================== */

initializeToolAnimations(){

const tools=document.querySelectorAll(".tool-card")

tools.forEach((tool,i)=>{

setTimeout(()=>{

tool.classList.add("tool-visible")

},i*60)

})

},

/* =============================== */

initialize3DHovers(){

document.querySelectorAll(".tool-card,.project-card,.experience-card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect()

const x=e.clientX-rect.left
const y=e.clientY-rect.top

card.style.transform=`rotateX(${-(y-rect.height/2)/10}deg)
rotateY(${(x-rect.width/2)/10}deg)
scale(1.05)`

})

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"

})

})

},

/* =============================== */

initializeScrollEffects(){

const sections=document.querySelectorAll(".section")

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("section-visible")

}

})

},{threshold:0.15})

sections.forEach(sec=>observer.observe(sec))

},

/* =============================== */

initializeNavbarEffects(){

window.addEventListener("scroll",()=>{

const header=document.querySelector(".header")

if(!header) return

if(window.scrollY>80){

header.classList.add("header-scrolled")

}else{

header.classList.remove("header-scrolled")

}

})

},

/* =============================== */

initializeHeroParallax(){

window.addEventListener("mousemove",e=>{

const hero=document.querySelector(".hero")

if(!hero) return

const x=(window.innerWidth/2-e.clientX)/40
const y=(window.innerHeight/2-e.clientY)/40

hero.style.transform=`translate(${x}px,${y}px)`

})

},

/* =============================== */

initializeCursorGlow(){

const glow=document.createElement("div")

glow.className="cursor-glow"

document.body.appendChild(glow)

document.addEventListener("mousemove",e=>{

glow.style.left=e.clientX+"px"
glow.style.top=e.clientY+"px"

})

}

}

document.addEventListener("DOMContentLoaded",()=>{

App.init()

})
