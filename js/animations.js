/* =========================================
INITIALIZE ALL ANIMATIONS
========================================= */

function initAnimations(){

initMetricHover()
initSectionReveal()
initCountersOnScroll()
initHeroTyping()
initHighlightAnimation()

}


/* =========================================
METRIC CARD HOVER EFFECT
========================================= */

function initMetricHover(){

const metrics = document.querySelectorAll(".metric-card")

metrics.forEach(card => {

card.addEventListener("mouseenter", () => {
card.classList.add("metric-active")
})

card.addEventListener("mouseleave", () => {
card.classList.remove("metric-active")
})

})

}


/* =========================================
SECTION SCROLL REVEAL
========================================= */

function initSectionReveal(){

const sections = document.querySelectorAll(".section")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1"
entry.target.style.transform = "translateY(0)"

}

})

},{
threshold:0.15
})

sections.forEach(section => {

section.style.opacity = "0"
section.style.transform = "translateY(60px)"
section.style.transition = "all 0.9s ease"

observer.observe(section)

})

}


/* =========================================
COUNTER ANIMATION (ON SCROLL)
========================================= */

function initCountersOnScroll(){

const counters = document.querySelectorAll(".metric-number")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

animateCounter(entry.target)
observer.unobserve(entry.target)

}

})

},{ threshold:0.6 })

counters.forEach(counter => observer.observe(counter))

}


function animateCounter(counter){

const target = parseInt(counter.getAttribute("data-target"))
const hasPlus = counter.getAttribute("data-plus") === "true"

let current = 0

const duration = 1200
const steps = 60
const increment = target / steps
const interval = duration / steps

const timer = setInterval(()=>{

current += increment

if(current >= target){

counter.innerText = hasPlus ? target + "+" : target
clearInterval(timer)

}else{

counter.innerText = Math.floor(current)

}

}, interval)

}


/* =========================================
HERO TYPEWRITER EFFECT
========================================= */

function initHeroTyping(){

const heroName = document.getElementById("heroName")

if(!heroName) return

const text = heroName.innerText

heroName.innerText = ""

let index = 0

function type(){

if(index < text.length){

heroName.innerText += text.charAt(index)

index++

setTimeout(type,70)

}else{

animateHeroSubtext()

}

}

type()

}


/* =========================================
HERO TITLE + TAGLINE ANIMATION
========================================= */

function animateHeroSubtext(){

const heroTitle = document.getElementById("heroTitle")
const heroTagline = document.getElementById("heroTagline")

if(heroTitle){

heroTitle.style.opacity = "0"
heroTitle.style.transform = "translateY(20px)"
heroTitle.style.transition = "all 0.6s ease"

setTimeout(()=>{

heroTitle.style.opacity = "1"
heroTitle.style.transform = "translateY(0)"

},200)

}

if(heroTagline){

heroTagline.style.opacity = "0"
heroTagline.style.transform = "translateY(20px)"
heroTagline.style.transition = "all 0.6s ease"

setTimeout(()=>{

heroTagline.style.opacity = "1"
heroTagline.style.transform = "translateY(0)"

},500)

}

}


/* =========================================
HERO DEVOPS HIGHLIGHT CARDS
========================================= */

function initHighlightAnimation(){

const cards = document.querySelectorAll(".highlight-card")

cards.forEach((card,index)=>{

card.style.opacity="0"
card.style.transform="translateY(30px)"

setTimeout(()=>{

card.style.transition="all 0.6s ease"
card.style.opacity="1"
card.style.transform="translateY(0)"

},200*index)

})

}


/* =========================================
RUN AFTER PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

setTimeout(() => {

initAnimations()

},400)

})
