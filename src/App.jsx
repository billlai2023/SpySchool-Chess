import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import Avatar from './components/Avatar';
import GameHistory from './components/GameHistory';
import { missions, dialogues, characters } from './data/spySchoolData';
import { getBestMove, evaluatePlayerMove } from './utils/chessAI';
import { saveGame, getProgress } from './utils/gameStorage';
import './styles/App.css';

function App() {
  const [game, setGame] = useState(new Chess());
  const [currentMission, setCurrentMission] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [avatarMessage, setAvatarMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [gameStatus, setGameStatus] = useState('menu'); // 'menu', 'playing', 'gameover'
  const [showHistory, setShowHistory] = useState(false);
  const [progress, setProgress] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  // Load progress on mount
  useEffect(() => {
    setProgress(getProgress());
  }, []);

  // Start a new mission
  const startMission = (missionLevel) => {
    const mission = missions.find(m => m.level === missionLevel);
    if (!mission) return;

    const newGame = new Chess();
    setGame(newGame);
    setCurrentMission(mission);
    setGameStartTime(Date.now());
    setMoveCount(0);
    setMoveHistory([]);
    setGameStatus('playing');
    setCurrentTurn(0);

    // Welcome message
    const character = characters[mission.character];
    setAvatarMessage(`${character.intro}\n\nMission: ${mission.name}\n${mission.description}`);
  };

  // Handle player move
  const handlePlayerMove = (move) => {
    // Update the game state with new instance to ensure proper re-render
    const newGame = new Chess(game.fen());
    setGame(newGame);

    setMoveCount(prev => prev + 1);
    setMoveHistory(prev => [...prev, move.san]);
    setCurrentTurn(prev => prev + 1);

    // Give feedback
    if (game.isCheck()) {
      setAvatarMessage(dialogues.check[Math.floor(Math.random() * dialogues.check.length)]);
    } else {
      // Simple feedback based on move type
      if (move.captured) {
        setAvatarMessage(dialogues.goodMove[Math.floor(Math.random() * dialogues.goodMove.length)]);
      } else {
        setAvatarMessage("Good move! Think ahead...");
      }
    }

    // Check if game is over
    if (game.isGameOver()) {
      handleGameOver('win');
      return;
    }

    // AI's turn - use setTimeout to allow UI to update
    setTimeout(() => {
      // Pass the current game state to AI
      makeAIMove(newGame);
    }, 1000);
  };

  // Make AI move
  const makeAIMove = (currentGame) => {
    setIsThinking(true);
    setAvatarMessage("I'm thinking...");

    setTimeout(() => {
      const aiMove = getBestMove(currentGame, currentMission.aiStrength);

      if (aiMove) {
        currentGame.move(aiMove);
        setGame(new Chess(currentGame.fen()));
        setMoveHistory(prev => [...prev, aiMove.san]);
        setMoveCount(prev => prev + 1);
        setCurrentTurn(prev => prev + 1);
        setIsThinking(false);

        // Check if game is over
        if (currentGame.isGameOver()) {
          handleGameOver('loss');
        } else if (currentGame.isCheck()) {
          setAvatarMessage("You're in check! Protect your King!");
        } else {
          setAvatarMessage("Your turn! Think carefully about your next move.");
        }
      }
    }, 500);
  };

  // Handle game over
  const handleGameOver = (result) => {
    setGameStatus('gameover');

    const duration = Math.floor((Date.now() - gameStartTime) / 1000);

    let gameResult = result;
    if (game.isDraw() || game.isStalemate()) {
      gameResult = 'draw';
    } else if (game.isCheckmate()) {
      gameResult = game.turn() === 'w' ? 'loss' : 'win';
    }

    // Save game
    saveGame({
      mission: currentMission.name,
      level: currentMission.level,
      result: gameResult,
      moves: moveCount,
      duration,
      character: currentMission.character,
      pgn: game.pgn()
    });

    // Update progress
    setProgress(getProgress());

    // Show message
    if (gameResult === 'win') {
      setAvatarMessage(dialogues.checkmate[Math.floor(Math.random() * dialogues.checkmate.length)]);
    } else {
      setAvatarMessage(dialogues.defeat[Math.floor(Math.random() * dialogues.defeat.length)]);
    }
  };

  // Return to menu
  const returnToMenu = () => {
    setGameStatus('menu');
    setGame(new Chess());
    setCurrentMission(null);
    setAvatarMessage('');
  };

  // Render mission selection menu
  const renderMenu = () => {
    return (
      <div className="menu-screen">
        <div className="menu-header">
          <h1>🕵️ Spy School Chess Academy 🕵️</h1>
          <p className="menu-subtitle">Learn chess while going on spy missions!</p>
        </div>

        {progress && progress.totalGames > 0 && (
          <div className="progress-summary">
            <div className="progress-stats">
              <span>Games: {progress.totalGames}</span>
              <span>Wins: {progress.wins}</span>
              <span>Level: {progress.highestLevel}</span>
            </div>
            <button className="history-button" onClick={() => setShowHistory(true)}>
              📊 View Progress
            </button>
          </div>
        )}

        <div className="missions-list">
          <h2>Select Your Mission</h2>

          {missions.map((mission) => {
            const isLocked = progress && mission.level > progress.highestLevel + 1;
            const character = characters[mission.character];

            return (
              <div
                key={mission.level}
                className={`mission-card ${isLocked ? 'locked' : ''}`}
                style={{ borderColor: character.color }}
              >
                <div className="mission-header">
                  <span className="mission-avatar">{character.avatar}</span>
                  <div className="mission-info">
                    <h3>Level {mission.level}: {mission.name}</h3>
                    <p className="mission-character">{character.name}</p>
                  </div>
                  <span className={`difficulty-badge ${mission.difficulty}`}>
                    {mission.difficulty}
                  </span>
                </div>

                <p className="mission-description">{mission.description}</p>

                <button
                  className="start-button"
                  onClick={() => startMission(mission.level)}
                  disabled={isLocked}
                  style={{ backgroundColor: isLocked ? '#ccc' : character.color }}
                >
                  {isLocked ? '🔒 Locked' : '▶ Start Mission'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render game screen
  const renderGame = () => {
    if (!currentMission) return null;

    const character = characters[currentMission.character];

    return (
      <div className="game-screen">
        <div className="game-header">
          <h2>Mission: {currentMission.name}</h2>
          <button className="menu-button" onClick={returnToMenu}>
            ← Back to Menu
          </button>
        </div>

        <div className="game-layout">
          <div className="game-sidebar">
            <Avatar
              characterId={currentMission.character}
              message={avatarMessage}
            />

            <div className="game-info">
              <div className="info-section">
                <h3>Mission Tips</h3>
                <ul>
                  {currentMission.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h3>Move History</h3>
                <div className="move-list">
                  {moveHistory.length === 0 ? (
                    <p className="no-moves">No moves yet</p>
                  ) : (
                    moveHistory.map((move, index) => (
                      <div key={index} className="move-item">
                        {Math.floor(index / 2) + 1}.
                        {index % 2 === 0 ? ' ' + move : ' ... ' + move}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="game-main">
            <ChessBoard
              game={game}
              onMove={handlePlayerMove}
              onGameOver={handleGameOver}
              difficulty={currentMission.aiStrength}
              showHints={true}
              currentTurn={currentTurn}
            />

            {gameStatus === 'gameover' && (
              <div className="game-over-overlay">
                <div className="game-over-content">
                  <h2>
                    {game.isCheckmate() && game.turn() === 'b' ? '🎉 Mission Success!' : '😔 Mission Failed'}
                  </h2>
                  <p>Moves: {moveCount}</p>
                  <p>Time: {Math.floor((Date.now() - gameStartTime) / 1000)}s</p>

                  <div className="game-over-buttons">
                    <button onClick={() => startMission(currentMission.level)}>
                      🔄 Retry Mission
                    </button>
                    <button onClick={returnToMenu}>
                      ← Back to Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {gameStatus === 'menu' && renderMenu()}
      {(gameStatus === 'playing' || gameStatus === 'gameover') && renderGame()}
      {showHistory && <GameHistory onClose={() => setShowHistory(false)} />}
    </div>
  );
}

export default App;
