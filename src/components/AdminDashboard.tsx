import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Calendar,
  AlertTriangle,
  Heart,
  Brain,
  Clock,
  Download,
  Filter,
  Shield
} from 'lucide-react';

export function AdminDashboard() {
  // Mock data for analytics
  const weeklyUsage = [
    { day: 'Mon', aiChats: 45, bookings: 12, resources: 28, forum: 34 },
    { day: 'Tue', aiChats: 52, bookings: 15, resources: 31, forum: 29 },
    { day: 'Wed', aiChats: 48, bookings: 18, resources: 35, forum: 42 },
    { day: 'Thu', aiChats: 61, bookings: 22, resources: 29, forum: 38 },
    { day: 'Fri', aiChats: 55, bookings: 16, resources: 33, forum: 45 },
    { day: 'Sat', aiChats: 38, bookings: 8, resources: 25, forum: 28 },
    { day: 'Sun', aiChats: 32, bookings: 6, resources: 22, forum: 31 }
  ];

  const monthlyTrends = [
    { month: 'Jan', anxiety: 65, depression: 42, academic: 78, social: 35 },
    { month: 'Feb', anxiety: 59, depression: 38, academic: 82, social: 41 },
    { month: 'Mar', anxiety: 72, depression: 45, academic: 95, social: 38 },
    { month: 'Apr', anxiety: 68, depression: 41, academic: 88, social: 44 },
    { month: 'May', anxiety: 71, depression: 47, academic: 92, social: 39 },
    { month: 'Jun', anxiety: 63, depression: 39, academic: 76, social: 42 }
  ];

  const categoryDistribution = [
    { name: 'Academic Stress', value: 35, color: '#8884d8' },
    { name: 'Anxiety', value: 28, color: '#82ca9d' },
    { name: 'Social Issues', value: 18, color: '#ffc658' },
    { name: 'Depression', value: 12, color: '#ff7c7c' },
    { name: 'Other', value: 7, color: '#8dd1e1' }
  ];

  const riskAssessment = [
    { level: 'Low Risk', count: 145, percentage: 65 },
    { level: 'Medium Risk', count: 58, percentage: 26 },
    { level: 'High Risk', count: 18, percentage: 8 },
    { level: 'Crisis', count: 3, percentage: 1 }
  ];

  const engagementStats = [
    { 
      title: 'AI Chat Sessions', 
      value: '1,247', 
      change: '+12%', 
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    { 
      title: 'Counselling Bookings', 
      value: '156', 
      change: '+8%', 
      icon: Calendar,
      color: 'text-green-600'
    },
    { 
      title: 'Resources Accessed', 
      value: '892', 
      change: '+15%', 
      icon: Brain,
      color: 'text-purple-600'
    },
    { 
      title: 'Peer Interactions', 
      value: '334', 
      change: '+22%', 
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const peakHours = [
    { hour: '6 AM', usage: 5 },
    { hour: '9 AM', usage: 25 },
    { hour: '12 PM', usage: 45 },
    { hour: '3 PM', usage: 62 },
    { hour: '6 PM', usage: 78 },
    { hour: '9 PM', usage: 58 },
    { hour: '12 AM', usage: 32 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Mental Health Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Anonymous analytics to help improve mental health support services and interventions.
        </p>
        
        <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <Shield className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            All data is anonymized and aggregated to protect student privacy.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
        {engagementStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Usage */}
            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle>Weekly Platform Usage</CardTitle>
                <CardDescription>User engagement across different features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="aiChats" fill="#8884d8" name="AI Chats" />
                      <Bar dataKey="bookings" fill="#82ca9d" name="Bookings" />
                      <Bar dataKey="resources" fill="#ffc658" name="Resources" />
                      <Bar dataKey="forum" fill="#ff7c7c" name="Forum" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Issue Categories */}
            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle>Common Mental Health Concerns</CardTitle>
                <CardDescription>Distribution of issues addressed</CardDescription>
              </CardHeader>
              <CardContent style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Peak Usage Hours */}
          <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            <CardHeader>
              <CardTitle>Peak Usage Hours</CardTitle>
              <CardDescription>When students most commonly seek support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={peakHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="usage" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            <CardHeader>
              <CardTitle>6-Month Mental Health Trends</CardTitle>
              <CardDescription>Tracking changes in different mental health categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="anxiety" stroke="#ff7c7c" strokeWidth={2} name="Anxiety" />
                    <Line type="monotone" dataKey="depression" stroke="#8884d8" strokeWidth={2} name="Depression" />
                    <Line type="monotone" dataKey="academic" stroke="#82ca9d" strokeWidth={2} name="Academic Stress" />
                    <Line type="monotone" dataKey="social" stroke="#ffc658" strokeWidth={2} name="Social Issues" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Positive Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Resource engagement</span>
                  <Badge variant="secondary" className="text-green-600">+15%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Peer support participation</span>
                  <Badge variant="secondary" className="text-green-600">+22%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Early intervention</span>
                  <Badge variant="secondary" className="text-green-600">+18%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Areas of Concern
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Academic stress levels</span>
                  <Badge variant="secondary" className="text-orange-600">High</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sleep-related issues</span>
                  <Badge variant="secondary" className="text-orange-600">+8%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Seasonal changes</span>
                  <Badge variant="secondary" className="text-orange-600">Monitor</Badge>
                </div>
              </CardContent>
            </Card>

            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Intervention Success
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Crisis prevention</span>
                  <Badge variant="secondary" className="text-blue-600">92%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Counselling follow-up</span>
                  <Badge variant="secondary" className="text-blue-600">85%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Resource effectiveness</span>
                  <Badge variant="secondary" className="text-blue-600">78%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
                <CardDescription>Current risk assessment breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessment.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          risk.level === 'Low Risk' ? 'bg-green-500' :
                          risk.level === 'Medium Risk' ? 'bg-yellow-500' :
                          risk.level === 'High Risk' ? 'bg-orange-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{risk.level}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{risk.count}</div>
                        <div className="text-sm text-muted-foreground">{risk.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Crisis Intervention Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="destructive">High Priority</Badge>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm">Anonymous user showing signs of severe distress in AI chat</p>
                    <Button size="sm" className="mt-2">Review & Respond</Button>
                  </div>
                  
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-orange-500">Medium Priority</Badge>
                      <span className="text-xs text-muted-foreground">5 hours ago</span>
                    </div>
                    <p className="text-sm">Forum post flagged by community for concerning content</p>
                    <Button size="sm" variant="outline" className="mt-2">Review</Button>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">Follow-up</Badge>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm">Student missed scheduled Counselling appointment</p>
                    <Button size="sm" variant="outline" className="mt-2">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>Suggested interventions based on current data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-2">📚 Academic Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    High academic stress levels detected. Consider additional study skills workshops.
                  </p>
                  <Button size="sm">Schedule Workshop</Button>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2">🧘 Wellness Programs</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Increased interest in mindfulness resources. Expand meditation offerings.
                  </p>
                  <Button size="sm">Plan Programs</Button>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="font-semibold mb-2">👥 Peer Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Growing forum engagement. Recruit additional peer moderators.
                  </p>
                  <Button size="sm">Recruit Moderators</Button>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-semibold mb-2">⏰ Extended Hours</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Peak usage in evening hours. Consider extended Counselling availability.
                  </p>
                  <Button size="sm">Review Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create custom reports for stakeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Monthly Usage Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Risk Assessment Summary
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Intervention Effectiveness
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Resource Utilization
                </Button>
              </CardContent>
            </Card>

            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              <CardHeader>
                <CardTitle>Data Privacy Compliance</CardTitle>
                <CardDescription>Ensuring student privacy and data protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">All data anonymized</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">HIPAA compliant storage</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Encrypted transmissions</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Regular security audits</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}