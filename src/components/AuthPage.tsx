import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import {
  Heart,
  ArrowLeft,
  User,
  Mail,
  Lock,
  School,
  UserCheck,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { UserData } from '../App';

type UserType = "student" | "counselor" | "admin";

interface AuthPageProps {
  onLogin: (userType: UserType, userData: UserData) => void;
  onBack: () => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  username?: string;
  userType: UserType;
  college?: string;
  studentId?: string;
  department?: string;
  yearOfStudy?: string;
  institutionName?: string;
  licenseNumber?: string;
  specialization?: string;
  experience?: string;
  adminCode?: string;
  counselorAccessCode?: string;
  phoneNumber?: string;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [understoodDisclaimer, setUnderstoodDisclaimer] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    userType: 'student',
    college: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    institutionName: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    adminCode: '',
    counselorAccessCode: '',
    phoneNumber: '',
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (activeTab === 'signup') {
      if (formData.userType === 'student' && !formData.username) {
        setError('Username is required');
        return false;
      }

      if (formData.userType !== 'student' && !formData.fullName) {
        setError('Full name is required');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      
      if (formData.userType === 'student' && (!agreedToTerms || !understoodDisclaimer)) {
        setError('Please agree to all terms and conditions');
        return false;
      }

      // Role-specific validations
      if (formData.userType === 'student') {
        if (!formData.college || !formData.studentId || !formData.department) {
          setError('Please fill in all student details');
          return false;
        }
      } else if (formData.userType === 'counselor') {
        if (!formData.licenseNumber || !formData.specialization || !formData.phoneNumber) {
          setError('Please fill in all counselor credentials');
          return false;
        }
        // if (formData.counselorAccessCode !== 'COUNSELOR2024') {
        //   setError('Invalid counselor access code');
        //   return false;
        // }
      } else if (formData.userType === 'admin') {
        if (!formData.institutionName) {
          setError('Institution Name is required');
          return false;
        }
        // Admin access code is now handled in the profile.
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (activeTab === 'login') {
        // For demo purposes, allow any email/password combination
        // In real app, this would validate against backend
        setSuccess('Login successful!');
        setTimeout(() => {
          const loginData: UserData = {
            email: formData.email,
            userType: formData.userType,
            ...(formData.userType === 'student'
                ? { username: formData.email.split('@')[0] }
                : { fullName: formData.email.split('@')[0] })
          };
          onLogin(formData.userType, loginData);
        }, 1000);
      } else {
        // Sign up success
        setSuccess('Welcome to our community! We\'re so happy you\'re here...');
        setTimeout(() => {
          const signupData: UserData = {
            email: formData.email,
            fullName: formData.fullName,
            username: formData.username,
            userType: formData.userType,
            college: formData.college,
            studentId: formData.studentId,
            department: formData.department,
            yearOfStudy: formData.yearOfStudy,
            licenseNumber: formData.licenseNumber,
            specialization: formData.specialization,
            experience: formData.experience,
          };
          onLogin(formData.userType, signupData);
        }, 1000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeIcon = (type: UserType) => {
    switch (type) {
      case 'student': return <User className="w-4 h-4" />;
      case 'counselor': return <UserCheck className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
    }
  };

  const getUserTypeDescription = (type: UserType) => {
    switch (type) {
      case 'student': return 'Get the support you deserve - from AI companionship to caring counselors and peer connections';
      case 'counselor': return 'Join our mission to support students with empathy, expertise, and understanding';
      case 'admin': return 'Help us create the best possible experience for students and counselors alike';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MindCare
            </h1>
          </div>
          <p className="text-muted-foreground">
            We're so glad you're here. Let's take this step together.
          </p>
        </div>

        {/* Auth Form */}
        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur">
          <CardHeader className="space-y-4">
            <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'login' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-2">
                <CardTitle>Welcome Back, Friend</CardTitle>
                <CardDescription>
                  We're happy to see you again. Let's continue your wellness journey.
                </CardDescription>
              </TabsContent>

              <TabsContent value="signup" className="space-y-2">
                <CardTitle>Join Our Caring Community</CardTitle>
                <CardDescription>
                  We're excited to be part of your mental wellness journey. You're taking a brave and important step.
                </CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="userType">I am a...</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value: UserType) => updateFormData('userType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Student</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="counselor">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="w-4 h-4" />
                        <span>Counselor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Administrator</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {getUserTypeDescription(formData.userType)}
                </p>
              </div>

              {/* Sign Up Specific Fields */}
              {activeTab === 'signup' && (
                <>
                  {formData.userType === 'admin' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="institutionName">Institution Name</Label>
                        <Input
                          id="institutionName"
                          placeholder="Your institution's name"
                          value={formData.institutionName}
                          onChange={(e) => updateFormData('institutionName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Official Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your official email"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Full Name or Username */}
                      <div className="space-y-2">
                        <Label htmlFor="nameField">{formData.userType === 'student' ? 'Username' : 'Full Name'}</Label>
                        <Input
                          id="nameField"
                          type="text"
                          placeholder={formData.userType === 'student' ? 'Choose a username' : 'Enter your full name'}
                          value={formData.userType === 'student' ? formData.username : formData.fullName}
                          onChange={(e) => updateFormData(formData.userType === 'student' ? 'username' : 'fullName', e.target.value)}
                          required
                        />
                      </div>
                      {/* Email for Student/Counselor */}
                      <div className="space-y-2">
                        <Label htmlFor="email">{formData.userType === 'student' ? 'College/University Email' : 'Email'}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={formData.userType === 'student' ? 'Your college email' : 'Enter your email'}
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {/* Common Fields */}
              {activeTab === 'login' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password - Sign Up Only */}
              {activeTab === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {/* Role-specific fields for Sign Up */}
              {activeTab === 'signup' && (
                <>
                  {formData.userType === 'student' && (
                    <div className="space-y-4 p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-medium flex items-center space-x-2">
                        <School className="w-4 h-4" />
                        <span>Tell Us About Yourself</span>
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="college">College/University</Label>
                          <Input
                            id="college"
                            placeholder="Your institution"
                            value={formData.college}
                            onChange={(e) => updateFormData('college', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input
                            id="studentId"
                            placeholder="Your student ID"
                            value={formData.studentId}
                            onChange={(e) => updateFormData('studentId', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            placeholder="Your department"
                            value={formData.department}
                            onChange={(e) => updateFormData('department', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearOfStudy">Year of Study</Label>
                          <Select
                            value={formData.yearOfStudy}
                            onValueChange={(value) => updateFormData('yearOfStudy', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st Year</SelectItem>
                              <SelectItem value="2">2nd Year</SelectItem>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                              <SelectItem value="5">5th Year</SelectItem>
                              <SelectItem value="postgrad">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} />
                          <Label htmlFor="terms">
                            I agree to the Terms & Conditions and Privacy Policy.
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="disclaimer" checked={understoodDisclaimer} onCheckedChange={(checked) => setUnderstoodDisclaimer(checked as boolean)} />
                          <Label htmlFor="disclaimer">
                            I understand this platform provides support but is not a substitute for professional medical treatment.
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.userType === 'counselor' && (
                    <div className="space-y-4 p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-medium flex items-center space-x-2">
                        <UserCheck className="w-4 h-4" />
                        <span>Your Professional Background</span>
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">License Number</Label>
                          <Input
                            id="licenseNumber"
                            placeholder="Your professional license number"
                            value={formData.licenseNumber}
                            onChange={(e) => updateFormData('licenseNumber', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Select
                            value={formData.specialization}
                            onValueChange={(value) => updateFormData('specialization', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clinical">Clinical Psychology</SelectItem>
                              <SelectItem value="counseling">Counseling Psychology</SelectItem>
                              <SelectItem value="educational">Educational Psychology</SelectItem>
                              <SelectItem value="trauma">Trauma Therapy</SelectItem>
                              <SelectItem value="student-counseling">Student Counseling</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => updateFormData('experience', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">0-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="6-10">6-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="counselorAccessCode">Access Code</Label>
                          <Input
                            id="counselorAccessCode"
                            type="password"
                            placeholder="Enter the access code"
                            value={formData.counselorAccessCode}
                            onChange={(e) => updateFormData('counselorAccessCode', e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            This code is provided by the platform administrator.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Error/Success Messages */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>{activeTab === 'login' ? 'Welcome back...' : 'Setting up your space...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {getUserTypeIcon(formData.userType)}
                    <span>
                      {activeTab === 'login' ? 'Welcome Me Back' : 'Join MindCare'}
                    </span>
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                {activeTab === 'login' ? "New to MindCare? " : "Already part of our community? "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                >
                  {activeTab === 'login' ? 'Join us here' : 'Welcome back'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}