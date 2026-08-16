document.addEventListener("DOMContentLoaded", () => {
  // Generate Orbs
  const containers = document.querySelectorAll('.blog-orbs-container');
  
  containers.forEach(container => {
    for (let i = 0; i < 8; i++) {
      const orb = document.createElement('div');
      orb.className = 'blog-orb';
      
      // Randomize position and animation properties
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 3 + Math.random() * 2;
      
      orb.style.left = `${left}%`;
      orb.style.animationDelay = `${delay}s`;
      orb.style.animationDuration = `${duration}s`;
      
      container.appendChild(orb);
    }
  });

  // Mobile Touch Support
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // Toggle flipped state
        card.classList.toggle('flipped');
        
        // Remove flipped state from others
        cards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('flipped');
          }
        });
      });
    });
  }
});
