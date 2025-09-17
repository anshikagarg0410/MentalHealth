import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Plus, 
  MessageCircle, 
  Heart, 
  ThumbsUp, 
  Shield, 
  Users,
  Search,
  Filter,
  Flag,
  Clock,
  Eye,
  Lock
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  timestamp: Date;
  replies: number;
  likes: number;
  views: number;
  isAnonymous: boolean;
  isModerated: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Date;
  likes: number;
  isAnonymous: boolean;
}

export function PeerSupport() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const categories = [
    { id: 'general', label: 'General Support', color: 'bg-blue-500' },
    { id: 'anxiety', label: 'Anxiety & Stress', color: 'bg-red-500' },
    { id: 'academic', label: 'Academic Pressure', color: 'bg-green-500' },
    { id: 'social', label: 'Social Issues', color: 'bg-purple-500' },
    { id: 'relationships', label: 'Relationships', color: 'bg-pink-500' },
    { id: 'self-care', label: 'Self-Care Tips', color: 'bg-orange-500' }
  ];

  const posts: ForumPost[] = [
    {
      id: '1',
      title: 'Feeling overwhelmed with final exams approaching',
      content: 'Hey everyone, I\'m really struggling with the pressure of upcoming finals. I can\'t seem to focus and I\'m constantly anxious. Anyone else going through this? How do you cope?',
      author: 'Anonymous Student',
      authorId: 'anon1',
      category: 'academic',
      tags: ['finals', 'anxiety', 'study tips'],
      timestamp: new Date('2024-01-10T14:30:00'),
      replies: 12,
      likes: 8,
      views: 45,
      isAnonymous: true,
      isModerated: true
    },
    {
      id: '2',
      title: 'Found a great breathing technique that really helps',
      content: 'I wanted to share this 4-7-8 breathing technique I learned. It\'s been amazing for managing my anxiety before presentations. Breathe in for 4, hold for 7, exhale for 8. Try it!',
      author: 'Sarah M.',
      authorId: 'user2',
      category: 'self-care',
      tags: ['breathing', 'anxiety', 'techniques'],
      timestamp: new Date('2024-01-09T10:15:00'),
      replies: 6,
      likes: 15,
      views: 62,
      isAnonymous: false,
      isModerated: true
    },
    {
      id: '3',
      title: 'Making friends in college is harder than expected',
      content: 'I\'m in my second year and still struggling to make meaningful friendships. Everyone seems to have their groups already. Feeling pretty lonely. Any advice?',
      author: 'Anonymous Student',
      authorId: 'anon3',
      category: 'social',
      tags: ['friendship', 'loneliness', 'college life'],
      timestamp: new Date('2024-01-08T16:45:00'),
      replies: 18,
      likes: 12,
      views: 89,
      isAnonymous: true,
      isModerated: true
    },
    {
      id: '4',
      title: 'Dealing with perfectionism and self-criticism',
      content: 'I set impossibly high standards for myself and beat myself up when I don\'t meet them. It\'s affecting my mental health and relationships. How do you practice self-compassion?',
      author: 'Alex R.',
      authorId: 'user4',
      category: 'general',
      tags: ['perfectionism', 'self-compassion', 'mental health'],
      timestamp: new Date('2024-01-07T12:20:00'),
      replies: 9,
      likes: 11,
      views: 56,
      isAnonymous: false,
      isModerated: true
    }
  ];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // In a real app, this would submit to the backend
      console.log('Creating post:', { newPostTitle, newPostContent, newPostCategory, isAnonymous });
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPostForm(false);
    }
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.color || 'bg-gray-500';
  };

  const getCategoryLabel = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.label || categoryId;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Peer Support Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow students in a safe, moderated space. Share experiences, find support, and help others.
        </p>
      </div>

      {/* Community Guidelines */}
      <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Community Guidelines</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Be respectful, supportive, and kind. All posts are moderated by trained peer volunteers. 
                Report any concerning content. Remember, this is not a substitute for professional help.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Discussion Posts</TabsTrigger>
          <TabsTrigger value="create">Create Post</TabsTrigger>
          <TabsTrigger value="resources">Peer Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category.id} 
                variant="outline" 
                className="cursor-pointer hover:bg-muted"
              >
                <div className={`w-2 h-2 rounded-full ${category.color} mr-2`} />
                {category.label}
              </Badge>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {post.isAnonymous ? '?' : post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <div className={`w-2 h-2 rounded-full ${getCategoryColor(post.category)}`} />
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(post.category)}
                        </Badge>
                        {post.isAnonymous && (
                          <Badge variant="secondary" className="text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            Anonymous
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>{post.isAnonymous ? 'Anonymous Student' : post.author}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.replies}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Flag className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or create a new post to start a discussion.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Post Title</label>
                <Input
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={newPostCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPostCategory(category.id)}
                      className="justify-start"
                    >
                      <div className={`w-2 h-2 rounded-full ${category.color} mr-2`} />
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your Message</label>
                <Textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, experiences, or questions. Be respectful and considerate of others."
                  rows={6}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="anonymous" className="text-sm font-medium">
                  Post anonymously
                </label>
                <Badge variant="secondary" className="text-xs">
                  <Lock className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Before you post:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be respectful and supportive of others</li>
                  <li>• Don't share personal identifying information</li>
                  <li>• Avoid giving medical advice - encourage professional help</li>
                  <li>• Report concerning content to moderators</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCreatePost} className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
                <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Peer Support Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Anxiety Support Circle</h4>
                  <p className="text-sm text-muted-foreground">Wednesdays, 6:00 PM - Online</p>
                  <Button size="sm" className="mt-2">Join Group</Button>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Academic Stress Support</h4>
                  <p className="text-sm text-muted-foreground">Fridays, 4:00 PM - Student Center</p>
                  <Button size="sm" className="mt-2">Join Group</Button>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Mindfulness & Meditation</h4>
                  <p className="text-sm text-muted-foreground">Daily, 7:00 AM - Library Quiet Room</p>
                  <Button size="sm" className="mt-2">Join Group</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Peer Mentors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with trained peer mentors who understand what you're going through.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with a Peer Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Become a Peer Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Report a Concern
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}