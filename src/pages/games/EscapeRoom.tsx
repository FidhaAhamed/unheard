import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Lock, 
  Unlock, 
  Eye, 
  Search, 
  Timer,
  Trophy,
  Users,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Puzzle {
  id: number;
  type: 'symbol' | 'pattern' | 'logic' | 'sequence';
  title: string;
  description: string;
  visualClue: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
  points: number;
}

interface Room {
  id: number;
  name: string;
  theme: string;
  puzzles: Puzzle[];
  timeLimit: number;
  description: string;
}

export default function EscapeRoom() {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentPuzzleIndex, setPuzzleIndex] = useState(0);
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'completed' | 'failed'>('selecting');

  const rooms: Room[] = [
    {
      id: 1,
      name: "The Symbol Sanctuary",
      theme: "Ancient Symbols",
      description: "Decode mysterious symbols to unlock the chamber",
      timeLimit: 300, // 5 minutes
      puzzles: [
        {
          id: 1,
          type: 'symbol',
          title: 'Ancient Lock',
          description: 'Match the symbols to unlock the first gate',
          visualClue: '🔺 + 🔴 + ⭐ = ?',
          options: ['🌟', '🔥', '⚡', '🎯'],
          correctAnswer: '🌟',
          difficulty: 1,
          points: 50
        },
        {
          id: 2,
          type: 'pattern',
          title: 'Symbol Sequence',
          description: 'Continue the pattern to reveal the next clue',
          visualClue: '🌙 ➡️ ⭐ ➡️ ☀️ ➡️ ?',
          options: ['🌙', '🌍', '🔥', '💫'],
          correctAnswer: '🌍',
          difficulty: 2,
          points: 75
        },
        {
          id: 3,
          type: 'logic',
          title: 'Final Symbol',
          description: 'Use all previous clues to find the master key',
          visualClue: 'If 🔺=3, 🔴=1, ⭐=5, then 🔺+🔴+⭐ = ?',
          options: ['7', '8', '9', '10'],
          correctAnswer: '9',
          difficulty: 3,
          points: 100
        }
      ]
    },
    {
      id: 2,
      name: "The Emoji Enigma",
      theme: "Modern Puzzles",
      description: "Solve emoji-based riddles and visual puzzles",
      timeLimit: 240, // 4 minutes
      puzzles: [
        {
          id: 4,
          type: 'sequence',
          title: 'Emoji Story',
          description: 'What does this emoji sequence represent?',
          visualClue: '👑 + 🏰 + 🐸 + 💋 = ?',
          options: ['Fairy Tale', 'Royal Wedding', 'Princess Story', 'Magic Spell'],
          correctAnswer: 'Princess Story',
          difficulty: 2,
          points: 60
        },
        {
          id: 5,
          type: 'logic',
          title: 'Emoji Math',
          description: 'Solve the emoji equation',
          visualClue: '🍎 + 🍎 = 10, 🍌 = 5, 🍎 + 🍌 = ?',
          options: ['10', '15', '8', '12'],
          correctAnswer: '10',
          difficulty: 2,
          points: 80
        }
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameState('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeRemaining]);

  const startRoom = (room: Room) => {
    setCurrentRoom(room);
    setPuzzleIndex(0);
    setSolvedPuzzles(new Set());
    setTimeRemaining(room.timeLimit);
    setGameState('playing');
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    if (!currentRoom) return;

    const currentPuzzle = currentRoom.puzzles[currentPuzzleIndex];
    const isCorrect = answer === currentPuzzle.correctAnswer;

    if (isCorrect) {
      setSolvedPuzzles(prev => new Set([...prev, currentPuzzle.id]));
      setScore(prev => prev + currentPuzzle.points);

      if (currentPuzzleIndex < currentRoom.puzzles.length - 1) {
        setPuzzleIndex(prev => prev + 1);
      } else {
        setGameState('completed');
      }
    }
  };

  const resetGame = () => {
    setCurrentRoom(null);
    setPuzzleIndex(0);
    setSolvedPuzzles(new Set());
    setScore(0);
    setTimeRemaining(0);
    setGameState('selecting');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'selecting') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-escape-room/10 text-game-escape-room border border-game-escape-room/20">
            <Lock className="h-5 w-5" />
            <span className="font-semibold">Visual Escape Room</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-game-escape-room to-primary bg-clip-text text-transparent">
            Choose Your Room
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Solve visual puzzles using symbols, patterns, and logic to escape before time runs out
          </p>
        </div>

        {/* Room Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-game-escape-room/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-game-escape-room border-game-escape-room">
                    {room.theme}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    {Math.floor(room.timeLimit / 60)}min
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-game-escape-room">{room.puzzles.length}</div>
                    <div className="text-muted-foreground">Puzzles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{room.puzzles.reduce((sum, p) => sum + p.difficulty, 0)}</div>
                    <div className="text-muted-foreground">Difficulty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{room.puzzles.reduce((sum, p) => sum + p.points, 0)}</div>
                    <div className="text-muted-foreground">Max Points</div>
                  </div>
                </div>

                <Button onClick={() => startRoom(room)} className="w-full" size="lg">
                  <Lock className="h-4 w-4 mr-2" />
                  Enter Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Card className="bg-success/10 border-success">
          <CardContent className="p-8">
            <Trophy className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-success mb-4">Room Escaped!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Congratulations! You successfully solved all puzzles and escaped {currentRoom?.name}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-foreground">{score}</div>
                <div className="text-sm text-muted-foreground">Total Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{formatTime(timeRemaining)}</div>
                <div className="text-sm text-muted-foreground">Time Remaining</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame}>
                Choose Another Room
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Challenge Friends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'failed') {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-8">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-destructive mb-4">Time's Up!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              You ran out of time! Try again with a different strategy.
            </p>
            <div className="mb-6">
              <div className="text-2xl font-bold text-foreground">{score}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <Button onClick={resetGame}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentRoom) return null;

  const currentPuzzle = currentRoom.puzzles[currentPuzzleIndex];
  const progress = ((currentPuzzleIndex + 1) / currentRoom.puzzles.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Trophy className="h-5 w-5 text-game-escape-room mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Timer className="h-5 w-5 text-destructive mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{formatTime(timeRemaining)}</div>
            <div className="text-xs text-muted-foreground">Time Left</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-5 w-5 text-success mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{solvedPuzzles.size}</div>
            <div className="text-xs text-muted-foreground">Solved</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Lock className="h-5 w-5 text-warning mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{currentRoom.puzzles.length - solvedPuzzles.size}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </CardContent>
        </Card>
      </div>

      {/* Room Info */}
      <Card className="bg-game-escape-room/5 border-game-escape-room/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">{currentRoom.name}</h2>
              <p className="text-sm text-muted-foreground">{currentRoom.theme}</p>
            </div>
            <Badge variant="outline" className="text-game-escape-room border-game-escape-room">
              Puzzle {currentPuzzleIndex + 1} of {currentRoom.puzzles.length}
            </Badge>
          </div>
          <Progress value={progress} className="mt-2 h-2" />
        </CardContent>
      </Card>

      {/* Current Puzzle */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground">{currentPuzzle.title}</CardTitle>
              <CardDescription>{currentPuzzle.description}</CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className={`
                ${currentPuzzle.difficulty === 1 ? 'text-success border-success' : ''}
                ${currentPuzzle.difficulty === 2 ? 'text-warning border-warning' : ''}
                ${currentPuzzle.difficulty === 3 ? 'text-destructive border-destructive' : ''}
              `}
            >
              Level {currentPuzzle.difficulty}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Visual Clue */}
          <div className="text-center space-y-4">
            <div className="p-8 bg-muted/10 rounded-lg border border-border">
              <div className="text-4xl md:text-6xl font-mono tracking-wider text-foreground">
                {currentPuzzle.visualClue}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>Study the visual clue carefully</span>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentPuzzle.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant="outline"
                size="lg"
                className="h-16 text-lg hover:border-game-escape-room hover:bg-game-escape-room/10"
              >
                {option}
              </Button>
            ))}
          </div>

          {/* Hint */}
          <div className="flex items-center gap-2 p-3 bg-muted/10 rounded-lg">
            <Lightbulb className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground">
              Look for patterns, relationships, or logical connections in the visual clue
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="flex gap-4 justify-center">
        <Button onClick={resetGame} variant="outline">
          Exit Room
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Team Mode
        </Button>
      </div>
    </div>
  );
}