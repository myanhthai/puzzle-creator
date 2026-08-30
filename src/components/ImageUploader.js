import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelect, puzzleConfig, onConfigChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handlePieceCountChange = (e) => {
    const count = parseInt(e.target.value);
    let rows, cols;

    // Calculate optimal rows and columns based on piece count
    if (count === 4) {
      rows = 2; cols = 2;
    } else if (count === 9) {
      rows = 3; cols = 3;
    } else if (count === 16) {
      rows = 4; cols = 4;
    } else if (count === 25) {
      rows = 5; cols = 5;
    } else if (count === 36) {
      rows = 6; cols = 6;
    } else if (count === 49) {
      rows = 7; cols = 7;
    } else if (count === 64) {
      rows = 8; cols = 8;
    } else if (count === 81) {
      rows = 9; cols = 9;
    } else if (count === 100) {
      rows = 10; cols = 10;
    }

    onConfigChange({
      pieceCount: count,
      rows: rows,
      cols: cols
    });
  };

  const startPuzzle = () => {
    if (previewImage) {
      onImageSelect(previewImage);
    }
  };

  return (
    <div className="image-uploader">
      <div className="upload-section">
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {previewImage ? (
            <div className="image-preview">
              <img src={previewImage} alt="Puzzle preview" />
              <div className="image-overlay">
                <p>Image ready!</p>
                <label htmlFor="file-upload" className="file-input-label">
                  Choose Different Image
                </label>
              </div>
            </div>
          ) : (
            <div className="upload-content">
              <div className="upload-icon">📸</div>
              <p>Drag and drop an image here</p>
              <p>or</p>
              <label htmlFor="file-upload" className="file-input-label">
                Choose File
              </label>
            </div>
          )}
        </div>
        <input
          type="file"
          id="file-upload"
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      <div className="config-section">
        <h3>Puzzle Configuration</h3>
        <div className="config-option">
          <label htmlFor="piece-count">Number of Pieces:</label>
          <select
            id="piece-count"
            value={puzzleConfig.pieceCount}
            onChange={handlePieceCountChange}
          >
            <option value={4}>4 pieces (2x2)</option>
            <option value={9}>9 pieces (3x3)</option>
            <option value={16}>16 pieces (4x4)</option>
            <option value={25}>25 pieces (5x5)</option>
            <option value={36}>36 pieces (6x6)</option>
            <option value={49}>49 pieces (7x7)</option>
            <option value={64}>64 pieces (8x8)</option>
            <option value={81}>81 pieces (9x9)</option>
            <option value={100}>100 pieces (10x10)</option>
          </select>
        </div>
        <div className="config-info">
          <p>Grid: {puzzleConfig.rows} × {puzzleConfig.cols}</p>
        </div>
      </div>

      {previewImage && (
        <button className="primary-btn start-btn" onClick={startPuzzle}>
          🧩 Create Puzzle
        </button>
      )}
    </div>
  );
};

export default ImageUploader;