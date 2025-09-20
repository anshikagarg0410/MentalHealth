import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Shield,
  CheckCircle,
  MapPin,
  Star
} from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  experience: string;
  languages: string[];
  availability: string[];
  photo: string;
}

export function BookingSystem() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [formData, setFormData] = useState({
    preferredName: '',
    contactMethod: '',
    concerns: '',
    urgency: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialties: ['Anxiety', 'Academic Stress', 'Depression'],
      rating: 4.9,
      experience: '8 years',
      languages: ['English', 'Hindi', 'Marathi'],
      availability: ['Morning', 'Afternoon'],
      photo: 'https://images.unsplash.com/photo-1698373890183-ae3943362fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2VsaW5nJTIwdGhlcmFweSUyMHNlc3Npb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3ODY1MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialties: ['Relationship Issues', 'Social Anxiety', 'Self-esteem'],
      rating: 4.8,
      experience: '12 years',
      languages: ['English', 'Tamil', 'Telugu'],
      availability: ['Afternoon', 'Evening'],
      photo: 'https://images.unsplash.com/photo-1698373890183-ae3943362fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2VsaW5nJTIwdGhlcmFweSUyMHNlc3Npb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3ODY1MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      name: 'Dr. Anita Desai',
      specialties: ['Trauma', 'PTSD', 'Grief Counseling'],
      rating: 4.9,
      experience: '15 years',
      languages: ['English', 'Gujarati', 'Hindi'],
      availability: ['Morning', 'Evening'],
      photo: 'https://images.unsplash.com/photo-1698373890183-ae3943362fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2VsaW5nJTIwdGhlcmFweSUyMHNlc3Npb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3ODY1MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Appointment Booked Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your confidential counseling session has been scheduled. You'll receive a confirmation with session details.
            </p>
            <div className="bg-muted p-4 rounded-lg text-left mb-6">
              <h3 className="font-semibold mb-2">Appointment Details:</h3>
              <p><CalendarIcon className="inline h-4 w-4 mr-2" />Date: {selectedDate?.toDateString()}</p>
              <p><Clock className="inline h-4 w-4 mr-2" />Time: {selectedTime}</p>
              <p><User className="inline h-4 w-4 mr-2" />Counselor: {counselors.find(c => c.id === selectedCounselor)?.name}</p>
              <p><MapPin className="inline h-4 w-4 mr-2" />Location: Campus Counseling Center, Room 205</p>
            </div>
            <Button onClick={() => setIsSubmitted(false)}>
              Book Another Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Book Counseling Appointment</h1>
        <p className="text-muted-foreground">
          Find a time that works for you with one of our friendly counselors. It's a safe, private space just for you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Counselor Selection */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Choose Your Counselor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCounselor === counselor.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <div className="flex items-start gap-3">
                      <ImageWithFallback 
                        src={counselor.photo}
                        alt={counselor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{counselor.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{counselor.rating}</span>
                          <span className="text-sm text-muted-foreground">({counselor.experience})</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {counselor.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Languages: {counselor.languages.join(', ')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Availability: {counselor.availability.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bookingType">Session Type</Label>
                    <Select value={bookingType} onValueChange={setBookingType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Counseling</SelectItem>
                        <SelectItem value="group">Group Therapy</SelectItem>
                        <SelectItem value="crisis">Crisis Intervention</SelectItem>
                        <SelectItem value="academic">Academic Stress Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Within 2 weeks</SelectItem>
                        <SelectItem value="medium">Medium - Within 1 week</SelectItem>
                        <SelectItem value="high">High - Within 2-3 days</SelectItem>
                        <SelectItem value="urgent">Urgent - Same day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredName">Preferred Name (Optional)</Label>
                  <Input
                    id="preferredName"
                    value={formData.preferredName}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredName: e.target.value }))}
                    placeholder="How would you like to be addressed?"
                  />
                </div>

                <div>
                  <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                  <Select value={formData.contactMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="How should we contact you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Campus Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="portal">Student Portal Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="concerns">Brief Description of Concerns (Optional)</Label>
                  <Textarea
                    id="concerns"
                    value={formData.concerns}
                    onChange={(e) => setFormData(prev => ({ ...prev, concerns: e.target.value }))}
                    placeholder="This helps us prepare for your session. Keep it brief and general."
                    rows={3}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
          <Button 
            onClick={handleSubmit}
            className="w-full mt-4" 
            size="lg"
            disabled={!selectedDate || !selectedTime || !selectedCounselor || !bookingType}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        {/* Date and Time Selection */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Available Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="justify-center"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Confidentiality Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>✓ All sessions are strictly confidential</p>
              <p>✓ Your information is protected by privacy laws</p>
              <p>✓ You can request anonymous sessions</p>
              <p>✓ Cancel or reschedule anytime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}