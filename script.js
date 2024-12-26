// script.js
// This script is used to change the theme of the page based on the user's selection from the dropdown. It listens for the change event on the dropdown and updates the href attribute of the theme link accordingly. 
document.addEventListener("DOMContentLoaded", () => {
  const themeSelector = document.getElementById("theme-selector");
  const themeLink = document.getElementById("theme-link");

  // When the user selects a theme from the dropdown
  themeSelector.addEventListener("change", function () {
    // Get the selected value (matches the .css file name)
    const selectedTheme = this.value;
    // Update the href of the theme link
    themeLink.href = `styles/${selectedTheme}.css`;
  });
});
