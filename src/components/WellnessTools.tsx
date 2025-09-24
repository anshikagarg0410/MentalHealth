import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Book, Edit, Wind } from 'lucide-react';

export function WellnessTools() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl mb-2 text-primary">Wellness Tools</h1>
        <p className="text-muted-foreground"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
          Engage in activities to help you reflect, relax, and express yourself.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Book className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>Journaling</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              Write down your thoughts and feelings to understand them better.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>Drawing Pad</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              Express yourself visually with a digital drawing pad.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Wind className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg"style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>Breathing Techniques</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Raleway', 'sans-serif'" , fontWeight: 500}}>
              Follow guided breathing exercises to calm your mind and body.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}