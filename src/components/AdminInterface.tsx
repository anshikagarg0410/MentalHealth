import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
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
  Cell
} from 'recharts';
import { 
  Shield, 
  Users, 
  MessageCircle, 
  AlertTriangle,
  Settings,
  FileText,
  Calendar,
  TrendingUp,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Bell,
  UserCheck,
  Brain,
  Heart,
  Clock,
  BarChart3
} from 'lucide-react';

export function AdminInterface() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [notifications, setNotifications] = useState(3);

  // Mock data
  const criticalAlerts = [
    {
      id: '1',
      type: 'crisis',
      message: 'Student showing severe distress signals in AI chat',
      timestamp: '2 minutes ago',
      severity: 'high',
      status: 'pending'
    },
    {
      id: '2',
      type: 'content',
      message: 'Forum post flagged for harmful content',
      timestamp: '15 minutes ago',
      severity: 'medium',
      status: 'reviewing'
    },
    {
      id: '3',
      type: 'system',
      message: 'Counselor availability below threshold',
      timestamp: '1 hour ago',
      severity: 'low',
      status: 'acknowledged'
    }
  ];

  const recentActivities = [
    { action: 'New user registration', time: '5 min ago', type: 'user' },
    { action: 'Crisis intervention triggered', time: '12 min ago', type: 'alert' },
    { action: 'Counselor appointment booked', time: '23 min ago', type: 'booking' },
    { action: 'Forum post reported', time: '45 min ago', type: 'report' },
    { action: 'Resource added to library', time: '1 hour ago', type: 'content' }
  ];

  const systemStats = [
    { label: 'Total Active Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Crisis Interventions', value: '23', change: '+3%', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'AI Chat Sessions', value: '1,456', change: '+18%', icon: MessageCircle, color: 'text-purple-600' },
    { label: 'Counselor Utilization', value: '78%', change: '+5%', icon: UserCheck, color: 'text-green-600' }
  ];

  const userManagementData = [
    { id: '1', name: 'Dr. Sarah Johnson', role: 'Senior Counselor', status: 'active', lastActive: '2 hours ago', sessions: 45 },
    { id: '2', name: 'Mike Chen', role: 'Peer Moderator', status: 'active', lastActive: '30 min ago', sessions: 12 },
    { id: '3', name: 'Dr. Priya Patel', role: 'Clinical Supervisor', status: 'inactive', lastActive: '2 days ago', sessions: 32 },
    { id: '4', name: 'Alex Rivera', role: 'Content Manager', status: 'active', lastActive: '1 hour ago', sessions: 8 }
  ];

  const weeklyData = [
    { day: 'Mon', users: 245, sessions: 189, crises: 3 },
    { day: 'Tue', users: 267, sessions: 203, crises: 1 },
    { day: 'Wed', users: 289, sessions: 234, crises: 5 },
    { day: 'Thu', users: 301, sessions: 267, crises: 2 },
    { day: 'Fri', users: 278, sessions: 245, crises: 4 },
    { day: 'Sat', users: 189, sessions: 156, crises: 1 },
    { day: 'Sun', users: 167, sessions: 134, crises: 2 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 72, color: '#8b5a8c' },
    { name: 'Medium Risk', value: 21, color: '#b48ead' },
    { name: 'High Risk', value: 6, color: '#d8a8c4' },
    { name: 'Crisis', value: 1, color: '#c296b1' }
  ];

  // Handler functions
  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Report exported successfully!');
    }, 2000);
  };

  const handleAlertAction = (alertId: string, action: string) => {
    alert(`${action} taken for alert ${alertId}`);
    // Update alert status in real implementation
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
    // In real implementation, open a modal or form
    setTimeout(() => {
      setIsAddingUser(false);
      alert('User added successfully!');
    }, 1000);
  };

  const handleEditUser = (userId: string) => {
    alert(`Editing user ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      alert(`User ${userId} deleted`);
    }
  };

  const handleViewUser = (userId: string) => {
    setSelectedUser(userId);
    alert(`Viewing details for user ${userId}`);
  };

  const handleFilterChange = (filter: string) => {
    setFilterBy(filter);
  };

  const handleCrisisResponse = () => {
    alert('Crisis response protocol initiated!');
  };

  const handleSystemAction = (action: string) => {
    alert(`${action} executed`);
  };

  const filteredUsers = userManagementData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'active' && user.status === 'active') ||
                         (filterBy === 'inactive' && user.status === 'inactive');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl mb-2 text-primary">System Administration</h1>
          <p className="text-muted-foreground">
            Comprehensive management dashboard for the mental health support platform
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportReport}
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export Report'}
          </Button>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => handleSystemAction('System Settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <Bell className="h-5 w-5" />
            Critical Alerts ({criticalAlerts.filter(a => a.status === 'pending').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-white dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                    className="uppercase text-xs"
                  >
                    {alert.severity}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAlertAction(alert.id, 'View')}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleAlertAction(alert.id, 'Respond')}
                  >
                    Respond
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="crises">Crisis Mgmt</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity Overview</CardTitle>
                <CardDescription>User engagement and crisis intervention trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8b5a8c" name="Active Users" />
                      <Bar dataKey="sessions" fill="#b48ead" name="Sessions" />
                      <Bar dataKey="crises" fill="#d8a8c4" name="Crisis Events" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Current Risk Assessment</CardTitle>
                <CardDescription>Distribution of user risk levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
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

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-primary">User Management</h2>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleAddUser}
              disabled={isAddingUser}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isAddingUser ? 'Adding...' : 'Add User'}
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBy} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-32">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Last Active</th>
                      <th className="text-left p-4 font-medium">Sessions</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                        <td className="p-4">{user.sessions}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewUser(user.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-primary">Content Management</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Resource Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Published Articles</span>
                  <Badge>127</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Video Resources</span>
                  <Badge>89</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Audio Guides</span>
                  <Badge>156</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pending Review</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => handleSystemAction('Manage Resources')}
                >
                  Manage Resources
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Forum Moderation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Discussions</span>
                  <Badge>43</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Reported Posts</span>
                  <Badge variant="destructive">8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Approved Today</span>
                  <Badge>24</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Moderators</span>
                  <Badge>6</Badge>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => handleSystemAction('Review Queue')}
                >
                  Review Queue
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Chat Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Response Templates</span>
                  <Badge>234</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Crisis Keywords</span>
                  <Badge>67</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Updated</span>
                  <Badge variant="secondary">3 days ago</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Accuracy Rate</span>
                  <Badge>94.2%</Badge>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => handleSystemAction('Update AI Model')}
                >
                  Update AI Model
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crises" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-primary">Crisis Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="text-red-600 border-red-200">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Active Alerts ({criticalAlerts.filter(a => a.severity === 'high').length})
              </Button>
            </div>
          </div>

          {/* Crisis Response Protocol */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300">Emergency Response Protocol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Immediate Actions Required</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Contact campus security: (555) 123-HELP</li>
                    <li>• Notify clinical supervisor</li>
                    <li>• Document incident details</li>
                    <li>• Initiate follow-up procedure</li>
                  </ul>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleCrisisResponse}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Initiate Crisis Response
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crisis Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <Badge variant="destructive">18 incidents</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Successfully Resolved</span>
                  <Badge>16 (89%)</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Response Time</span>
                  <Badge>4.2 minutes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Follow-up Rate</span>
                  <Badge>94%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Crisis Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Crisis Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                          {alert.severity} priority
                        </Badge>
                        <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAlertAction(alert.id, 'View Details')}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => handleAlertAction(alert.id, 'Take Action')}
                        >
                          Take Action
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Advanced Analytics</h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Trends</CardTitle>
                <CardDescription>Platform usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8b5a8c" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#b48ead" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">99.8%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">1.2s</p>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">2,847</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">4.8/5</p>
                    <p className="text-sm text-muted-foreground">User Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">System Configuration</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Server Status</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Database</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex justify-between">
                  <span>AI Service</span>
                  <Badge className="bg-green-100 text-green-800">Running</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Backup Status</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleSystemAction('System Settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleSystemAction('Security Settings')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security Settings
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleSystemAction('Backup & Recovery')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Backup & Recovery
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleSystemAction('Audit Logs')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Audit Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}