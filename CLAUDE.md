# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Kids Habit Tracker** - a Progressive Web App (PWA) designed for children aged 2-3 and their parents. The app uses a gamified train visualization to encourage positive behavior habits through daily task completion.

**Live URL**: https://constantdynamics.github.io/gelukt/

## Architecture

### Single-Page Application Structure

The entire app is a self-contained single-page application built with:
- **Vanilla JavaScript** (ES6 class-based architecture)
- **Tailwind CSS** (via CDN)
- **Web Audio API** (for sound effects)
- **localStorage** (for data persistence)
- **Service Worker** (for PWA offline functionality)

### Dual-Mode Interface

The app has TWO distinct user interfaces in the same HTML file:

1. **Child Mode** (`mode: 'child'`)
   - Large touch targets (120px circles)
   - Emoji-based visual communication
   - Three daypart tabs: Morning (🐓), Afternoon (🌞), Evening (🌛)
   - Task completion requires parent verification
   - Mini train progress indicator (sticky footer)

2. **Parent Mode** (`mode: 'parent'`)
   - Accessible via settings gear icon (⚙️)
   - Task management (add/edit/delete from templates)
   - Progress tracking with full train visualization
   - Reset functionality

The mode switching is handled by the `HabitTrackerApp` class's `mode` property and renders completely different UI via `render()` method.

### Core Data Model

```javascript
// Tasks are organized by daypart
tasks: {
  morning: [Task, Task, ...],
  afternoon: [Task, Task, ...],
  evening: [Task, Task, ...]
}

// Each Task has:
{
  id: string,          // timestamp-based ID
  name: string,        // "Tanden poetsen"
  emoji: string,       // "🪥"
  verifyWord: string,  // "TANDEN" (uppercase)
  completed: boolean,
  animation: string,   // 'stars'|'confetti'|'balloons'|'fireworks'|'hearts'
  sound: string        // 'pling'|'hoera'|'gelukt'
}

// Week progress tracks completion per day
weekProgress: [
  {
    day: 1-7,  // Monday=1, Sunday=7
    completed: boolean,  // all 3 dayparts done?
    dayParts: {
      morning: boolean,
      afternoon: boolean,
      evening: boolean
    }
  },
  // ... 7 days total
]
```

### Day Completion Logic

A critical workflow to understand:

1. User completes a task → verification modal appears
2. Parent enters verification word → task marked complete
3. `checkDayPartCompletion()` checks if ALL tasks in that daypart are done
4. If ALL dayparts (morning, afternoon, evening) are complete → wagon turns green
5. `checkWeekCompletion()` checks if all 7 days are done → celebration modal

This cascading completion check is the core mechanic that drives engagement.

### localStorage Keys

Three keys persist all app state:
- `habitTracker_tasks` - Task definitions
- `habitTracker_weekProgress` - Week completion status
- `habitTracker_profile` - Child name and avatar

No backend, no database. Everything is client-side.

## PWA Implementation

### Critical Path Configuration

**Important**: This app is deployed to GitHub Pages at `/gelukt/` subdirectory, NOT root. All paths must be **relative** (`./`) not absolute (`/`):

- `manifest.json`: `start_url: "./"` and `scope: "./"`
- `sw.js`: All cached URLs use `./` prefix
- Service Worker registration: `navigator.serviceWorker.register('./sw.js')`

**Never use absolute paths** or the app will break on GitHub Pages.

### PWA Files

- `index.html` - Main entry point (identical to kids-habit-tracker.html but with PWA enhancements)
- `kids-habit-tracker.html` - Standalone version (can be used offline without service worker)
- `manifest.json` - Web App Manifest
- `sw.js` - Service Worker (cache strategy: cache-first with network fallback)
- `icon-192.svg`, `icon-512.svg` - App icons
- `.nojekyll` - Prevents GitHub from using Jekyll processing

## Development

### Local Testing

