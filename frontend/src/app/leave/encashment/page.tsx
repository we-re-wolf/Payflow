
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requests = [
    { id: 'LE-001', employee: 'Jackson Lee', days: 10, amount: '$1,500.00', status: 'Approved' },
    { id: 'LE-002', employee: 'Sophia Brown', days: 5, amount: '$650.00', status: 'Pending' },
    { id: 'LE-003', employee: 'Noah Garcia', days: 8, amount: '$1,100.00', status: 'Paid' },
]

export default function LeaveEncashmentPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Leave Encashment</CardTitle>
          <CardDescription>Manage and process employee leave encashment requests.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Request</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg bg-secondary/50 border mb-6 text-center">
            <p className="text-sm text-muted-foreground">Your current encashable leave balance is <strong className="text-primary">15 days</strong>.</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Days to Encash</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.employee}</TableCell>
                <TableCell>{item.days}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell><Badge variant={item.status === 'Paid' ? 'default' : item.status === 'Pending' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Automated calculator and payroll integration are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
