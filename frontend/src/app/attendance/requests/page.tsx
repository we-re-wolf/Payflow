
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requests = [
    { employee: 'Noah Garcia', currentShift: 'Morning (9-5)', requestedShift: 'Night (5-1)', reason: 'Personal', status: 'Pending' },
    { employee: 'Sophia Brown', currentShift: 'Morning (9-5)', requestedShift: 'Afternoon (1-9)', reason: 'Family', status: 'Approved' },
    { employee: 'Liam Johnson', currentShift: 'Night (5-1)', requestedShift: 'Morning (9-5)', reason: 'Health', status: 'Rejected' },
]

export default function ShiftRequestsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Shift Requests</CardTitle>
          <CardDescription>Manage and approve employee shift change requests.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Request</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Current Shift</TableHead>
              <TableHead>Requested Shift</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(item => (
              <TableRow key={item.employee}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.currentShift}</TableCell>
                <TableCell>{item.requestedShift}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell><Badge variant={item.status === 'Approved' ? 'default' : item.status === 'Pending' ? 'secondary' : 'destructive'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Self-service portal and calendar view are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
