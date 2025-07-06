import { NavLink } from 'react-router-dom';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Gamepad2, 
  Users, 
  Camera, 
  BookOpen, 
  Home,
  MessageSquare,
  PuzzleIcon,
  KeyRound,
  Sparkles
} from 'lucide-react';

interface NavigationProps {
  onNavigate?: () => void;
}

export const Navigation = ({ onNavigate }: NavigationProps) => {
  const navItems = [
    {
      to: '/',
      icon: Home,
      label: 'Home',
      color: 'text-primary'
    },
    {
      to: '/games',
      icon: Gamepad2,
      label: 'Games Hub',
      color: 'text-primary',
      badge: '3'
    },
    {
      to: '/community',
      icon: Users,
      label: 'Community Forum',
      color: 'text-community-forum'
    },
    {
      to: '/reels',
      icon: Camera,
      label: 'Visual Stories',
      color: 'text-community-reels'
    },
    {
      to: '/journal',
      icon: BookOpen,
      label: 'Personal Journal',
      color: 'text-community-journal'
    }
  ];

  const gameItems = [
    {
      to: '/games/lip-reading',
      icon: MessageSquare,
      label: 'Lip Reading Trainer',
      color: 'text-game-lip-reading'
    },
    {
      to: '/games/escape-room',
      icon: KeyRound,
      label: 'Visual Escape Room',
      color: 'text-game-escape-room'
    },
    {
      to: '/games/visual-riddles',
      icon: PuzzleIcon,
      label: 'Visual Riddles',
      color: 'text-game-visual-riddles'
    }
  ];

  return (
    <Card className="h-full rounded-none border-r border-l-0 border-t-0 border-b-0 bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              unheard.
            </h1>
            <p className="text-xs text-muted-foreground">Your Story. Your Space. Beyond Words</p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2 mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Main
          </h3>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto h-5 min-w-5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          ))}
        </div>

        {/* Games Quick Access */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Quick Games
          </h3>
          {gameItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <item.icon className={`h-4 w-4 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </Card>
  );
};