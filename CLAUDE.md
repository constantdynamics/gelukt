# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Kids Habit Tracker** - a Progressive Web App (PWA) designed for children aged 2-3 and their parents. The app uses a gamified train visualization to encourage positive behavior habits through daily task completion.

**Live URL**: https://constantdynamics.github.io/gelukt/

## Architecture

### Single-Page Application Structure

The entire app is a self-contained single-page application built with:
- **Vanilla JavaScript** (ES6 class-based architecture)
- **Hand-written CSS** with custom properties — no framework, no CDN, no build step
- **Web Audio API** (for synthesised sound effects)
- **MediaRecorder + IndexedDB** (for per-task parent voice recordings)
- **localStorage** (for tasks, history, profile and settings)
- **Service Worker** (for PWA offline functionality)

**No external requests.** The app must keep working with the network switched off from the very
first load, so never introduce a CDN link, web font, or remote asset.

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
  id: string,            // `${timestamp}-${random}`
  name: string,          // "Tanden poetsen"
  emoji: string,         // "🪥"
  verifyWord: string,    // "TANDEN" (stored uppercase)
  completed: boolean,
  animation: string,     // 'stars'|'confetti'|'balloons'|'fireworks'|'hearts'
  sound: string,         // 'pling'|'hoera'|'gelukt'|'custom'
  customAudioId?: string // IndexedDB key when sound === 'custom'
}

// History is keyed by LOCAL date, not by weekday slot — this is what lets the
// train grow past 7 wagons instead of wrapping around a fixed week.
history: {
  '2026-09-14': { morning: true, afternoon: true, evening: true, completed: true },
  ...
}

// Profile + settings
profile:  { name: string, avatar: string }
settings: { autoReset: boolean, lastActiveDate: 'YYYY-MM-DD' }
```

### Day Completion Logic

A critical workflow to understand:

1. Child taps a task circle → verification modal appears
2. Parent types the verification word (case-insensitive) → task marked complete
3. `syncTodayProgress()` recomputes today's history entry from the live task state
4. `isDayPartComplete()` — **a daypart with zero tasks counts as complete**, so an unused
   daypart can never block a day. A day with no tasks at all never completes.
5. All three dayparts complete → today's entry gets `completed: true` → a new wagon
6. Every 7th completed day fires `showMilestoneModal()`

`syncTodayProgress()` must run **before** `render()`, otherwise the train paints a stale count.

### Growing Train

The train is derived state, never stored: `getCompletedDates()` returns every history key with
`completed: true`, sorted ascending. `renderTrain()` chunks that list into rows of 7 and appends a
dashed "today" wagon when today is still in progress. There is no automatic weekly reset — only
the parent's explicit "Hele trein resetten".

### Daily Auto-Reset

`applyDayRollover()` compares `settings.lastActiveDate` to today. On a new day it clears every
`task.completed` flag; yesterday's result is already safe in `history`, so nothing is lost. It runs
on init, on a one-minute interval, and on `visibilitychange` so an app left open overnight still
rolls over.

### localStorage Keys

- `habitTracker_tasks` - Task definitions
- `habitTracker_history` - Per-date completion record (drives the train)
- `habitTracker_profile` - Child name and avatar
- `habitTracker_settings` - Auto-reset flag and last active date
- `habitTracker_weekProgress` - **Legacy v1 only.** `migrateLegacyWeekProgress()` maps the old
  7-slot array onto real dates once, then deletes the key. Don't reintroduce it.

Custom voice clips live in IndexedDB (`habitTrackerAudio` → `clips`), keyed `clip-<taskId>`,
because audio blobs would blow the localStorage quota.

All reads go through `readJSON()` / `writeJSON()`, which swallow quota and private-mode errors —
storage must never be able to crash the app.

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
- Triggers: Push to `claude/kan-dit-nu-maken-o9x58e`, `claude/make-this-now-011CUsDp1TdKkh7QZPH765UF` or `main`
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
- DATA PERSISTENCE - localStorage load/save + legacy migration
- TIME DETECTION & DAY ROLLOVER - daypart detection, midnight auto-reset
- TASK MANAGEMENT - CRUD operations
- PROGRESS TRACKING - completion cascade, train derivation
- ANIMATIONS - particle effects
- SOUND EFFECTS - Web Audio synthesis + custom clip playback
- RENDER METHODS - HTML generation
- MODALS - popup interfaces
- TOASTS - in-app notifications
- EVENT HANDLERS - delegated user interactions

Keep this structure when adding features.

### Event Handling

There are **no inline `onclick` attributes**. A single delegated listener in `bindGlobalEvents()`
reads `data-action` (plus `data-daypart`, `data-task`, …) and dispatches through
`handleAction()`. Add a new `case` there rather than wiring handlers into markup — it keeps
template strings free of quoting bugs.

Any user-supplied string rendered into a template (profile name, task name, verify word) must go
through `escapeHtml()`.

### Styling

All CSS lives in the `<style>` block in the document head, driven by custom properties on
`:root`. Reuse the existing tokens (`--r-md`, `--shadow-md`, daypart colours) rather than
hard-coding values, and keep new animations behind the `prefers-reduced-motion` guard at the
bottom of the stylesheet.

### Updating Task Templates

Edit `TASK_TEMPLATES` array at the top of the script. Each template needs:
- `name`, `emoji`, `word` (verification word), `dayPart` (morning/afternoon/evening)

`dayPart` is only the *recommended* daypart — it renders a ⭐ badge in parent mode. The parent
picks the actual target daypart with the chip row, so any template can go anywhere.

Templates are added by array index (`data-template="<i>"`), so inserting or reordering entries
changes nothing persisted — added tasks are copies, not references.

### Modifying Animations

Animation functions are in `playAnimation(type)`. Each creates fixed-position `.particle`
elements via `spawn()`, which appends to `document.body` and removes them after the given
lifetime. Particles use viewport coordinates, and pass motion into keyframes through the
`--tx` / `--ty` / `--rot` custom properties. Follow the same pattern for consistency.

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
