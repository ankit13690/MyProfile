fetch("data.json")
.then(res => res.json())
.then(data => {

document.getElementById("name").innerText = data.personal.name
document.getElementById("title").innerText = data.personal.title
document.getElementById("location").innerText = data.personal.location
document.getElementById("summary").innerText = data.summary

let compHTML=""

data.core_competencies.forEach(c=>{
compHTML += `<span class="tag">${c}</span>`
})

document.getElementById("competencies").innerHTML=compHTML


let skillHTML=""

for (const category in data.skills){

skillHTML+=`<h3>${category.replaceAll("_"," ")}</h3>`

data.skills[category].forEach(skill=>{
skillHTML+=`<span class="skill">${skill}</span>`
})

}

document.getElementById("skills").innerHTML=skillHTML


let expHTML=""

data.experience.forEach(job=>{

expHTML+=`<div class="card">
<h3>${job.role} - ${job.company}</h3>
<p>${job.duration}</p>
<ul>`

job.responsibilities.forEach(r=>{
expHTML+=`<li>${r}</li>`
})

expHTML+=`</ul></div>`
})

document.getElementById("experience").innerHTML=expHTML


let projectHTML=""

data.projects.forEach(p=>{
projectHTML+=`<div class="card">
<h3>${p.name}</h3>
<p>${p.description}</p>
<p><b>Impact:</b> ${p.impact}</p>
</div>`
})

document.getElementById("projects").innerHTML=projectHTML


let certHTML=""

data.certifications.forEach(c=>{
certHTML+=`<li>${c}</li>`
})

document.getElementById("certifications").innerHTML=certHTML

})