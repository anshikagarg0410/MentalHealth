
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  MessageCircle,
  FileText,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Video,
  Phone,
  Mail,
  Edit,
  Save,
  Bell,
  Heart,
  Brain,
  Users,
  TrendingUp,
  BookOpen,
  Clipboard,
  Star,
  Download,
  Check
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Define props interface
interface CounselorInterfaceProps {
  currentView: string;
}

interface Client {
  id: string;
  name: string;
  age: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastSession: string;
  nextSession: string;
  sessionCount: number;
  status: 'active' | 'inactive' | 'completed';
  primaryConcern: string;
  notes: string;
}

interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: 'individual' | 'group' | 'crisis';
  status: 'scheduled' | 'completed' | 'cancelled';
  location: string;
  duration: string;
}

interface SessionFeedback {
  sessionId: string;
  clientId: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProgressEntry {
  week: string;
  mood: number;
  resources: number;
  flags: number;
}

// Accept currentView prop
export function CounselorInterface({ currentView }: CounselorInterfaceProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSchedulingSession, setIsSchedulingSession] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Mock data remains the same
  const counselorStats = [
    { label: 'Active Clients', value: '28', icon: Users, color: 'text-blue-600' },
    { label: 'This Week Sessions', value: '15', icon: CalendarIcon, color: 'text-green-600' },
    { label: 'Crisis Interventions', value: '3', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const upcomingAppointments: Appointment[] = [
    { id: '1', clientName: 'Anonymous Student A', date: 'Today', time: '10:00 AM', type: 'individual', status: 'scheduled', location: 'Room 205', duration: '50 min' },
    { id: '2', clientName: 'Anonymous Student B', date: 'Today', time: '2:00 PM', type: 'crisis', status: 'scheduled', location: 'Crisis Room', duration: '60 min' },
    { id: '3', clientName: 'Group Therapy - Anxiety', date: 'Tomorrow', time: '4:00 PM', type: 'group', status: 'scheduled', location: 'Group Room A', duration: '90 min' }
  ];

  const recentClients: Client[] = [
    { id: '1', name: 'Student #1847', age: 20, riskLevel: 'medium', lastSession: '2 days ago', nextSession: 'Today, 10:00 AM', sessionCount: 8, status: 'active', primaryConcern: 'Academic anxiety', notes: 'Making good progress with coping strategies. Continue CBT techniques.' },
    { id: '2', name: 'Student #2156', age: 19, riskLevel: 'high', lastSession: '1 day ago', nextSession: 'Today, 2:00 PM', sessionCount: 12, status: 'active', primaryConcern: 'Depression, suicidal ideation', notes: 'Crisis intervention protocol activated. Daily check-ins required.' },
    { id: '3', name: 'Student #1923', age: 21, riskLevel: 'low', lastSession: '1 week ago', nextSession: 'Next week', sessionCount: 4, status: 'active', primaryConcern: 'Social anxiety', notes: 'Significant improvement in social interactions. Consider reducing frequency.' }
  ];
  
  const crisisAlerts = [
    { id: '1', clientId: 'Student #2156', message: 'Client mentioned self-harm thoughts in AI chat', timestamp: '30 minutes ago', severity: 'high', action: 'Schedule immediate session' },
    { id: '2', clientId: 'Student #3401', message: 'Missed second consecutive appointment', timestamp: '2 hours ago', severity: 'medium', action: 'Follow-up contact needed' }
  ];

  const sessionHistory = [
    { id: '1', date: '2024-01-15', topic: 'Initial Assessment', notes: 'Client presents with symptoms of GAD...' },
    { id: '2', date: '2024-01-22', topic: 'CBT Introduction', notes: 'Introduced cognitive restructuring techniques...' },
    { id: '3', date: '2024-01-29', topic: 'Exposure Therapy', notes: 'Client responded well to gradual exposure exercises...' },
  ];
  
  const feedbackData: SessionFeedback[] = [
    { sessionId: '1', clientId: '1', rating: 5, comment: "Felt very heard and understood. The coping strategies were helpful.", date: '2024-01-15' },
    { sessionId: '2', clientId: '1', rating: 4, comment: "A bit challenging, but I see how it can be useful.", date: '2024-01-22' },
    { sessionId: '3', clientId: '2', rating: 5, comment: "I feel much safer now. Thank you for the immediate help.", date: '2024-01-29' },
  ];

  const sessionTasks = [
    { id: '1', task: 'Review intake forms for new client', due: 'Today', completed: false },
    { id: '2', task: 'Prepare for group therapy session', due: 'Tomorrow', completed: false },
    { id: '3', task: 'Follow-up with Student #3401', due: 'Past Due', completed: false },
  ];

  const studentProgressData: ProgressEntry[] = [
    { week: 'Week 1', mood: 3, resources: 2, flags: 1 },
    { week: 'Week 2', mood: 4, resources: 3, flags: 0 },
    { week: 'Week 3', mood: 4, resources: 5, flags: 0 },
    { week: 'Week 4', mood: 5, resources: 4, flags: 0 },
  ];

  const filteredClients = recentClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.primaryConcern.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handler functions remain the same...
  const handleScheduleSession = () => { setIsSchedulingSession(true); setTimeout(() => { setIsSchedulingSession(false); alert('Session scheduled successfully!'); }, 1500); };
  const handleStartSession = (appointmentId: string) => { alert(`Starting session for appointment ${appointmentId}`); };
  const handleVideoCall = (appointmentId: string) => { alert(`Starting video call for appointment ${appointmentId}`); };
  const handlePhoneCall = (appointmentId: string) => { alert(`Starting phone call for appointment ${appointmentId}`); };
  const handleSaveNotes = () => { setIsSavingNotes(true); setTimeout(() => { setIsSavingNotes(false); alert('Notes saved successfully!'); }, 1000); };
  const handleSendMessage = (clientId?: string) => { const target = clientId ? `client ${clientId}` : 'selected client'; alert(`Sending message to ${target}`); };
  const handleScheduleAppointment = (clientId?: string) => { const target = clientId ? `client ${clientId}` : 'selected client'; alert(`Scheduling appointment for ${target}`); };
  const handleCrisisAction = (action: string) => { alert(`${action} executed for crisis intervention`); };
  const handleQuickAction = (action: string) => { /* ... */ };
  const handleResourceAction = (resource: string) => { alert(`Accessing ${resource}`); };
  const handleReportGeneration = (reportType: string) => { alert(`Generating ${reportType}...`); };

  const viewDetails = {
    'counselor-dashboard': {
      title: 'Counselor Dashboard',
      description: 'Manage your clients, appointments, and therapeutic interventions',
    },
    'clients': {
      title: 'Client Management',
      description: 'View and manage your client caseload',
    },
    'sessions': {
      title: 'Session Management',
      description: 'Access session templates and treatment plans',
    },
    'reports': {
      title: 'Clinical Reports',
      description: 'Generate and review performance metrics and client progress',
    },
  };

  const { title, description } = viewDetails[currentView as keyof typeof viewDetails] || viewDetails['counselor-dashboard'];

  // Render functions for each view
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Crisis Alerts */}
      {crisisAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Priority Alerts ({crisisAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crisisAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>{alert.severity}</Badge>
                    <div>
                      <p className="font-medium text-sm"><span className="text-primary">{alert.clientId}</span> - {alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleCrisisAction(alert.action)}>{alert.action}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {counselorStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
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

      {/* Schedule Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
          <CardContent><Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} className="rounded-md border" /></CardContent>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>{selectedDate.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="text-center"><p className="font-semibold text-primary">{appointment.time}</p><p className="text-xs text-muted-foreground">{appointment.duration}</p></div>
                      <div className="flex-1"><p className="font-medium">{appointment.clientName}</p><div className="flex items-center gap-2 mt-1"><Badge variant="outline" className="text-xs">{appointment.type}</Badge><span className="text-sm text-muted-foreground">{appointment.location}</span></div></div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleVideoCall(appointment.id)}><Video className="h-3 w-3" /></Button>
                      <Button size="sm" variant="outline" onClick={() => handlePhoneCall(appointment.id)}><Phone className="h-3 w-3" /></Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleStartSession(appointment.id)}>Start Session</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('Schedule Session')}><Plus className="h-6 w-6 mb-2" /><span>Schedule Session</span></Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('Send Message')}><MessageCircle className="h-6 w-6 mb-2" /><span>Send Message</span></Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('Add Notes')}><FileText className="h-6 w-6 mb-2" /><span>Add Notes</span></Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('Crisis Protocol')}><AlertTriangle className="h-6 w-6 mb-2" /><span>Crisis Protocol</span></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div></div> {/* Placeholder for alignment */}
        <Button className="bg-primary hover:bg-primary/90" onClick={() => alert('Adding new client...')}><Plus className="mr-2 h-4 w-4" />Add Client</Button>
      </div>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search clients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filter</Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className={`cursor-pointer transition-colors ${selectedClient === client.id ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedClient(client.id)}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3"><Avatar><AvatarFallback className="bg-primary/10 text-primary">{client.name.split('#')[1]?.slice(0, 2) || 'A'}</AvatarFallback></Avatar><div><p className="font-medium">{client.name}</p><p className="text-sm text-muted-foreground">Age {client.age}</p></div></div><Badge className={getRiskLevelColor(client.riskLevel)}>{client.riskLevel} risk</Badge>
                </div>
                <div className="space-y-2"><p className="text-sm"><strong>Primary Concern:</strong> {client.primaryConcern}</p><p className="text-sm"><strong>Sessions:</strong> {client.sessionCount} | <strong> Last:</strong> {client.lastSession}</p><p className="text-sm"><strong>Next:</strong> {client.nextSession}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedClient && (
          <Card>
            <CardHeader><CardTitle>Client Details</CardTitle><CardDescription>{filteredClients.find(c => c.id === selectedClient)?.name}</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              {(() => { const client = filteredClients.find(c => c.id === selectedClient); if (!client) return null; return ( <> <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium">Risk Level</label><Select defaultValue={client.riskLevel}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low Risk</SelectItem><SelectItem value="medium">Medium Risk</SelectItem><SelectItem value="high">High Risk</SelectItem></SelectContent></Select></div><div><label className="text-sm font-medium">Status</label><Select defaultValue={client.status}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent></Select></div></div><div><label className="text-sm font-medium">Session Notes</label><Textarea defaultValue={client.notes} placeholder="Add session notes..." className="mt-2" rows={4} /></div><div className="flex gap-2"><Button className="bg-primary hover:bg-primary/90" onClick={handleSaveNotes} disabled={isSavingNotes}><Save className="mr-2 h-4 w-4" />{isSavingNotes ? 'Saving...' : 'Save Changes'}</Button><Button variant="outline" onClick={() => handleSendMessage(selectedClient)}><MessageCircle className="mr-2 h-4 w-4" />Send Message</Button><Button variant="outline" onClick={() => handleScheduleAppointment(selectedClient)}><CalendarIcon className="mr-2 h-4 w-4" />Schedule</Button></div></> ); })()}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Session Tools</CardTitle>
            <CardDescription>Templates and plans for your sessions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleResourceAction('Cognitive Behavioral Therapy')}><Brain className="mr-2 h-4 w-4" />Cognitive Behavioral Therapy</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleResourceAction('Crisis Intervention Protocol')}><Heart className="mr-2 h-4 w-4" />Crisis Intervention Protocol</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleResourceAction('Group Therapy Session')}><Users className="mr-2 h-4 w-4" />Group Therapy Session</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleResourceAction('Initial Assessment')}><Clipboard className="mr-2 h-4 w-4" />Initial Assessment</Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>Review past session notes and topics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessionHistory.map(session => (
                <div key={session.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{session.topic}</h4>
                    <span className="text-xs text-muted-foreground">{session.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{session.notes}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Session Tasks</CardTitle>
          <CardDescription>Manage your upcoming and past due tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessionTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="h-6 w-6"><Check className="h-4 w-4" /></Button>
                  <p className={`text-sm ${task.due === 'Past Due' ? 'text-red-500' : ''}`}>{task.task}</p>
                </div>
                <Badge variant={task.due === 'Past Due' ? 'destructive' : 'secondary'}>{task.due}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Browse Students</CardTitle>
              <CardDescription>Select a student to view their report.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-10" />
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentClients.map(client => (
                  <div key={client.id} className={`p-3 border rounded-lg cursor-pointer ${selectedStudentForReport?.id === client.id ? 'bg-primary/10 border-primary' : ''}`} onClick={() => setSelectedStudentForReport(client)}>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.primaryConcern}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          {selectedStudentForReport ? (
            <Card>
              <CardHeader>
                <CardTitle>Report for {selectedStudentForReport.name}</CardTitle>
                <CardDescription>Viewing progress and key metrics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg"><p className="text-2xl font-bold text-primary">{selectedStudentForReport.sessionCount}</p><p className="text-sm text-muted-foreground">Total Sessions</p></div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg"><p className="text-2xl font-bold text-primary">{selectedStudentForReport.riskLevel}</p><p className="text-sm text-muted-foreground">Risk Level</p></div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Progress Over Time</h4>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studentProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="mood" stroke="#8884d8" name="Mood (1-5)" />
                        <Line type="monotone" dataKey="resources" stroke="#82ca9d" name="Resources Accessed" />
                        <Line type="monotone" dataKey="flags" stroke="#ff7c7c" name="Flagged Conversations" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Key Engagement Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg"><p className="text-xl font-bold text-primary">4.2</p><p className="text-xs text-muted-foreground">Avg. Mood</p></div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg"><p className="text-xl font-bold text-primary">14</p><p className="text-xs text-muted-foreground">Resources</p></div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg"><p className="text-xl font-bold text-primary">1</p><p className="text-xs text-muted-foreground">Crisis Alerts</p></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Session Feedback</h4>
                  <div className="space-y-3">
                    {feedbackData.filter(f => f.clientId === selectedStudentForReport.id).map(feedback => (
                      <div key={feedback.sessionId} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1">
                            {[...Array(feedback.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                          </div>
                          <span className="text-xs text-muted-foreground">{feedback.date}</span>
                        </div>
                        <p className="text-sm italic">"{feedback.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Download Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start"><Download className="mr-2 h-4 w-4" />Full Progress Report (PDF)</Button>
                    <Button variant="outline" className="w-full justify-start"><Download className="mr-2 h-4 w-4" />Session Notes Summary (PDF)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a student to view their report.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'clients':
        return renderClients();
      case 'sessions':
        return renderSessions();
      case 'reports':
        return renderReports();
      case 'counselor-dashboard':
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl mb-2 text-primary">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><Bell className="mr-2 h-4 w-4" />Alerts ({crisisAlerts.length})</Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleScheduleSession} disabled={isSchedulingSession}><Plus className="mr-2 h-4 w-4" />{isSchedulingSession ? 'Scheduling...' : 'New Session'}</Button>
        </div>
      </div>
      
      {/* Render content based on the current view */}
      {renderContent()}
    </div>
  );
}