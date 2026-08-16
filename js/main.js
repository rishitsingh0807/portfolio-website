document.addEventListener("DOMContentLoaded", () => {
  // Hero letter hover interaction
  const letters = document.querySelectorAll(".hero-letter");
  letters.forEach(letter => {
    letter.addEventListener("mouseenter", () => {
      letter.classList.add("hovered");
    });
    letter.addEventListener("mouseleave", () => {
      letter.classList.remove("hovered");
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Navbar morphic active state via IntersectionObserver
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks).map(link => {
    const path = link.getAttribute('data-path');
    if (path.startsWith('#')) {
      const id = path.replace(/^#/, '');
      return document.getElementById(id);
    }
    return null;
  }).filter(Boolean);

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    let activeId = null;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId = entry.target.getAttribute('id');
      }
    });
    if (activeId) {
      updateActiveNav(`#${activeId}`);
    }
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveNav(pathMatch) {
    navLinks.forEach(link => {
      const path = link.getAttribute('data-path');
      if (path === pathMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
});
