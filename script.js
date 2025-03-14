const canvas = document.getElementById("holiCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = []; // Store particles

// Resize canvas dynamically without clearing particles
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Function to generate a random color
function randomColor() {
    const colors = ["#ff0000", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3", "#9c27b0"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create a splash at x, y
function createSplash(x, y) {
    for (let i = 0; i < 50; i++) {
        let size = Math.random() * 12 + 3;
        let speedX = (Math.random() - 0.5) * 6;
        let speedY = (Math.random() - 0.5) * 6;
        let color = randomColor();
        let opacity = 1; // Full opacity

        particles.push({ x, y, size, speedX, speedY, color, opacity });
    }
}

// Function to animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity; // Apply opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset opacity

        // Update particle movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size *= 0.96; // Shrinking effect
        particle.opacity -= 0.02; // Gradually fade out

        // Remove faded-out particles
        if (particle.size < 0.5 || particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}

// Start animation loop
animateParticles();

// Add event listener for clicks to create a splash
canvas.addEventListener("click", (event) => {
    createSplash(event.clientX, event.clientY);
});

// Play music with better autoplay handling
document.getElementById("playButton").addEventListener("click", async () => {
    const audio = document.getElementById("holiMusic");

    try {
        await audio.play();
        console.log("Music is playing...");
    } catch (err) {
        console.error("Error playing music:", err);
    }
});