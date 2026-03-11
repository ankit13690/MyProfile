/* =========================
DEVOPS TOOLS
========================= */

function renderTools(){

const tools = [

{name:"AWS",icon:"assets/tools/aws.png",class:"tool-aws"},
{name:"Docker",icon:"assets/tools/docker.png",class:"tool-docker"},
{name:"Kubernetes",icon:"assets/tools/kubernetes.png",class:"tool-kubernetes"},
{name:"Terraform",icon:"assets/tools/terraform.png",class:"tool-terraform"},
{name:"Jenkins",icon:"assets/tools/jenkins.png",class:"tool-jenkins"},
{name:"GitHub Actions",icon:"assets/tools/github-actions.png",class:"tool-github"},
{name:"Ansible",icon:"assets/tools/ansible.png",class:"tool-ansible"},
{name:"Prometheus",icon:"assets/tools/prometheus.png",class:"tool-monitor"},
{name:"Grafana",icon:"assets/tools/grafana.png",class:"tool-monitor"},
{name:"Helm",icon:"assets/tools/helm.png",class:"tool-kubernetes"},
{name:"Redis",icon:"assets/tools/redis.png",class:"tool-monitor"},
{name:"MySQL",icon:"assets/tools/mysql.png",class:"tool-monitor"},
{name:"Python",icon:"assets/tools/python.png",class:"tool-monitor"},
{name:"Bash",icon:"assets/tools/bash.png",class:"tool-monitor"}

]

const container = document.getElementById("toolsContainer")

container.innerHTML=""

tools.forEach(tool=>{

const card = document.createElement("div")

card.className = `tool-card ${tool.class}`

card.innerHTML = `
<img src="${tool.icon}">
<p>${tool.name}</p>
`

container.appendChild(card)

})

}

/* =========================
LOAD DATA.JSON
========================= */

async function loadPortfolioData(){

try{

const response = await fetch("data.json")
const data = await response.json()

renderHero(data)
renderMetrics(data.metrics)
renderAbout(data.summary)
renderSkills(data.skills)
renderCompanies(data.companies)
renderExperience(data.experience)
renderProjects(data.projects)
renderTools()

attachContactLinks(data.personal)

}catch(error){

console.error("Error loading data:", error)

}

}



/* =========================
HERO SECTION
========================= */

function renderHero(data){

document.getElementById("profileImage").src = data.personal.profileImage
document.getElementById("heroName").innerText = data.personal.name
document.getElementById("heroTitle").innerText = data.personal.title
document.getElementById("heroTagline").innerText = data.personal.tagline

}



/* =========================
METRICS BUTTONS
========================= */

function renderMetrics(metrics){

const container = document.getElementById("metricsContainer")

container.innerHTML = ""

metrics.forEach(metric => {

const card = document.createElement("div")
card.className = "metric-card"

card.innerHTML = `
<div class="metric-number">${metric.value}</div>
<div class="metric-label">${metric.label}</div>
`

container.appendChild(card)

})

}



/* =========================
ABOUT SECTION
========================= */

function renderAbout(summary){

const about = document.getElementById("aboutText")

about.innerText = summary

}



/* =========================
SKILLS SECTION
========================= */

function renderSkills(skills){

const container = document.getElementById("skillsContainer")

container.innerHTML = ""

Object.keys(skills).forEach(category => {

const card = document.createElement("div")
card.className = "skill-card"

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



/* =========================
COMPANIES SECTION
========================= */

function renderCompanies(companies){

const container = document.getElementById("companiesContainer")

container.innerHTML = ""

companies.forEach(company => {

const card = document.createElement("div")
card.className = "company-card"

card.innerHTML = `
<img src="${company.logo}">
<h3>${company.name}</h3>
<p>${company.industry}</p>
`

container.appendChild(card)

})

}



/* =========================
EXPERIENCE SECTION
========================= */

function renderExperience(exp){

const container = document.getElementById("experienceContainer")

container.innerHTML = ""

exp.forEach(item => {

const card = document.createElement("div")
card.className = "experience-card"

let responsibilities = ""

item.responsibilities.forEach(r => {

responsibilities += `<li>${r}</li>`

})

card.innerHTML = `
<h3>${item.role}</h3>
<h4>${item.company}</h4>
<p>${item.duration} • ${item.location}</p>
<ul>${responsibilities}</ul>
`

container.appendChild(card)

})

}



/* =========================
PROJECTS SECTION
========================= */

function renderProjects(projects){

const container = document.getElementById("projectsContainer")

container.innerHTML = ""

projects.forEach(project => {

const card = document.createElement("div")
card.className = "project-card"

let tech = project.technologies.join(", ")

card.innerHTML = `
<h3>${project.name}</h3>
<p>${project.description}</p>
<p><b>Impact:</b> ${project.impact}</p>
<p><b>Tech:</b> ${tech}</p>
`

container.appendChild(card)

})

}



/* =========================
CONTACT LINKS
========================= */

function attachContactLinks(personal){

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