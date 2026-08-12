// Create style element for background
const styleElement = document.createElement('style');
styleElement.textContent = `
.background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.3;
}
`;
document.head.appendChild(styleElement);

// Create canvas element
const canvas = document.createElement('canvas');
canvas.className = 'background-canvas';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');

// Wave class for creating flowing background
class Wave {
    constructor(wavelength, amplitude, speed, color) {
        this.wavelength = wavelength;
        this.amplitude = amplitude;
        this.speed = speed;
        this.color = color;
        this.offset = Math.random() * Math.PI * 2;
    }

    draw(time) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
            const y = this.amplitude * Math.sin((x / this.wavelength) + (time * this.speed) + this.offset);
            ctx.lineTo(x, canvas.height / 2 + y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Create multiple waves with different properties
const waves = [
    new Wave(200, 30, 0.002, 'rgba(161, 195, 209, 0.2)'),  // Light blue wave
    new Wave(150, 20, 0.003, 'rgba(243, 208, 215, 0.2)'),  // Light pink wave
    new Wave(100, 15, 0.004, 'rgba(255, 239, 239, 0.2)')   // Very light pink wave
];

// Gradient background
function drawGradientBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(246, 245, 242, 1)');    // Your background color
    gradient.addColorStop(1, 'rgba(246, 245, 242, 0.8)');  // Slightly transparent at bottom
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Handle window resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Animation loop
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGradientBackground();

    // Draw each wave
    waves.forEach(wave => wave.draw(timestamp / 1000));
    
    requestAnimationFrame(animate);
}

// Event listeners
window.addEventListener('resize', resizeCanvas);

// Initialize and start animation
resizeCanvas();
animate(0);

// Add floating particles
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 195, 209, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particle array
const particles = Array(50).fill().map(() => new Particle());

// Update animation loop to include particles
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGradientBackground();

    // Draw waves
    waves.forEach(wave => wave.draw(timestamp / 1000));

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}