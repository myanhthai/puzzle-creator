import React, { useRef, useEffect, useState, useCallback } from 'react';
import './PuzzleGame.css';

const PuzzleGame = ({ image, config, onReset }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragInfoRef = useRef({ isDragging: false, draggedPieceId: null, startPos: { x: 0, y: 0 } });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [connectedPieces, setConnectedPieces] = useState(new Set());

  const PIECE_SNAP_DISTANCE = 30;
  const CANVAS_PADDING = 50;

  // Initialize puzzle pieces
  const initializePuzzle = useCallback(() => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Calculate available space for puzzle
    const availableWidth = Math.min(window.innerWidth - 200, 1200); // Max width with padding
    const availableHeight = window.innerHeight - 300; // Account for header and padding

    // Calculate image aspect ratio
    const imageAspectRatio = img.width / img.height;

    // Calculate piece dimensions that maintain image aspect ratio
    const sourcePieceWidth = img.width / config.cols;
    const sourcePieceHeight = img.height / config.rows;

    // Determine maximum puzzle area while maintaining aspect ratio
    const maxPuzzleWidth = availableWidth * 0.6;
    const maxPuzzleHeight = availableHeight * 0.8;

    // Calculate actual puzzle dimensions maintaining image aspect ratio
    let puzzleAreaWidth, puzzleAreaHeight;

    if (imageAspectRatio > (maxPuzzleWidth / maxPuzzleHeight)) {
      // Image is wider - limit by width
      puzzleAreaWidth = Math.min(maxPuzzleWidth, img.width);
      puzzleAreaHeight = puzzleAreaWidth / imageAspectRatio;
    } else {
      // Image is taller - limit by height
      puzzleAreaHeight = Math.min(maxPuzzleHeight, img.height);
      puzzleAreaWidth = puzzleAreaHeight * imageAspectRatio;
    }

    // Calculate piece dimensions that maintain source aspect ratio
    const pieceWidth = puzzleAreaWidth / config.cols;
    const pieceHeight = puzzleAreaHeight / config.rows;

    // Calculate required width for puzzle + staging areas
    const minRequiredWidth = puzzleAreaWidth + 400; // Extra space for staging areas
    const actualCanvasWidth = Math.max(availableWidth, Math.min(minRequiredWidth, 1400));

    // Set canvas size to accommodate both puzzle area and staging areas
    canvas.width = actualCanvasWidth;
    canvas.height = Math.max(availableHeight, puzzleAreaHeight + 200);

    // Center the puzzle area on the canvas
    const totalPuzzleWidth = config.cols * pieceWidth;
    const totalPuzzleHeight = config.rows * pieceHeight;
    const puzzleStartX = (actualCanvasWidth - totalPuzzleWidth) / 2;
    const puzzleStartY = (canvas.height - totalPuzzleHeight) / 2;

    // Calculate staging areas on left and right sides
    const leftStagingWidth = puzzleStartX - CANVAS_PADDING * 2;
    const rightStagingWidth = leftStagingWidth;
    const rightStagingStartX = puzzleStartX + totalPuzzleWidth + CANVAS_PADDING;
    const stagingHeight = canvas.height - CANVAS_PADDING * 2;

    // Calculate how to arrange pieces in staging areas
    const totalPieces = config.pieceCount;
    const piecesPerSide = Math.ceil(totalPieces / 2);

    // Calculate grid dimensions for staging areas
    const stagingCols = Math.ceil(Math.sqrt(piecesPerSide * (leftStagingWidth / stagingHeight)));
    const stagingRows = Math.ceil(piecesPerSide / stagingCols);

    // Ensure pieces fit in staging area
    const maxStagingPieceWidth = leftStagingWidth / stagingCols;
    const maxStagingPieceHeight = stagingHeight / stagingRows;

    // Use smaller pieces in staging if needed, but maintain aspect ratio
    const stagingPieceWidth = Math.min(maxStagingPieceWidth, pieceWidth * 0.8);
    const stagingPieceHeight = Math.min(maxStagingPieceHeight, pieceHeight * 0.8);

    // Create pieces first
    const newPieces = [];
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        const id = row * config.cols + col;
        const piece = {
          id,
          row,
          col,
          width: pieceWidth,
          height: pieceHeight,
          sourceX: (img.width / config.cols) * col,
          sourceY: (img.height / config.rows) * row,
          sourceWidth: img.width / config.cols,
          sourceHeight: img.height / config.rows,
          // Correct position (where piece should end up - centered)
          correctX: puzzleStartX + col * pieceWidth,
          correctY: puzzleStartY + row * pieceHeight,
          placed: false,
          connected: false
        };
        newPieces.push(piece);
      }
    }

    // Shuffle the pieces array to randomize staging placement
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    }

    // Now assign randomized positions in staging areas
    let leftSideCounter = 0;
    let rightSideCounter = 0;

    newPieces.forEach((piece, index) => {
      // Determine which side this piece goes to (alternate for even distribution)
      const goesToLeftSide = index % 2 === 0;

      let stagingX, stagingY;

      if (goesToLeftSide) {
        // Arrange in left staging area
        const stagingCol = leftSideCounter % stagingCols;
        const stagingRow = Math.floor(leftSideCounter / stagingCols);

        stagingX = CANVAS_PADDING + stagingCol * stagingPieceWidth + (leftStagingWidth - stagingCols * stagingPieceWidth) / 2;
        stagingY = CANVAS_PADDING + stagingRow * stagingPieceHeight + (stagingHeight - stagingRows * stagingPieceHeight) / 2;

        leftSideCounter++;
      } else {
        // Arrange in right staging area
        const stagingCol = rightSideCounter % stagingCols;
        const stagingRow = Math.floor(rightSideCounter / stagingCols);

        stagingX = rightStagingStartX + stagingCol * stagingPieceWidth + (rightStagingWidth - stagingCols * stagingPieceWidth) / 2;
        stagingY = CANVAS_PADDING + stagingRow * stagingPieceHeight + (stagingHeight - stagingRows * stagingPieceHeight) / 2;

        rightSideCounter++;
      }

      // Assign the calculated position to the piece
      piece.x = stagingX;
      piece.y = stagingY;
    });

    setPieces(newPieces);
    setConnectedPieces(new Set());
    setGameCompleted(false);
  }, [config]);

  // Draw puzzle pieces on canvas
  const drawPuzzle = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!canvas || !ctx || !img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid (optional - helps users see where pieces go)
    if (pieces.length > 0) {
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
      ctx.lineWidth = 1;

      // Calculate centered grid position
      const totalPuzzleWidth = config.cols * pieces[0].width;
      const totalPuzzleHeight = config.rows * pieces[0].height;
      const gridStartX = (canvas.width - totalPuzzleWidth) / 2;
      const gridStartY = (canvas.height - totalPuzzleHeight) / 2;

      for (let row = 0; row < config.rows; row++) {
        for (let col = 0; col < config.cols; col++) {
          const x = gridStartX + col * pieces[0].width;
          const y = gridStartY + row * pieces[0].height;
          const width = pieces[0].width;
          const height = pieces[0].height;
          ctx.strokeRect(x, y, width, height);
        }
      }
    }

    // Draw pieces (placed pieces first, then loose pieces)
    const sortedPieces = [...pieces].sort((a, b) => {
      if (a.placed && !b.placed) return -1;
      if (!a.placed && b.placed) return 1;
      return 0;
    });

    sortedPieces.forEach(piece => {
      // Save context for transformations
      ctx.save();

      // Draw piece shadow if not placed
      if (!piece.placed) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
      }

      // Draw the piece
      ctx.drawImage(
        img,
        piece.sourceX, piece.sourceY, piece.sourceWidth, piece.sourceHeight,
        piece.x, piece.y, piece.width, piece.height
      );

      // Draw border
      ctx.strokeStyle = piece.placed ? '#4CAF50' : '#333';
      ctx.lineWidth = piece.placed ? 3 : 2;
      ctx.strokeRect(piece.x, piece.y, piece.width, piece.height);

      // Highlight if being dragged
      if (draggedPiece && draggedPiece.id === piece.id) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 4;
        ctx.strokeRect(piece.x, piece.y, piece.width, piece.height);
      }

      ctx.restore();
    });

    // Draw completion message
    if (gameCompleted) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🎉 Puzzle Completed! 🎉', canvas.width / 2, canvas.height / 2);

      ctx.font = '24px Arial';
      ctx.fillText('Great job!', canvas.width / 2, canvas.height / 2 + 60);
    }
  }, [pieces, draggedPiece, config, gameCompleted]);


  // Handle mouse events
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Find clicked piece (check from top to bottom)
    for (let i = pieces.length - 1; i >= 0; i--) {
      const piece = pieces[i];
      if (
        mouseX >= piece.x &&
        mouseX <= piece.x + piece.width &&
        mouseY >= piece.y &&
        mouseY <= piece.y + piece.height &&
        !piece.placed
      ) {
        setDraggedPiece(piece);
        setDragOffset({
          x: mouseX - piece.x,
          y: mouseY - piece.y
        });
        dragInfoRef.current = {
          isDragging: true,
          draggedPieceId: piece.id,
          startPos: { x: piece.x, y: piece.y }
        };
        break;
      }
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragInfoRef.current.isDragging || !draggedPiece) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - dragOffset.x;
    const newY = mouseY - dragOffset.y;

    setPieces(prevPieces => {
      // Find the dragged piece in current state
      const currentDraggedPiece = prevPieces.find(p => p.id === dragInfoRef.current.draggedPieceId);
      if (!currentDraggedPiece) return prevPieces;

      // Calculate movement delta
      const deltaX = newX - currentDraggedPiece.x;
      const deltaY = newY - currentDraggedPiece.y;

      // Find all pieces that should move together
      const piecesToMove = new Set([currentDraggedPiece.id]);

      // Add connected pieces that are not placed (placed pieces don't move)
      connectedPieces.forEach(id => {
        const piece = prevPieces.find(p => p.id === id);
        if (piece && !piece.placed) {
          piecesToMove.add(id);
        }
      });

      return prevPieces.map(piece => {
        if (piecesToMove.has(piece.id)) {
          return {
            ...piece,
            x: piece.x + deltaX,
            y: piece.y + deltaY
          };
        }
        return piece;
      });
    });
  }, [dragOffset, draggedPiece, connectedPieces]);

  const handleMouseUp = useCallback(() => {
    if (!dragInfoRef.current.isDragging || !draggedPiece) return;

    const currentDraggedPiece = pieces.find(p => p.id === dragInfoRef.current.draggedPieceId);
    if (!currentDraggedPiece) return;

    // Check if piece should snap to place
    const distance = Math.sqrt(
      Math.pow(currentDraggedPiece.x - currentDraggedPiece.correctX, 2) +
      Math.pow(currentDraggedPiece.y - currentDraggedPiece.correctY, 2)
    );

    if (distance < PIECE_SNAP_DISTANCE) {
      // Piece is close enough to snap - find all pieces that move with it
      const connectedIds = new Set([currentDraggedPiece.id]);

      // Add any pieces that are already connected and moving together
      pieces.forEach(piece => {
        if (connectedPieces.has(piece.id) && !piece.placed) {
          // Check if this piece is moving with the dragged piece
          const expectedX = piece.correctX + (currentDraggedPiece.x - currentDraggedPiece.correctX);
          const expectedY = piece.correctY + (currentDraggedPiece.y - currentDraggedPiece.correctY);
          const dist = Math.sqrt(Math.pow(piece.x - expectedX, 2) + Math.pow(piece.y - expectedY, 2));
          if (dist < 30) {
            connectedIds.add(piece.id);
          }
        }
      });

      // Snap all these pieces to their correct positions
      setPieces(prevPieces =>
        prevPieces.map(piece => {
          if (connectedIds.has(piece.id)) {
            return {
              ...piece,
              x: piece.correctX,
              y: piece.correctY,
              placed: true
            };
          }
          return piece;
        })
      );

      // Find all connected components after placing these pieces
      const findAllConnected = (placedPieceIds) => {
        const allConnected = new Set(placedPieceIds);
        const toCheck = [...placedPieceIds];

        while (toCheck.length > 0) {
          const currentId = toCheck.pop();
          const currentPiece = pieces.find(p => p.id === currentId);
          if (!currentPiece) continue;

          // Check all adjacent positions
          const adjacentIds = [
            currentPiece.row > 0 ? (currentPiece.row - 1) * config.cols + currentPiece.col : -1, // up
            currentPiece.row < config.rows - 1 ? (currentPiece.row + 1) * config.cols + currentPiece.col : -1, // down
            currentPiece.col > 0 ? currentPiece.row * config.cols + (currentPiece.col - 1) : -1, // left
            currentPiece.col < config.cols - 1 ? currentPiece.row * config.cols + (currentPiece.col + 1) : -1 // right
          ].filter(id => id !== -1);

          adjacentIds.forEach(id => {
            if (!allConnected.has(id)) {
              const adjacentPiece = pieces.find(p => p.id === id);
              if (adjacentPiece && (adjacentPiece.placed || connectedPieces.has(id))) {
                allConnected.add(id);
                toCheck.push(id);
              }
            }
          });
        }

        return allConnected;
      };

      // Update connected pieces with all newly connected pieces
      const newConnectedPieces = findAllConnected([...connectedIds, ...connectedPieces]);
      setConnectedPieces(newConnectedPieces);

      // Check for completion
      if (newConnectedPieces.size >= config.pieceCount) {
        setTimeout(() => setGameCompleted(true), 500);
      }
    }

    dragInfoRef.current = { isDragging: false, draggedPieceId: null, startPos: { x: 0, y: 0 } };
    setDraggedPiece(null);
  }, [draggedPiece, pieces, connectedPieces, config.cols, config.rows, config.pieceCount]);

  // Initialize when component mounts or config changes
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      initializePuzzle();
    }
  }, [initializePuzzle]);

  // Redraw when pieces change
  useEffect(() => {
    drawPuzzle();
  }, [drawPuzzle]);

  // Handle window resize - only resize canvas, don't reset puzzle
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || pieces.length === 0) return;

      const canvas = canvasRef.current;
      const availableWidth = Math.min(window.innerWidth - 200, 1200);
      const availableHeight = window.innerHeight - 300;

      // Calculate puzzle area width for minimum canvas size
      const totalPuzzleWidth = config.cols * pieces[0].width;
      const minRequiredWidth = totalPuzzleWidth + 400; // Extra space for staging areas
      const actualCanvasWidth = Math.max(availableWidth, Math.min(minRequiredWidth, 1400));

      // Only update canvas size, keep pieces in their current positions
      canvas.width = actualCanvasWidth;
      canvas.height = Math.max(availableHeight, canvas.height);

      // Redraw with current piece positions
      drawPuzzle();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pieces, drawPuzzle, config.cols]);

  return (
    <div className="puzzle-game">
      <div className="game-header">
        <button className="secondary-btn" onClick={onReset}>
          ← New Puzzle
        </button>
        <div className="game-info">
          <span>Pieces: {connectedPieces.size}/{config.pieceCount}</span>
          <span>Progress: {Math.round((connectedPieces.size / config.pieceCount) * 100)}%</span>
        </div>
      </div>

      <div className="game-canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="puzzle-canvas"
        />
      </div>

      <img
        ref={imageRef}
        src={image}
        alt="Puzzle source"
        style={{ display: 'none' }}
        onLoad={initializePuzzle}
      />
    </div>
  );
};

export default PuzzleGame;