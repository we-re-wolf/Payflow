
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const grievances = [
    { id: 'GRV-001', type: 'Workplace Safety', status: 'In Review', submitted: '2024-07-15', reporter: 'Anonymous' },
    { id: 'GRV-002', type: 'Harassment', status: 'Resolved', submitted: '2024-06-20', reporter: 'Confidential' },
    { id: 'GRV-003', type: 'Policy Violation', status: 'Pending', submitted: '2024-07-20', reporter: 'Anonymous' },
]

export default function GrievancesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Grievance Management</CardTitle>
          <CardDescription>Manage and track employee grievances securely and confidentially.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>Submit Grievance</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead>Reporter</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grievances.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell><Badge variant={item.status === 'Resolved' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                <TableCell>{item.submitted}</TableCell>
                <TableCell>{item.reporter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Full case management, secure communication, and analytics are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
