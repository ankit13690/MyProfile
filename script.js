async function loadComponent(id, file) {

  const element = document.getElementById(id)

  if (!element) return

  try {

    const response = await fetch(file)
    const text = await response.text()

    element.innerHTML = text

  } catch (err) {

    console.error("Component load error:", file)

  }

}


function safeText(id, value){

  const el = document.getElementById(id)

  if(el) el.innerText = value

}


function safeHref(id, value){

  const el = document.getElementById(id)

  if(el) el.href = value

}


function safeSrc(id, value){

  const el = document.getElementById(id)

  if(el) el.src = value

}


async function loadPortfolio(){

  // Load Header & Footer

  await loadComponent("header","./components/header.html")
  await loadComponent("footer","./components/footer.html")


  // Load JSON Data

  let data

  try{

    const response = await fetch("./data.json")
    data = await response.json()

  }catch(err){

    console.error("JSON loading failed")

    return

  }


  /* HERO */

  safeText("name",data.personal.name)

  safeText("title",data.personal.title)

  safeText("tagline",data.personal.tagline)

  safeSrc("profileImage",data.personal.profileImage)

  safeHref("downloadResume",data.personal.resume)

  safeHref("linkedinBtn",data.personal.linkedin)

  safeHref("githubBtn",data.personal.github)


  /* HEADER */

  safeText("headerName",data.personal.name)

  safeHref("headerLinkedin",data.personal.linkedin)

  safeHref("headerGithub",data.personal.github)

  safeHref("headerEmail",data.personal.email)


  /* SUMMARY */

  safeText("summaryText",data.summary)


  /* CORE COMPETENCIES */

  const compContainer = document.getElementById("competenciesContainer")

  if(compContainer && data.coreCompetencies){

    compContainer.innerHTML = data.coreCompetencies

      .map(c => `<span class="competency">${c}</span>`)

      .join("")

  }


  /* SKILLS */

  const skillsContainer = document.getElementById("skillsContainer")

  if(skillsContainer && data.skills){

    let html=""

    for(const category in data.skills){

      html+=`

      <div class="skill-card">

      <h3>${category}</h3>

      ${data.skills[category]

        .map(skill => `<span class="skill">${skill}</span>`)

        .join("")}

      </div>

      `

    }

    skillsContainer.innerHTML = html

  }


  /* EXPERIENCE */

  const expContainer = document.getElementById("experienceContainer")

  if(expContainer && data.experience){

    expContainer.innerHTML = data.experience.map(job => `

      <div class="experience-card">

      <h3>${job.role} — ${job.company}</h3>

      <p class="duration">${job.duration} | ${job.location}</p>

      <ul>

      ${job.responsibilities.map(r => `<li>${r}</li>`).join("")}

      </ul>

      </div>

    `).join("")

  }


  /* PROJECTS */

  const projContainer = document.getElementById("projectsContainer")

  if(projContainer && data.projects){

    projContainer.innerHTML = data.projects.map(project => `

      <div class="project-card">

      <h3>${project.name}</h3>

      <p class="category">${project.category}</p>

      <p>${project.description}</p>

      <p class="impact">${project.impact}</p>

      <div class="tech">

      ${project.technologies.map(t => `<span>${t}</span>`).join("")}

      </div>

      </div>

    `).join("")

  }


  /* CERTIFICATIONS */

  const certContainer = document.getElementById("certificationsContainer")

  if(certContainer && data.certifications){

    certContainer.innerHTML = data.certifications

      .map(cert => `<li>${cert}</li>`)

      .join("")

  }


  /* EDUCATION */

  const eduContainer = document.getElementById("educationContainer")

  if(eduContainer && data.education){

    eduContainer.innerHTML = `

      <h3>${data.education.degree} — ${data.education.field}</h3>

      <p>${data.education.institution}</p>

      <p>${data.education.location}</p>

      <p>${data.education.year}</p>

    `

  }


  /* ACHIEVEMENTS */

  const achContainer = document.getElementById("achievementsContainer")

  if(achContainer && data.achievements){

    achContainer.innerHTML = data.achievements

      .map(a => `<li>${a}</li>`)

      .join("")

  }


  /* FOOTER */

  safeText("footerName",data.personal.name)

  safeHref("footerLinkedin",data.personal.linkedin)

  safeHref("footerGithub",data.personal.github)

  safeHref("footerEmail",data.personal.email)

}


document.addEventListener("DOMContentLoaded",loadPortfolio)