# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Nicolo DiFerdinando, featuring a multi-theme static website with cybersecurity-focused content. The site is deployed on Netlify.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start
```

## Architecture & Structure

### Core Files
- `index.html` - Main portfolio page
- `bandit.html` - OverTheWire Bandit challenge documentation
- `view-resume.html` - Resume viewer page
- `script.js` - Theme switching logic with localStorage persistence

### Theme System
The site supports 4 themes, switchable via the theme selector:
1. Dark theme (`dark-theme.css`)
2. Vibrant/playful theme (`vibrant-playful.css`)
3. Minimal/clean theme (`minimal-clean.css`)
4. Gradient theme (referenced in code but CSS file missing)

Theme switching is handled in `script.js` with localStorage persistence.

### Key Technologies
- Static HTML5/CSS3/JavaScript
- Bootstrap 5.3.0 (CDN)
- Font Awesome 6.0.0 (CDN)
- Google Tag Manager for analytics
- Lite-server for development

### Deployment Configuration
- Netlify deployment files:
  - `_headers` - Sets PDF content type
  - `_redirects` - Redirects /resume.pdf to actual PDF file

## Important Notes

1. **No build process** - This is a static site with no compilation/bundling
2. **No test framework** - Tests are not configured
3. **Theme files** - When modifying themes, ensure consistency across all theme CSS files
4. **PDF handling** - Resume PDF is served via Netlify redirect rules
5. **Theme persistence** - Theme selection is stored in localStorage as 'selectedTheme'

## Common Tasks

### Adding a New Theme
1. Create a new CSS file in the root directory (e.g., `new-theme.css`)
2. Add the theme option to the dropdown in `index.html`, `bandit.html`, and `view-resume.html`
3. Update `script.js` to handle the new theme in the switch statement

### Updating Resume
1. Replace `Nicolo DiFerdinando Resume.pdf` with the new version
2. Ensure the filename matches or update `_redirects` accordingly

### Modifying Content
- Portfolio content is in `index.html`
- Bandit challenge writeups are in `bandit.html`
- All pages share the same header/navigation structure