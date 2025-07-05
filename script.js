// script.js - Modern theme switcher with enhanced animations and interactions

document.addEventListener('DOMContentLoaded', () => {
  const themeLink = document.getElementById('theme-link');
  const themeSelector = document.getElementById('themeSelector');
  const themeSelectorMobile = document.getElementById('themeSelectorMobile');

  // Particle background for hero section
  function createParticles() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
      `;
      hero.appendChild(particle);
    }
  }

  // Add CSS for particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translate(0, 100vh) scale(0); }
      10% { scale(1); }
      100% { transform: translate(${Math.random() * 200 - 100}px, -100vh) scale(0); }
    }
    
    .particle {
      pointer-events: none;
    }
    
    /* Smooth page transitions */
    * {
      transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Cursor effect */
    .cursor-glow {
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: screen;
    }
    
    /* Text selection styling */
    ::selection {
      background: #667eea;
      color: white;
    }
    
    /* Link hover effects */
    a {
      position: relative;
    }
    
    a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }
    
    a:hover::after {
      width: 100%;
    }
    
    /* Enhanced button effects */
    .btn-primary {
      position: relative;
      z-index: 1;
    }
    
    .btn-primary::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
      z-index: -1;
      opacity: 0;
      border-radius: 9999px;
      transition: opacity 0.3s ease;
    }
    
    .btn-primary:hover::after {
      opacity: 1;
    }
    
    /* Scroll indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
      40% { transform: translateX(-50%) translateY(-10px); }
      60% { transform: translateX(-50%) translateY(-5px); }
    }
  `;
  document.head.appendChild(style);

  // Create particles on load
  createParticles();

  // Cursor glow effect
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });

  // Add scroll indicator to hero
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down text-2xl text-white opacity-75"></i>';
    hero.appendChild(scrollIndicator);
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Type writer effect for hero text
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Apply typewriter to hero heading if exists
  const heroHeading = document.querySelector('.hero h1 .gradient-text');
  if (heroHeading) {
    const originalText = heroHeading.textContent;
    setTimeout(() => {
      typeWriter(heroHeading, originalText, 150);
    }, 1000);
  }

  // Theme management with smooth transitions
  function setTheme(themePath) {
    // Add transition class to body
    document.body.style.transition = 'all 0.3s ease';
    
    // Update theme
    themeLink.href = themePath;
    
    // Update selectors
    if (themeSelector) themeSelector.value = themePath;
    if (themeSelectorMobile) themeSelectorMobile.value = themePath;
    
    // Save preference
    localStorage.setItem('selectedTheme', themePath);
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  // Theme selector listeners
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      setTheme(e.target.value);
    });
  }

  if (themeSelectorMobile) {
    themeSelectorMobile.addEventListener('change', (e) => {
      setTheme(e.target.value);
    });
  }

  // Project card tilt effect
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + '+';
    }, 16);
  }

  // Observe stat counters
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.gradient-text');
        counters.forEach(counter => {
          const text = counter.textContent;
          const number = parseInt(text);
          if (!isNaN(number)) {
            animateCounter(counter, number);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe about section stats
  const statsSection = document.querySelector('#about .grid');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Enhanced form interactions
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // Loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
  });

  // Add magnetic effect to buttons
  const magneticButtons = document.querySelectorAll('.btn-primary');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // Page load animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});