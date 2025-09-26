
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requests = [
    { id: 'REG-001', employee: 'Jackson Lee', date: '2024-07-25', reason: 'Forgot to check-out', status: 'Pending' },
    { id: 'REG-002', employee: 'Sophia Brown', date: '2024-07-22', reason: 'Client meeting', status: 'Approved' },
    { id: 'REG-003', employee: 'Noah Garcia', date: '2024-07-20', reason: 'Power outage', status: 'Rejected' },
]

export default function RegularizationPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Attendance Regularization</CardTitle>
          <CardDescription>Manage and approve employee attendance correction requests.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Request</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.employee}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell><Badge variant={item.status === 'Approved' ? 'default' : item.status === 'Pending' ? 'secondary' : 'destructive'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Bulk regularization and audit trails are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
