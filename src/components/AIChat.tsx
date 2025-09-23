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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickResponses = [
    "Exams are stressing me out",
    "I can't seem to sleep well",
    "Everything feels like too much right now",
    "Feeling a bit lonely lately",
    "Can we talk about managing stress?"
  ];

  const sendMessage = async (content: string) => {
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

    try {
      // --- START: API INTEGRATION ---
      // Replace this with a call to your chatbot API
      const response = await fetch('https://your-chatbot-api.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Assuming your API returns a response like: { reply: "...", urgency: "low" }
      const botResponseContent = data.reply || "I'm having a little trouble responding right now. Please try again later.";
      const botResponseUrgency = data.urgency || 'low';
      // --- END: API INTEGRATION ---
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
        urgency: botResponseUrgency,
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching from chatbot API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Sorry, I couldn't connect to my brain. Please check your connection and try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
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
          <CardTitle className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
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
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={"You can share anything here..."}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                disabled={isTyping}
                className="flex-1"
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