/* =========================
SCROLL REVEAL EFFECT
========================= */

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



/* =========================
CARD BACKGROUND MOTION
========================= */

document.querySelectorAll(
".tool-card,.skill-card,.company-card,.experience-card,.project-card"
).forEach(card => {

let angle = 0

function animate(){

angle += 0.02

card.style.backgroundPosition =
Math.sin(angle) * 20 + "px " +
Math.cos(angle) * 20 + "px"

requestAnimationFrame(animate)

}

animate()

})