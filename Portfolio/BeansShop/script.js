// script.js

// 1. Video Control: Prevent looping after playback ends
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');
    if (video) {
        // Ensure video does not loop
        video.loop = false;
        // Prevent automatic replay when video ends
        video.addEventListener('ended', function() {
            console.log('Video ended - will not replay');
            // Can add visual effect or message here
        });

        // Some browsers may need additional help preventing loop
        // Ensure loop attribute is disabled
        video.removeAttribute('loop');
    }

    // 2. Fade-in Effects on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after visibility to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply effect to multiple elements: product cards, story section, footer
    const fadeElements = document.querySelectorAll('.product-card, .story-container, .footer-content');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 3. Additional Animation Effects (e.g., navbar color change on scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(36, 23, 14, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(46, 29, 18, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // 4. Button Interactions (Add to Cart Simulation)
    const addToCartButtons = document.querySelectorAll('.product-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').innerText;
            alert(`Added ${productName} to your cart (simulation)`);
            // Can add visual effects here
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // 5. Dynamic Page Load Effect (Sequential Content Display)
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1.5s ease';
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);

    // 6. Video Control: Ensures it starts correctly (with mute)
    // Already have autoplay muted in HTML
    // Can add optional control buttons if needed, but video auto-plays and stops only.
});

// 7. Subtle Parallax Effect on Hero Video (Optional)
window.addEventListener('scroll', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        const scrollY = window.scrollY;
        // Smooth effect: Video moves at 30% of scroll speed
        video.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    }
});