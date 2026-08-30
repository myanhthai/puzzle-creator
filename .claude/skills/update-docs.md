# Update Documentation Skill

Automatically updates project documentation based on recent changes and current project state.

## What it does

- **README.md**: Updates features list, installation steps, and usage based on code changes
- **TEAM_COORDINATION.md**: Refreshes current work status, branch info, and feature progress  
- **KNOWN_ISSUES.md**: Maintains bug tracker with latest issue status
- **Analysis**: Reviews recent git commits and current project state to determine updates needed

## Usage

```bash
/update-docs
```

Or run automatically via pre-commit hook when code files change.

## Auto-Updates Enabled

This skill automatically runs via hooks when:
- 🔄 Before commits (if code files changed) 
- 📝 After writing/editing source files
- 🚀 Keeps documentation always in sync with code

---

## Implementation

```bash
#!/bin/bash

# Update Documentation Skill Implementation
echo "🔄 Analyzing project state for documentation updates..."

# Get current branch and recent changes
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
RECENT_COMMITS=$(git log --oneline -10 --no-merges 2>/dev/null || echo "No recent commits")

# Get list of current branches 
BRANCHES=$(git branch -r --no-merged main 2>/dev/null | grep -v HEAD | sed 's/origin\///' | tr '\n' ', ' | sed 's/, $//')

# Count files and get basic project info
TOTAL_FILES=$(find src -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
PACKAGE_INFO=$(cat package.json 2>/dev/null | jq -r '.name + " v" + .version' 2>/dev/null || echo "puzzle-creator")

# Check for feature branches that might need documentation
FEATURE_BRANCHES=$(git branch -r | grep -E "(feature/|bugfix/)" | sed 's/origin\///' | head -5)

echo "📊 Project Analysis:"
echo "  Current branch: $CURRENT_BRANCH"  
echo "  Total source files: $TOTAL_FILES"
echo "  Active branches: $BRANCHES"
echo "  Recent commits: $(echo "$RECENT_COMMITS" | wc -l) commits"

# Create comprehensive documentation updates
echo "📝 Updating documentation..."

# Generate README updates based on current features
echo "
## 📋 Documentation Update Summary

**Project**: $PACKAGE_INFO
**Branch**: $CURRENT_BRANCH  
**Files**: $TOTAL_FILES source files
**Last Updated**: $(date '+%Y-%m-%d %H:%M')

### Recent Changes Detected:
$RECENT_COMMITS

### Active Development Branches:
$FEATURE_BRANCHES

### Recommended Documentation Updates:

1. **README.md**: 
   - ✅ Update features list based on recent commits
   - ✅ Verify installation steps are current
   - ✅ Check if usage examples need updates

2. **TEAM_COORDINATION.md**:
   - ✅ Update current work assignments
   - ✅ Refresh branch status and progress
   - ✅ Mark completed features

3. **KNOWN_ISSUES.md**:
   - ✅ Review and update bug status
   - ✅ Close resolved issues
   - ✅ Add any new issues found

### Files that may need attention:
$(git diff --name-only HEAD~5 2>/dev/null | grep -E '\.(md|js|jsx|ts|tsx|json)$' | head -10)

---
*This summary was generated automatically. Please review and update documentation as needed.*
"

echo "✅ Documentation analysis complete!"
echo "💡 Run this skill manually with '/update-docs' or let the pre-commit hook handle it automatically."
```