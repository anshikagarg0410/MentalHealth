import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  X,
  Edit2,
  Save,
} from 'lucide-react';
import dashboardImg from '../assets/bgdashboard.png';
interface DashboardProps {
  onViewChange: (view: string) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const [moodMessage, setMoodMessage] = useState<string>('');
  const [showMoodCheckin, setShowMoodCheckin] = useState(true);
  const [showMoodMessage, setShowMoodMessage] = useState(false);
  const [dailyIntention, setDailyIntention] = useState('');
  const [isEditingIntention, setIsEditingIntention] = useState(false);

  useEffect(() => {
    const todayString = new Date().toDateString();

    // Daily Intention logic
    const savedIntention = localStorage.getItem('dailyIntention');
    const savedIntentionDate = localStorage.getItem('dailyIntentionDate');

    if (savedIntention && savedIntentionDate === todayString) {
      setDailyIntention(savedIntention);
      setIsEditingIntention(false);
    } else {
      setDailyIntention('');
      setIsEditingIntention(true);
    }
  }, []);
  
  const handleSaveIntention = () => {
    if (dailyIntention.trim()) {
        localStorage.setItem('dailyIntention', dailyIntention);
        localStorage.setItem('dailyIntentionDate', new Date().toDateString());
        setIsEditingIntention(false);
    }
  };


  const handleCampusCall = () => {
    alert('Campus Counselling Center\nPhone: (555) 123-HELP\n\nWould you like to be connected?');
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

  const moodMessages: Record<string, string[]> = {
    Amazing: [
      "That's fantastic! Keep shining brightly.",
      "Awesome! Whatever you're doing, it's working.",
      "Wonderful! Let's make today even better."
    ],
    Good: [
      "Glad to hear it! Keep that positive energy flowing.",
      "That's great! Keep riding that good wave.",
      "Good to hear! Let's keep the momentum going."
    ],
    Okay: [
      "Okay is a perfectly valid way to feel. Be gentle with yourself.",
      "Thanks for checking in. Remember, it's okay to not be 100% all the time.",
      "An 'okay' day is a day of balance. You're doing just fine."
    ],
    Sad: [
      "It's brave to admit you're feeling sad. We're here for you.",
      "Sending you a little extra strength today. It's okay to feel this way.",
      "Remember, even on cloudy days, the sun is still there. Take your time."
    ],
    Awful: [
      "I'm so sorry you're feeling this way. Please be kind to yourself today.",
      "It's tough right now, but this feeling won't last forever. You are resilient.",
      "Remember to breathe. You've survived all your bad days so far."
    ]
  };

  const handleMoodSelection = (mood: string) => {
    const messages = moodMessages[mood];
    const newMoodMessage = messages[Math.floor(Math.random() * messages.length)];
    setMoodMessage(newMoodMessage);
    setShowMoodCheckin(false);
    setShowMoodMessage(true);
  };
  
  const handleCloseMoodMessage = () => {
    setShowMoodMessage(false);
  };
  
  const shouldShowMoodComponent = showMoodCheckin || showMoodMessage;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl text-white" style={{
            backgroundImage: `url(${dashboardImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
        <div className="relative p-8 md:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary" style={{ fontFamily: "'Yeseva One', 'cursive'" }}>
              Student Life is Tough, <br/>Your Support Shouldn't Be
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 text-foreground" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              You've found a confidential space to pause, breathe, <br/>and find the support you need. We're here to help you <br/>navigate it all
            </p>
            <Button
              onClick={() => onViewChange('chat')}
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              style={{ fontFamily: "'Raleway', 'sans-serif'" }}
            >
              Chat with a Friendly Listener<MessageCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-3xl mb-2 text-primary">What's on your mind?</h2>
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
                  <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Raleway', 'sans-serif'"}}>{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className={`grid ${shouldShowMoodComponent ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
        {/* Mood Check-in */}
        {shouldShowMoodComponent && (
            <div>
            {showMoodCheckin ? (
                <Card className="h-full">
                <CardHeader>
                    <CardTitle>Daily Check-in</CardTitle>
                    <CardDescription style={{ fontFamily: "'Raleway', 'sans-serif'"}}>
                    How are you feeling today?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 gap-2 sm:gap-4">
                    {moods.map((mood) => (
                        <Button
                        key={mood.name}
                        variant={'secondary'}
                        className="w-full h-24 flex flex-col gap-2 items-center justify-center transition-all"
                        onClick={() => handleMoodSelection(mood.name)}
                        >
                        <span className="text-4xl">{mood.emoji}</span>
                        <span className="text-xs font-medium">
                            {mood.name}
                        </span>
                        </Button>
                    ))}
                    </div>
                </CardContent>
                </Card>
            ) : ( 
                showMoodMessage && (
                    <Card className="h-full">
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                        <CardTitle>Daily Check-in</CardTitle>
                        <CardDescription style={{ fontFamily: "'Raleway', 'sans-serif'"}}>
                            Thanks for sharing. Here's a little note for you:
                        </CardDescription>
                        </div>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleCloseMoodMessage}
                        >
                        <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg italic text-center text-primary">"{moodMessage}"</p>
                    </CardContent>
                    </Card>
                )
            )}
            </div>
        )}

        {/* Daily Intention */}
        <Card className={`bg-white dark:bg-purple-950/30 border-pink-200 dark:border-pink-800 h-full ${!shouldShowMoodComponent ? 'md:col-span-2' : ''}`}>
          <CardHeader>
            <CardTitle>Your Daily Intention</CardTitle>
            <CardDescription style={{ fontFamily: "'Raleway', 'sans-serif'"}}>A personal motivational message to guide your day.</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditingIntention ? (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={dailyIntention}
                  onChange={(e) => setDailyIntention(e.target.value)}
                  placeholder="Write a short motivational message..."
                  maxLength={100}
                  className="bg-white/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveIntention()}
                />
                <Button size="icon" onClick={handleSaveIntention}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : dailyIntention ? (
              <div className="flex items-center justify-between">
                <p className="text-lg italic text-purple-800 dark:text-purple-200 font-medium">
                  "{dailyIntention}"
                </p>
                <Button size="icon" variant="ghost" onClick={() => setIsEditingIntention(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
                 <div className="text-center text-purple-700">
                    <p style={{ fontFamily: "'Raleway', 'sans-serif'"}}>You haven't set an intention for today.</p>
                    <Button variant="link" className="text-purple-700" onClick={() => setIsEditingIntention(true)}>Set one now</Button>
                 </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Need to Talk Section */}
      <Card>
          <CardHeader>
            <CardTitle>Need to Talk to Someone?</CardTitle>
            <CardDescription style={{ fontFamily: "'Raleway', 'sans-serif'"}}>Help is always available.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>Campus Counselling Center</p>
                  <p className="text-sm text-muted-foreground"style={{ fontFamily: "'Raleway', 'sans-serif'"}}>Mon-Fri, 9 AM - 5 PM</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleCampusCall}>Call</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>24/7 Crisis Helpline</p>
                  <p className="text-sm text-muted-foreground"style={{ fontFamily: "'Raleway', 'sans-serif'"}}>Available anytime</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleCrisisCall}>Call</Button>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}