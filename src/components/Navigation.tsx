import { useState } from 'react';
import { Button } from './ui/button';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3,
  Menu,
  X,
  Brain,
  Shield,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { UserData } from '../App';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userType?: 'student' | 'counselor' | 'admin';
  onLogout?: () => void;
  userData?: UserData | null;
}

export function Navigation({ currentView, onViewChange, userType = 'student', onLogout, userData }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'chat', label: 'AI Friend', icon: MessageCircle },
          { id: 'booking', label: 'Counseling', icon: Calendar },
          { id: 'resources', label: 'Resources', icon: BookOpen },
          { id: 'forum', label: 'Peer Support', icon: Users },
          { id: 'student-profile', label: 'Profile', icon: UserIcon },
        ];
      case 'counselor':
        return [
          { id: 'counselor-dashboard', label: 'Dashboard', icon: Home },
          { id: 'clients', label: 'My Clients', icon: Users },
          { id: 'sessions', label: 'Sessions', icon: MessageCircle },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: UserIcon },
        ];
      case 'admin':
        return [
          { id: 'overview', label: 'Dashboard', icon: Home },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'content', label: 'Content', icon: BookOpen },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'admin-profile', label: 'Profile', icon: UserIcon },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const displayName = userData ? (userData.fullName || 'Admin') : '';
  const fallbackChar = displayName ? displayName.charAt(0).toUpperCase() : '';

  const handleProfileClick = () => {
    if (userType === 'counselor') {
      onViewChange('profile');
    } else if (userType === 'student') {
      onViewChange('student-profile');
    } else if (userType === 'admin') {
      onViewChange('admin-profile');
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-64`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">zen</h2>
              <p className="text-sm text-muted-foreground">Campus Wellness</p>
            </div>
          </div>

          {/* User Info */}
          {userData && (
            <div
              className="bg-muted/50 p-4 rounded-lg mb-6 cursor-pointer hover:bg-muted transition-colors"
              onClick={handleProfileClick}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    {fallbackChar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{displayName}</p>
                  <p className="text-sm text-muted-foreground capitalize">{userData.userType}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onViewChange(item.id);
                    setIsOpen(false);
                  }}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 space-y-4">
            {onLogout && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={onLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </Button>
            )}
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Your Safe Space</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Everything here is private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}