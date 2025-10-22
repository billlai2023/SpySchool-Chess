// Chess AI with difficulty levels for Spy School Chess

// Piece values for evaluation
const pieceValues = {
  p: 10,  // pawn
  n: 30,  // knight
  b: 30,  // bishop
  r: 50,  // rook
  q: 90,  // queen
  k: 900  // king
};

// Position bonus for center control
const positionBonus = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50]
];

// Evaluate board position
function evaluateBoard(game) {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -10000 : 10000;
  }

  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }

  let score = 0;
  const board = game.board();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const value = pieceValues[piece.type];
        const posValue = positionBonus[i][j];

        if (piece.color === 'b') {
          score += value + posValue;
        } else {
          score -= value + posValue;
        }
      }
    }
  }

  return score;
}

// Minimax algorithm with alpha-beta pruning
function minimax(game, depth, alpha, beta, isMaximizing) {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves({ verbose: true });

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of moves) {
      game.move(move);
      const score = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const move of moves) {
      game.move(move);
      const score = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return minScore;
  }
}

// Get best move for AI based on difficulty
export function getBestMove(game, difficulty = 1) {
  const moves = game.moves({ verbose: true });

  if (moves.length === 0) return null;

  // Difficulty levels:
  // 1: Beginner - random moves with occasional good moves
  // 2: Easy - 1 ply lookahead with some randomness
  // 3: Medium - 2 ply lookahead
  // 4: Hard - 3 ply lookahead
  // 5: Expert - 4 ply lookahead

  if (difficulty === 1) {
    // Beginner: 70% random, 30% best move
    if (Math.random() < 0.7) {
      return moves[Math.floor(Math.random() * moves.length)];
    }
    difficulty = 2; // Fall through to easy for the 30%
  }

  const depth = difficulty;
  let bestMove = null;
  let bestScore = -Infinity;

  // Add some randomness for lower difficulties
  const randomness = Math.max(0, (3 - difficulty) * 10);

  for (const move of moves) {
    game.move(move);
    const score = minimax(game, depth - 1, -Infinity, Infinity, false) +
                  (Math.random() * randomness - randomness / 2);
    game.undo();

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

// Get hint moves for the player
export function getHintMoves(game, count = 3) {
  const moves = game.moves({ verbose: true });

  if (moves.length === 0) return [];

  // Evaluate each move and return the best ones
  const evaluatedMoves = moves.map(move => {
    game.move(move);
    const score = -minimax(game, 2, -Infinity, Infinity, false);
    game.undo();

    return { move, score };
  });

  // Sort by score and return top moves
  evaluatedMoves.sort((a, b) => b.score - a.score);
  return evaluatedMoves.slice(0, count).map(item => item.move);
}

// Check if a move is good (for feedback)
export function evaluatePlayerMove(game, move) {
  const movesBefore = game.moves({ verbose: true });
  const scoreBefore = evaluateBoard(game);

  game.move(move);
  const scoreAfter = evaluateBoard(game);
  const scoreDiff = scoreAfter - scoreBefore;

  game.undo();

  // Get best moves to compare
  const hints = getHintMoves(game, 3);
  const isGoodMove = hints.some(h => h.from === move.from && h.to === move.to);

  return {
    isGoodMove,
    scoreDiff,
    quality: scoreDiff > 0 ? 'excellent' : scoreDiff < -20 ? 'poor' : 'okay'
  };
}
