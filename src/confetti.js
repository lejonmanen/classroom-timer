/*
----------------------------------------------------------------
Code from: https://www.cssscript.com/confetti-falling-animation/
Author: mathusummut, 2019
MIT license
----------------------------------------------------------------
Modified for use in app.
*/

let maxParticleCount; //set max confetti count
let particleSpeed; //set the particle animation speed
// startConfetti - call to start confetti animation
// stopConfetti - call to stop adding confetti
// toggleConfetti - call to start or stop the confetti animation depending on whether it's already running
// removeConfetti - call to stop the confetti animation and remove all confetti immediately

let canvas = null
let streamingConfetti = false;
let animationTimer = null;
let particles = [];
let waveAngle = 0;

let colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]

function initConfetti(canvasRef, settings = {}) {
	canvas = canvasRef.current
	maxParticleCount = settings.maxParticleCount || 150
	particleSpeed = settings.particleSpeed || 2

	let w = window.innerWidth
	let h = window.innerHeight
	canvas.width = w
	canvas.height = h
}

window.requestAnimFrame = (window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		return window.setTimeout(callback, 16.6666667);
	}
)

function startConfetti() {
	function runAnimation() {
		context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		if (particles.length === 0)
			animationTimer = null;
		else {
			updateParticles();
			drawParticles(context);
			animationTimer = requestAnimFrame(runAnimation);
		}
	}

	let width = window.innerWidth;
	let height = window.innerHeight;
	
	let context = canvas.getContext("2d");
	while (particles.length < maxParticleCount) {
		particles.push(resetParticle({}, width, height));
	}
	streamingConfetti = true;
	if (animationTimer === null) {
		runAnimation();
	}
}

function stopConfetti() {
	streamingConfetti = false;
}

/*
function removeConfetti() {
	stopConfetti();
	particles = [];
}

function toggleConfetti() {
	if (streamingConfetti)
		stopConfetti();
	else
		startConfetti();
}
*/

function drawParticles(context) {
	particles.forEach(particle => {
		context.beginPath();
		context.lineWidth = particle.diameter;
		context.strokeStyle = particle.color;
		let x = particle.x + particle.tilt;
		context.moveTo(x + particle.diameter / 2, particle.y);
		context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
		context.stroke();
	})
}

function updateParticles() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	waveAngle += 0.01;
	
	for (let i = 0; i < particles.length; i++) {
		let particle = particles[i];
		if (!streamingConfetti && particle.y < -15)
			particle.y = height + 100;
		else {
			particle.tiltAngle += particle.tiltAngleIncrement;
			particle.x += Math.sin(waveAngle);
			particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
			particle.tilt = Math.sin(particle.tiltAngle) * 15;
		}
		if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
			if (streamingConfetti && particles.length <= maxParticleCount)
				resetParticle(particle, width, height);
			else {
				particles.splice(i, 1);
				i--;
			}
		}
	}
}// updateParticles


function resetParticle(particle, width, height) {
	particle.color = colors[Math.floor(Math.random() * colors.length)];
	particle.x = Math.random() * width;
	particle.y = Math.random() * height - height;
	particle.diameter = Math.random() * 10 + 5;
	particle.tilt = Math.random() * 10 - 10;
	particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
	particle.tiltAngle = 0;
	return particle;
}

function celebrate(duration=2) {
	startConfetti()
	setTimeout(stopConfetti, duration * 1000)
}

export { initConfetti, startConfetti, stopConfetti, celebrate }
