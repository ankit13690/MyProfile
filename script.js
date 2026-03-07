/* =================================
PORTFOLIO APPLICATION CONTROLLER
================================ */

const App = {

data: null,


/* ================================
INITIALIZE APPLICATION
================================ */

init: async function () {

console.log("Initializing portfolio...")

await this.loadComponents()

await this.loadData()

this.renderAll()

},



/* ================================
LOAD HEADER / FOOTER
================================ */

loadComponents: async function () {

await Promise.all([

this.loadComponent("header", "components/header.html"),

this.loadComponent("footer", "components/footer.html")

])

},



loadComponent: async function (id, file) {

try {

const res = await fetch(file)

const html = await res.text()

document.getElementById(id).innerHTML = html

} catch (err) {

console.error("Component load failed:", file)

}

},



/* ================================
LOAD DATA.JSON
================================ */

loadData: async function () {

try {

const res = await fetch("data.json")

this.data = await res.json()

console.log("Data loaded successfully")

} catch (err) {

console.error("Failed loading data.json")

}

},



/* ================================
RENDER ALL SECTIONS
================================ */

renderAll: function () {

if (!this.data) return

this.renderHero()

this.renderContact()

this.renderSummary()

this.renderCompetencies()

this.renderSkills()

this.renderTools()

this.renderExperience()

this.renderProjects()

this.renderCertifications()

this.renderEducation()

this.renderAchievements()

this.renderTraining()

this.renderFooter()

},



/* ================================
UTILITIES
================================ */

setText(id, value) {

const el = document.getElementById(id)

if (el) el.innerText = value

},

setHref(id, value) {

const el = document.getElementById(id)

if (el) el.href = value

},

setSrc(id, value) {

const el = document.getElementById(id)

if (el) el.src = value

},



generateStars(level) {

let stars = ""

for (let i = 1; i <= 5; i++) {

stars += i <= level ? "★" : "☆"

}

return stars

},



/* ================================
HERO SECTION
================================ */

renderHero() {

const p = this.data.personal

this.setText("name", p.name)

this.setText("title", p.title)

this.setText("tagline", p.tagline)

this.setSrc("profileImage", p.profileImage)

this.setHref("downloadResume", p.resume)

this.setHref("linkedinBtn", p.linkedin)

this.setHref("githubBtn", p.github)

this.setHref("whatsappBtn", p.whatsapp)

},



/* ================================
CONTACT BAR
================================ */

renderContact() {

const p = this.data.personal

this.setText("emailText", p.email)

this.setText("phoneText", p.phone)

this.setText("locationText", p.location)

this.setHref("contactEmailBtn", "mailto:" + p.email)

this.setHref("contactLinkedinBtn", p.linkedin)

this.setHref("contactGithubBtn", p.github)

},



/* ================================
SUMMARY
================================ */

renderSummary() {

this.setText("summaryText", this.data.summary)

},



/* ================================
COMPETENCIES
================================ */

renderCompetencies() {

const container = document.getElementById("competenciesContainer")

if (!container) return

container.innerHTML = this.data.coreCompetencies

.map(c => `<span class="competency">${c}</span>`)

.join("")

},



/* ================================
SKILLS
================================ */

renderSkills() {

const container = document.getElementById("skillsContainer")

if (!container) return

let html = ""

for (const category in this.data.skills) {

html += `<div class="skill-card">

<h3>${category}</h3>`

this.data.skills[category].forEach(skill => {

html += `

<div class="skill">

<span>${skill.name}</span>

<span class="skill-stars">${this.generateStars(skill.level)}</span>

</div>

`

})

html += `</div>`

}

container.innerHTML = html

},



/* ================================
DEVOPS TOOL GRID
================================ */

renderTools() {

const container = document.getElementById("toolsContainer")

if (!container) return

let tools = []

for (const category in this.data.skills) {

this.data.skills[category].forEach(skill => {

tools.push(skill.name)

})

}

tools = [...new Set(tools)]

container.innerHTML = tools

.map(t => `<div class="tool-card">${t}</div>`)

.join("")

},



/* ================================
EXPERIENCE TIMELINE
================================ */

renderExperience() {

const container = document.getElementById("experienceContainer")

if (!container) return

container.innerHTML = this.data.experience.map(job => `

<div class="timeline-item">

<div class="timeline-dot"></div>

<div class="timeline-content">

<h3>${job.role}</h3>

<h4>${job.company}</h4>

<p class="duration">${job.duration}</p>

<ul>

${job.responsibilities.map(r => `<li>${r}</li>`).join("")}

</ul>

</div>

</div>

`).join("")

},



/* ================================
PROJECTS
================================ */

renderProjects() {

const container = document.getElementById("projectsContainer")

if (!container) return

container.innerHTML = this.data.projects.map(p => `

<div class="project-card">

<h3>${p.name}</h3>

<p>${p.description}</p>

<div class="tech">

${p.technologies.map(t => `<span class="tech-badge">${t}</span>`).join("")}

</div>

</div>

`).join("")

},



/* ================================
CERTIFICATIONS
================================ */

renderCertifications() {

const container = document.getElementById("certificationsContainer")

if (!container) return

container.innerHTML = this.data.certifications

.map(c => `<li>${c}</li>`)

.join("")

},



/* ================================
EDUCATION
================================ */

renderEducation() {

const e = this.data.education

const container = document.getElementById("educationContainer")

if (!container) return

container.innerHTML = `

<h3>${e.degree}</h3>

<p>${e.institution}</p>

<p>${e.year}</p>

`

},



/* ================================
ACHIEVEMENTS
================================ */

renderAchievements() {

const container = document.getElementById("achievementsContainer")

if (!container) return

container.innerHTML = this.data.achievements

.map(a => `<li>${a}</li>`)

.join("")

},



/* ================================
MENTORSHIP / TRAINING
================================ */

renderTraining() {

const container = document.getElementById("trainingContainer")

if (!container || !this.data.training) return

container.innerHTML = this.data.training.map(t => `

<div class="training-card">

<h3>${t.role}</h3>

<h4>${t.organization}</h4>

<p>${t.description}</p>

</div>

`).join("")

},



/* ================================
FOOTER
================================ */

renderFooter() {

const p = this.data.personal

this.setText("footerName", p.name)

this.setHref("footerLinkedin", p.linkedin)

this.setHref("footerGithub", p.github)

this.setHref("footerEmail", "mailto:" + p.email)

}

}



/* =================================
START APPLICATION
================================ */

document.addEventListener("DOMContentLoaded", () => {

App.init()

})