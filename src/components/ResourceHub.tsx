import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Download, 
  BookOpen, 
  Headphones, 
  Video, 
  Search,
  Star,
  Clock,
  Users,
  Heart,
  Brain,
  Leaf
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'guide';
  category: string;
  duration?: string;
  rating: number;
  views: number;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  tags: string[];
}

export function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Student\'s Guide',
      description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies specifically for college students.',
      type: 'video',
      category: 'anxiety',
      duration: '15 min',
      rating: 4.8,
      views: 1250,
      language: 'English',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1630406866478-a2fca6070d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0JTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzU3ODY1MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['anxiety', 'coping', 'students']
    },
    {
      id: '2',
      title: 'Progressive Muscle Relaxation for Sleep',
      description: 'A guided audio session to help you relax your body and mind for better sleep quality.',
      type: 'audio',
      category: 'sleep',
      duration: '20 min',
      rating: 4.9,
      views: 890,
      language: 'Hindi',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1630406866478-a2fca6070d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2VsaW5nJTIwdGhlcmFweSUyMHNlc3Npb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3ODY1MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['sleep', 'relaxation', 'guided']
    },
    {
      id: '3',
      title: 'Academic Stress Management Workbook',
      description: 'Practical exercises and strategies to manage academic pressure and improve study habits.',
      type: 'guide',
      category: 'academic',
      rating: 4.7,
      views: 2100,
      language: 'English',
      difficulty: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc1Nzg2NTIzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['academic', 'stress', 'study skills']
    },
    {
      id: '4',
      title: 'Mindfulness Meditation for Beginners',
      description: 'Learn the basics of mindfulness meditation with simple, practical exercises.',
      type: 'video',
      category: 'mindfulness',
      duration: '12 min',
      rating: 4.6,
      views: 1650,
      language: 'Tamil',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1630406866478-a2fca6070d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0JTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzU3ODY1MjM2fDA&ixlib-rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['mindfulness', 'meditation', 'beginner']
    },
    {
      id: '5',
      title: 'Building Social Connections in College',
      description: 'Strategies for overcoming social anxiety and building meaningful relationships on campus.',
      type: 'article',
      category: 'social',
      rating: 4.5,
      views: 780,
      language: 'English',
      difficulty: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc1Nzg2NTIzOXww&ixlib-rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['social', 'relationships', 'anxiety']
    },
    {
      id: '6',
      title: 'Breathing Exercises for Instant Calm',
      description: 'Quick breathing techniques you can use anywhere to reduce stress and anxiety.',
      type: 'audio',
      category: 'techniques',
      duration: '10 min',
      rating: 4.9,
      views: 3200,
      language: 'Hindi',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1630406866478-a2fca6070d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0JTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzU3ODY1MjM2fDA&ixlib-rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['breathing', 'anxiety', 'quick relief']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'anxiety', label: 'Anxiety Support', icon: Heart },
    { id: 'sleep', label: 'Sleep & Rest', icon: Leaf },
    { id: 'academic', label: 'Academic Stress', icon: Brain },
    { id: 'mindfulness', label: 'Mindfulness', icon: Leaf },
    { id: 'social', label: 'Social Skills', icon: Users },
    { id: 'techniques', label: 'Quick Techniques', icon: Heart }
  ];

  const languages = [
    { id: 'all', label: 'All Languages' },
    { id: 'English', label: 'English' },
    { id: 'Hindi', label: 'हिन्दी' },
    { id: 'Tamil', label: 'தமிழ்' },
    { id: 'Telugu', label: 'తెలుగు' },
    { id: 'Marathi', label: 'मराठी' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return BookOpen;
      case 'guide': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-500';
      case 'audio': return 'bg-blue-500';
      case 'article': return 'bg-green-500';
      case 'guide': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Mental Wellness Resources</h1>
        <p className="text-muted-foreground">
          Your safe space for wellness. Explore curated videos, articles, and tools to support you.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  <category.icon className="mr-1 h-3 w-3" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Language</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={selectedLanguage === lang.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang.id)}
                  className="text-xs"
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          const typeColor = getTypeColor(resource.type);
          
          return (
            <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback 
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-40 object-cover"
                />
                <div className={`absolute top-3 left-3 ${typeColor} text-white p-2 rounded-full`}>
                  <TypeIcon className="h-4 w-4" />
                </div>
                {resource.duration && (
                  <Badge className="absolute top-3 right-3 bg-black/50 text-white">
                    {resource.duration}
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {resource.language}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    {resource.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {resource.views}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {resource.difficulty}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Play className="mr-2 h-3 w-3" />
                    {resource.type === 'article' || resource.type === 'guide' ? 'Read' : 'Play'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters to find relevant resources.
          </p>
        </div>
      )}
    </div>
  );
}