Open the HTML file directly in a browser:
```bash
open index.html
# or
python3 -m http.server 8000  # for Service Worker testing (requires localhost/https)
```

**Note**: Service Workers only work on `https://` or `localhost`. Opening `file://` directly won't register the service worker.

### Testing PWA Features

To test PWA installation locally:
1. Run a local server: `python3 -m http.server 8000`
2. Open http://localhost:8000
3. Open DevTools → Application → Manifest (check manifest loads)
4. Open DevTools → Application → Service Workers (check SW registers)
5. Test offline by checking "Offline" checkbox in DevTools → Network

### Icon Generation

Two tools are provided:
- `generate-icons.html` - Browser-based generator (open in browser, download PNGs)
- `generate-icons.js` - Node.js script (generates SVGs): `node generate-icons.js`

## Deployment

### GitHub Pages Deployment

Automatic deployment via GitHub Actions:
- Workflow: `.github/workflows/deploy.yml`
- Triggers: Push to `claude/make-this-now-011CUsDp1TdKkh7QZPH765UF` or `main`
- Deployment: Uses official `actions/deploy-pages@v4`

**Manual trigger**: Go to Actions tab → Deploy to GitHub Pages → Run workflow

### GitHub Pages Configuration

In repository Settings → Pages:
- **Source**: GitHub Actions (NOT "Deploy from a branch")
- This allows the workflow to handle deployment automatically

### Post-Deployment Testing

After deployment, verify:
1. https://constantdynamics.github.io/gelukt/ loads
2. Check browser console for Service Worker registration success
3. Test PWA installation on mobile device
4. Verify manifest.json loads correctly (DevTools → Application → Manifest)

## Making Changes

### Adding New Features

The `HabitTrackerApp` class is organized into logical sections (marked with comment blocks):
- DATA PERSISTENCE - localStorage load/save
- TIME DETECTION - daypart detection logic
- TASK MANAGEMENT - CRUD operations
- PROGRESS TRACKING - completion checks
- ANIMATIONS - particle effects
- SOUND EFFECTS - Web Audio synthesis
- RENDER METHODS - HTML generation
- MODALS - popup interfaces
- EVENT HANDLERS - user interactions

Keep this structure when adding features.

### Updating Task Templates

Edit `TASK_TEMPLATES` array at the top of the script. Each template needs:
- `name`, `emoji`, `word` (verification word), `dayPart` (morning/afternoon/evening)

### Modifying Animations

Animation functions are in `playAnimation(type)`. Each animation creates DOM elements with CSS animations, then removes them after completion. Follow the same pattern for consistency.

### Service Worker Updates

When updating `sw.js`:
1. **Increment `CACHE_NAME`** (e.g., `v2` → `v3`)
2. Old caches are automatically cleaned up in the `activate` event
3. Users will get a prompt to reload when a new SW is detected

## Important Constraints

### Target Audience Considerations

- **Children 2-3 years old**: Cannot read, rely on emoji recognition
- **Touch targets**: Minimum 120px for small hands
- **No text-based navigation**: Everything must be visual
- **Parent verification**: Tasks cannot be marked complete by children alone (word verification system)

### Browser Compatibility

Tested on:
- iOS Safari (primary platform for PWA installation)
- Chrome Android (primary platform for Android PWA)
- Desktop browsers (development/parent access)

### Data Limitations

- No accounts, no authentication, no backend
- Data is device-local only (not synced across devices)
- Clearing browser data = data loss (by design, for privacy)

## Key Files Reference

- `index.html` / `kids-habit-tracker.html` - Main application (identical content, index.html is PWA entry point)
- `manifest.json` - PWA configuration
- `sw.js` - Service Worker for offline functionality
- `README.md` - User documentation
- `.github/workflows/deploy.yml` - Deployment automation
- `icon-*.svg` - App icons (train emoji with gradient background)
- `.nojekyll` - Disables Jekyll processing on GitHub Pages
