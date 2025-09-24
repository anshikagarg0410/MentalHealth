import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Label } from './ui/label';
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
  Users, 
  MessageCircle, 
  AlertTriangle,
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Bell,
  UserCheck,
  BookOpen,
  XIcon,
  Star,
  Flame,
  BarChart3,
  CheckCircle,
  Settings,
  ArrowLeft,
  Save
} from 'lucide-react';

// Define a comprehensive user type
type UserRole = 'student' | 'counselor' | 'admin' | 'moderator';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastActive: string;
  sessions?: number; // Optional for non-counselors
  // Student specific
  college?: string;
  studentId?: string;
  // Counselor specific
  specialization?: string;
  licenseNumber?: string;
}


// Define props interface
interface AdminInterfaceProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const initialUsers: PlatformUser[] = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 's.johnson@example.com', role: 'counselor', status: 'active', lastActive: '2 hours ago', sessions: 45, specialization: 'Anxiety & Stress', licenseNumber: 'LIC12345' },
    { id: '2', name: 'Mike Chen', email: 'm.chen@example.com', role: 'moderator', status: 'active', lastActive: '30 min ago' },
    { id: '3', name: 'Dr. Priya Patel', email: 'p.patel@example.com', role: 'counselor', status: 'inactive', lastActive: '2 days ago', sessions: 32, specialization: 'Depression', licenseNumber: 'LIC67890' },
    { id: '4', name: 'Alex Rivera', email: 'a.rivera@example.com', role: 'student', status: 'active', lastActive: '1 hour ago', college: 'State University', studentId: 'STU9876' },
    { id: '5', name: 'Emily White', email: 'e.white@example.com', role: 'student', status: 'active', lastActive: '5 hours ago', college: 'Tech Institute', studentId: 'STU5432' },
];


