const App = {

data:null,

init: async function(){

this.consoleBanner()

await this.loadComponents()
await this.loadData()

this.renderAll()

this.initializeInteractions()
this.initializeScrollEffects()
this.initializeCursorGlow()
this.initializeNavbarEffects()
this.initializeHeroParallax()
this.initializeScrollProgress()

setTimeout(()=>{

this.initializeAnimations()
this.initializePipelineAnimation()
this.initializeJourneyAnimation()
this.initializeToolAnimations()
this.initialize3DHovers()

},400)

},

/* ======================================================
CONSOLE
====================================================== */

consoleBanner(){

console.log(
"%c DevOps Portfolio Platform Loaded ",
"background:#38bdf8;color:#020617;font-weight:bold;padding:8px;border-radius:6px"
)

},

/* ======================================================
LOAD COMPONENTS
====================================================== */

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

/* ======================================================
LOAD DATA
====================================================== */

loadData: async function(){

try{

const res=await fetch("data.json")
this.data=await res.json()

}catch(e){

console.error("Failed loading data.json")

}

},

/* ======================================================
RENDER
====================================================== */

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

/* ======================================================
UTILS
====================================================== */

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

/* ======================================================
HERO
====================================================== */

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

/* ======================================================
HEADER
====================================================== */

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

/* ======================================================
FOOTER
====================================================== */

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

/* ======================================================
METRICS
====================================================== */

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

/* ======================================================
PIPELINE
====================================================== */

initializePipelineAnimation(){

const nodes=document.querySelectorAll(".pipeline-node")

nodes.forEach((node,i)=>{

setTimeout(()=>{

node.classList.add("pipeline-active")

},i*300)

})

},

/* ======================================================
JOURNEY
====================================================== */

initializeJourneyAnimation(){

const nodes=document.querySelectorAll(".company-node")

nodes.forEach((node,i)=>{

setTimeout(()=>{

node.classList.add("journey-visible")

},i*350)

})

},

/* ======================================================
TOOLS
====================================================== */

initializeToolAnimations(){

const tools=document.querySelectorAll(".tool-card")

tools.forEach((tool,i)=>{

setTimeout(()=>{

tool.classList.add("tool-visible")

},i*60)

})

},

/* ======================================================
3D HOVER
====================================================== */

initialize3DHovers(){

document.querySelectorAll(".tool-card,.project-card,.experience-card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect()

const x=(e.clientX-rect.left)/rect.width
const y=(e.clientY-rect.top)/rect.height

const rotateX=(y-0.5)*10
const rotateY=(x-0.5)*-10

card.style.transform=
`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`

})

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"

})

})

},

/* ======================================================
SCROLL EFFECTS
====================================================== */

initializeScrollEffects(){

const sections=document.querySelectorAll(".section")

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("section-visible")

}

})

},{threshold:0.2})

sections.forEach(sec=>observer.observe(sec))

},

/* ======================================================
NAVBAR
====================================================== */

initializeNavbarEffects(){

window.addEventListener("scroll",()=>{

const header=document.querySelector(".header")

if(!header) return

if(window.scrollY>80){

header.style.background="rgba(2,6,23,0.9)"

}else{

header.style.background="rgba(2,6,23,0.6)"

}

})

},

/* ======================================================
HERO PARALLAX
====================================================== */

initializeHeroParallax(){

const icons=document.querySelectorAll(".floating-devops img")

document.addEventListener("mousemove",e=>{

const x=(window.innerWidth/2-e.clientX)/80
const y=(window.innerHeight/2-e.clientY)/80

icons.forEach(icon=>{

icon.style.transform=`translate(${x}px,${y}px)`

})

})

},

/* ======================================================
CURSOR
====================================================== */

initializeCursorGlow(){

const glow=document.createElement("div")
glow.className="cursor-glow"

document.body.appendChild(glow)

document.addEventListener("mousemove",e=>{

glow.style.left=e.clientX+"px"
glow.style.top=e.clientY+"px"

})

},

/* ======================================================
SCROLL PROGRESS
====================================================== */

initializeScrollProgress(){

const bar=document.createElement("div")

bar.style.position="fixed"
bar.style.top="0"
bar.style.left="0"
bar.style.height="3px"
bar.style.background="#38bdf8"
bar.style.zIndex="9999"

document.body.appendChild(bar)

window.addEventListener("scroll",()=>{

const height=
document.documentElement.scrollHeight-
document.documentElement.clientHeight

const progress=(window.scrollY/height)*100

bar.style.width=progress+"%"

})

},

/* ======================================================
CONTACT
====================================================== */

renderContact(){

const p=this.data.personal

this.setText("emailText",p.email)
this.setText("phoneText",p.phone)
this.setText("locationText",p.location)

this.setHref("contactEmailBtn","mailto:"+p.email)
this.setHref("contactLinkedinBtn",p.linkedin)
this.setHref("contactGithubBtn",p.github)

},

renderSummary(){

this.setText("summaryText",this.data.summary)

},

renderCompetencies(){

const container=document.getElementById("competenciesContainer")

if(!container) return

container.innerHTML=this.data.coreCompetencies
.map(c=>`<span class="competency">${c}</span>`)
.join("")

},

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

<img src="assets/tools/${icon}.png"
alt="${t}"
class="tool-icon"
onerror="this.src='assets/tools/default.png'">

<span class="tool-name">${t}</span>

</div>

`

}).join("")

},

renderCompanies(){

const container=document.getElementById("companyJourney")

if(!container || !this.data.companies) return

container.innerHTML=this.data.companies.map((c,i)=>`

<div class="company-node">

<img src="${c.logo}" class="company-icon">

<p>${c.name}</p>

</div>

${i<this.data.companies.length-1?`<div class="company-route-line"></div>`:""}

`).join("")

},

renderExperience(){

const container=document.getElementById("experienceContainer")

if(!container) return

container.innerHTML=this.data.experience.map(job=>`

<div class="experience-card">

<h3>${job.role}</h3>
<h4>${job.company}</h4>
<p class="duration">${job.duration}</p>

<ul>
${job.responsibilities.map(r=>`<li>${r}</li>`).join("")}
</ul>

</div>

`).join("")

},

renderProjects(){

const container=document.getElementById("projectsContainer")

if(!container) return

container.innerHTML=this.data.projects.map(p=>`

<div class="project-card">

<h3>${p.name}</h3>

<p>${p.description}</p>

<div class="tech">

${p.technologies.map(t=>`<span class="tech-badge">${t}</span>`).join("")}

</div>

</div>

`).join("")

},

renderGitHubActivity(){

const graph=document.querySelector(".github-graph img")

if(!graph) return

const username=this.data.personal.github.split("/").pop()

graph.src=`https://ghchart.rshah.org/38bdf8/${username}`

}

}

document.addEventListener("DOMContentLoaded",()=>{

App.init()

})
