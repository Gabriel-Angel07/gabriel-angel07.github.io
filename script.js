/**
 * SISTEMA DE INTERACCIÓN: BITÁCORA EDITORIAL & SEÑAL
 * Angel Gabriel Gomez Angel // Gaang (2026)
 * Vanilla JavaScript (Adaptado para sitio multipágina)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Detección de accesibilidad (prefers-reduced-motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Revelado Progresivo al Scroll (Intersection Observer)
  const initScrollReveal = () => {
    if (prefersReducedMotion) return;

    // Selector universal de elementos revelables en todas las páginas
    const elementsToReveal = document.querySelectorAll(
      '.hero-bottom-manifesto, .section-badge-bar, .about-hero-quote, .about-narrative-block, .about-ledger-container, .discipline-row, .project-card, .case-hero, .case-block, .contact-composition'
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Revelar solo una vez
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    elementsToReveal.forEach((el, index) => {
      el.classList.add('reveal-init');
      // Escalonado sutil en listados
      if (el.classList.contains('discipline-row') || el.classList.contains('project-card')) {
        el.style.transitionDelay = `${(index % 3) * 0.08}s`;
      }
      revealObserver.observe(el);
    });
  };

  // 3. Scroll suave exclusivo para anclas locales (ej. #contacto dentro de index.html)
  const initSmoothAnchorNav = () => {
    const internalAnchors = document.querySelectorAll('a[href^="#"]');

    internalAnchors.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
        }
      });
    });
  };

  // 4. Inicialización
  initScrollReveal();
  initSmoothAnchorNav();
});