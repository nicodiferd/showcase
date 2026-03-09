# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Nicolo DiFerdinando, featuring a multi-theme static website with cybersecurity-focused content. The site is deployed on Netlify at `nicolod.org`.

An alternate **OS-style portfolio** (NicoOS) lives in the `os/` directory — a React-based interactive desktop simulator deployed on Cloudflare Workers at `os.nicolod.org`.

## Development Commands

```bash
# Main site — Install dependencies
npm install

# Main site — Start development server (runs on http://localhost:3000)
npm start

# NicoOS — Install dependencies
cd os && npm install

# NicoOS — Start development server
cd os && npm run dev

# NicoOS — Build and deploy
cd os && npm run build && npx wrangler deploy
```

## Architecture & Structure

### Main Site (root)

#### Core Files
- `index.html` - Main portfolio page
- `bandit.html` - Bandit startup retrospective
- `homelab.html` - HomeLab infrastructure writeup
- `view-resume.html` - Resume viewer page
- `js/app.js` - Main JS entry point
- `styles/main.css` - Main stylesheet

#### Theme System
Light/dark/system theme switching via `data-theme` attribute on `<html>`, persisted in localStorage as `preferredTheme`.

#### Key Technologies
- Static HTML5/CSS3/JavaScript
- Font Awesome 6.5.1 (CDN)
- Google Tag Manager for analytics
- Lite-server for development

#### Deployment
- Netlify at `nicolod.org`
- `_headers` - Sets PDF content type
- `_redirects` - Redirects /resume.pdf to actual PDF file

### NicoOS (`os/`)

An interactive desktop OS simulator portfolio built with React + TypeScript + Vite.

#### Key Structure
```
os/
  src/
    App.tsx                    # Boot → Login → Desktop phase machine
    state/                     # Window manager (useReducer + Context)
    components/
      Boot/                    # Boot sequence + login screen
      Desktop/                 # Desktop surface + icon grid
      Taskbar/                 # Taskbar, start menu, clock
      Window/                  # Draggable/resizable window component
    apps/                      # App windows (About, Projects, Resume, etc.)
    hooks/                     # useDraggable, useResizable, useClock
    data/                      # App registry, content data
    styles/                    # Theme vars, reset, animations
  wrangler.jsonc               # Cloudflare Workers deployment config
```

#### Features
- CRT-style boot sequence with login screen (skipped on session refresh)
- 8 desktop apps: about_me.exe, projects/, resume.pdf, achievements.log, bandit.txt, homelab.sh, mail.exe, terminal.exe
- Draggable/resizable windows with minimize/maximize/close
- Taskbar with start menu, open window indicators, live clock
- Interactive terminal with commands (help, whoami, neofetch, ls, open, socials, etc.)
- Contact form via Formspree
- Retro aesthetic: JetBrains Mono, green-on-dark, sharp corners, CRT scanlines

#### Key Technologies
- React 19 + TypeScript + Vite
- CSS Modules (no external UI library)
- Custom pointer-event-based drag/resize (no dependencies)
- Font Awesome 6.5.1 (CDN via CSS import)

#### Deployment
- Cloudflare Workers (static assets) at `os.nicolod.org`
- Config in `wrangler.jsonc` — route pattern: `os.nicolod.org/*`
- Also available at `nicoos.nicoloha-mail.workers.dev`
- Deploy: `cd os && npm run build && npx wrangler deploy`

## Important Notes

1. **No build process for main site** - Static site with no compilation/bundling
2. **NicoOS has a build process** - Vite builds to `os/dist/` (gitignored)
3. **No test framework** - Tests are not configured for either site
4. **PDF handling** - Resume PDF is served via Netlify redirect rules (main site) and directly from public/ (NicoOS)
5. **Boot skip** - NicoOS stores `nicoos-booted` in sessionStorage to skip boot on refresh
6. **Window state** - Managed via React Context + useReducer, not persisted across sessions

## Common Tasks

### Modifying NicoOS Content
- App content lives in `os/src/apps/` — each app is a standalone React component
- App registry (icons, filenames, default sizes) is in `os/src/data/apps.ts`
- Boot messages are in `os/src/components/Boot/BootScreen.tsx`
- Terminal commands are in `os/src/apps/TerminalApp/TerminalApp.tsx`

### Adding a New NicoOS App
1. Create a new directory in `os/src/apps/NewApp/`
2. Add the app to the `AppId` type in `os/src/state/types.ts`
3. Register it in `os/src/data/apps.ts` with icon, filename, and default size
4. Add the component to `os/src/apps/AppRenderer.tsx`

### Deploying NicoOS
```bash
cd os && npm run build && npx wrangler deploy
```

### Updating Resume
1. Replace `Nicolo DiFerdinando Resume.pdf` with the new version
2. Copy to `os/public/` as well for NicoOS
3. Ensure the filename matches or update `_redirects` accordingly
