// Game storage and history tracking for Spy School Chess

const STORAGE_KEY = 'spySchoolChessHistory';
const PROGRESS_KEY = 'spySchoolChessProgress';

// Save game to history
export function saveGame(gameData) {
  try {
    const history = getGameHistory();

    const gameRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      mission: gameData.mission,
      level: gameData.level,
      result: gameData.result, // 'win', 'loss', 'draw'
      moves: gameData.moves,
      duration: gameData.duration,
      character: gameData.character,
      pgn: gameData.pgn
    };

    history.unshift(gameRecord); // Add to beginning

    // Keep only last 50 games
    if (history.length > 50) {
      history.length = 50;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

    // Update progress
    updateProgress(gameData);

    return gameRecord;
  } catch (error) {
    console.error('Error saving game:', error);
    return null;
  }
}

// Get game history
export function getGameHistory() {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading game history:', error);
    return [];
  }
}

// Update player progress
function updateProgress(gameData) {
  try {
    let progress = getProgress();

    // Update total games
    progress.totalGames = (progress.totalGames || 0) + 1;

    // Update wins/losses/draws
    if (gameData.result === 'win') {
      progress.wins = (progress.wins || 0) + 1;
    } else if (gameData.result === 'loss') {
      progress.losses = (progress.losses || 0) + 1;
    } else if (gameData.result === 'draw') {
      progress.draws = (progress.draws || 0) + 1;
    }

    // Update highest level completed
    if (gameData.result === 'win' && gameData.level) {
      progress.highestLevel = Math.max(progress.highestLevel || 0, gameData.level);
    }

    // Update total moves
    progress.totalMoves = (progress.totalMoves || 0) + gameData.moves;

    // Track level-specific stats
    if (!progress.levelStats) {
      progress.levelStats = {};
    }

    const levelKey = `level${gameData.level}`;
    if (!progress.levelStats[levelKey]) {
      progress.levelStats[levelKey] = { attempts: 0, wins: 0 };
    }

    progress.levelStats[levelKey].attempts += 1;
    if (gameData.result === 'win') {
      progress.levelStats[levelKey].wins += 1;
    }

    // Update last played
    progress.lastPlayed = new Date().toISOString();

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

    return progress;
  } catch (error) {
    console.error('Error updating progress:', error);
    return null;
  }
}

// Get player progress
export function getProgress() {
  try {
    const progress = localStorage.getItem(PROGRESS_KEY);
    return progress ? JSON.parse(progress) : {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      highestLevel: 0,
      totalMoves: 0,
      levelStats: {},
      lastPlayed: null
    };
  } catch (error) {
    console.error('Error loading progress:', error);
    return {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      highestLevel: 0,
      totalMoves: 0,
      levelStats: {},
      lastPlayed: null
    };
  }
}

// Reset progress (for testing or new user)
export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting progress:', error);
    return false;
  }
}

// Get statistics for display
export function getStatistics() {
  const progress = getProgress();
  const history = getGameHistory();

  const winRate = progress.totalGames > 0
    ? Math.round((progress.wins / progress.totalGames) * 100)
    : 0;

  const recentGames = history.slice(0, 10);
  const recentWins = recentGames.filter(g => g.result === 'win').length;

  return {
    ...progress,
    winRate,
    recentGames,
    recentWinRate: recentGames.length > 0
      ? Math.round((recentWins / recentGames.length) * 100)
      : 0
  };
}
