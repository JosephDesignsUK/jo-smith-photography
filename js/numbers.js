document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number");
    
    const animateCount = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const count = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            if (currentFrame <= totalFrames) {
                el.innerText = currentCount;
                requestAnimationFrame(count);
            } else {
                el.innerText = target;
            }
        };

        count();
    };

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});