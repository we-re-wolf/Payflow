
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Send, Filter, Eye } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const payslips = [
    { employee: 'Olivia Martin', id: 'PS-07-001', month: 'July 2024', status: 'Generated', amount: '$4,800.00' },
    { employee: 'Jackson Lee', id: 'PS-07-002', month: 'July 2024', status: 'Published', amount: '$5,200.00' },
    { employee: 'Isabella Nguyen', id: 'PS-07-003', month: 'July 2024', status: 'Generated', amount: '$4,500.00' },
];

export default function PayslipsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Manage Payslips</CardTitle>
          <CardDescription>Generate, publish, and manage employee payslips.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2"/>Filter</Button>
            <Button size="sm" className="gap-1"><Send className="h-4 w-4"/>Publish All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Payslip ID</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Net Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payslips.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.month}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell><Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Customizable payslip templates and password protection are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
