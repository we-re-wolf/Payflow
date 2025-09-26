
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const advances = [
    { id: 'ADV-001', employee: 'Olivia Martin', amount: '$500.00', purpose: 'Business Travel', status: 'Approved' },
    { id: 'ADV-002', employee: 'Jackson Lee', amount: '$200.00', purpose: 'Client Meeting', status: 'Pending' },
    { id: 'ADV-003', employee: 'Isabella Nguyen', amount: '$1,000.00', purpose: 'Conference', status: 'Disbursed' },
]

export default function AdvancesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Employee Advances</CardTitle>
          <CardDescription>Manage and track all employee advance requests.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Advance Request</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {advances.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.employee}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.purpose}</TableCell>
                <TableCell><Badge variant={item.status === 'Approved' ? 'default' : item.status === 'Pending' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Automated EMI calculation and payroll integration are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
