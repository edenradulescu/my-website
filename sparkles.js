// Create style element for sparkle CSS
const styleElement = document.createElement('style');
styleElement.textContent = `
.sparkle-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
}

.sparkle {
    position: absolute;
    pointer-events: none;
    background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 60%);
    border-radius: 50%;
    mix-blend-mode: screen;
    animation: sparkle-fade 1s ease-out forwards;
    opacity: 0;
}

@keyframes sparkle-fade {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1) rotate(180deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(styleElement);

// Create container for sparkles
const sparkleContainer = document.createElement('div');
sparkleContainer.className = 'sparkle-container';
document.body.appendChild(sparkleContainer);

// Sparkle creation function
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random size between 10 and 20 pixels
    const size = Math.random() * 10 + 10;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    // Position sparkle relative to mouse
    sparkle.style.left = `${x - size/2}px`;
    sparkle.style.top = `${y - size/2}px`;
    
    // Random sparkle color
    const colors = ['#FFD700', '#FFC0CB', '#87CEEB', '#DDA0DD', '#F0E68C'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = `radial-gradient(circle, ${randomColor} 0%, rgba(255,255,255,0) 60%)`;
    
    sparkleContainer.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Track mouse movement and create sparkles
let lastSparkleTime = 0;
const sparkleInterval = 50; // Minimum time between sparkles in ms

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastSparkleTime > sparkleInterval) {
        // Create multiple sparkles per mouse movement
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            createSparkle(e.clientX + offsetX, e.clientY + offsetY);
        }
        lastSparkleTime = currentTime;
    }
});

// Create occasional random sparkles
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance of creating random sparkle
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createSparkle(x, y);
    }
}, 1000);