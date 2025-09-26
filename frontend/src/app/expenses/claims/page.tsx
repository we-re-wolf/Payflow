
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Upload } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const claims = [
    { id: 'EXP-001', date: '2024-07-20', category: 'Travel', amount: '$150.00', status: 'Approved' },
    { id: 'EXP-002', date: '2024-07-22', category: 'Meals', amount: '$75.50', status: 'Pending' },
    { id: 'EXP-003', date: '2024-07-18', category: 'Accommodation', amount: '$320.00', status: 'Rejected' },
]

export default function ClaimsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Expense Claims</CardTitle>
          <CardDescription>Submit, track, and manage all your expense claims.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Upload className="h-4 w-4"/>Bulk Upload</Button>
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>New Claim</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell><Badge variant={item.status === 'Approved' ? 'default' : item.status === 'Pending' ? 'secondary' : 'destructive'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Intelligent receipt capture and smart suggestions are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
