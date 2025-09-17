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
  Shield
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
      content: "Hello! I'm your AI wellness assistant. I'm here to provide support, coping strategies, and guide you to appropriate resources. How are you feeling today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickResponses = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm feeling lonely and isolated",
    "I need help managing stress"
  ];

  const generateBotResponse = (userMessage: string): { content: string; urgency?: 'low' | 'medium' | 'high' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis keywords detection
    if (lowerMessage.includes('suicide') || lowerMessage.includes('harm myself') || lowerMessage.includes('end it all')) {
      return {
        content: "I'm very concerned about what you're sharing. These feelings are serious and you deserve immediate support. Please contact:\n\n🆘 National Suicide Prevention Lifeline: 988\n🏥 Campus Crisis Line: (555) 123-4567\n🚨 Emergency Services: 911\n\nYou are not alone, and there are people who want to help you right now. Would you like me to help you connect with a counselor immediately?",
        urgency: 'high'
      };
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('nervous')) {
      return {
        content: "I understand you're feeling anxious. Here are some immediate techniques that can help:\n\n🌬️ **4-7-8 Breathing**: Breathe in for 4, hold for 7, exhale for 8\n📝 **Grounding Exercise**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n💭 **Reframe thoughts**: Ask yourself - 'Is this thought helpful? What would I tell a friend?'\n\nWould you like me to guide you through a breathing exercise, or would you prefer to explore what's causing your anxiety?",
        urgency: 'medium'
      };
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return {
        content: "Sleep difficulties are really challenging. Here are some evidence-based strategies:\n\n🌙 **Sleep Hygiene**:\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Create a relaxing bedtime routine\n\n🧘 **Relaxation Techniques**:\n• Progressive muscle relaxation\n• Guided sleep meditations\n• Journaling to clear your mind\n\nPoor sleep often connects to stress or anxiety. Are there specific worries keeping you awake?",
        urgency: 'medium'
      };
    }

    // Academic stress
    if (lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('coursework') || lowerMessage.includes('overwhelmed')) {
      return {
        content: "Academic pressure is one of the top stressors for students. Let's break this down:\n\n📅 **Time Management**:\n• Use the Pomodoro Technique (25 min study, 5 min break)\n• Prioritize tasks by urgency and importance\n• Break large tasks into smaller, manageable steps\n\n🎯 **Study Strategies**:\n• Active recall and spaced repetition\n• Form study groups for accountability\n• Seek help from professors during office hours\n\nRemember: Your worth isn't defined by grades. What specific aspect feels most overwhelming right now?",
        urgency: 'medium'
      };
    }

    // Loneliness/social issues
    if (lowerMessage.includes('lonely') || lowerMessage.includes('isolated') || lowerMessage.includes('friends') || lowerMessage.includes('social')) {
      return {
        content: "Feeling lonely at college is more common than you might think. Here are ways to build connections:\n\n🤝 **Campus Connections**:\n• Join clubs related to your interests\n• Attend campus events and activities\n• Volunteer for causes you care about\n• Study in common areas like libraries\n\n💬 **Building Relationships**:\n• Start with small conversations\n• Be genuinely interested in others\n• Attend peer support groups\n• Consider reaching out to classmates\n\nRemember, quality over quantity in friendships. Would you like suggestions for specific campus activities or clubs?",
        urgency: 'low'
      };
    }

    // General support
    return {
      content: "Thank you for sharing that with me. It takes courage to reach out. I'm here to listen and provide support.\n\nSome general strategies that help many students:\n\n🧠 **Mindfulness**: Try 5-minute daily meditation\n💪 **Physical wellness**: Regular exercise and good nutrition\n📞 **Social support**: Stay connected with friends and family\n⚖️ **Balance**: Make time for activities you enjoy\n\nWould you like to explore any of these areas further, or is there something specific you'd like help with today?",
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

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">AI Mental Health Support</h1>
        <p className="text-muted-foreground">
          Get immediate support, coping strategies, and guidance from our AI assistant trained in mental health support.
        </p>
        
        <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <Shield className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            This chat is confidential and anonymous. For emergencies, call 911 or your campus crisis line.
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
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.urgency === 'high' && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <Badge variant="destructive" className="text-xs">Crisis Support Needed</Badge>
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
          
          {/* Quick Responses */}
          <div className="px-6 py-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Quick responses:</p>
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
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                disabled={isTyping}
              />
              <Button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
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