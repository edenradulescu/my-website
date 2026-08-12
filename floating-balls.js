const colors = ["#FCC6FF", "#FFE6C9", "#FFC785", "#FFA09B", "#C5BAFF"];
const numBalls = 50;
const balls = [];

// Create a container for the balls
const ballContainer = document.createElement("div");
ballContainer.classList.add("ball-container");
document.body.appendChild(ballContainer);

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.random() * 100}%`;
  ball.style.top = `${Math.random() * 100}%`;
  ball.style.width = `${Math.random() * 2 + 0.5}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  ballContainer.appendChild(ball);
}

// Keyframes
balls.forEach((el, i) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});