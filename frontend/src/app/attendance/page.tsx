import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, UserCheck, UserX, CalendarClock } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const todayAttendance = [
    { name: 'Olivia Martin', status: 'Present', checkIn: '09:02 AM' },
    { name: 'Jackson Lee', status: 'Late', checkIn: '09:17 AM' },
    { name: 'Isabella Nguyen', status: 'On Leave', checkIn: '-' },
    { name: 'William Kim', status: 'Absent', checkIn: '-' },
]

export default function AttendanceDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145 / 152</div>
              <p className="text-xs text-muted-foreground">95% attendance rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 unplanned leaves</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Shift changes & regularizations</p>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>
                    Live attendance status for today.
                </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                        View Reports
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Check-in Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todayAttendance.map(emp => (
                            <TableRow key={emp.name}>
                                <TableCell className="font-medium">{emp.name}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        emp.status === 'Present' ? 'secondary' :
                                        emp.status === 'Late' ? 'outline' : 'destructive'
                                    }>{emp.status}</Badge>
                                </TableCell>
                                <TableCell>{emp.checkIn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 <div className="mt-6 text-center text-muted-foreground">
                    <p>Real-time updates and detailed reports are coming soon.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
