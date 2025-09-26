
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function LeaveCalendarPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Leave Calendar</CardTitle>
          <CardDescription>Visualize team and company-wide leave schedules.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4"/></Button>
            <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4"/></Button>
            <Button variant="outline" size="sm" className="gap-1"><CalendarIcon className="h-4 w-4"/>Today</Button>
            <Button variant="outline" size="sm" className="gap-1"><Users className="h-4 w-4"/>Team View</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_280px]">
            <Calendar
              mode="multiple"
              selected={[new Date(2024, 7, 5), new Date(2024, 7, 6), new Date(2024, 7, 7)]}
              className="rounded-md border p-0"
            />
            <div className="space-y-4">
                <h3 className="font-semibold">On Leave - Aug 5, 2024</h3>
                <div className="flex items-center gap-4 p-3 border rounded-lg bg-secondary/50">
                    <User className="h-5 w-5 text-muted-foreground"/>
                    <div>
                        <p className="text-sm font-medium">Liam Johnson</p>
                        <p className="text-xs text-muted-foreground">Annual Leave</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg bg-secondary/50">
                    <User className="h-5 w-5 text-muted-foreground"/>
                    <div>
                        <p className="text-sm font-medium">Olivia Martin</p>
                        <p className="text-xs text-muted-foreground">Work From Home</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Interactive calendar with conflict detection is coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
