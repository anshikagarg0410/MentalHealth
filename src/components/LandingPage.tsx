import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import colorPalette from '../assets/color.png';
import { 
  Heart, 
  Shield, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  const features = [
    {
      icon: MessageCircle,
      title: 'Always Here for You',
      description: 'Chat with our friendly AI companion anytime - day or night. No judgment, just understanding and support when you need it most.'
    },
    {
      icon: Calendar,
      title: 'Connect with Care',
      description: 'Meet with counselors who truly get student life. Book sessions that fit your schedule, with professionals who care about your wellbeing.'
    },
    {
      icon: BookOpen,
      title: 'Tools That Help',
      description: 'Discover practical strategies, calming exercises, and wellness resources crafted specifically for Indian students like you.'
    },
    {
      icon: Users,
      title: 'You\'re Not Alone',
      description: 'Join a supportive community of students who understand what you\'re going through. Share, listen, and grow together.'
    },
    {
      icon: Shield,
      title: 'Your Safe Space',
      description: 'Everything you share stays between us. This is your judgment-free zone where your privacy and trust are our top priority.'
    },
    {
      icon: Heart,
      title: 'We\'ve Got Your Back',
      description: 'In moments of crisis, we\'re here with immediate support and caring guidance to help you through tough times.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      role: 'Computer Science Student',
      content: 'MindCare became my safe haven during exam stress. The AI felt like talking to a caring friend who was always there to listen. I finally felt understood.',
      rating: 5
    },
    {
      name: 'Rahul M.',
      role: 'Engineering Student',
      content: 'I was hesitant at first, but MindCare made me feel genuinely cared for. The counselors didn\'t just help - they really got what I was going through as a student.',
      rating: 5
    },
    {
      name: 'Ananya K.',
      role: 'Arts Student',
      content: 'Finding my community here changed everything. I discovered I wasn\'t the only one struggling, and together we found strength and hope.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' },
    { number: '100%', label: 'Confidential' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MindCare
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Support
              </button>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onLogin}
                className="text-foreground hover:text-primary"
              >
                Sign In
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('features')}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md w-full text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md w-full text-left"
                >
                  Stories
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md w-full text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md w-full text-left"
                >
                  Support
                </button>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={onLogin}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={onGetStarted}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Heart className="w-4 h-4 mr-2" />
                  Trusted by 10,000+ Students Like You
                </div> */}
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  You Don't Have to Face This Alone
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We understand the unique challenges you face as an Indian college student. MindCare is your trusted companion - here to listen, support, and guide you toward better mental wellness.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
                  onClick={onGetStarted}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5 px-8 py-4"
                  onClick={onLogin}
                >
                  Welcome Back
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                {/* <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary border-2 border-background" />
                  <div className="w-10 h-10 rounded-full bg-accent border-2 border-background" />
                  <div className="w-10 h-10 rounded-full bg-secondary border-2 border-background" />
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-background" />
                </div> */}
                {/* <div> */}
                  {/* <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Trusted by students nationwide</p>
                </div> */}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl transform rotate-3" />
              <img
                src={colorPalette}
                alt="Warm and welcoming color palette representing care and support"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gradient-to-b from-card to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Feel Better
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've created a caring space designed just for you, understanding the pressures and dreams of being a student in India today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Stories from Students Just Like You
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from fellow students who found their strength and peace of mind with MindCare by their side.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Feel Like Yourself Again?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Thousands of students have already found their peace and confidence with MindCare. We're here, ready to walk this journey with you too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-card text-primary hover:bg-card/90 px-8 py-4"
              onClick={onGetStarted}
            >
              I'm Ready to Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4"
              onClick={() => alert('Watch our story coming soon!')}
            >
              <Play className="mr-2 h-5 w-5" />
              See How It Works
            </Button> */}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Built for Indian Students, By People Who Care
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MindCare was created specifically to address the unique mental health challenges faced by college students in India. We understand the academic pressure, family expectations, career anxiety, and social challenges that you navigate every day.
                </p>
                <p>
                  Our platform combines cutting-edge AI technology with the warmth of human connection, ensuring you have access to support that's both immediate and deeply understanding of your cultural context.
                </p>
                <p>
                  Every feature, every interaction, and every piece of content has been designed with Indian students in mind - because your mental health journey deserves care that truly gets it.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary/5 p-6 rounded-lg">
                <MessageCircle className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Cultural Sensitivity</h3>
                <p className="text-sm text-muted-foreground">Understanding Indian family dynamics and cultural values</p>
              </div>
              <div className="bg-accent/5 p-6 rounded-lg">
                <Shield className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Complete Privacy</h3>
                <p className="text-sm text-muted-foreground">Anonymous usage with no stigma or judgment</p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-lg">
                <Users className="w-8 h-8 text-secondary-foreground mb-3" />
                <h3 className="font-semibold mb-2">Regional Languages</h3>
                <p className="text-sm text-muted-foreground">Support and resources in your preferred language</p>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                <Heart className="w-8 h-8 text-muted-foreground mb-3" />
                <h3 className="font-semibold mb-2">Crisis Support</h3>
                <p className="text-sm text-muted-foreground">Immediate help when you need it most</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">MindCare</h3>
              <p className="text-background/70 mb-4">
                Creating a caring community where every Indian student feels heard, supported, and valued.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/70">
                <li>Crisis Helpline</li>
                <li>Emergency Support</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Privacy</h4>
              <ul className="space-y-2 text-background/70">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Data Protection</li>
                <li>Confidentiality</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 MindCare. All rights reserved. Built with love and care for every Indian student.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}