import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Users, 
  ShieldCheck, 
  Heart,
  BookOpen,
  MessageCircle,
  Calendar,
  BarChart3,
  UserCheck,
  Brain
} from 'lucide-react';

interface UserTypeSelectorProps {
  onSelectUserType: (userType: 'student' | 'counselor' | 'admin') => void;
}

export function UserTypeSelector({ onSelectUserType }: UserTypeSelectorProps) {
  const userTypes = [
    {
      type: 'student' as const,
      title: 'Student Portal',
      description: 'Access AI support, book Counselling, connect with peers, and explore mental health resources',
      icon: Users,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600',
      features: [
        { icon: Brain, label: 'AI Mental Health Assistant' },
        { icon: Calendar, label: 'Book Counselling Sessions' },
        { icon: BookOpen, label: 'Resource Library' },
        { icon: MessageCircle, label: 'Peer Support Forum' }
      ]
    },
    {
      type: 'counselor' as const,
      title: 'Counselor Dashboard',
      description: 'Manage clients, schedule sessions, track progress, and access clinical resources',
      icon: UserCheck,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600',
      features: [
        { icon: Users, label: 'Client Management' },
        { icon: Calendar, label: 'Session Scheduling' },
        { icon: Heart, label: 'Crisis Intervention' },
        { icon: BarChart3, label: 'Progress Tracking' }
      ]
    },
    {
      type: 'admin' as const,
      title: 'System Administrator',
      description: 'Monitor platform usage, manage users, oversee crisis interventions, and analyze system data',
      icon: ShieldCheck,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600',
      features: [
        { icon: BarChart3, label: 'Analytics Dashboard' },
        { icon: Users, label: 'User Management' },
        { icon: MessageCircle, label: 'Content Moderation' },
        { icon: ShieldCheck, label: 'Crisis Management' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-pink-950/20 dark:to-purple-950/20 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">ZEN</h1>
          <p className="text-xl text-muted-foreground mb-2" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            Digital Mental Health Support Platform
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            Choose your access level to enter the comprehensive mental health support ecosystem 
            designed for college students, counselors, and administrators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            return (
              <Card 
                key={userType.type}
                className={`${userType.color} transition-all duration-200 hover:shadow-xl cursor-pointer group`}
                onClick={() => onSelectUserType(userType.type)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white/70 rounded-full group-hover:bg-white transition-colors">
                      <Icon className={`h-8 w-8 ${userType.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{userType.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {userType.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <FeatureIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-primary hover:bg-primary/90 group-hover:shadow-lg transition-all"
                    size="lg"
                  >
                    Access {userType.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>24/7 Crisis Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Anonymous Access</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/60 dark:bg-black/20 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Privacy Notice:</strong> All interactions are confidential and secure. 
              Your mental health and privacy are our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}