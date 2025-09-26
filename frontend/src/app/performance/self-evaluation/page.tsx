
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, FilePenLine } from "lucide-react";

export default function SelfEvaluationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Self-Evaluation (Q3 2024)</CardTitle>
        <CardDescription>Reflect on your performance and contributions for the current cycle.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
            <Label htmlFor="accomplishments">Key Accomplishments</Label>
            <Textarea id="accomplishments" placeholder="Describe your major achievements this quarter..."/>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="challenges">Challenges Faced</Label>
            <Textarea id="challenges" placeholder="What were the biggest obstacles you encountered?"/>
        </div>
        <div className="grid gap-2">
            <Label>Competency: Teamwork</Label>
            <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Your Rating:</p>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 cursor-pointer ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-muted stroke-muted-foreground'}`}/>
                    ))}
                </div>
            </div>
            <Textarea placeholder="Provide specific examples of your collaboration..."/>
        </div>
        <div className="flex justify-end gap-2">
             <Button variant="outline">Save as Draft</Button>
             <Button>
                <FilePenLine className="mr-2 h-4 w-4"/>
                Submit Evaluation
            </Button>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Development planning and goal alignment tools are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
