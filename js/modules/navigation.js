/**
 * Navigation Module
 * Handles navigation behavior, mobile menu, and scroll effects
 */

export class Navigation {
  constructor() {
    this.nav = document.querySelector('.navigation');
    this.mobileToggle = document.querySelector('.navigation__toggle');
    this.mobileMenu = document.querySelector('.navigation__mobile');
    this.mobileOverlay = document.querySelector('.navigation__overlay');
    this.navLinks = document.querySelectorAll('.navigation__link');
    
    this.init();
  }
  
  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupActiveLinks();
    this.setupSmoothScroll();
  }
  
  setupScrollEffect() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add/remove scrolled class
      if (currentScroll > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
      
      // Hide/show on scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        this.nav.style.transform = 'translateY(-100%)';
      } else {
        this.nav.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }
  
  setupMobileMenu() {
    if (!this.mobileToggle) return;
    
    this.mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    this.mobileOverlay?.addEventListener('click', () => {
      this.closeMobileMenu();
    });
    
    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll('.navigation__mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
  }
  
  toggleMobileMenu() {
    const isOpen = this.mobileMenu.classList.contains('active');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.mobileMenu.classList.add('active');
    this.mobileOverlay?.classList.add('active');
    this.mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeMobileMenu() {
    this.mobileMenu.classList.remove('active');
    this.mobileOverlay?.classList.remove('active');
    this.mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}