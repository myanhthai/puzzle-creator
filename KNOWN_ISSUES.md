# Known Issues & Bug Tracker

## 🚨 Critical Issues
*Issues that break core functionality*

- [ ] None currently identified

## ✅ Recently Fixed Issues  
*Issues that have been resolved*

- [x] **Canvas Sizing Issues** - Large puzzles don't fit on screen, pieces scattered incorrectly
  - **Status:** ✅ **FIXED** - Implemented responsive canvas sizing and centered layout
  - **Solution:** Smart canvas calculation, max 1200px width, proper piece staging areas
  - **Branch:** `bugfix/canvas-sizing-and-piece-layout` (Merged)

- [x] **Image Aspect Ratio Distortion** - Photos get stretched/squished to fit square grid  
  - **Status:** ✅ **FIXED** - Images now maintain proper proportions
  - **Solution:** Calculate piece dimensions based on source image aspect ratio
  - **Branch:** `bugfix/preserve-image-aspect-ratio` (Merged)

- [x] **Timer/Score UI Overflow** - Timer and score elements overflowed header boundaries
  - **Status:** ✅ **FIXED** - Constrained sizing and proper responsive layout
  - **Solution:** Added max-width constraints and overflow handling

- [x] **Confetti Layering** - Celebration confetti appeared behind completion message
  - **Status:** ✅ **FIXED** - Confetti now renders over victory screen
  - **Solution:** Moved confetti rendering after completion message drawing

- [x] **Sound Volume Issues** - Audio effects were too loud and harsh
  - **Status:** ✅ **FIXED** - Gentle, ear-friendly sound effects
  - **Solution:** Reduced volume 65-75%, added low-pass filtering, softer wave forms

## 🐛 Active Bugs  
*Issues currently being tracked*

- [ ] None currently identified

## 🔍 Potential Issues to Monitor
*Areas that may need attention in future development*

- **Large Puzzle Performance**: Monitor performance with 100+ pieces on slower devices
- **Mobile Touch Interactions**: Touch events may need optimization for mobile devices
- **Browser Compatibility**: Test audio context support across different browsers

## 🔍 Testing Checklist
*Use this to identify new bugs*

### Image Upload
- [ ] Large images (>5MB)
- [ ] Different formats (PNG, JPG, GIF, WebP)
- [ ] Invalid file types
- [ ] Network interruption during upload

### Puzzle Generation
- [ ] Very small piece counts (4 pieces)
- [ ] Very large piece counts (100 pieces)
- [ ] Non-square images
- [ ] Very small images
- [ ] Very large images

### Gameplay
- [ ] Drag and drop on different browsers
- [ ] Mobile touch interactions
- [ ] Multiple pieces selected
- [ ] Rapid clicking/dragging
- [ ] Browser window resize during play

### Performance
- [ ] Memory usage with large puzzles
- [ ] Smooth animations on slower devices
- [ ] Multiple puzzle sessions

## 🏷️ Bug Report Template

When you find a bug, add it above using this format:

```
- [ ] **Bug Title** - Brief description
  - **Steps to reproduce:** 1. Do X, 2. Do Y, 3. See Z
  - **Expected:** What should happen
  - **Actual:** What actually happens
  - **Priority:** Critical/High/Medium/Low
  - **Assigned to:** Developer name
  - **Branch:** `bugfix/branch-name`
```