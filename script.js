
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const display = document.querySelector(".display");
    const heroCopy = document.querySelector(".hero-copy");
    const laptop = document.querySelector(".laptop");
    const heroHeader = document.querySelector(".hero-header");


    const displayHeight = display.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = displayHeight - viewportHeight;

    gsap.set(heroCopy, { yPercent: 100 });

    ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;


            let windowScale;
            if (progress < 0.5) {

                windowScale = 1 + (progress / 0.5) * 3;
            } else {
                windowScale = 4;
            }

            gsap.set(laptop, { scale: windowScale });
            gsap.set(heroHeader, {
                scale: windowScale,
                z: progress * 500,
                opacity: 1 - (progress * 2)
            });

            const yMove = -progress * scrollableDistance;
            gsap.set(display, { y: yMove });

            let heroCopyY;
            if (progress <= 0.66) {
                heroCopyY = 100;
            } else if (progress >= 1) {
                heroCopyY = 0;
            } else {
                heroCopyY = 100 * (1 - (progress - 0.66) / 0.34);
            }

            gsap.set(heroCopy, { yPercent: heroCopyY });
        }
    });
});
