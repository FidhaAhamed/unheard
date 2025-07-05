import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Trophy,
  Users,
  Timer,
  Star
} from 'lucide-react';

interface LipReadingChallenge {
  id: number;
  videoPlaceholder: string;
  correctAnswer: string;
  hints: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

export default function LipReading() {
  const [currentChallenge, setCurrentChallenge] = useState<LipReadingChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'finished'>('playing');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  // Sample challenges
  const challenges: LipReadingChallenge[] = [
    {
      id: 1,
      videoPlaceholder: "Person saying: 'Hello, how are you today?'",
      correctAnswer: "hello how are you today",
      hints: ["Greeting phrase", "Question about wellbeing", "Common daily expression"],
      difficulty: 'Easy',
      points: 10
    },
    {
      id: 2,
      videoPlaceholder: "Person saying: 'Thank you very much'",
      correctAnswer: "thank you very much",
      hints: ["Expression of gratitude", "Very polite", "Four words"],
      difficulty: 'Easy',
      points: 10
    },
    {
      id: 3,
      videoPlaceholder: "Person saying: 'What time is the meeting?'",
      correctAnswer: "what time is the meeting",
      hints: ["Question about schedule", "Asking for specific time", "Work related"],
      difficulty: 'Medium',
      points: 20
    }
  ];

  useEffect(() => {
    // Initialize first challenge
    if (!currentChallenge) {
      setCurrentChallenge(challenges[0]);
    }
  }, []);

  useEffect(() => {
    // Timer countdown
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [gameState, timeRemaining]);

  const handleTimeUp = () => {
    setShowResult(true);
    setIsCorrect(false);
    setStreak(0);
  };

  const checkAnswer = () => {
    if (!currentChallenge) return;

    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrect = currentChallenge.correctAnswer.toLowerCase().trim();
    const correct = normalizedAnswer === normalizedCorrect;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = currentChallenge.points - (hintsUsed * 2);
      setScore(prev => prev + Math.max(points, 5));
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextChallenge = () => {
    const nextIndex = (challenges.findIndex(c => c.id === currentChallenge?.id) + 1) % challenges.length;
    setCurrentChallenge(challenges[nextIndex]);
    setUserAnswer('');
    setShowResult(false);
    setHintsUsed(0);
    setTimeRemaining(30);
    
    if (streak > 0 && streak % 3 === 0) {
      setLevel(prev => prev + 1);
    }
  };

  const useHint = () => {
    if (!currentChallenge || hintsUsed >= currentChallenge.hints.length) return;
    setHintsUsed(prev => prev + 1);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setStreak(0);
    setCurrentChallenge(challenges[0]);
    setUserAnswer('');
    setShowResult(false);
    setHintsUsed(0);
    setTimeRemaining(30);
    setGameState('playing');
  };

  if (!currentChallenge) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Trophy className="h-5 w-5 text-game-lip-reading mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Star className="h-5 w-5 text-primary mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{level}</div>
            <div className="text-xs text-muted-foreground">Level</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-5 w-5 text-success mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{streak}</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Timer className="h-5 w-5 text-warning mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{timeRemaining}s</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Game Area */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground">Lip Reading Challenge</CardTitle>
              <CardDescription>Watch carefully and guess what's being said</CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className={`
                ${currentChallenge.difficulty === 'Easy' ? 'text-success border-success' : ''}
                ${currentChallenge.difficulty === 'Medium' ? 'text-warning border-warning' : ''}
                ${currentChallenge.difficulty === 'Hard' ? 'text-destructive border-destructive' : ''}
              `}
            >
              {currentChallenge.difficulty}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Video Area */}
          <div className="relative">
            <div className="aspect-video bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Video Preview:</p>
                  <p className="font-medium text-foreground">{currentChallenge.videoPlaceholder}</p>
                  <p className="text-xs text-muted-foreground italic">
                    (In real implementation, this would be a silent video)
                  </p>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Pause className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Answer Input */}
          {!showResult && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Answer:</label>
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type what you think was said..."
                  className="text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={checkAnswer} className="flex-1" disabled={!userAnswer.trim()}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check Answer
                </Button>
                <Button 
                  onClick={useHint} 
                  variant="outline" 
                  disabled={hintsUsed >= currentChallenge.hints.length}
                >
                  Hint ({hintsUsed}/{currentChallenge.hints.length})
                </Button>
              </div>
            </div>
          )}

          {/* Hints */}
          {hintsUsed > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Hints:</h4>
              <div className="space-y-1">
                {currentChallenge.hints.slice(0, hintsUsed).map((hint, index) => (
                  <div key={index} className="text-sm text-muted-foreground bg-muted/20 p-2 rounded">
                    💡 {hint}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${isCorrect ? 'bg-success/10 border-success text-success' : 'bg-destructive/10 border-destructive text-destructive'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <span className="font-semibold">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <div className="text-sm">
                  <p><strong>Correct Answer:</strong> "{currentChallenge.correctAnswer}"</p>
                  {userAnswer && <p><strong>Your Answer:</strong> "{userAnswer}"</p>}
                  {isCorrect && (
                    <p><strong>Points Earned:</strong> {Math.max(currentChallenge.points - (hintsUsed * 2), 5)}</p>
                  )}
                </div>
              </div>

              <Button onClick={nextChallenge} className="w-full" size="lg">
                Next Challenge
              </Button>
            </div>
          )}

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.min(timeRemaining * 3.33, 100).toFixed(0)}%</span>
            </div>
            <Progress value={Math.min(timeRemaining * 3.33, 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="flex gap-4 justify-center">
        <Button onClick={resetGame} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Restart Game
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Multiplayer Mode
        </Button>
      </div>
    </div>
  );
}