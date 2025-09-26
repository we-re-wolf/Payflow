
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, GitPullRequest } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const workflows = [
    { name: 'Standard Expense', steps: 'Manager > HR > Finance', threshold: '< $1,000', status: 'Active' },
    { name: 'High Value Expense', steps: 'Manager > Dept. Head > CFO', threshold: '> $1,000', status: 'Active' },
    { name: 'Travel Expense', steps: 'Manager > Travel Desk > Finance', threshold: 'Any', status: 'Draft' },
]

export default function WorkflowsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Approval Workflows</CardTitle>
          <CardDescription>Configure multi-level approval chains for expense claims.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Workflow</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow Name</TableHead>
              <TableHead>Approval Steps</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.steps}</TableCell>
                <TableCell>{item.threshold}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Visual workflow builder and dynamic routing are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
