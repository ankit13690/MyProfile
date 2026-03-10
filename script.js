/* ==============================
LOAD HEADER + FOOTER
============================== */

async function loadComponents(){

const header = await fetch("components/header.html")
.then(res => res.text())

document.getElementById("header").innerHTML = header


const footer = await fetch("components/footer.html")
.then(res => res.text())

document.getElementById("footer").innerHTML = footer

}

loadComponents()



/* ==============================
LOAD DATA.JSON
============================== */

async function loadData(){

const response = await fetch("data.json")
const data = await response.json()

renderHero(data)
renderMetrics(data.metrics)
renderSkills(data.skills)
renderCompanies(data.companies)
renderExperience(data.experience)
renderProjects(data.projects)

setContactLinks(data.personal)

}

loadData()



/* ==============================
HERO
============================== */

function renderHero(data){

document.getElementById("profileImage").src = data.personal.profileImage
document.getElementById("heroName").innerText = data.personal.name
document.getElementById("heroTitle").innerText = data.personal.title
document.getElementById("heroTagline").innerText = data.personal.tagline
document.getElementById("summaryText").innerText = data.summary

typingAnimation(data.personal.title)

}



/* ==============================
TYPING EFFECT
============================== */

function typingAnimation(text){

let i = 0
const speed = 80
const element = document.getElementById("heroTitle")

element.innerHTML = ""

function type(){

if(i < text.length){
element.innerHTML += text.charAt(i)
i++
setTimeout(type,speed)
}

}

type()

}



/* ==============================
METRICS
============================== */

function renderMetrics(metrics){

const container = document.getElementById("metricsContainer")

metrics.forEach(m => {

const div = document.createElement("div")
div.className = "metric"

div.innerHTML = `
<div class="metric-value">${m.value}</div>
<div class="metric-label">${m.label}</div>
`

container.appendChild(div)

})

}



/* ==============================
SKILLS
============================== */

function renderSkills(skills){

const container = document.getElementById("skillsContainer")

Object.keys(skills).forEach(category => {

const card = document.createElement("div")
card.className = "skill-card card3d"

let items = ""

skills[category].forEach(skill => {

items += `<li>${skill.name}</li>`

})

card.innerHTML = `
<h3>${category}</h3>
<ul>${items}</ul>
`

container.appendChild(card)

})

}



/* ==============================
COMPANIES
============================== */

function renderCompanies(companies){

const container = document.getElementById("companiesContainer")

companies.forEach(c => {

const div = document.createElement("div")
div.className = "company-card card3d"

div.innerHTML = `
<img src="${c.logo}">
<h3>${c.name}</h3>
<p>${c.industry}</p>
`

container.appendChild(div)

})

}



/* ==============================
EXPERIENCE
============================== */

function renderExperience(exp){

const container = document.getElementById("experienceContainer")

exp.forEach(e => {

const div = document.createElement("div")
div.className = "experience-card card3d"

let resp = ""

e.responsibilities.forEach(r => {
resp += `<li>${r}</li>`
})

div.innerHTML = `
<h3>${e.role}</h3>
<h4>${e.company}</h4>
<p>${e.duration} • ${e.location}</p>
<ul>${resp}</ul>
`

container.appendChild(div)

})

}



/* ==============================
PROJECTS
============================== */

function renderProjects(projects){

const container = document.getElementById("projectsContainer")

projects.forEach(p => {

const div = document.createElement("div")
div.className = "project-card card3d"

let tech = p.technologies.join(", ")

div.innerHTML = `
<h3>${p.name}</h3>
<p>${p.description}</p>
<p><b>Impact:</b> ${p.impact}</p>
<p><b>Tech:</b> ${tech}</p>
`

container.appendChild(div)

})

}



/* ==============================
CONTACT LINKS
============================== */

function setContactLinks(personal){

setTimeout(() => {

document.getElementById("emailLink").href = `mailto:${personal.email}`
document.getElementById("phoneLink").href = `tel:${personal.phone}`
document.getElementById("whatsappLink").href = personal.whatsapp
document.getElementById("linkedinLink").href = personal.linkedin
document.getElementById("githubLink").href = personal.github
document.getElementById("resumeBtn").href = personal.resume

document.getElementById("footerEmail").href = `mailto:${personal.email}`
document.getElementById("footerPhone").href = `tel:${personal.phone}`
document.getElementById("footerWhatsapp").href = personal.whatsapp
document.getElementById("footerLinkedin").href = personal.linkedin
document.getElementById("footerGithub").href = personal.github
document.getElementById("footerResume").href = personal.resume

document.getElementById("footerLocationText").innerText = personal.location

},500)

}



/* ==============================
3D CARD TILT EFFECT
============================== */

document.addEventListener("mousemove", e => {

document.querySelectorAll(".card3d").forEach(card => {

const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width / 2
const centerY = rect.height / 2

const rotateX = -(y - centerY) / 20
const rotateY = (x - centerX) / 20

card.style.transform = `
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
`

})

})



/* ==============================
SCROLL REVEAL
============================== */

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show")
}

})

})

document.querySelectorAll("section").forEach(section => {
observer.observe(section)
})



/* ==============================
DEVOPS BACKGROUND PARTICLES
============================== */

const canvas = document.getElementById("devopsBackground")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<60;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speedX:Math.random()*0.3,
speedY:Math.random()*0.3
})

}

function animateBackground(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p => {

ctx.fillStyle="rgba(0,210,255,0.6)"
ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

p.x+=p.speedX
p.y+=p.speedY

if(p.x>canvas.width)p.x=0
if(p.y>canvas.height)p.y=0

})

requestAnimationFrame(animateBackground)

}

animateBackground()