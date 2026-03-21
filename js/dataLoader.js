/* =========================================
SKILL ICONS
========================================= */

const TOOL_ICON_MAP = {

"AWS":"assets/tools/aws.png",
"Azure":"assets/tools/azure.png",
"GCP":"assets/tools/databricks.png",
"Databricks":"assets/tools/databricks.png",

"Docker":"assets/tools/docker.png",
"Kubernetes":"assets/tools/kubernetes.png",
"Helm":"assets/tools/helm.png",

"Terraform":"assets/tools/terraform.png",
"Ansible":"assets/tools/ansible.png",

"Jenkins":"assets/tools/jenkins.png",
"GitHub Actions":"assets/tools/github-actions.png",
"GitLab CI":"assets/tools/argocd.png",

"Prometheus":"assets/tools/prometheus.png",
"Grafana":"assets/tools/grafana.png",
"ELK Stack":"assets/tools/elk.png",

"Redis":"assets/tools/redis.png",
"MySQL":"assets/tools/mysql.png",
"PostgreSQL":"assets/tools/postgres.png",

"Python":"assets/tools/python.png",
"Bash":"assets/tools/bash.png"

}



/* =========================================
LOAD DATA.JSON
========================================= */

async function loadPortfolioData(){

try{

const response = await fetch("data.json")
const data = await response.json()

renderHero(data)
renderMetrics(data.metrics)
renderAbout(data.summary)

renderSkills(data.skills)
renderExperience(data.experience, data.companies)
renderProjects(data.projects)

renderCertifications(data.certifications)

attachContactLinks(data.personal)

}catch(error){

console.error("Error loading data:", error)

}

}



/* =========================================
HERO
========================================= */

function renderHero(data){

document.getElementById("profileImage").src = data.personal.profileImage
document.getElementById("heroName").innerText = data.personal.name
document.getElementById("heroTitle").innerText = data.personal.title
document.getElementById("heroTagline").innerText = data.personal.tagline

}



/* =========================================
METRICS
========================================= */

function renderMetrics(metrics){

const container = document.getElementById("metricsContainer")
if(!container) return

container.innerHTML = ""

metrics.forEach(metric => {

const rawValue = String(metric.value).trim()
const value = parseInt(rawValue, 10)
const hasPlus = rawValue.includes("+")

const card = document.createElement("div")
card.className = "metric-card"

card.innerHTML = `
<div class="metric-number" data-target="${value}" data-plus="${hasPlus}">0</div>
<div class="metric-label">${metric.label}</div>
`

container.appendChild(card)

})

/* 🔥 START COUNTER ANIMATION AFTER RENDER */

setTimeout(()=>{
animateCounters()
},200)

}



/* =========================================
COUNTER ANIMATION
========================================= */

function animateCounters(){

const counters = document.querySelectorAll(".metric-number")

counters.forEach(counter => {

const target = +counter.getAttribute("data-target")
const hasPlus = counter.getAttribute("data-plus") === "true"

let count = 0

const increment = target / 80

function update(){

count += increment

if(count < target){

counter.innerText = Math.floor(count)

requestAnimationFrame(update)

}else{

counter.innerText = hasPlus ? target + "+" : target

}

}

update()

})

}



/* =========================================
ABOUT
========================================= */

function renderAbout(summary){

const about = document.getElementById("aboutText")
if(about) about.innerText = summary

}



/* =========================================
SKILLS
========================================= */

function renderSkills(skills){

const container = document.getElementById("skillsContainer")
if(!container) return

container.innerHTML = ""

Object.keys(skills).forEach(category => {

const card = document.createElement("div")
card.className = "skill-card"

let items = ""

skills[category].forEach(skill => {

const icon = TOOL_ICON_MAP[skill.name]
const iconHtml = icon ? `<img src="${icon}" alt="${skill.name}">` : ""
items += `<li class="skill-item">${iconHtml}<span>${skill.name}</span></li>`

})

card.innerHTML = `
<h3>${category}</h3>
<ul>${items}</ul>
`

container.appendChild(card)

})

}



/* =========================================
EXPERIENCE
========================================= */

function renderExperience(exp, companies){

const container = document.getElementById("experienceContainer")
if(!container) return

container.innerHTML = ""

const companyLogos = {}
if(Array.isArray(companies)){
companies.forEach(company => {
companyLogos[company.name] = company.logo
})
}

exp.forEach(item => {

const card = document.createElement("div")
card.className = "experience-card"

let responsibilities = ""

item.responsibilities.forEach(r=>{
responsibilities += `<li>${r}</li>`
})

const logo = companyLogos[item.company]
const logoHtml = logo ? `<img class="experience-logo" src="${logo}" alt="${item.company} logo">` : ""

card.innerHTML = `
${logoHtml}
<h3>${item.role}</h3>
<h4>${item.company}</h4>
<p>${item.duration} • ${item.location}</p>
<ul>${responsibilities}</ul>
`

container.appendChild(card)

})

}



/* =========================================
PROJECTS
========================================= */

function renderProjects(projects){

const container = document.getElementById("projectsContainer")
if(!container) return

container.innerHTML = ""

projects.forEach(project => {

const card = document.createElement("div")
card.className = "project-card"

let tech = project.technologies.join(", ")

card.innerHTML = `
<h3>${project.name}</h3>
<p><b>Category:</b> ${project.category}</p>
<p>${project.description}</p>
<p><b>Impact:</b> ${project.impact}</p>
<p><b>Tech:</b> ${tech}</p>
`

container.appendChild(card)

})

}



/* =========================================
CERTIFICATIONS
========================================= */

function renderCertifications(certifications){

const container = document.getElementById("certificationsContainer")
if(!container) return

container.innerHTML=""

certifications.forEach(cert => {

const card = document.createElement("div")
card.className="skill-card text-center"

card.innerHTML=`<h3>${cert}</h3>`

container.appendChild(card)

})

}



/* =========================================
CONTACT LINKS
========================================= */

function formatPhoneDisplay(rawPhone){

if(!rawPhone) return ""
if(rawPhone.includes("-")) return rawPhone

if(rawPhone.startsWith("+91") && rawPhone.length >= 13){
return `+91-${rawPhone.slice(3)}`
}

return rawPhone

}

function attachContactLinks(personal){

setTimeout(()=>{

document.getElementById("emailLink").href=`mailto:${personal.email}`
document.getElementById("whatsappLink").href=personal.whatsapp
document.getElementById("linkedinLink").href=personal.linkedin
document.getElementById("githubLink").href=personal.github
document.getElementById("resumeBtn").href=personal.resume

document.getElementById("footerEmail").href=`mailto:${personal.email}`
document.getElementById("footerWhatsapp").href=personal.whatsapp
document.getElementById("footerLinkedin").href=personal.linkedin
document.getElementById("footerGithub").href=personal.github
document.getElementById("footerResume").href=personal.resume

const phoneText = formatPhoneDisplay(personal.phone)

const headerPhoneText = document.getElementById("headerPhoneText")
if(headerPhoneText) headerPhoneText.innerText = phoneText

const footerPhoneText = document.getElementById("footerPhoneText")
if(footerPhoneText) footerPhoneText.innerText = phoneText

document.getElementById("footerLocationText").innerText=personal.location

},500)

}
