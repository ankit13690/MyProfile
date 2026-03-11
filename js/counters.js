function animateCounters(){

const counters = document.querySelectorAll(".metric-number");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

const counter = entry.target;

const target = parseInt(counter.getAttribute("data-target"));

let count = 0;

const duration = 1200; 
const frameRate = 60;
const totalFrames = duration / (1000/frameRate);
const increment = target / totalFrames;

function update(){

count += increment;

if(count < target){

counter.innerText = Math.floor(count);
requestAnimationFrame(update);

}else{

counter.innerText = target + "+";

}

}

update();

observer.unobserve(counter);

}

});

},{
threshold:0.6
});

counters.forEach(counter => observer.observe(counter));

}

document.addEventListener("DOMContentLoaded", animateCounters);