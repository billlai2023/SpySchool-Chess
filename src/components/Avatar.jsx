import { useState, useEffect } from 'react';
import { characters } from '../data/spySchoolData';

function Avatar({ characterId, message, onMessageComplete }) {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const character = characters[characterId] || characters.ben;

  useEffect(() => {
    if (!message) {
      setDisplayedMessage('');
      return;
    }

    setIsTyping(true);
    setDisplayedMessage('');

    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedMessage(message.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        if (onMessageComplete) {
          setTimeout(onMessageComplete, 2000);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [message, onMessageComplete]);

  return (
    <div className="avatar-container">
      <div className="avatar-character" style={{ borderColor: character.color }}>
        <div className="avatar-icon">{character.avatar}</div>
        <div className="avatar-name" style={{ color: character.color }}>
          {character.name}
        </div>
        <div className="avatar-role">{character.role}</div>
      </div>

      {displayedMessage && (
        <div className="speech-bubble" style={{ borderColor: character.color }}>
          <div className="speech-bubble-content">
            {displayedMessage}
            {isTyping && <span className="typing-cursor">▋</span>}
          </div>
          <div
            className="speech-bubble-arrow"
            style={{ borderTopColor: character.color }}
          />
        </div>
      )}
    </div>
  );
}

export default Avatar;
