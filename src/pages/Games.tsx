import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  KeyRound, 
  PuzzleIcon, 
  Users, 
  Trophy, 
  Star,
  Play,
  Zap,
  Gamepad2,
  Camera
} from 'lucide-react';

export default function Games() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'lip-reading',
      title: 'Lip Reading Trainer',
      description: 'Master the art of reading lips with fun, interactive video challenges',
      icon: MessageSquare,
      color: 'game-lip-reading',
      difficulty: 'Easy to Hard',
      features: ['Silent Videos', 'Multiple Levels', 'Leaderboards', 'Daily Challenges'],
      players: '1-4 Players',
      gradient: 'from-game-lip-reading/20 to-game-lip-reading/5'
    },
    {
      id: 'escape-room',
      title: 'Visual Escape Room',
      description: 'Solve puzzles using only visual clues to escape themed rooms',
      icon: KeyRound,
      color: 'game-escape-room',
      difficulty: 'Medium to Expert',
      features: ['Visual Puzzles', 'Team Mode', 'Multiple Rooms', 'Symbol Logic'],
      players: '1-6 Players',
      gradient: 'from-game-escape-room/20 to-game-escape-room/5'
    },
    {
      id: 'visual-riddles',
      title: 'Visual Riddles',
      description: 'Decode emoji combinations and visual patterns to solve riddles',
      icon: PuzzleIcon,
      color: 'game-visual-riddles',
      difficulty: 'Easy to Medium',
      features: ['Emoji Puzzles', 'Pattern Games', 'Quick Rounds', 'Brain Training'],
      players: '1-8 Players',
      gradient: 'from-game-visual-riddles/20 to-game-visual-riddles/5'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Players', value: '2,847' },
    { icon: Trophy, label: 'Games Completed', value: '12,493' },
    { icon: Star, label: 'Average Rating', value: '4.8/5' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Gamepad2 className="h-5 w-5" />
          <span className="font-semibold">Games Hub</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Play & Connect
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Experience games designed specifically for visual communication and accessibility
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card 
            key={game.id} 
            className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${game.gradient}`} />
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl bg-${game.color}/10 border border-${game.color}/20`}>
                  <game.icon className={`h-6 w-6 text-${game.color}`} />
                </div>
                <Badge variant="outline" className="text-xs">
                  {game.players}
                </Badge>
              </div>
              
              <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {game.title}
              </CardTitle>
              
              <CardDescription className="text-muted-foreground">
                {game.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">{game.difficulty}</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {game.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => navigate(`/games/${game.id}`)}
                className="w-full group-hover:shadow-md transition-all"
                size="lg"
              >
                <Play className="h-4 w-4 mr-2" />
                Play Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Features */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Join the Community</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with other players, share strategies, and participate in tournaments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/community')} variant="outline" size="lg">
              <Users className="h-4 w-4 mr-2" />
              Community Forum
            </Button>
            <Button onClick={() => navigate('/reels')} variant="outline" size="lg">
              <Camera className="h-4 w-4 mr-2" />
              Share Stories
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}