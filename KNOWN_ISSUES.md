# Known Issues & Bug Tracker

## 🚨 Critical Issues
*Issues that break core functionality*

- [ ] None currently identified

## 🐛 Active Bugs  
*Issues that affect user experience*

- [x] **Canvas Sizing Issues** - Large puzzles don't fit on screen, pieces scattered incorrectly
  - **Steps to reproduce:** 1. Upload image, 2. Select 64+ pieces, 3. Create puzzle
  - **Expected:** Puzzle fits on screen with proper piece layout  
  - **Actual:** Canvas too large, pieces overflow, window resize resets progress
  - **Priority:** High
  - **Assigned to:** Developer A  
  - **Branch:** `bugfix/canvas-sizing-and-piece-layout`
  - **Status:** ✅ Fixed - Ready for PR

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