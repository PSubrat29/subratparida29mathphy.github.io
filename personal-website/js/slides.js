/**
 * Slide Navigation for Mathematical Physics Personal Website
 * Handles slide transitions, keyboard navigation, and filtering
 */

(function() {
    'use strict';

    // State
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    // Get slide ID from element
    function getSlideId(slide) {
        return slide.getAttribute('id');
    }

    // Activate slide
    function activateSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = 0;
        if (slideIndex >= slides.length) slideIndex = slides.length - 1;

        currentSlide = slideIndex;

        // Update slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update nav buttons
        navButtons.forEach((btn) => {
            const slideId = btn.getAttribute('data-slide');
            const targetSlide = document.getElementById(slideId);
            const targetIndex = Array.from(slides).indexOf(targetSlide);

            if (targetIndex === currentSlide) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update control buttons visibility
        if (prevBtn) prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';

        // Update URL hash without scrolling
        const currentSlideId = getSlideId(slides[currentSlide]);
        history.replaceState(null, null, `#${currentSlideId}`);
    }

    // Navigate to slide by ID
    function navigateToSlide(slideId) {
        const targetSlide = document.getElementById(slideId);
        if (targetSlide) {
            const index = Array.from(slides).indexOf(targetSlide);
            if (index !== -1) {
                activateSlide(index);
            }
        }
    }

    // Next slide
    function nextSlide() {
        activateSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        activateSlide(currentSlide - 1);
    }

    // Initialize
    function init() {
        // Check for hash in URL
        const hash = window.location.hash.slice(1);
        if (hash) {
            const targetSlide = document.getElementById(hash);
            if (targetSlide) {
                const index = Array.from(slides).indexOf(targetSlide);
                if (index !== -1) {
                    currentSlide = index;
                }
            }
        }

        activateSlide(currentSlide);

        // Event listeners for nav buttons
        navButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const slideId = btn.getAttribute('data-slide');
                navigateToSlide(slideId);
            });
        });

        // Event listeners for indicators
        indicators.forEach((indicator) => {
            indicator.addEventListener('click', () => {
                const slideId = indicator.getAttribute('data-slide');
                navigateToSlide(slideId);
            });
        });

        // Event listeners for slide controls
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Arrow keys
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                prevSlide();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextSlide();
            }
            // Home/End
            else if (e.key === 'Home') {
                activateSlide(0);
            } else if (e.key === 'End') {
                activateSlide(slides.length - 1);
            }
            // Number keys 1-4 for direct slide access
            else if (e.key >= '1' && e.key <= '4') {
                const slideIndex = parseInt(e.key) - 1;
                if (slideIndex < slides.length) {
                    activateSlide(slideIndex);
                }
            }
        });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }

        // Publication filter
        const filterButtons = document.querySelectorAll('.pub-filters .filter-btn');
        const pubItems = document.querySelectorAll('.pub-item');

        filterButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter publications
                pubItems.forEach((item) => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else {
                        const type = item.getAttribute('data-type');
                        if (type === filter) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });

        // Update year in footer
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }

        // Update last updated date
        const lastUpdatedEl = document.getElementById('last-updated');
        if (lastUpdatedEl) {
            const today = new Date();
            const formatted = today.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            lastUpdatedEl.setAttribute('datetime', today.toISOString());
            lastUpdatedEl.textContent = formatted;
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
