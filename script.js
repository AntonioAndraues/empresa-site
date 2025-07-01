const textElement = document.getElementById('typing-text');
const textToType = "Soluções inovadoras em tecnologia para impulsionar o seu negócio.";
let index = 0;

function type() {
    if (index < textToType.length) {
        // Update the text and manually place the cursor at the end
        textElement.innerHTML = textToType.substring(0, index + 1) + '<span class="cursor"></span>';
        index++;
        setTimeout(type, 50);
    } else {
        // When typing is done, make the cursor blink
        textElement.innerHTML = textToType + '<span class="cursor" style="animation: blink 1s step-end infinite;"></span>';
    }
}

const container = document.querySelector('.container');

function setupInteractiveEffects() {
    // A more reliable way to check for mobile devices
    const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // Use Gyroscope on mobile devices that support it
    if (isMobile && window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            const { beta, gamma } = event; // beta: front-back tilt, gamma: left-right tilt

            // Ignore events with no data, which some browsers send
            if (beta === null || gamma === null) {
                return;
            }

            const maxTilt = 15;
            // Clamp values to the max tilt to avoid extreme rotations
            const tiltX = Math.min(maxTilt, Math.max(-maxTilt, beta));
            const tiltY = Math.min(maxTilt, Math.max(-maxTilt, gamma));

            requestAnimationFrame(() => {
                container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        });
    }
    // Fallback to mouse parallax on devices with a fine pointer (a mouse)
    else if (window.matchMedia('(pointer: fine)').matches) {
        const sensitivity = 15;
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const moveX = (clientX / innerWidth - 0.5) * sensitivity;
            const moveY = (clientY / innerHeight - 0.5) * sensitivity;

            requestAnimationFrame(() => {
                container.style.transform = `rotateY(${-moveX}deg) rotateX(${moveY}deg)`;
            });
        });
    }
    // Otherwise, no motion effect is applied for other devices.
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    setupInteractiveEffects();
});