import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, User, CalendarClock, BookOpenCheck } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const onLeaveToday = [
    { name: 'Isabella Nguyen', type: 'Sick Leave', department: 'Design' },
    { name: 'William Kim', type: 'Annual Leave', department: 'Engineering' },
    { name: 'Sophia Brown', type: 'Work From Home', department: 'Product' },
]

export default function LeaveDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">out of 152 employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 new today</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Holidays</CardTitle>
              <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">in the next 30 days</p>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                <CardTitle>Employees on Leave Today</CardTitle>
                <CardDescription>
                    Live status of employees who are out of office.
                </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/leave/calendar">
                        View Calendar
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Department</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {onLeaveToday.map(emp => (
                            <TableRow key={emp.name}>
                                <TableCell className="font-medium">{emp.name}</TableCell>
                                <TableCell>
                                    <Badge variant={emp.type === 'Sick Leave' ? 'destructive' : 'secondary'}>{emp.type}</Badge>
                                </TableCell>
                                <TableCell>{emp.department}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 <div className="mt-6 text-center text-muted-foreground">
                    <p>Real-time leave dashboards and custom reports are coming soon.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
