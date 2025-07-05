import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Zap, 
  Timer, 
  Trophy,
  CheckCircle,
  XCircle,
  RotateCcw,
  Shuffle,
  Users,
  Star
} from 'lucide-react';

interface Riddle {
  id: number;
  category: 'emoji' | 'pattern' | 'visual' | 'logic';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  visualClue: string;
  answer: string;
  hints: string[];
  points: number;
  timeLimit: number;
}

export default function VisualRiddles() {
  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [gameMode, setGameMode] = useState<'quick' | 'challenge' | 'endless'>('quick');

  const riddles: Riddle[] = [
    {
      id: 1,
      category: 'emoji',
      difficulty: 'Easy',
      question: 'What movie does this represent?',
      visualClue: '👑 + 🦁 + 🌍 = ?',
      answer: 'lion king',
      hints: ['Disney movie', 'African setting', 'Royal animal'],
      points: 10,
      timeLimit: 30
    },
    {
      id: 2,
      category: 'emoji',
      difficulty: 'Easy',
      question: 'What phrase does this represent?',
      visualClue: '🌧️ + 🐱 + 🐶 = ?',
      answer: 'raining cats and dogs',
      hints: ['Common saying', 'About weather', 'Not literal'],
      points: 15,
      timeLimit: 25
    },
    {
      id: 3,
      category: 'pattern',
      difficulty: 'Medium',
      question: 'What comes next in this sequence?',
      visualClue: '🔴 ⚫ 🔴 ⚫ 🔴 ?',
      answer: 'black',
      hints: ['Alternating pattern', 'Two colors', 'Next should be different'],
      points: 20,
      timeLimit: 20
    },
    {
      id: 4,
      category: 'emoji',
      difficulty: 'Medium',
      question: 'What food dish is this?',
      visualClue: '🍞 + 🧀 + 🍅 + 🔥 = ?',
      answer: 'grilled cheese',
      hints: ['Cooked sandwich', 'Melted dairy', 'Often paired with soup'],
      points: 25,
      timeLimit: 20
    },
    {
      id: 5,
      category: 'visual',
      difficulty: 'Hard',
      question: 'What number do you see?',
      visualClue: '⚫⚫⚫\n⚫⚪⚫\n⚫⚫⚫',
      answer: '8',
      hints: ['Look at the shape', 'Digital display style', 'Single digit'],
      points: 30,
      timeLimit: 15
    },
    {
      id: 6,
      category: 'emoji',
      difficulty: 'Hard',
      question: 'What movie is this?',
      visualClue: '🕷️ + 👨 + 🏠 = ?',
      answer: 'spider man',
      hints: ['Superhero movie', 'Marvel character', 'Web slinger'],
      points: 35,
      timeLimit: 15
    }
  ];

  useEffect(() => {
    if (riddles.length > 0) {
      selectRandomRiddle();
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeRemaining > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeRemaining, showResult]);

  const selectRandomRiddle = () => {
    const availableRiddles = riddles.filter(r => r.id !== currentRiddle?.id);
    const randomRiddle = availableRiddles[Math.floor(Math.random() * availableRiddles.length)];
    setCurrentRiddle(randomRiddle);
    setTimeRemaining(randomRiddle.timeLimit);
    setUserAnswer('');
    setShowResult(false);
    setHintsUsed(0);
  };

  const handleTimeUp = () => {
    setShowResult(true);
    setIsCorrect(false);
    setStreak(0);
  };

  const checkAnswer = () => {
    if (!currentRiddle) return;

    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrect = currentRiddle.answer.toLowerCase().trim();
    const correct = normalizedAnswer === normalizedCorrect;

    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);

    if (correct) {
      const bonusMultiplier = Math.max(1, timeRemaining / 10);
      const hintPenalty = hintsUsed * 5;
      const finalPoints = Math.max(Math.floor(currentRiddle.points * bonusMultiplier) - hintPenalty, 5);
      
      setScore(prev => prev + finalPoints);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextRiddle = () => {
    selectRandomRiddle();
  };

  const useHint = () => {
    if (!currentRiddle || hintsUsed >= currentRiddle.hints.length) return;
    setHintsUsed(prev => prev + 1);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setTotalAnswered(0);
    selectRandomRiddle();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-success border-success';
      case 'Medium': return 'text-warning border-warning';
      case 'Hard': return 'text-destructive border-destructive';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emoji': return '😊';
      case 'pattern': return '🔄';
      case 'visual': return '👁️';
      case 'logic': return '🧠';
      default: return '❓';
    }
  };

  if (!currentRiddle) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Trophy className="h-5 w-5 text-game-visual-riddles mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Zap className="h-5 w-5 text-warning mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{streak}</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Timer className="h-5 w-5 text-destructive mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{timeRemaining}s</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-5 w-5 text-success mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{totalAnswered}</div>
            <div className="text-xs text-muted-foreground">Answered</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Mode Selector */}
      <Card className="bg-card/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="h-5 w-5 text-game-visual-riddles" />
              <span className="font-medium text-foreground">Game Mode:</span>
              <div className="flex gap-2">
                {['quick', 'challenge', 'endless'].map((mode) => (
                  <Button
                    key={mode}
                    variant={gameMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGameMode(mode as any)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>
            <Badge variant="outline" className="text-game-visual-riddles border-game-visual-riddles">
              Visual Riddles
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Game Area */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getCategoryIcon(currentRiddle.category)}</span>
                <Badge variant="outline" className="capitalize">
                  {currentRiddle.category}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(currentRiddle.difficulty)}>
                  {currentRiddle.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-foreground">{currentRiddle.question}</CardTitle>
              <CardDescription>Think carefully and use visual clues to solve this riddle</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-game-visual-riddles">{currentRiddle.points}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Visual Clue */}
          <div className="text-center space-y-4">
            <div className="p-8 bg-gradient-to-br from-game-visual-riddles/5 to-game-visual-riddles/10 rounded-xl border border-game-visual-riddles/20">
              <div className="text-4xl md:text-6xl font-mono tracking-wider text-foreground whitespace-pre-line">
                {currentRiddle.visualClue}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              💡 Look carefully at the visual pattern or symbols above
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
                  placeholder="Type your answer here..."
                  className="text-lg text-center"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={checkAnswer} className="flex-1" disabled={!userAnswer.trim()}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Answer
                </Button>
                <Button 
                  onClick={useHint} 
                  variant="outline" 
                  disabled={hintsUsed >= currentRiddle.hints.length}
                >
                  💡 Hint ({hintsUsed}/{currentRiddle.hints.length})
                </Button>
              </div>
            </div>
          )}

          {/* Hints */}
          {hintsUsed > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Hints:</h4>
              <div className="space-y-1">
                {currentRiddle.hints.slice(0, hintsUsed).map((hint, index) => (
                  <div key={index} className="text-sm text-muted-foreground bg-muted/10 p-3 rounded-lg border border-border/50">
                    💡 {hint}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="space-y-4">
              <div className={`p-6 rounded-xl border ${isCorrect ? 'bg-success/10 border-success' : 'bg-destructive/10 border-destructive'}`}>
                <div className="flex items-center gap-3 mb-3">
                  {isCorrect ? <CheckCircle className="h-6 w-6 text-success" /> : <XCircle className="h-6 w-6 text-destructive" />}
                  <span className="text-xl font-bold">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Correct Answer:</strong> {currentRiddle.answer}</p>
                  {userAnswer && <p><strong>Your Answer:</strong> {userAnswer}</p>}
                  {isCorrect && (
                    <p><strong>Points Earned:</strong> {Math.max(Math.floor(currentRiddle.points * Math.max(1, timeRemaining / 10)) - (hintsUsed * 5), 5)}</p>
                  )}
                  {streak > 0 && (
                    <p className="text-warning"><strong>🔥 Streak:</strong> {streak} correct answers!</p>
                  )}
                </div>
              </div>

              <Button onClick={nextRiddle} className="w-full" size="lg">
                <Shuffle className="h-4 w-4 mr-2" />
                Next Riddle
              </Button>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Time Remaining</span>
              <span>{timeRemaining}s</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-destructive to-warning h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(timeRemaining / currentRiddle.timeLimit) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="flex gap-4 justify-center">
        <Button onClick={resetGame} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          New Game
        </Button>
        <Button onClick={selectRandomRiddle} variant="outline">
          <Shuffle className="h-4 w-4 mr-2" />
          Skip Riddle
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Challenge Friends
        </Button>
      </div>

      {/* Achievement Bar */}
      {streak >= 3 && (
        <Card className="bg-gradient-to-r from-warning/10 to-success/10 border-warning/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              <span className="font-bold text-foreground">
                Amazing! {streak} correct answers in a row! 🎉
              </span>
              <Star className="h-5 w-5 text-warning" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}