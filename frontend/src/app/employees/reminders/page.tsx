
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake, CalendarClock, PartyPopper } from "lucide-react";

const upcomingEvents = [
    { type: 'Birthday', name: 'Olivia Martin', date: 'August 5' },
    { type: 'Anniversary', name: 'Jackson Lee (3 years)', date: 'August 12' },
    { type: 'Probation End', name: 'Aisha Khan', date: 'September 1' },
]

export default function RemindersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automated Employee Reminders</CardTitle>
        <CardDescription>Stay on top of important employee dates and milestones.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Upcoming Events</h3>
            {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="rounded-md bg-muted p-2">
                        {event.type === 'Birthday' && <Cake className="h-6 w-6 text-muted-foreground"/>}
                        {event.type === 'Anniversary' && <PartyPopper className="h-6 w-6 text-muted-foreground"/>}
                        {event.type === 'Probation End' && <CalendarClock className="h-6 w-6 text-muted-foreground"/>}
                    </div>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.type}</p>
                    </div>
                    <div className="ml-auto font-medium">{event.date}</div>
                </div>
            ))}
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Custom reminders and calendar integration features are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
