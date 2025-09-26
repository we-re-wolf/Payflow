import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, PlusCircle, Video } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const interviews = [
    { candidate: 'Marcus Chen', role: 'Product Manager', date: 'Oct 30, 2023 @ 2:00 PM', type: 'Technical', panel: 'Alice, Bob' },
    { candidate: 'Aisha Khan', role: 'UX Designer', date: 'Nov 1, 2023 @ 11:00 AM', type: 'Final', panel: 'Jane, Charlie' },
];

export default function ScheduleInterviewsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Schedule Interviews</CardTitle>
            <CardDescription>
              Coordinate interview schedules with candidates and your team.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              <PlusCircle className="h-4 w-4" />
              Schedule Interview
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
              {interviews.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="grid gap-1">
                          <p className="font-semibold">{interview.candidate} - <span className="font-normal text-muted-foreground">{interview.role}</span></p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4"/> {interview.date}</p>
                          <p className="text-sm text-muted-foreground">Panel: {interview.panel}</p>
                      </div>
                      <div className="flex items-center gap-2">
                          <Badge variant="outline">{interview.type}</Badge>
                          <Button size="sm" variant="outline" className="gap-1">
                              <Video className="h-4 w-4" />
                              Join Call
                          </Button>
                      </div>
                  </div>
              ))}
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Calendar sync and automated scheduling features are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
