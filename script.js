document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const textElement = document.getElementById('typing-text');

    // 1. Setup Typing Effect (only if the element exists)
    if (textElement) {
        const textToType = "Soluções inovadoras em tecnologia para impulsionar o seu negócio.";
        let index = 0;
        const type = () => {
            if (index < textToType.length) {
                textElement.innerHTML = textToType.substring(0, index + 1) + '<span class="cursor"></span>';
                index++;
                setTimeout(type, 50);
            } else {
                textElement.innerHTML = textToType + '<span class="cursor" style="animation: blink 1s step-end infinite;"></span>';
            }
        };
        type();
    }

    // 2. Setup Interactive 3D Effects (works on all pages with a .container)
    if (container) {
        const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (isMobile && window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                const { beta, gamma } = event;
                if (beta === null || gamma === null) return;

                const maxTilt = 15;
                const tiltX = Math.min(maxTilt, Math.max(-maxTilt, beta));
                const tiltY = Math.min(maxTilt, Math.max(-maxTilt, gamma));

                requestAnimationFrame(() => {
                    container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                });
            });
        } else if (window.matchMedia('(pointer: fine)').matches) {
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
    }
});
