const canvas = document.getElementById("constellationCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
});
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 5;
        this.speedX = Math.random() * 10 - 1.5;
        this.speedY = Math.random() * 10 - 1.5;
        this.opacity = Math.random();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Lorsque l'étoile sort du canvas, elle réapparaît de l'autre côté
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        if (this.size > 0.2) this.size -= 0.1;
        if (this.opacity > 0) this.opacity -= 0.005;
    }
    

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let stars = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star, index) => {
        star.update();
        star.draw();
        if (star.opacity <= 0 || star.size <= 0) {
            stars.splice(index, 1);
        }
    });
    if (stars.length < 50) {
        stars.push(new Star());
    }
    requestAnimationFrame(animate);
}

animate();



document.addEventListener("DOMContentLoaded", function() {
    var titles = ["Web Developer", "Front-End Developer", /* autres titres ici */];
    var currentIndex = 0;
    var jobTitleElement = document.getElementById("jobTitle");

    setInterval(function() {
        // Commencez par rendre l'élément transparent
        jobTitleElement.style.opacity = "0";

        // Utilisez un setTimeout pour attendre que l'animation d'opacité soit terminée
        setTimeout(function() {
            currentIndex++;
            if (currentIndex >= titles.length) {
                currentIndex = 0;  // Retour au début
            }
            jobTitleElement.textContent = titles[currentIndex];

            // Rendre à nouveau l'élément opaque (l'animation de transition s'activera ici aussi)
            jobTitleElement.style.opacity = "1";
        }, 500);  // Cette valeur doit correspondre à la durée de votre transition CSS
    }, 2000);
});
