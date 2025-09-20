import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

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

  const moods = [
    { name: 'Amazing', emoji: '😄' },
    { name: 'Good', emoji: '😊' },
    { name: 'Okay', emoji: '😐' },
    { name: 'Sad', emoji: '😔' },
    { name: 'Awful', emoji: '😠' },
  ];

  const positiveQuotes = [
    {
      quote: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      quote: "Your limitation—it's only your imagination.",
      author: "Unknown",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      quote: "Push yourself, because no one else is going to do it for you.",
      author: "Unknown",
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      quote: "Great things never come from comfort zones.",
      author: "Unknown",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    }
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

      {/* Mood Check-in */}
      <div>
        <h2 className="text-2xl mb-6">Daily Check-in</h2>
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>
              {selectedMood
                ? `Thanks for sharing that you're feeling ${selectedMood.toLowerCase()}. We're here for you.`
                : "Tracking your mood can help you understand it better."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {moods.map((mood) => {
                return (
                  <Button
                    key={mood.name}
                    variant={selectedMood === mood.name ? 'default' : 'secondary'}
                    className="w-full h-24 flex flex-col gap-2 items-center justify-center transition-all"
                    onClick={() => setSelectedMood(mood.name)}
                  >
                    <span className="text-4xl">{mood.emoji}</span>
                    <span className="text-xs font-medium">
                      {mood.name}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>A Moment for You</CardTitle>
            <CardDescription>Some inspiration to brighten your day</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-0">
            <Carousel className="w-full max-w-sm">
              <CarouselContent>
                {positiveQuotes.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={`Inspirational quote background ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                          <blockquote className="text-center text-white">
                            <p className="text-lg font-semibold italic">"{item.quote}"</p>
                            <cite className="mt-2 block text-sm opacity-80 not-italic">- {item.author}</cite>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
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
                <Button size="sm" variant="outline" onClick={handleCampusCall}>Call</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">24/7 Crisis Helpline</p>
                  <p className="text-sm text-muted-foreground">Available anytime</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleCrisisCall}>Call</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}