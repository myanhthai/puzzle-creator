# 🧩 Puzzle Creator

A React-based interactive puzzle generator that lets users upload images and create customizable jigsaw puzzles.

## Features

- **Image Upload**: Drag and drop or click to upload any image
- **Configurable Difficulty**: Choose from 4 to 100 pieces (2x2 to 10x10 grid)
- **Interactive Gameplay**: 
  - Drag and drop puzzle pieces
  - Automatic snapping when pieces are close to correct position
  - Pieces automatically connect when placed correctly
  - Real-time progress tracking
  - Victory celebration when completed

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd puzzle-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Play

1. **Upload an Image**: 
   - Click "Choose File" or drag and drop an image onto the upload area
   - Supported formats: JPG, PNG, GIF, WebP

2. **Configure Your Puzzle**:
   - Select the number of pieces (4-100)
   - The app automatically calculates the optimal grid layout

3. **Create Puzzle**: 
   - Click "🧩 Create Puzzle" to start playing

4. **Solve the Puzzle**:
   - Drag pieces around the canvas
   - When a piece is close to its correct position, it will snap into place
   - Connected pieces move together as a group
   - Track your progress in the top bar

## Project Structure

```
src/
├── components/
│   ├── ImageUploader.js      # Handles image upload and configuration
│   ├── ImageUploader.css     # Styling for image uploader
│   ├── PuzzleGame.js         # Main puzzle game logic
│   └── PuzzleGame.css        # Styling for puzzle game
├── App.js                    # Main application component
├── App.css                   # Global application styling
├── index.js                  # Application entry point
└── index.css                 # Global CSS styles
```

## Technical Details

### Core Technologies
- **React**: Component-based UI framework
- **HTML5 Canvas**: For rendering and manipulating puzzle pieces
- **CSS3**: Modern styling with gradients and animations

### Key Features Implementation

#### Image Processing
- Uses HTML5 Canvas to slice uploaded images into grid pieces
- Calculates optimal piece dimensions based on image size and grid configuration

#### Drag and Drop System
- Mouse event handling for smooth piece movement
- Real-time canvas updates during drag operations
- Connected pieces move together as groups

#### Snap-to-Place Logic
- Proximity detection using Euclidean distance
- Automatic positioning when pieces are within snap threshold
- Visual feedback with highlighting and shadows

#### Connected Pieces System
- Tracks which pieces are correctly placed and connected
- Allows connected pieces to move together as a unit
- Prevents separation once pieces are properly placed

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Future Enhancements

### Potential Features to Add
- **Realistic Jigsaw Shapes**: Replace rectangular pieces with traditional curved jigsaw shapes
- **Save/Load Progress**: Allow users to save partially completed puzzles
- **Timer and Scoring**: Track completion time and implement scoring system
- **Multiplayer Mode**: Allow multiple users to collaborate on the same puzzle
- **Puzzle Gallery**: Pre-loaded images for quick puzzle creation
- **Difficulty Levels**: Different snap tolerances and hint systems
- **Mobile Touch Support**: Optimize for touch devices and mobile screens

### Technical Improvements
- **Performance Optimization**: Implement piece culling for large puzzles
- **Better Image Handling**: Support for different image aspect ratios
- **Accessibility**: Add keyboard navigation and screen reader support
- **Progressive Web App**: Add offline support and mobile app features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure your browser supports HTML5 Canvas
3. Try with different image formats and sizes
4. Clear browser cache and restart the development server

---

**Happy Puzzling!** 🧩✨