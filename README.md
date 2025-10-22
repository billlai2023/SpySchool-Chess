# 🕵️ Spy School Chess Academy 🕵️

A fun, educational chess game themed around the popular "Spy School" book series by Stuart Gibbs! Perfect for kids aged 10 and up who are learning chess.

## 🎯 Features

### For Young Players
- **Spy-themed missions** featuring characters from the Spy School books:
  - Ben Ripley - Your fellow spy student
  - Erica Hale - Elite spy mentor
  - Murray Hill - Reformed villain with sneaky moves
  - Zoe Zibbell - Tech specialist

- **Progressive difficulty levels** (5 missions):
  - Level 1: Training Academy (Beginner)
  - Level 2: Field Training (Easy)
  - Level 3: The SPYDER Mission (Medium)
  - Level 4: The Secret Mission (Medium)
  - Level 5: Evil Spy School Showdown (Hard)

### Learning Features
- **Visual hints system** - Shows valid moves when a piece is selected
- **Move hints button** - Highlights good moves for beginners
- **Educational tips** - Each mission includes chess strategy tips
- **Piece descriptions** - Hover over pieces to learn how they move
- **Real-time feedback** - Characters respond to your moves with encouragement and advice
- **Move history** - Track all moves made during the game

### Progress Tracking
- **Game history** - All games are saved and can be reviewed
- **Statistics dashboard** - Track wins, losses, and progress
- **Level progression** - Unlock new missions as you improve
- **Achievement tracking** - See your improvement over time

### Character Interaction
- **Animated avatars** with unique personalities
- **Dialogue system** with typing animation
- **Contextual responses** based on game events
- **Mission-specific storylines**

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎮 How to Play

### Starting a Mission
1. From the main menu, select a mission to begin
2. Read the mission description and tips
3. Click "Start Mission" to begin

### Playing Chess
1. **Select a piece** by clicking on it (only your white pieces)
2. **Valid moves** will be highlighted in green
3. **Click a highlighted square** to move your piece
4. The AI opponent will make their move
5. Continue until checkmate or draw

### Using Hints
- Click the "💡 Show Hints" button to see recommended moves
- Hint squares will be highlighted in blue
- Use hints when you're stuck or learning new strategies

### Game Controls
- **Back to Menu** - Return to mission selection (forfeits current game)
- **Retry Mission** - Start the same mission again
- **View Progress** - See your statistics and game history

## 📚 Chess Basics for Beginners

### Piece Movement
- **Pawns** (♙): Move forward one square (two on first move), capture diagonally
- **Knights** (♘): Move in an "L" shape, can jump over pieces
- **Bishops** (♗): Move diagonally any distance
- **Rooks** (♖): Move horizontally or vertically any distance
- **Queen** (♕): Move in any direction any distance (most powerful!)
- **King** (♔): Move one square in any direction (must protect!)

### Game Objectives
- **Checkmate**: Trap the opponent's king so it can't escape
- **Check**: When a king is under attack (must move to safety)
- **Draw**: Game ends with no winner (stalemate, repetition, etc.)

### Strategy Tips
1. **Control the center** - Place pieces in the middle of the board
2. **Develop pieces early** - Don't move the same piece twice at the start
3. **Castle your king** - Keep your king safe
4. **Think ahead** - Try to predict your opponent's moves
5. **Protect your pieces** - Don't leave pieces undefended

## 🎨 Features for Parents/Educators

### Educational Value
- Teaches strategic thinking and planning
- Improves pattern recognition
- Develops problem-solving skills
- Encourages reading (character dialogue and tips)
- Safe, offline gameplay with no ads or in-app purchases

### Progress Monitoring
- View detailed statistics in the Progress section
- See which levels have been completed
- Track win rates and improvement over time
- Review game history to analyze mistakes

### Customization
The game is designed to be beginner-friendly:
- AI difficulty scales appropriately for each level
- Hints are always available when needed
- Positive feedback encourages learning
- No time pressure - players can think as long as needed

## 🛠️ Technical Details

### Built With
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Chess.js** - Chess logic and move validation
- **Custom AI** - Minimax algorithm with alpha-beta pruning

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- No installation required - runs in browser
- Mobile-responsive design

### Data Storage
- Game history stored in browser's localStorage
- No personal data collected
- Progress persists between sessions
- Can be reset at any time

## 📖 About Spy School

"Spy School" is a popular middle-grade book series by Stuart Gibbs featuring Ben Ripley, a 12-year-old recruited to a secret CIA academy. The series combines humor, action, and clever spy tactics - perfect themes for teaching strategic thinking through chess!

### Books in the Series
- Spy School
- Spy Camp
- Evil Spy School
- Spy Ski School
- Spy School Secret Service
- Spy School Goes South
- Spy School British Invasion
- Spy School Revolution
- And more!

*Note: This chess game is an unofficial fan project and is not affiliated with Stuart Gibbs or the official Spy School series.*

## 🎓 Tips for Parents

### For Complete Beginners
1. Start with Level 1 - it's designed for first-time players
2. Use the hint system liberally
3. Read the mission tips together
4. Play a few games together to demonstrate strategies
5. Emphasize learning over winning

### Encouraging Progress
- Celebrate small victories (capturing pieces, avoiding check)
- Review game history together
- Discuss what worked and what didn't
- Let them replay levels to improve
- Make it fun - the spy theme keeps kids engaged!

### When They're Ready
- Introduce chess notation by looking at move history
- Teach special moves (castling, en passant)
- Watch chess tutorials together
- Play real chess games as a family

## 🐛 Troubleshooting

### Game Won't Load
- Clear browser cache and reload
- Make sure JavaScript is enabled
- Try a different browser

### Hints Not Working
- Hints only work on player's turn (white pieces)
- Make sure you haven't clicked "Hide Hints"

### Progress Not Saving
- Check browser's localStorage isn't disabled
- Some private/incognito modes block storage

## 📝 License

This is a fan-made educational project created for learning purposes. The Spy School characters and concepts are the property of Stuart Gibbs and Simon & Schuster.

## 🤝 Contributing

This project is designed for personal/educational use. Feel free to fork and modify for your own purposes!

## 📧 Support

If you encounter issues or have suggestions:
1. Check the troubleshooting section above
2. Review the code comments for technical details
3. Consider contributing improvements via pull requests

---

**Have fun learning chess, Agent!** 🕵️‍♀️♟️🕵️‍♂️
