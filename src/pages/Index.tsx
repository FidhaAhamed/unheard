import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Users, Camera, BookOpen, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Sparkles className="h-6 w-6" />
          <span className="font-semibold text-lg">Welcome to Silent Verse</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
          Connect, Play, Express
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The inclusive entertainment platform designed for deaf and mute individuals. Experience visual games, connect with community, and express yourself freely.
        </p>
        <Button onClick={() => navigate('/games')} size="lg" className="text-lg px-8 py-6">
          <Gamepad2 className="h-5 w-5 mr-2" />
          Start Playing
        </Button>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Gamepad2, title: 'Games Hub', desc: '3 Visual Games', path: '/games', color: 'primary' },
          { icon: Users, title: 'Community', desc: 'Connect & Share', path: '/community', color: 'community-forum' },
          { icon: Camera, title: 'Visual Stories', desc: 'Share Moments', path: '/reels', color: 'community-reels' },
          { icon: BookOpen, title: 'Journal', desc: 'Personal Space', path: '/journal', color: 'community-journal' }
        ].map((item, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border/50" onClick={() => navigate(item.path)}>
            <CardContent className="p-6 text-center space-y-4">
              <div className={`h-12 w-12 rounded-xl bg-${item.color}/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                <item.icon className={`h-6 w-6 text-${item.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
