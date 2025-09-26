import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const feedback = [
    {interviewer: 'Alice', rating: 4, comment: 'Strong technical skills, good communicator.', avatar: '/placeholder.svg'},
    {interviewer: 'Bob', rating: 5, comment: 'Excellent problem-solving ability. Great team fit.', avatar: '/placeholder.svg'},
];

export default function CaptureFeedbackPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Capture & Analyze Feedback</CardTitle>
          <CardDescription>
            Collect structured feedback and analyze candidate performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Feedback for Marcus Chen (Software Engineer)</h3>
              <div className="space-y-4">
                  {feedback.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                          <Avatar>
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>{item.interviewer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-semibold">{item.interviewer}</p>
                                <div className="flex items-center gap-1">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted stroke-muted-foreground'}`}/>
                                    ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{item.comment}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Structured feedback forms and decision analytics are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
