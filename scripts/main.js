// Basic interactions

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        const thresholdPx = 400;
        let ticking = false;

        const updateBackToTop = () => {
            const scrollY = window.scrollY || window.pageYOffset || 0;
            const doc = document.documentElement;
            const maxScroll = Math.max(1, doc.scrollHeight - doc.clientHeight);
            const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

            backToTopBtn.style.setProperty('--scroll-progress', String(progress));
            backToTopBtn.style.setProperty('--scroll-glow', (0.08 + progress * 0.22).toFixed(3));

            if (scrollY > thresholdPx) backToTopBtn.classList.add('is-visible');
            else backToTopBtn.classList.remove('is-visible');
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                ticking = false;
                updateBackToTop();
            });
        };

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        updateBackToTop();
    }

    // Deferred Mallowrise WebGL load via iframe
    const webglFrame = document.getElementById('mallowrise-frame');
    const gameOverlay = document.querySelector('.game-overlay');
    const playButton = document.querySelector('.game-play-button');

    if (webglFrame && gameOverlay && playButton) {
        let hasLoadedSrc = false;

        const handleOverlayTransitionEnd = (event) => {
            if (event.target !== gameOverlay) return;
            gameOverlay.removeEventListener('transitionend', handleOverlayTransitionEnd);
            gameOverlay.remove();
        };

        const startGame = () => {
            if (!hasLoadedSrc) {
                hasLoadedSrc = true;
                webglFrame.src = 'assets/Games/Mallowrise/index.html';
            }
            gameOverlay.classList.add('is-fading-out');
            gameOverlay.addEventListener('transitionend', handleOverlayTransitionEnd);
        };

        playButton.addEventListener('click', startGame);
    }
});

// Modal Logic for Showcases
function openShowcase(type) {
    const modal = document.getElementById('showcase-modal');
    const container = document.getElementById('showcase-container');
    
    // Clear previous
    container.innerHTML = '';
    
    // Use template based on type (ios or unity)
    let templateId = type === 'ios' ? 'ios-app-template' : 'unity-game-template';
    const template = document.getElementById(templateId);
    
    if (template) {
        // Clone template content and append
        const clone = template.content.cloneNode(true);
        container.appendChild(clone);
    }
    
    modal.style.display = 'block';
    // Add simple fade-in effect via CSS class could be done here
}

function closeShowcase() {
    const modal = document.getElementById('showcase-modal');
    modal.style.display = 'none';
}

// Close modal if user clicks outside of the content
window.onclick = function(event) {
    const modal = document.getElementById('showcase-modal');
    if (event.target === modal) {
        closeShowcase();
    }
}
