import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { getBestMove, getHintMoves } from '../utils/chessAI';
import { pieceDescriptions } from '../data/spySchoolData';

const pieceSymbols = {
  'wp': '♙', 'wn': '♘', 'wb': '♗', 'wr': '♖', 'wq': '♕', 'wk': '♔',
  'bp': '♟', 'bn': '♞', 'bb': '♝', 'br': '♜', 'bq': '♛', 'bk': '♚'
};

function ChessBoard({ game, onMove, onGameOver, difficulty, showHints, currentTurn }) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [hintMoves, setHintMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [showingHints, setShowingHints] = useState(false);

  // Get hint moves when it's player's turn
  useEffect(() => {
    if (showHints && game.turn() === 'w' && !game.isGameOver()) {
      const hints = getHintMoves(game, 5);
      setHintMoves(hints);
    } else {
      setHintMoves([]);
    }
  }, [game, showHints, currentTurn]);

  // Handle square click
  const handleSquareClick = (row, col) => {
    if (game.isGameOver() || game.turn() !== 'w') return;

    const square = String.fromCharCode(97 + col) + (8 - row);
    const piece = game.get(square);

    // If a piece is selected
    if (selectedSquare) {
      // Try to make the move
      const from = selectedSquare;
      const to = square;

      // Check if this is a valid move
      const validMove = validMoves.includes(to);

      if (validMove) {
        try {
          const moveResult = game.move({ from, to, promotion: 'q' });

          if (moveResult) {
            setLastMove({ from, to });
            setSelectedSquare(null);
            setValidMoves([]);
            setShowingHints(false);
            onMove(moveResult);
            return;
          }
        } catch (error) {
          // Invalid move - shouldn't happen since we checked validMoves
          console.error('Move error:', error);
        }
      }

      // If clicking on another piece of the same color, select it
      if (piece && piece.color === 'w') {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setValidMoves(moves.map(m => m.to));
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      // Select a piece if it's the player's piece
      if (piece && piece.color === 'w') {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setValidMoves(moves.map(m => m.to));
      }
    }
  };

  // Highlight hint squares
  const toggleHints = () => {
    setShowingHints(!showingHints);
  };

  // Render a square
  const renderSquare = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row);
    const piece = game.get(square);
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare === square;
    const isValidMove = validMoves.includes(square);
    const isLastMoveSquare = lastMove && (lastMove.from === square || lastMove.to === square);
    const isHintMove = showingHints && hintMoves.some(m => m.from === square || m.to === square);

    let className = `chess-square ${isLight ? 'light' : 'dark'}`;
    if (isSelected) className += ' selected';
    if (isValidMove) className += ' valid-move';
    if (isLastMoveSquare) className += ' last-move';
    if (isHintMove) className += ' hint-move';

    const pieceKey = piece ? piece.color + piece.type : null;

    return (
      <div
        key={`${row}-${col}`}
        className={className}
        onClick={() => handleSquareClick(row, col)}
        title={piece ? pieceDescriptions[piece.type] : ''}
      >
        {piece && (
          <div className={`chess-piece ${piece.color === 'w' ? 'white' : 'black'}`}>
            {pieceSymbols[pieceKey]}
          </div>
        )}
        {isValidMove && <div className="move-indicator" />}
      </div>
    );
  };

  return (
    <div className="chess-board-container">
      <div className="board-controls">
        <button
          className="hint-button"
          onClick={toggleHints}
          disabled={game.isGameOver() || game.turn() !== 'w'}
        >
          {showingHints ? '✓ Hide Hints' : '💡 Show Hints'}
        </button>
      </div>

      <div className="chess-board">
        {/* Row labels */}
        <div className="row-labels">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(num => (
            <div key={num} className="label">{num}</div>
          ))}
        </div>

        <div className="board-grid">
          {/* Main board */}
          <div className="squares">
            {Array(8).fill(null).map((_, row) => (
              <div key={row} className="board-row">
                {Array(8).fill(null).map((_, col) => renderSquare(row, col))}
              </div>
            ))}
          </div>

          {/* Column labels */}
          <div className="col-labels">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
              <div key={letter} className="label">{letter}</div>
            ))}
          </div>
        </div>
      </div>

      {selectedSquare && validMoves.length > 0 && (
        <div className="move-help">
          Click on a highlighted square to move your piece!
        </div>
      )}
    </div>
  );
}

export default ChessBoard;
