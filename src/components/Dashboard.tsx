import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Heart,
  Smile,
  TrendingUp,
  Clock
} from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const handleMeditation = () => {
    alert('Starting 5-minute guided meditation...\n\nFind a comfortable position and focus on your breathing. This feature will be integrated with meditation content.');
  };

  const handleCampusCall = () => {
    alert('Campus Counseling Center\nPhone: (555) 123-HELP\n\nWould you like to be connected?');
  };

  const handleCrisisCall = () => {
    alert('24/7 Crisis Helpline\nPhone: 988 (Suicide & Crisis Lifeline)\n\nConnecting you to immediate support...');
  };
  const quickActions = [
    {
      id: 'chat',
      title: 'Chat with AI Friend',
      description: 'For moments when you need to talk right away. A private, judgment-free chat available 24/7.',
      icon: MessageCircle,
      color: 'bg-blue-500'
    },
    {
      id: 'booking',
      title: 'Talk to a Counselor',
      description: " You don't have to navigate this alone. Connect with a licensed therapist for expert, one-on-one guidance on your journey.",
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      id: 'resources',
      title: 'Explore Resources',
      description: 'Equip yourself for the road ahead. Access articles, workshops, and strategies to build lasting mental resilience.',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      id: 'forum',
      title: 'Peer Support',
      description: "Connect with other students on similar paths. Share stories, offer support, and find encouragement in a safe space.",
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const wellnessStats = [
    { label: 'Days Active', value: '7', icon: TrendingUp },
    { label: 'Resources Accessed', value: '12', icon: BookOpen },
    { label: 'Mood Check-ins', value: '5', icon: Heart },
    { label: 'Minutes Meditated', value: '45', icon: Clock }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative p-8 md:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Student Life is Tough. Your Support Shouldn't Be
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              You've found a confidential space to pause, breathe, and find the support you need. We're here to help you navigate it all
            </p>
            <Button 
              onClick={() => onViewChange('chat')} 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Chat with a Friendly Listener<MessageCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl mb-6">What's on your mind?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onViewChange(action.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`${action.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Wellness Overview */}
      <div>
        <h2 className="text-2xl mb-6">Your Journey So Far</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Take a Breather</CardTitle>
            <CardDescription>A quick pause can make a big difference</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1630406866478-a2fca6070d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0JTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzU3ODY1MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Meditation and mindfulness"
              className="w-full h-32 object-cover rounded-lg"
            />
            <p className="text-sm">
              Try this 5-minute guided breathing exercise to find some calm and reset your day.
            </p>
            <Button variant="outline" className="w-full">
              <Smile className="mr-2 h-4 w-4" />
              Start 5-Min Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need to Talk to Someone?</CardTitle>
            <CardDescription>Help is always available.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Campus Counseling Center</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 5 PM</p>
                </div>
                <Button size="sm" variant="outline">Call</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">24/7 Crisis Helpline</p>
                  <p className="text-sm text-muted-foreground">Available anytime</p>
                </div>
                <Button size="sm" variant="outline">Call</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}