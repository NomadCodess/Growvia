/**
 * Growvia Community - Ultra-Smooth Scroll-Driven Garden Reveal Controller
 * GPU-Accelerated Direct Layer Transforms (No Global Root Style Thrashing)
 */
(function () {
    'use strict';

    function initGardenReveal() {
        const container = document.getElementById('scrollGardenReveal');
        if (!container) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            container.classList.add('reduced-motion');
            return;
        }

        // Cache layer elements to avoid querySelector in scroll loop
        const ambientVeil = container.querySelector('.garden-ambient-veil');
        const sunlightVeil = container.querySelector('.garden-sunlight-veil');
        const distantCanopy = container.querySelector('.garden-canopy-distant');
        const midgroundFoliage = container.querySelector('.garden-foliage-midground');
        const frondLeft = container.querySelector('.garden-frond-left');
        const frondRight = container.querySelector('.garden-frond-right');

        let ticking = false;
        let lastScrollY = -1;

        function updateGardenReveal() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

            // Avoid unnecessary work if scroll position didn't change
            if (Math.abs(scrollY - lastScrollY) < 1) {
                ticking = false;
                return;
            }
            lastScrollY = scrollY;

            const revealProgress = Math.min(1.0, Math.max(0.0, (scrollY - 50) / 600));
            const deepGardenProgress = Math.min(1.0, Math.max(0.0, (scrollY - 400) / 750));

            // Direct DOM opacity & hardware-accelerated translate3d without :root variable cascade
            container.style.opacity = revealProgress.toFixed(3);

            if (ambientVeil) ambientVeil.style.opacity = revealProgress.toFixed(3);
            if (sunlightVeil) sunlightVeil.style.opacity = deepGardenProgress.toFixed(3);

            const pDistant = (scrollY * 0.08).toFixed(1);
            const pMid = (scrollY * 0.15).toFixed(1);
            const pFore = (scrollY * 0.22).toFixed(1);

            if (distantCanopy) {
                distantCanopy.style.transform = `translate3d(0, calc(30px - ${pDistant}px), 0)`;
            }
            if (midgroundFoliage) {
                midgroundFoliage.style.transform = `translate3d(0, calc(45px - ${pMid}px), 0)`;
            }
            if (frondLeft) {
                frondLeft.style.transform = `translate3d(0, calc(60px - ${pFore}px), 0)`;
            }
            if (frondRight) {
                frondRight.style.transform = `translate3d(0, calc(70px - ${pFore}px), 0)`;
            }

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateGardenReveal);
                ticking = true;
            }
        }, { passive: true });

        // Initial paint
        updateGardenReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGardenReveal);
    } else {
        initGardenReveal();
    }
})();
