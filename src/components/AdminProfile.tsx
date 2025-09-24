import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Label } from './ui/label';
import { Edit, Save, ShieldCheck } from 'lucide-react';
import { UserData } from '../App';

interface AdminProfileProps {
  userData: UserData | null;
}

export function AdminProfile({ userData }: AdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || 'Administrator',
        email: userData.email || '',
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real application, you would save this data to your backend.
    console.log('Saving data:', formData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading admin data...</p>
      </div>
    );
  }
  
  const fallbackChar = formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'A';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl mb-2 text-primary">Admin Profile</h1>
            <p className="text-muted-foreground">View and manage your personal information.</p>
        </div>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                {fallbackChar}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{formData.fullName}</CardTitle>
              <CardDescription>System Administrator</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                name="fullName"
                value={formData.fullName} 
                onChange={handleInputChange} 
                disabled={!isEditing} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                name="email"
                type="email" 
                value={formData.email} 
                onChange={handleInputChange}
                disabled={!isEditing} 
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
               <div className="flex items-center gap-2 p-2 border rounded-md bg-muted">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Administrator</span>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}