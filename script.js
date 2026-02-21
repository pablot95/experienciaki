document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav && nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
            }
        });
    });

    const faders = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');

    const appearOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const dotsNav = document.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        const moveToSlide = (currentSlide, targetSlide, currentDot, targetDot) => {
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');

            if (currentDot && targetDot) {
                currentDot.classList.remove('current-slide');
                targetDot.classList.add('current-slide');
            }
        }

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');

            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(currentSlide, targetSlide, currentDot, targetDot);

            resetAutoPlay();
        });

        let slideInterval;

        const nextSlide = () => {
            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;
            let nextDot = currentDot.nextElementSibling;

            if (!nextSlide) {
                nextSlide = slides[0];
                nextDot = dots[0];
            }

            moveToSlide(currentSlide, nextSlide, currentDot, nextDot);
        };

        const startAutoPlay = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(slideInterval);
            startAutoPlay();
        };

        startAutoPlay();
    }

});
