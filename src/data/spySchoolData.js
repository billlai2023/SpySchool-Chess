// Spy School characters and missions data
export const characters = {
  ben: {
    name: "Ben Ripley",
    role: "Spy Student",
    color: "#4A90E2",
    avatar: "👨‍🎓",
    intro: "Hi! I'm Ben Ripley from Spy School. Let me help you learn chess - it's like planning a spy mission!"
  },
  erica: {
    name: "Erica Hale",
    role: "Elite Spy",
    color: "#E24A4A",
    avatar: "👩‍💼",
    intro: "I'm Erica Hale. Chess is all about strategy - just like spy work. Let's train you to be the best!"
  },
  murray: {
    name: "Murray Hill",
    role: "Reformed Villain",
    color: "#9B59B6",
    avatar: "😎",
    intro: "Murray here! Even a former bad guy knows chess. Let me show you some sneaky moves!"
  },
  zoe: {
    name: "Zoe Zibbell",
    role: "Tech Specialist",
    color: "#2ECC71",
    avatar: "👩‍💻",
    intro: "Hey, I'm Zoe! I'll help you calculate the best moves like a computer algorithm!"
  }
};

export const missions = [
  {
    level: 1,
    name: "Training Academy",
    description: "Your first day at Spy School! Learn the basics of chess strategy.",
    difficulty: "beginner",
    character: "ben",
    goal: "Complete your first chess game",
    aiStrength: 1,
    tips: [
      "Control the center of the board - it's like controlling the mission area!",
      "Protect your King - he's like the principal, very important!",
      "Develop your pieces early - get your spy team into position!"
    ]
  },
  {
    level: 2,
    name: "Field Training",
    description: "Time for some outdoor training. Erica will teach you advanced tactics!",
    difficulty: "easy",
    character: "erica",
    goal: "Win against a more challenging opponent",
    aiStrength: 2,
    tips: [
      "Think two moves ahead - anticipate the enemy's plans!",
      "Knights can jump over pieces - use them for surprise attacks!",
      "Castle early to keep your King safe!"
    ]
  },
  {
    level: 3,
    name: "The SPYDER Mission",
    description: "Murray has intel on SPYDER's plans. Use strategy to defeat them!",
    difficulty: "medium",
    character: "murray",
    goal: "Capture the enemy queen",
    aiStrength: 3,
    tips: [
      "Look for forks - attacking two pieces at once!",
      "Pins can trap enemy pieces - very sneaky!",
      "Control key squares to limit enemy movement!"
    ]
  },
  {
    level: 4,
    name: "The Secret Mission",
    description: "A top-secret mission with Zoe. Calculate every move carefully!",
    difficulty: "medium",
    character: "zoe",
    goal: "Achieve checkmate",
    aiStrength: 4,
    tips: [
      "Create threats to force your opponent's moves!",
      "Trade pieces when you're ahead in material!",
      "Use your Queen wisely - she's your most powerful agent!"
    ]
  },
  {
    level: 5,
    name: "Evil Spy School Showdown",
    description: "Face off against Evil Spy School's best player!",
    difficulty: "hard",
    character: "erica",
    goal: "Defeat the evil spy master",
    aiStrength: 5,
    tips: [
      "Coordinate your pieces for a powerful attack!",
      "Watch for tactical combinations!",
      "Stay calm under pressure - you've trained for this!"
    ]
  }
];

export const dialogues = {
  welcome: [
    "Welcome to Spy School Chess Academy, Agent!",
    "Ready for your training mission?",
    "Let's sharpen those strategic skills!"
  ],
  goodMove: [
    "Excellent tactical thinking!",
    "That's a spy-level move!",
    "Great strategy, Agent!",
    "I couldn't have done it better myself!",
    "Your chess skills are improving!"
  ],
  badMove: [
    "Careful! That piece was unprotected!",
    "Watch out for enemy attacks!",
    "Don't forget to defend your pieces!",
    "Think about what the enemy might do next!",
    "Every spy makes mistakes - learn from them!"
  ],
  check: [
    "You're in check! The King is under attack!",
    "Alert! Your King needs protection!",
    "Your King is threatened - move him to safety!"
  ],
  checkmate: [
    "Checkmate! Mission accomplished!",
    "Victory! You've completed the mission!",
    "Excellent work, Agent! Mission success!"
  ],
  defeat: [
    "Mission failed, but great effort!",
    "Every spy loses sometimes. Try again!",
    "Learn from this and come back stronger!",
    "Don't give up - practice makes perfect!"
  ],
  hint: [
    "Need a hint? Let me highlight some good moves...",
    "Here are your options, Agent!",
    "These moves look promising!"
  ]
};

export const pieceDescriptions = {
  pawn: "Pawns are like junior spies - they move forward one square and capture diagonally. First move can be two squares!",
  knight: "Knights move in an L-shape and can jump over pieces - perfect for surprise attacks!",
  bishop: "Bishops move diagonally across the board - they're your long-range scouts!",
  rook: "Rooks move in straight lines horizontally or vertically - powerful attackers!",
  queen: "The Queen is your most powerful piece - she can move in any direction!",
  king: "Protect your King at all costs! He can move one square in any direction."
};
