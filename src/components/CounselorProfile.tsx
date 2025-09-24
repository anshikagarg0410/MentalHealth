import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Edit, Save, Shield, User, Mail, Phone, Briefcase, Brain, GraduationCap, Languages } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { UserData } from '../App';

interface CounselorProfileProps {
  userData: UserData | null;
}

export function CounselorProfile({ userData }: CounselorProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [counselorData, setCounselorData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    license: '',
    education: '',
    languages: '',
    bio: '',
  });

  useEffect(() => {
    if (userData) {
      setCounselorData({
        name: userData.fullName || '',
        email: userData.email || '',
        phone: '(555) 123-4567', // This can be updated to be part of signup
        specialization: userData.specialization || '',
        experience: userData.experience || '',
        license: userData.licenseNumber || '',
        education: 'Ph.D. in Clinical Psychology', // This can be updated to be part of signup
        languages: 'English, Hindi', // This can be updated to be part of signup
        bio: 'Dedicated to providing a safe and supportive space for students to navigate challenges. My approach is collaborative and client-centered, focusing on building resilience and fostering growth.', // This can be updated to be part of signup
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCounselorData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2 text-primary">Counselor Profile</h1>
          <p className="text-muted-foreground"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
            View and manage your professional profile information.
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
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://github.com/shadcn.png`} alt={counselorData.name} />
              <AvatarFallback>{counselorData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{counselorData.name}</CardTitle>
              <CardDescription>{counselorData.specialization}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" value={counselorData.name} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={counselorData.email} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="phone" type="tel" value={counselorData.phone} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <div className="relative">
                <Brain className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="specialization" value={counselorData.specialization} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="experience" value={counselorData.experience} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="license" value={counselorData.license} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education & Qualifications</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="education" value={counselorData.education} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages Spoken</Label>
              <div className="relative">
                <Languages className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="languages" value={counselorData.languages} readOnly={!isEditing} onChange={handleInputChange} className="pl-10" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              value={counselorData.bio}
              readOnly={!isEditing}
              onChange={handleInputChange}
              placeholder="Tell students a little about yourself and your approach..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}