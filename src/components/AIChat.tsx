import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Heart,
  Lightbulb,
  Clock,
  Shield,
  Mic,
  StopCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hey there! I'm your friendly AI companion, here to listen whenever you need it. Think of me as a safe space to explore your feelings. So, how are you doing today? No pressure to say you're 'fine' if you're not.",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickResponses = [
    "Exams are stressing me out",
    "I can't seem to sleep well",
    "Everything feels like too much right now",
    "Feeling a bit lonely lately",
    "Can we talk about managing stress?"
  ];

  const generateBotResponse = (userMessage: string): { content: string; urgency?: 'low' | 'medium' | 'high' } => {
    const lowerMessage = userMessage.toLowerCase();

    // Crisis keywords detection
    if (lowerMessage.includes('suicide') || lowerMessage.includes('harm myself') || lowerMessage.includes('end it all')) {
      return {
        content: "Hearing you say that makes it really important that we get you some help right away. You are not alone in this, and you deserve to feel safe. Here are some resources that can connect you with a caring person immediately:\n\n🆘 National Suicide Prevention Lifeline: 988\n🏥 Campus Crisis Line: (555) 123-4567\n🚨 Emergency Services: 911\n\nIt's incredibly brave of you to share this. Please, let one of these amazing people help.",
        urgency: 'high'
      };
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('nervous') || lowerMessage.includes('stressing me out')) {
      return {
        content: "It sounds like you're carrying a lot of anxiety right now, and that's tough. I'm here with you. Let's try something that can help you feel more grounded right now:\n\n🌬️ **Calm Breathing**: Breathe in for 4 counts, hold for 7, and gently breathe out for 8. It can make a real difference.\n📝 **Grounding Yourself**: Look around and name 5 things you can see, 4 things you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.\n\nWhich of these feels right for you, or would you rather talk more about what's causing this feeling?",
        urgency: 'medium'
      };
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return {
        content: "It's so hard when you can't get the rest you need. Let's explore some gentle ways to help your mind and body unwind for sleep:\n\n🌙 **Create a Sleep Sanctuary**:\n• Try to go to bed and wake up around the same time.\n• Put away screens an hour before bed to let your mind quiet down.\n• Create a simple, relaxing routine like reading or listening to calm music.\n\n🧘 **Relaxation Rituals**:\n• Try a guided sleep meditation.\n• Write down any worries in a journal before bed to get them out of your head.\n\nOften, our minds are too busy to rest. What's on your mind when you're trying to sleep?",
        urgency: 'medium'
      };
    }

    // Academic stress
    if (lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('coursework') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much')) {
      return {
        content: "Feeling overwhelmed by school is so common, but that doesn't make it any less difficult. We can tackle this together. Let's start with some small, manageable steps:\n\n📅 **Find Your Flow**:\n• Try the Pomodoro Technique: 25 minutes of focused work, then a 5-minute break. It’s a game-changer!\n• Break big tasks into tiny ones. Just focus on the very next step.\n\nRemember, your well-being is the most important thing. What's the one thing that's causing the most pressure right now?",
        urgency: 'medium'
      };
    }

    // Loneliness/social issues
    if (lowerMessage.includes('lonely') || lowerMessage.includes('isolated') || lowerMessage.includes('friends') || lowerMessage.includes('social')) {
      return {
        content: "Feeling lonely can be one of the toughest parts of college, and so many people feel it. It's really brave to talk about it. Let's think about some gentle ways to open the door to connection:\n\n🤝 **Find Your People**:\n• Join a club that feels like 'you'.\n• Even a small chat with a classmate can make a big difference.\n• Look for peer support groups on campus.\n\nBuilding connections takes time, and you're worth getting to know. What kind of connection are you hoping to find?",
        urgency: 'low'
      };
    }

    // General support
    return {
      content: "Thank you for trusting me with this. It takes real strength to open up, and I'm honored to be here for you. We can explore this together.\n\nHere are a few things that help many students feel more balanced:\n\n🧠 **Mindful Moments**: Just 5 minutes of quiet can reset your day.\n💪 **Body & Mind Fuel**: A short walk or a nutritious meal can boost your mood.\n📞 **Friendly Voices**: Connecting with friends or family can lift your spirits.\n\nWhere would you like to start? Or is there something else you'd like to share?",
      urgency: 'low'
    };
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        urgency: botResponse.urgency,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Simulate transcription and populate the input field
      setInputValue("This is a simulated voice note transcription.");
    } else {
      // Start recording
      setIsRecording(true);
      setInputValue(""); // Clear input when starting to record
    }
  };


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Your AI Wellness Friend</h1>
        <p className="text-muted-foreground">
          A friendly, safe space to talk through what's on your mind. I'm here to listen, offer support, and help you find your strength.
        </p>

        <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <Shield className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Your privacy is our top priority. This is a safe and confidential space just for you. For emergencies, please know that immediate help is available by calling 911 or your campus crisis line.
          </p>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Wellness Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                      }`}
                  >
                    {message.urgency === 'high' && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <Badge variant="destructive" className="text-xs">Immediate Support Recommended</Badge>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap">{message.content}</p>

                    <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.urgency && (
                        <Badge
                          variant={message.urgency === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {message.urgency} priority
                        </Badge>
                      )}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Responses & Input */}
          <div className="px-6 py-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Not sure where to start? Try one of these:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => sendMessage(response)}
                  className="text-xs"
                >
                  {response}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 items-center">
              {isRecording && (
                <div className="flex items-center gap-2 text-sm text-red-500 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Recording...</span>
                </div>
              )}
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRecording ? "Speak now..." : "You can share anything here..."}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                disabled={isTyping || isRecording}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleToggleRecording}
                disabled={isTyping}
                size="icon"
                variant={isRecording ? "destructive" : "outline"}
              >
                {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping || isRecording}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}