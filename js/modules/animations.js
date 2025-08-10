/**
 * Animations Module
 * Handles various animations and effects throughout the site
 */

export class Animations {
  constructor() {
    this.init();
  }
  
  init() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      this.setupParticles();
      this.setupCursorEffect();
      this.setupCardTilt();
      this.setupParallax();
      this.setupMagneticButtons();
    }
    this.setupCounterAnimations();
    this.setupTypewriter();
    this.setupScrollAnimations();
    
    // Fallback: Force counter animations after 1 second if they haven't started
    setTimeout(() => {
      const counters = document.querySelectorAll('[data-counter]:not([data-animated])');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const suffix = counter.getAttribute('data-suffix') || '';
        counter.textContent = target + suffix;
        counter.setAttribute('data-animated', 'true');
      });
    }, 1000);
  }
  
  setupParticles() {
    const particlesContainer = document.querySelector('.hero__particles');
    if (!particlesContainer) return;
    
    const particleCount = 18;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 6 + 3;
      const duration = Math.random() * 18 + 12;
      const delay = Math.random() * duration;
      const startX = Math.random() * 100;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  setupCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth cursor movement
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
  }
  
  setupCardTilt() {
    // Only enable tilt on cards that explicitly opt-in
    const cards = document.querySelectorAll('.card[data-tilt]');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(10px)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  
  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;
    
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-counter'));
      const suffix = element.getAttribute('data-suffix') || '';
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
      }, 16);
    };
    
    // Simple approach: animate when visible
    const checkAndAnimate = () => {
      counters.forEach(counter => {
        if (counter.hasAttribute('data-animated')) return;
        
        const rect = counter.getBoundingClientRect();
        const inViewport = (
          rect.top <= window.innerHeight &&
          rect.bottom >= 0
        );
        
        if (inViewport) {
          animateCounter(counter);
          counter.setAttribute('data-animated', 'true');
        }
      });
    };
    
    // Check on load
    checkAndAnimate();
    
    // Check on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        checkAndAnimate();
        scrollTimeout = null;
      }, 100);
    });
  }
  
  setupTypewriter() {
    const elements = document.querySelectorAll('[data-typewriter]');
    
    elements.forEach(element => {
      const text = element.getAttribute('data-typewriter');
      const speed = parseInt(element.getAttribute('data-speed')) || 100;
      let i = 0;
      
      element.textContent = '';
      
      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };
      
      // Start when element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  }
  
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
  
  setupMagneticButtons() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = element.getAttribute('data-magnetic') || 0.3;
        
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });
  }
  
  // AOS-like scroll animations
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // If no elements found, return early
    if (!animatedElements.length) {
      console.log('No AOS elements found');
      return;
    }
    
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      animatedElements.forEach(element => {
        element.classList.add('aos-animate');
      });
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add aos-animate class to trigger animation
          entry.target.classList.add('aos-animate');
          // Stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Start observing all elements
    animatedElements.forEach(element => {
      // Check if element is already in viewport on load
      const rect = element.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inViewport) {
        // If already in viewport, animate immediately
        element.classList.add('aos-animate');
      } else {
        // Otherwise, observe for when it comes into view
        observer.observe(element);
      }
    });
  }
}