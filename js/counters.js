function animateCounters(){

const counters = document.querySelectorAll(".metric-number");

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");

let count = 0;

const speed = target / 60;

function update(){

count += speed;

if(count < target){

counter.innerText = Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText = target + "+";

}

}

update();

});

}

window.addEventListener("load", animateCounters);