import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Star
} from 'lucide-react';

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

export function CounselorInterface() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [isSchedulingSession, setIsSchedulingSession] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notifications, setNotifications] = useState(2);

  // Mock data
  const counselorStats = [
    { label: 'Active Clients', value: '28', icon: Users, color: 'text-blue-600' },
    { label: 'This Week Sessions', value: '15', icon: CalendarIcon, color: 'text-green-600' },
    { label: 'Crisis Interventions', value: '3', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const upcomingAppointments: Appointment[] = [
    {
      id: '1',
      clientName: 'Anonymous Student A',
      date: 'Today',
      time: '10:00 AM',
      type: 'individual',
      status: 'scheduled',
      location: 'Room 205',
      duration: '50 min'
    },
    {
      id: '2',
      clientName: 'Anonymous Student B',
      date: 'Today',
      time: '2:00 PM',
      type: 'crisis',
      status: 'scheduled',
      location: 'Crisis Room',
      duration: '60 min'
    },
    {
      id: '3',
      clientName: 'Group Therapy - Anxiety',
      date: 'Tomorrow',
      time: '4:00 PM',
      type: 'group',
      status: 'scheduled',
      location: 'Group Room A',
      duration: '90 min'
    }
  ];

  const recentClients: Client[] = [
    {
      id: '1',
      name: 'Student #1847',
      age: 20,
      riskLevel: 'medium',
      lastSession: '2 days ago',
      nextSession: 'Today, 10:00 AM',
      sessionCount: 8,
      status: 'active',
      primaryConcern: 'Academic anxiety',
      notes: 'Making good progress with coping strategies. Continue CBT techniques.'
    },
    {
      id: '2',
      name: 'Student #2156',
      age: 19,
      riskLevel: 'high',
      lastSession: '1 day ago',
      nextSession: 'Today, 2:00 PM',
      sessionCount: 12,
      status: 'active',
      primaryConcern: 'Depression, suicidal ideation',
      notes: 'Crisis intervention protocol activated. Daily check-ins required.'
    },
    {
      id: '3',
      name: 'Student #1923',
      age: 21,
      riskLevel: 'low',
      lastSession: '1 week ago',
      nextSession: 'Next week',
      sessionCount: 4,
      status: 'active',
      primaryConcern: 'Social anxiety',
      notes: 'Significant improvement in social interactions. Consider reducing frequency.'
    }
  ];

  const crisisAlerts = [
    {
      id: '1',
      clientId: 'Student #2156',
      message: 'Client mentioned self-harm thoughts in AI chat',
      timestamp: '30 minutes ago',
      severity: 'high',
      action: 'Schedule immediate session'
    },
    {
      id: '2',
      clientId: 'Student #3401',
      message: 'Missed second consecutive appointment',
      timestamp: '2 hours ago',
      severity: 'medium',
      action: 'Follow-up contact needed'
    }
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

  // Handler functions
  const handleScheduleSession = () => {
    setIsSchedulingSession(true);
    setTimeout(() => {
      setIsSchedulingSession(false);
      alert('Session scheduled successfully!');
    }, 1500);
  };

  const handleStartSession = (appointmentId: string) => {
    alert(`Starting session for appointment ${appointmentId}`);
  };

  const handleVideoCall = (appointmentId: string) => {
    alert(`Starting video call for appointment ${appointmentId}`);
  };

  const handlePhoneCall = (appointmentId: string) => {
    alert(`Starting phone call for appointment ${appointmentId}`);
  };

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    setTimeout(() => {
      setIsSavingNotes(false);
      alert('Notes saved successfully!');
    }, 1000);
  };

  const handleSendMessage = (clientId?: string) => {
    const target = clientId ? `client ${clientId}` : 'selected client';
    alert(`Sending message to ${target}`);
  };

  const handleScheduleAppointment = (clientId?: string) => {
    const target = clientId ? `client ${clientId}` : 'selected client';
    alert(`Scheduling appointment for ${target}`);
  };

  const handleCrisisAction = (action: string) => {
    alert(`${action} executed for crisis intervention`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Schedule Session':
        handleScheduleSession();
        break;
      case 'Send Message':
        handleSendMessage();
        break;
      case 'Add Notes':
        alert('Opening notes editor...');
        break;
      case 'Crisis Protocol':
        handleCrisisAction('Crisis Protocol activated');
        break;
      default:
        alert(`${action} selected`);
    }
  };

  const handleResourceAction = (resource: string) => {
    alert(`Accessing ${resource}`);
  };

  const handleReportGeneration = (reportType: string) => {
    alert(`Generating ${reportType}...`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl mb-2 text-primary">Counselor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your clients, appointments, and therapeutic interventions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setNotifications(0)}
          >
            <Bell className="mr-2 h-4 w-4" />
            Alerts ({crisisAlerts.length})
          </Button>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleScheduleSession}
            disabled={isSchedulingSession}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isSchedulingSession ? 'Scheduling...' : 'New Session'}
          </Button>
        </div>
      </div>

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
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                      {alert.severity}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">
                        <span className="text-primary">{alert.clientId}</span> - {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleCrisisAction(alert.action)}
                  >
                    {alert.action}
                  </Button>
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

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Today's Schedule */}
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
                          <div className="text-center">
                            <p className="font-semibold text-primary">{appointment.time}</p>
                            <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                          </div>
                          
                          <div className="flex-1">
                            <p className="font-medium">{appointment.clientName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {appointment.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {appointment.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleVideoCall(appointment.id)}
                          >
                            <Video className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePhoneCall(appointment.id)}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleStartSession(appointment.id)}
                          >
                            Start Session
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => handleQuickAction('Schedule Session')}
                >
                  <Plus className="h-6 w-6 mb-2" />
                  <span>Schedule Session</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => handleQuickAction('Send Message')}
                >
                  <MessageCircle className="h-6 w-6 mb-2" />
                  <span>Send Message</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => handleQuickAction('Add Notes')}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Add Notes</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => handleQuickAction('Crisis Protocol')}
                >
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  <span>Crisis Protocol</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-primary">Client Management</h2>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => alert('Adding new client...')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
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

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Client List */}
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <Card 
                  key={client.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedClient === client.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedClient(client.id)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {client.name.split('#')[1]?.slice(0, 2) || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">Age {client.age}</p>
                        </div>
                      </div>
                      <Badge className={getRiskLevelColor(client.riskLevel)}>
                        {client.riskLevel} risk
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Primary Concern:</strong> {client.primaryConcern}
                      </p>
                      <p className="text-sm">
                        <strong>Sessions:</strong> {client.sessionCount} | 
                        <strong> Last:</strong> {client.lastSession}
                      </p>
                      <p className="text-sm">
                        <strong>Next:</strong> {client.nextSession}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Client Details */}
            {selectedClient && (
              <Card>
                <CardHeader>
                  <CardTitle>Client Details</CardTitle>
                  <CardDescription>
                    {filteredClients.find(c => c.id === selectedClient)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(() => {
                    const client = filteredClients.find(c => c.id === selectedClient);
                    if (!client) return null;
                    
                    return (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Risk Level</label>
                            <Select defaultValue={client.riskLevel}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low Risk</SelectItem>
                                <SelectItem value="medium">Medium Risk</SelectItem>
                                <SelectItem value="high">High Risk</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <Select defaultValue={client.status}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Session Notes</label>
                          <Textarea
                            defaultValue={client.notes}
                            placeholder="Add session notes..."
                            className="mt-2"
                            rows={4}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={handleSaveNotes}
                            disabled={isSavingNotes}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            {isSavingNotes ? 'Saving...' : 'Save Changes'}
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleSendMessage(selectedClient)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleScheduleAppointment(selectedClient)}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Session Management</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Templates</CardTitle>
                <CardDescription>Pre-built session structures and interventions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleResourceAction('Cognitive Behavioral Therapy')}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Cognitive Behavioral Therapy
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleResourceAction('Crisis Intervention Protocol')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Crisis Intervention Protocol
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleResourceAction('Group Therapy Session')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Group Therapy Session
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleResourceAction('Initial Assessment')}
                >
                  <Clipboard className="mr-2 h-4 w-4" />
                  Initial Assessment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Plans</CardTitle>
                <CardDescription>Ongoing therapeutic interventions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Anxiety Management Protocol</h4>
                    <Badge>12 clients</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    8-week CBT program for academic anxiety
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Depression Support Track</h4>
                    <Badge>8 clients</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive depression treatment plan
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Social Skills Development</h4>
                    <Badge>15 clients</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Group-based social anxiety intervention
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Clinical Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Assessment Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleResourceAction('PHQ-9 Depression Scale')}
                >
                  PHQ-9 Depression Scale
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleResourceAction('GAD-7 Anxiety Assessment')}
                >
                  GAD-7 Anxiety Assessment
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleResourceAction('DASS-21 Screening Tool')}
                >
                  DASS-21 Screening Tool
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleResourceAction('Beck Inventory Suite')}
                >
                  Beck Inventory Suite
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Clinical Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Crisis Intervention Protocol
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Suicide Risk Assessment
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Cultural Competency Guide
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Ethical Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Professional Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Psychiatrist Referrals
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Peer Consultation
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Supervisor Contact
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Clinical Reports</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleReportGeneration('Treatment Summary Report')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Treatment Summary Report
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleReportGeneration('Client Progress Analysis')}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Client Progress Analysis
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleReportGeneration('Risk Assessment Report')}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Risk Assessment Report
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleReportGeneration('Outcome Measurements')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Outcome Measurements
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">28</p>
                    <p className="text-sm text-muted-foreground">Active Clients</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">87%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">4.8</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">156</p>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}