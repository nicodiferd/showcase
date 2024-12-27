// script.js
// This script is used to change the theme of the page based on the user's selection from the dropdown. It listens for the change event on the dropdown and updates the href attribute of the theme link accordingly. 

document.addEventListener('DOMContentLoaded', () => {
  const themeLink = document.getElementById('theme-link');

  const darkThemeButton = document.getElementById('darkThemeButton');
  const vibrantButton = document.getElementById('vibrantButton');
  const gradientButton = document.getElementById('gradientButton');
  const minimalButton = document.getElementById('minimalButton');

  darkThemeButton.addEventListener('click', () => {
    themeLink.href = 'styles/dark-theme.css';
  });

  vibrantButton.addEventListener('click', () => {
    themeLink.href = 'styles/vibrant-playful.css';
  });

  gradientButton.addEventListener('click', () => {
    themeLink.href = 'styles/gradient-theme.css';
  });

  minimalButton.addEventListener('click', () => {
    themeLink.href = 'styles/minimal-clean.css';
  });
});

themeSelector.addEventListener('change', (event) => {
  const selectedTheme = event.target.value;
  themeLink.href = selectedTheme;
  // Save to localStorage
  localStorage.setItem('selectedTheme', selectedTheme);
});
document.addEventListener('DOMContentLoaded', () => {
  const themeLink = document.getElementById('theme-link');
  const themeSelector = document.getElementById('themeSelector');

  // 1) Get stored theme (if any)
  const savedTheme = localStorage.getItem('selectedTheme');

  // 2) If found, update the href
  if (savedTheme) {
    themeLink.href = savedTheme;
    // Also update the dropdown so it shows the correct option
    themeSelector.value = savedTheme;
  }

  // 3) Setup the listener
  themeSelector.addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    themeLink.href = selectedTheme;
    localStorage.setItem('selectedTheme', selectedTheme);
  });
});
