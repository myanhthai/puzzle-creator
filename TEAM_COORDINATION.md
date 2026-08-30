# Team Coordination

## Current Work Assignment

| Developer | Feature | Branch | Files |
|-----------|---------|---------|-------|
| Dev A | Image Aspect Ratio Fix | `bugfix/preserve-image-aspect-ratio` | `src/components/PuzzleGame.js` |
| Dev B | Canvas Sizing Bug Fix (PR Review) | `bugfix/canvas-sizing-and-piece-layout` | - |

## Bug Fix Protocol

### 🚨 Critical Bugs (App doesn't work)
- **First available developer** takes it immediately
- Use `hotfix/` branch naming
- Drop feature work temporarily

### 🐛 Regular Bugs (App works, but issues exist)
- **Either developer** can claim in this file
- Use `bugfix/` branch naming  
- Coordinate in quick message

### Current Bug Assignments
- [ ] [Bug description] - Developer X - `bugfix/branch-name`

## Communication Rules

1. **Before starting**: Update this file with your chosen feature
2. **Branch naming**: `feature/descriptive-name`
3. **File conflicts**: If you need to modify the same file, coordinate first
4. **Daily check-in**: Quick message about progress and any blockers

## Available Features (from README)

### High Priority
- [ ] Realistic jigsaw shapes
- [ ] Save/load progress  
- [ ] Timer and scoring
- [ ] Mobile touch support

### Medium Priority
- [ ] Puzzle gallery
- [ ] Multiplayer mode
- [ ] Difficulty levels
- [ ] Performance optimization

### Low Priority
- [ ] PWA features
- [ ] Accessibility improvements
- [ ] Better image handling

## Merge Protocol

1. Feature complete? Create PR
2. Other dev reviews
3. Merge to main
4. Both devs sync their branches with updated main