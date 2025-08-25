(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function animateNumber(element, endValue, {duration = 1500, suffix = ""} = {}) {
        if (!suffix) {
            const raw = element.textContent.trim();
            suffix = raw.replace(/[\d\s\u00A0.,-]/g, "");
        }
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * endValue);
            element.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update); else {
                element.textContent = endValue.toLocaleString() + suffix;
                element.classList.add("number-animated-pop");
            }
        }
        requestAnimationFrame(update);
    }
    function initNumberAnimations() {
        const numbers = document.querySelectorAll("[data-animate-number]");
        const observer = new IntersectionObserver(((entries, obs) => {
            entries.forEach((entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const endValue = parseInt(el.dataset.animateNumber, 10);
                const duration = el.dataset.animateDuration ? parseInt(el.dataset.animateDuration, 10) : 1500;
                const suffix = el.dataset.animateSuffix || el.dataset.suffix || "";
                animateNumber(el, endValue, {
                    duration,
                    suffix
                });
                obs.unobserve(el);
            }));
        }), {
            threshold: .5
        });
        numbers.forEach((num => observer.observe(num)));
    }
    document.addEventListener("DOMContentLoaded", initNumberAnimations);
})();
