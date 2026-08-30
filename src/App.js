import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import PuzzleGame from './components/PuzzleGame';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [puzzleConfig, setPuzzleConfig] = useState({
    pieceCount: 9,
    rows: 3,
    cols: 3
  });

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleConfigChange = (newConfig) => {
    setPuzzleConfig(newConfig);
  };

  const resetPuzzle = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧩 Puzzle Creator</h1>
        <p>Upload an image and create your own jigsaw puzzle!</p>
      </header>

      <main className="App-main">
        {!selectedImage ? (
          <ImageUploader
            onImageSelect={handleImageSelect}
            puzzleConfig={puzzleConfig}
            onConfigChange={handleConfigChange}
          />
        ) : (
          <PuzzleGame
            image={selectedImage}
            config={puzzleConfig}
            onReset={resetPuzzle}
          />
        )}
      </main>
    </div>
  );
}

export default App;