// LOAD HEADER AND FOOTER

async function loadComponents(){

const header = await fetch("components/header.html")
.then(res=>res.text())

document.getElementById("header").innerHTML = header


const footer = await fetch("components/footer.html")
.then(res=>res.text())

document.getElementById("footer").innerHTML = footer

}

loadComponents()



// LOAD DATA.JSON

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



// HERO SECTION

function renderHero(data){

document.getElementById("profileImage").src = data.personal.profileImage
document.getElementById("heroName").innerText = data.personal.name
document.getElementById("heroTitle").innerText = data.personal.title
document.getElementById("heroTagline").innerText = data.personal.tagline
document.getElementById("summaryText").innerText = data.summary

}



// METRICS

function renderMetrics(metrics){

const container = document.getElementById("metricsContainer")

metrics.forEach(m=>{

const div = document.createElement("div")
div.className = "metric"

div.innerHTML = `
<div class="metric-value">${m.value}</div>
<div class="metric-label">${m.label}</div>
`

container.appendChild(div)

})

}



// SKILLS

function renderSkills(skills){

const container = document.getElementById("skillsContainer")

Object.keys(skills).forEach(category=>{

const card = document.createElement("div")
card.className = "skill-card"

let items = ""

skills[category].forEach(skill=>{

items += `<li>${skill.name}</li>`

})

card.innerHTML = `
<h3>${category}</h3>
<ul>${items}</ul>
`

container.appendChild(card)

})

}



// COMPANIES

function renderCompanies(companies){

const container = document.getElementById("companiesContainer")

companies.forEach(c=>{

const div = document.createElement("div")
div.className = "company-card"

div.innerHTML = `
<img src="${c.logo}">
<h3>${c.name}</h3>
<p>${c.industry}</p>
`

container.appendChild(div)

})

}



// EXPERIENCE

function renderExperience(exp){

const container = document.getElementById("experienceContainer")

exp.forEach(e=>{

const div = document.createElement("div")
div.className = "experience-card"

let resp = ""

e.responsibilities.forEach(r=>{

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



// PROJECTS

function renderProjects(projects){

const container = document.getElementById("projectsContainer")

projects.forEach(p=>{

const div = document.createElement("div")
div.className = "project-card"

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



// CONTACT LINKS

function setContactLinks(personal){

setTimeout(()=>{

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



// SCROLL BUTTON

window.addEventListener("scroll",()=>{

const btn = document.getElementById("scrollTop")

if(!btn) return

if(window.scrollY>500){
btn.style.display="block"
}else{
btn.style.display="none"
}

})



document.addEventListener("click",(e)=>{

if(e.target.id==="scrollTop"){
window.scrollTo({top:0,behavior:"smooth"})
}

})



// FOOTER YEAR

setTimeout(()=>{

const year = document.getElementById("year")

if(year){
year.innerText = new Date().getFullYear()
}

},500)