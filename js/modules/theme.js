/**
 * Theme Module
 * Handles theme switching and persistence
 */

export class ThemeManager {
  constructor() {
    this.themeSelectors = document.querySelectorAll('[data-theme-selector]');
    this.root = document.documentElement;
    this.storageKey = 'preferredTheme';
    this.defaultTheme = 'dark';
    
    this.themes = {
      dark: {
        name: 'Dark',
        class: 'dark'
      },
      light: {
        name: 'Light',
        class: 'light'
      }
    };
    
    this.init();
  }
  
  init() {
    this.loadTheme();
    this.setupThemeSelectors();
    this.setupSystemThemeDetection();
  }
  
  loadTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    const systemTheme = this.getSystemTheme();
    const theme = savedTheme || systemTheme || this.defaultTheme;
    
    this.setTheme(theme);
  }
  
  setTheme(themeName) {
    // Remove all theme classes
    Object.values(this.themes).forEach(theme => {
      this.root.classList.remove(theme.class);
    });
    
    // Add new theme class
    if (this.themes[themeName]) {
      this.root.classList.add(this.themes[themeName].class);
      this.root.setAttribute('data-theme', themeName);
      
      // Update selectors
      this.themeSelectors.forEach(selector => {
        selector.value = themeName;
      });
      
      // Save preference
      localStorage.setItem(this.storageKey, themeName);
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: themeName }
      }));
    }
  }
  
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }
  
  setupThemeSelectors() {
    this.themeSelectors.forEach(selector => {
      selector.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
      });
    });
  }
  
  setupSystemThemeDetection() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only change if user hasn't set a preference
        if (!localStorage.getItem(this.storageKey)) {
          this.setTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }
  
  cycleTheme() {
    const themeNames = Object.keys(this.themes);
    const currentTheme = this.root.getAttribute('data-theme') || this.defaultTheme;
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    
    this.setTheme(themeNames[nextIndex]);
  }
}