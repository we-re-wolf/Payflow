
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const attendanceLogs = [
    { employee: 'Olivia Martin', date: '2024-07-26', status: 'Present', workingHours: '8h 15m', overtime: '15m' },
    { employee: 'Jackson Lee', date: '2024-07-26', status: 'Late Arrival', workingHours: '7h 45m', overtime: '0m' },
    { employee: 'Isabella Nguyen', date: '2024-07-26', status: 'On Leave', workingHours: 'N/A', overtime: 'N/A' },
]

export default function AutoAttendancePage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Auto-Attendance Sync</CardTitle>
          <CardDescription>Intelligent attendance calculation and synchronization with payroll.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Zap className="h-4 w-4"/>Run Payroll Sync</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payroll Exceptions</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Unresolved attendance issues</p>
                </CardContent>
            </Card>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Working Hours</TableHead>
              <TableHead>Overtime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceLogs.map(item => (
              <TableRow key={item.employee}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell><Badge variant={item.status === 'Present' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
                <TableCell>{item.workingHours}</TableCell>
                <TableCell>{item.overtime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Full compliance monitoring and exception reporting are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
