import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Users, Camera, BookOpen } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/games', icon: Gamepad2, label: 'Games' },
    { to: '/community', icon: Users, label: 'Community' },
    { to: '/reels', icon: Camera, label: 'Reels' },
    { to: '/journal', icon: BookOpen, label: 'Journal' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};