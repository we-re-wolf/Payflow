
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const loans = [
    { id: 'LN-001', employee: 'Olivia Martin', amount: '$5,000.00', emi: '$425.00', status: 'Active' },
    { id: 'LN-002', employee: 'Jackson Lee', amount: '$10,000.00', emi: '$850.00', status: 'Pending Approval' },
    { id: 'LN-003', employee: 'Isabella Nguyen', amount: '$2,000.00', emi: '$200.00', status: 'Closed' },
];

export default function LoansPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Employee Loans</CardTitle>
          <CardDescription>Manage and track employee loans and deductions.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Loan Request</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Monthly EMI</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.employee}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.emi}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'default' : item.status === 'Closed' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Configurable loan policies and automated EMI calculations are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
