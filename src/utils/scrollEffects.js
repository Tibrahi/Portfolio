let lastScrollTop = 0;
let scrollTimeout;
let isAnimating = false;

export const initScrollEffects = () => {
  const handleScroll = (e) => {
    const container = e.target;
    const st = container.scrollTop;
    
    // Prevent multiple animations from running simultaneously
    if (isAnimating) return;
    
    // Clear any existing timeout
    clearTimeout(scrollTimeout);
    
    // Remove existing classes
    container.classList.remove('scrolling-up', 'scrolling-down');
    
    // Add appropriate class based on scroll direction
    if (st > lastScrollTop) {
      // Scrolling down - Grenade explosion
      isAnimating = true;
      container.classList.add('scrolling-down');
      
      // Create explosion effect
      const explosion = document.createElement('div');
      explosion.className = 'explosion-effect';
      explosion.style.cssText = `
        position: absolute;
        right: 16px;
        top: ${st}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #e74c3c, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: explode 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      `;
      container.appendChild(explosion);
      
      // Remove explosion effect after animation
      setTimeout(() => {
        explosion.remove();
        isAnimating = false;
      }, 800);
    } else {
      // Scrolling up - Fireworks
      isAnimating = true;
      container.classList.add('scrolling-up');
      
      // Create fireworks effect
      const fireworks = document.createElement('div');
      fireworks.className = 'fireworks-effect';
      fireworks.style.cssText = `
        position: absolute;
        right: 16px;
        top: ${st}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ff0, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkle 1.2s linear infinite;
      `;
      container.appendChild(fireworks);
      
      // Remove fireworks effect after animation
      setTimeout(() => {
        fireworks.remove();
        isAnimating = false;
      }, 1200);
    }
    
    // Reset after animation
    scrollTimeout = setTimeout(() => {
      container.classList.remove('scrolling-up', 'scrolling-down');
    }, 1200);
    
    lastScrollTop = st <= 0 ? 0 : st;
  };

  // Add scroll event listeners to all scrollable containers
  const scrollContainers = document.querySelectorAll('.scroll-container');
  scrollContainers.forEach(container => {
    container.addEventListener('scroll', handleScroll);
  });

  // Add keyframe animations to document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes explode {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(2);
        opacity: 0.8;
      }
      100% {
        transform: scale(3);
        opacity: 0;
      }
    }
    
    @keyframes sparkle {
      0% {
        transform: scale(1);
        opacity: 1;
        background: radial-gradient(circle, #ff0, transparent);
      }
      25% {
        transform: scale(1.2);
        opacity: 0.8;
        background: radial-gradient(circle, #f0f, transparent);
      }
      50% {
        transform: scale(1.4);
        opacity: 0.6;
        background: radial-gradient(circle, #0ff, transparent);
      }
      75% {
        transform: scale(1.2);
        opacity: 0.8;
        background: radial-gradient(circle, #ff0, transparent);
      }
      100% {
        transform: scale(1);
        opacity: 1;
        background: radial-gradient(circle, #f0f, transparent);
      }
    }
  `;
  document.head.appendChild(style);

  // Cleanup function
  return () => {
    clearTimeout(scrollTimeout);
    scrollContainers.forEach(container => {
      container.removeEventListener('scroll', handleScroll);
    });
    style.remove();
  };
}; 