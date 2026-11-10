const introScreen = document.getElementById('introScreen');
const portfolioSite = document.getElementById('portfolioSite');
const enterButton = document.getElementById('enterPortfolio');

enterButton.addEventListener('click', () => {
  introScreen.classList.add('intro-exit');
  window.setTimeout(() => {
    introScreen.hidden = true;
    portfolioSite.classList.add('portfolio-visible');
    portfolioSite.removeAttribute('inert');
    portfolioSite.setAttribute('aria-hidden', 'false');
    document.body.classList.add('portfolio-open');
    revealObserver.observeAll?.();
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
  }, 650);
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// The portfolio is revealed only after the visitor presses the intro button.
document.getElementById('year').textContent = new Date().getFullYear();
