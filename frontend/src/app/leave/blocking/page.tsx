
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const blockedPeriods = [
    { name: 'Year-End Closing', dates: 'Dec 20, 2024 - Jan 5, 2025', scope: 'Finance Dept', status: 'Active' },
    { name: 'Product Launch Week', dates: 'Sep 1 - Sep 7, 2024', scope: 'All Company', status: 'Active' },
    { name: 'Q3 Code Freeze', dates: 'Aug 15 - Aug 20, 2024', scope: 'Engineering', status: 'Expired' },
]

export default function LeaveBlockingPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Block Leave Requests</CardTitle>
          <CardDescription>Prevent leave requests during critical business periods.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Block Period</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period Name</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blockedPeriods.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.dates}</TableCell>
                <TableCell>{item.scope}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'destructive' : 'secondary'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Emergency overrides and capacity management are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
