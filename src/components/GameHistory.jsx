import { useState, useEffect } from 'react';
import { getGameHistory, getStatistics } from '../utils/gameStorage';

function GameHistory({ onClose }) {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' or 'history'

  useEffect(() => {
    setHistory(getGameHistory());
    setStats(getStatistics());
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🎯 Spy School Progress</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="history-tabs">
          <button
            className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Statistics
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📜 Game History
          </button>
        </div>

        <div className="history-content">
          {activeTab === 'stats' && stats && (
            <div className="statistics">
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">{stats.totalGames}</div>
                  <div className="stat-label">Total Games</div>
                </div>

                <div className="stat-card wins">
                  <div className="stat-value">{stats.wins}</div>
                  <div className="stat-label">Missions Won</div>
                </div>

                <div className="stat-card losses">
                  <div className="stat-value">{stats.losses}</div>
                  <div className="stat-label">Missions Lost</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value">{stats.winRate}%</div>
                  <div className="stat-label">Win Rate</div>
                </div>

                <div className="stat-card level">
                  <div className="stat-value">{stats.highestLevel}</div>
                  <div className="stat-label">Highest Level</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value">{stats.totalMoves}</div>
                  <div className="stat-label">Total Moves</div>
                </div>
              </div>

              {stats.levelStats && Object.keys(stats.levelStats).length > 0 && (
                <div className="level-stats">
                  <h3>Level Progress</h3>
                  {Object.entries(stats.levelStats).map(([level, data]) => (
                    <div key={level} className="level-stat-row">
                      <div className="level-name">
                        {level.replace('level', 'Level ')}
                      </div>
                      <div className="level-progress">
                        <span>Attempts: {data.attempts}</span>
                        <span>Wins: {data.wins}</span>
                        <span>Success: {Math.round((data.wins / data.attempts) * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {stats.totalGames === 0 && (
                <div className="no-data">
                  <p>No games played yet!</p>
                  <p>Start your first mission to begin tracking progress.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="game-history-list">
              {history.length === 0 ? (
                <div className="no-data">
                  <p>No game history yet!</p>
                  <p>Your completed missions will appear here.</p>
                </div>
              ) : (
                history.map((game) => (
                  <div key={game.id} className={`history-item ${game.result}`}>
                    <div className="history-header">
                      <span className={`result-badge ${game.result}`}>
                        {game.result === 'win' ? '✓ Victory' :
                         game.result === 'loss' ? '✗ Defeat' : '= Draw'}
                      </span>
                      <span className="history-date">{formatDate(game.date)}</span>
                    </div>

                    <div className="history-details">
                      <div className="detail">
                        <strong>Mission:</strong> {game.mission}
                      </div>
                      <div className="detail">
                        <strong>Level:</strong> {game.level}
                      </div>
                      <div className="detail">
                        <strong>Moves:</strong> {game.moves}
                      </div>
                      <div className="detail">
                        <strong>Duration:</strong> {formatDuration(game.duration)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameHistory;
