document.addEventListener('DOMContentLoaded', () => {
    
    // --- Burger Menu Logic ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation (Optional: Toggle class for X shape)
        burger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
            }
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');

    const appearOptions = {
        threshold: 0.15, // Trigger when 15% of item is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // --- Testimonial Carousel ---
    const track = document.querySelector('.carousel-track');
    // Check if carousel exists to avoid errors on other pages if any
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

        // Click indicators
        dotsNav.addEventListener('click', e => {
            // What indicator was clicked on?
            const targetDot = e.target.closest('button');

            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(currentSlide, targetSlide, currentDot, targetDot);
            
            // Reset auto-play timer on manual interaction
            resetAutoPlay();
        });

        // Auto Play
        let slideInterval;
        
        const nextSlide = () => {
            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;
            let nextDot = currentDot.nextElementSibling;

            // If no next slide, loop back to first
            if (!nextSlide) {
                nextSlide = slides[0];
                nextDot = dots[0];
            }

            moveToSlide(currentSlide, nextSlide, currentDot, nextDot);
        };

        const startAutoPlay = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds
        };

        const resetAutoPlay = () => {
            clearInterval(slideInterval);
            startAutoPlay();
        };

        startAutoPlay();
    }

});