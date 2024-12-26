// script.js
// This script is used to change the theme of the page based on the user's selection from the dropdown. It listens for the change event on the dropdown and updates the href attribute of the theme link accordingly. 

document.addEventListener('DOMContentLoaded', () => {
  const themeLink = document.getElementById('theme-link');

  // If you have a dropdown or button to switch themes:
  const darkThemeButton = document.getElementById('darkThemeButton');
  const vibrantButton = document.getElementById('vibrantButton');

  darkThemeButton.addEventListener('click', () => {
    themeLink.href = 'styles/dark-theme.css';
  });

  vibrantButton.addEventListener('click', () => {
    themeLink.href = 'styles/vibrant-playful.css';
  });
});
