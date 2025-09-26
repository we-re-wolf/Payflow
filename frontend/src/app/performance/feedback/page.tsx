
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const feedback = [
    { reviewer: 'Olivia Martin', role: 'Manager', rating: 5, comment: 'Exceeded all expectations on the project.', avatar: PlaceHolderImages.find(p => p.id === 'employee-1') },
    { reviewer: 'Jackson Lee', role: 'Peer', rating: 4, comment: 'Great collaborator, always willing to help.', avatar: PlaceHolderImages.find(p => p.id === 'employee-2') },
    { reviewer: 'Anonymous', role: 'Subordinate', rating: 4, comment: 'Supportive leader, but could improve delegation.', avatar: null },
]

export default function PerformanceFeedbackPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Performance Feedback</CardTitle>
          <CardDescription>Capture and analyze 360-degree performance feedback.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>Request Feedback</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {feedback.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <Avatar>
                        {item.avatar && <AvatarImage src={item.avatar.imageUrl} data-ai-hint={item.avatar.imageHint} />}
                        <AvatarFallback>{item.reviewer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">{item.reviewer}</p>
                                <p className="text-xs text-muted-foreground">{item.role}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                {Array.from({length: 5}).map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted stroke-muted-foreground'}`}/>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{item.comment}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Continuous feedback and sentiment analysis are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