export function AdminInterface({ currentView, onViewChange }: AdminInterfaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [hasNewAlerts, setHasNewAlerts] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  
  // State for viewing/editing a specific user
  const [selectedUserForView, setSelectedUserForView] = useState<PlatformUser | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editedUserData, setEditedUserData] = useState<PlatformUser | null>(null);

  // User data is now in state
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers);


  const initialAlerts = [
    { id: '1', type: 'crisis', message: 'Student showing severe distress signals in AI chat', timestamp: '2 minutes ago', severity: 'high', status: 'pending' },
    { id: '2', type: 'content', message: 'Forum post flagged for harmful content', timestamp: '15 minutes ago', severity: 'medium', status: 'reviewing' }
  ];

  const [criticalAlerts, setCriticalAlerts] = useState(initialAlerts);

  const systemStats = [
    { label: 'Total Active Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Crisis Interventions', value: '23', change: '+3%', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Counselor Utilization', value: '78%', change: '+5%', icon: UserCheck, color: 'text-green-600' }
  ];

  const monthlyData = [ { month: 'Jan', knowledgeBase: 120, supportSessions: 45, engagementDuration: 250 }, { month: 'Feb', knowledgeBase: 150, supportSessions: 60, engagementDuration: 310 }, { month: 'Mar', knowledgeBase: 180, supportSessions: 75, engagementDuration: 350 }, ];
  const weeklyData = [ { day: 'Mon', users: 245, sessions: 189 }, { day: 'Tue', users: 267, sessions: 203 }, { day: 'Wed', users: 289, sessions: 234 }, ];
  const riskDistribution = [ { name: 'Low Risk', value: 72, color: '#8b5a8c' }, { name: 'Medium Risk', value: 21, color: '#b48ead' }, { name: 'High Risk', value: 6, color: '#d8a8c4' }, { name: 'Crisis', value: 1, color: '#c296b1' } ];

  // Handler functions
  const handleAlertAction = (alertId: string, action: string) => alert(`${action} taken for alert ${alertId}`);
  const handleAddUser = () => { setIsAddingUser(true); setTimeout(() => { setIsAddingUser(false); alert('User added successfully!'); }, 1000); };
  
  const handleDeleteUser = (userId: string) => { 
    if (confirm('Are you sure you want to delete this user?')) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        alert(`User deleted successfully`); 
    } 
  };
  
  const handleFilterChange = (filter: string) => setFilterBy(filter);

  // New handlers for user profile view
  const handleViewUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUserForView(user);
      setEditedUserData(user); // Initialize form data
    }
  };

  const handleBackToUserList = () => {
    setSelectedUserForView(null);
    setIsEditingUser(false);
    setEditedUserData(null);
  };

  const handleSaveUser = () => {
    if (editedUserData) {
        setUsers(prevUsers => prevUsers.map(user => 
            user.id === editedUserData.id ? editedUserData : user
        ));
        setSelectedUserForView(editedUserData); // Update the view with the new data
        alert(`User ${editedUserData.name} saved successfully!`);
    }
    setIsEditingUser(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUserData) {
      setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (editedUserData) {
      setEditedUserData({ ...editedUserData, [name]: value as UserRole | 'active' | 'inactive' });
    }
  };


  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || (filterBy === 'active' && user.status === 'active') || (filterBy === 'inactive' && user.status === 'inactive');
    return matchesSearch && matchesFilter;
  });

  const viewDetails = {
    'overview': { title: 'System Administration', description: 'Comprehensive management dashboard for the platform' },
    'users': { title: 'User Management', description: 'View, edit, and manage all platform users' },
    'content': { title: 'Content Management', description: 'Oversee and moderate all user-generated content' },
    'analytics': { title: 'Advanced Analytics', description: 'Deep dive into platform metrics and user trends' }
  };

  const { title, description } = viewDetails[currentView as keyof typeof viewDetails] || viewDetails['overview'];
  
  const renderOverview = () => (
    <div className="space-y-6">
      {isAlertVisible && criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-700 dark:text-red-300" /><CardTitle className="text-red-700 dark:text-red-300">Critical Alerts ({criticalAlerts.length})</CardTitle></div>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsAlertVisible(false)}><XIcon className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent><div className="space-y-3">{criticalAlerts.map(alert => <div key={alert.id} className="flex items-center justify-between p-3 bg-white dark:bg-red-900/20 rounded-lg"><div className="flex items-center gap-3"><Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="uppercase text-xs">{alert.severity}</Badge><div><p className="font-medium text-sm">{alert.message}</p><p className="text-xs text-muted-foreground">{alert.timestamp}</p></div></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, 'View')}><Eye className="h-3 w-3" /></Button><Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleAlertAction(alert.id, 'Respond')}>Respond</Button></div></div>)}</div></CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{systemStats.map((stat, index) => <Card key={index} className="hover:shadow-lg transition-shadow"><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">{stat.label}</p><p className="text-2xl font-bold text-primary">{stat.value}</p><p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</p></div><div className="p-3 bg-primary/10 rounded-full"><stat.icon className={`h-6 w-6 ${stat.color}`} /></div></div></CardContent></Card>)}</div>
      <div className="grid lg:grid-cols-2 gap-6"><Card><CardHeader><CardTitle>Monthly Activity Overview</CardTitle><CardDescription>Engagement trends</CardDescription></CardHeader><CardContent><div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="knowledgeBase" fill="#8b5a8c" name="Knowledge Base Access" /><Bar dataKey="supportSessions" fill="#b48ead" name="Support Sessions" /></BarChart></ResponsiveContainer></div></CardContent></Card><Card><CardHeader><CardTitle>Risk Assessment</CardTitle><CardDescription>Distribution of user risk levels</CardDescription></CardHeader><CardContent><div className="h-80"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={riskDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">{riskDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></CardContent></Card></div>
    </div>
  );

  const renderUserProfile = () => {
    if (!selectedUserForView || !editedUserData) return null;
    
    return (
        <div className="space-y-6">
            <Button variant="outline" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}} onClick={handleBackToUserList} className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" />Back to User List</Button>
            <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16"><AvatarFallback className="text-2xl bg-primary/10 text-primary">{selectedUserForView.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <div>
                            <CardTitle className="text-2xl">{selectedUserForView.name}</CardTitle>
                            <CardDescription>{selectedUserForView.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label>Full Name</Label><Input name="name" value={editedUserData.name} onChange={handleInputChange} disabled={!isEditingUser} /></div>
                        <div className="space-y-2"><Label>Email</Label><Input name="email" value={editedUserData.email} onChange={handleInputChange} disabled={!isEditingUser} /></div>
                        <div className="space-y-2"><Label>Role</Label><Select name="role" value={editedUserData.role} onValueChange={(value) => handleSelectChange('role', value)} disabled={!isEditingUser}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="student">Student</SelectItem><SelectItem value="counselor">Counselor</SelectItem><SelectItem value="moderator">Moderator</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent></Select></div>
                        <div className="space-y-2"><Label>Status</Label><Select name="status" value={editedUserData.status} onValueChange={(value) => handleSelectChange('status', value)} disabled={!isEditingUser}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></div>

                        {editedUserData.role === 'student' && (
                            <>
                                <div className="space-y-2"><Label>College</Label><Input name="college" value={editedUserData.college || ''} onChange={handleInputChange} disabled={!isEditingUser} /></div>
                                <div className="space-y-2"><Label>Student ID</Label><Input name="studentId" value={editedUserData.studentId || ''} onChange={handleInputChange} disabled={!isEditingUser} /></div>
                            </>
                        )}
                        {editedUserData.role === 'counselor' && (
                            <>
                                <div className="space-y-2"><Label>Specialization</Label><Input name="specialization" value={editedUserData.specialization || ''} onChange={handleInputChange} disabled={!isEditingUser} /></div>
                                <div className="space-y-2"><Label>License Number</Label><Input name="licenseNumber" value={editedUserData.licenseNumber || ''} onChange={handleInputChange} disabled={!isEditingUser} /></div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        {isEditingUser ? (
                            <Button onClick={handleSaveUser}><Save className="mr-2 h-4 w-4" />Save</Button>
                        ) : (
                            <Button onClick={() => setIsEditingUser(true)}><Edit className="mr-2 h-4 w-4" />Edit</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  };

  const renderUsers = () => (
    selectedUserForView ? renderUserProfile() : (
      <div className="space-y-6">
          <div className="flex justify-end items-center"><Button style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}} className="bg-primary hover:bg-primary/90" onClick={handleAddUser} disabled={isAddingUser}><Plus className="mr-2 h-4 w-4" />{isAddingUser ? 'Adding...' : 'Add User'}</Button></div>
          <div className="flex gap-4"><div className="relative flex-1"><Search  style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div><Select value={filterBy} onValueChange={handleFilterChange}><SelectTrigger className="w-32"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Filter" /></SelectTrigger><SelectContent><SelectItem value="all">All Users</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></div>
          <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full">
            <thead className="border-b bg-muted/50"><tr><th className="text-left p-4 font-medium">User</th><th className="text-left p-4 font-medium">Role</th><th className="text-left p-4 font-medium">Status</th><th className="text-left p-4 font-medium">Last Active</th><th className="text-left p-4 font-medium">Actions</th></tr></thead>
            <tbody>{filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-muted/30">
                <td className="p-4"><div className="flex items-center gap-3 cursor-pointer" onClick={() => handleViewUser(user.id)}><Avatar><AvatarFallback className="bg-primary/10 text-primary">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><span className="font-medium">{user.name}</span></div></td>
                <td className="p-4"><Badge variant="outline">{user.role}</Badge></td>
                <td className="p-4"><Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge></td>
                <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                <td className="p-4"><div className="flex gap-2"><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleViewUser(user.id);}}><Eye className="h-3 w-3" /></Button><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id);}}><Trash2 className="h-3 w-3" /></Button></div></td>
              </tr>
            ))}</tbody>
          </table></div></CardContent></Card>
      </div>
    )
  );

  const renderContentPage = () => ( <div className="space-y-6"><div className="flex justify-end items-center"><Button className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Add Resource</Button></div><div className="grid md:grid-cols-2 gap-6"><Card><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Resource Library</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between"><span className="text-sm">Articles</span><Badge>127</Badge></div><div className="flex justify-between"><span className="text-sm">Videos</span><Badge>89</Badge></div><div className="flex justify-between"><span className="text-sm">Guides</span><Badge>156</Badge></div><div className="flex justify-between"><span className="text-sm">Pending</span><Badge variant="secondary">12</Badge></div><Button className="w-full mt-4" variant="outline">Manage</Button></CardContent></Card><Card><CardHeader><CardTitle className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary" />Forum Moderation</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between"><span className="text-sm">Discussions</span><Badge>43</Badge></div><div className="flex justify-between"><span className="text-sm">Reports</span><Badge variant="destructive">8</Badge></div><div className="flex justify-between"><span className="text-sm">Approved</span><Badge>24</Badge></div><div className="flex justify-between"><span className="text-sm">Moderators</span><Badge>6</Badge></div><Button className="w-full mt-4" variant="outline">Review Queue</Button></CardContent></Card></div></div>);
  const renderAnalytics = () => ( <div className="grid lg:grid-cols-1 gap-6"><Card><CardHeader><CardTitle>Engagement Trends</CardTitle><CardDescription>Usage over time</CardDescription></CardHeader><CardContent><div className="h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Line type="monotone" dataKey="users" stroke="#8b5a8c" strokeWidth={2} name="Users" /><Line type="monotone" dataKey="sessions" stroke="#b48ead" strokeWidth={2} name="Sessions" /></LineChart></ResponsiveContainer></div></CardContent></Card><Card className="col-span-1"><CardHeader><CardTitle>Platform Insights</CardTitle><CardDescription>User feedback & system health</CardDescription></CardHeader><CardContent className="p-0"><div className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center"><div className="space-y-2 p-4 rounded-lg bg-white dark:bg-background shadow-sm hover:shadow-md transition-shadow"><div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"><Star className="h-5 w-5 text-yellow-500" /><span>Student Voice</span></div><p className="text-2xl font-bold text-primary">4.3/5</p><p className="text-xs text-muted-foreground">Top Feedback</p></div><div className="space-y-2 p-4 rounded-lg bg-white dark:bg-background shadow-sm hover:shadow-md transition-shadow"><div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"><Flame className="h-5 w-5 text-orange-500" /><span>Engagement Pulse</span></div><p className="text-2xl font-bold text-primary">10PM-1AM</p><p className="text-xs text-muted-foreground">Peak Activity</p></div><div className="space-y-2 p-4 rounded-lg bg-white dark:bg-background shadow-sm hover:shadow-md transition-shadow"><div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"><BarChart3 className="h-5 w-5 text-blue-500" /><span>Feature Impact</span></div><p className="text-2xl font-bold text-primary">65%</p><p className="text-xs text-muted-foreground">Journaling Adoption</p></div><div className="space-y-2 p-4 rounded-lg bg-white dark:bg-background shadow-sm hover:shadow-md transition-shadow"><div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"><Settings className="h-5 w-5 text-green-500" /><span>System Health</span></div><p className="text-2xl font-bold text-green-600 flex items-center justify-center">99.8%<CheckCircle className="h-5 w-5 ml-2" /></p><p className="text-xs text-muted-foreground">Avg. Uptime</p></div></div></div></CardContent></Card></div>);

  const renderCurrentView = () => {
    switch(currentView) {
      case 'users': return renderUsers();
      case 'content': return renderContentPage();
      case 'analytics': return renderAnalytics();
      case 'overview': default: return renderOverview();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl mb-2 text-primary">{selectedUserForView ? "User Profile" : title}</h1><p className="text-muted-foreground">{selectedUserForView ? `Viewing details for ${selectedUserForView.name}`: description}</p></div>
        {currentView === 'overview' && (<div className="flex items-center gap-3"><Button size="sm" variant="outline" className="relative" onClick={() => { setIsAlertVisible(!isAlertVisible); if (hasNewAlerts) setHasNewAlerts(false);}}><Bell className="mr-2 h-4 w-4" />Alerts{hasNewAlerts && <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}</Button></div>)}
      </div>
      {renderCurrentView()}
    </div>
  );
}

