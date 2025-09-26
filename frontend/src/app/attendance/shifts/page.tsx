
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const shifts = [
  { name: 'Morning Shift', time: '09:00 AM - 05:00 PM', gracePeriod: '15 mins', type: 'Fixed' },
  { name: 'Afternoon Shift', time: '01:00 PM - 09:00 PM', gracePeriod: '10 mins', type: 'Fixed' },
  { name: 'Night Shift', time: '05:00 PM - 01:00 AM', gracePeriod: '15 mins', type: 'Rotating' },
  { name: 'Flexi Shift', time: '8 hours daily', gracePeriod: 'N/A', type: 'Flexible' },
];

export default function ShiftsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Configure Shifts</CardTitle>
          <CardDescription>Manage shift patterns, timings, and grace periods.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><SlidersHorizontal className="h-4 w-4"/>Manage Templates</Button>
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>Create Shift</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shift Name</TableHead>
              <TableHead>Timings</TableHead>
              <TableHead>Grace Period</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.name}>
                <TableCell className="font-medium">{shift.name}</TableCell>
                <TableCell>{shift.time}</TableCell>
                <TableCell>{shift.gracePeriod}</TableCell>
                <TableCell><Badge variant={shift.type === 'Fixed' ? 'secondary' : 'outline'}>{shift.type}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Auto-attendance settings and shift costing are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
