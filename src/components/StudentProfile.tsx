import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Edit, Save, User, Mail, School, BookOpen, MessageCircle, Users, Award, Hash } from 'lucide-react';
import { Switch } from './ui/switch';
import { UserData } from '../App';

interface StudentProfileProps {
  userData: UserData | null;
}

export function StudentProfile({ userData }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    college: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
  });

  useEffect(() => {
    if (userData) {
      setStudentData({
        name: userData.fullName || userData.username || '',
        email: userData.email || '',
        college: userData.college || '',
        studentId: userData.studentId || '',
        department: userData.department || '',
        yearOfStudy: userData.yearOfStudy || '',
      });
    }
  }, [userData]);
  
  const [privacySettings, setPrivacySettings] = useState({
    anonymousPosts: true,
    shareActivity: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setStudentData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePrivacyChange = (id: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const InfoDisplay = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2 text-primary">Your Profile</h1>
          <p className="text-muted-foreground"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            Manage your personal information and privacy settings.
          </p>
        </div>
        <Button onClick={toggleEdit} variant={isEditing ? 'default' : 'outline'}style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
          {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Card style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${studentData.name}`} alt={studentData.name} />
              <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{studentData.name}</CardTitle>
              <CardDescription>{studentData.department} - {studentData.yearOfStudy}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={studentData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={studentData.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College/University</Label>
                <Input id="college" value={studentData.college} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" value={studentData.studentId} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={studentData.department} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearOfStudy">Year of Study</Label>
                <Input id="yearOfStudy" value={studentData.yearOfStudy} onChange={handleInputChange} />
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              <InfoDisplay icon={<User className="h-4 w-4"/>} label="Full Name" value={studentData.name} />
              <InfoDisplay icon={<Mail className="h-4 w-4"/>} label="Email Address" value={studentData.email} />
              <InfoDisplay icon={<School className="h-4 w-4"/>} label="College/University" value={studentData.college} />
              <InfoDisplay icon={<Hash className="h-4 w-4"/>} label="Student ID" value={studentData.studentId} />
              <InfoDisplay icon={<BookOpen className="h-4 w-4"/>} label="Department" value={studentData.department} />
              <InfoDisplay icon={<Award className="h-4 w-4"/>} label="Year of Study" value={studentData.yearOfStudy} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
        <Card>
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>A summary of your engagement on the platform.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <MessageCircle className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="font-semibold">5</p>
              <p className="text-xs text-muted-foreground">AI Chats</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <BookOpen className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="font-semibold">12</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Users className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="font-semibold">3</p>
              <p className="text-xs text-muted-foreground">Forum Posts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control how your information is used.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="anonymousPosts" className="flex flex-col gap-1">
                <span>Anonymous Forum Posts</span>
                <span className="text-xs font-normal text-muted-foreground">Post in the community without revealing your name.</span>
              </Label>
              <Switch
                id="anonymousPosts"
                checked={privacySettings.anonymousPosts}
                onCheckedChange={() => handlePrivacyChange('anonymousPosts')}
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="shareActivity" className="flex flex-col gap-1">
                <span>Share Activity Summary</span>
                <span className="text-xs font-normal text-muted-foreground">Allow counselors to see your general activity.</span>
              </Label>
              <Switch
                id="shareActivity"
                checked={privacySettings.shareActivity}
                onCheckedChange={() => handlePrivacyChange('shareActivity')}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}