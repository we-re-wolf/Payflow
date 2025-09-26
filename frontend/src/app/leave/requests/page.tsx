
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requests = [
    { id: 'LR-001', employee: 'Jackson Lee', type: 'Annual Leave', dates: 'Aug 5 - Aug 10', reason: 'Family vacation', status: 'Pending' },
    { id: 'LR-002', employee: 'Sophia Brown', type: 'Sick Leave', dates: 'Jul 28', reason: 'Fever', status: 'Approved' },
    { id: 'LR-003', employee: 'Noah Garcia', type: 'Work From Home', dates: 'Jul 29', reason: 'Personal', status: 'Rejected' },
]

export default function LeaveRequestsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Apply and Approve Leaves</CardTitle>
          <CardDescription>Manage and process all employee leave requests.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2"/>Filter</Button>
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>New Request</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.employee}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.dates}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell><Badge variant={item.status === 'Approved' ? 'default' : item.status === 'Pending' ? 'secondary' : 'destructive'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Manager dashboard for bulk approvals is coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
