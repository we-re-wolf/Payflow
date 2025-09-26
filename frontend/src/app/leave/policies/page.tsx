
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const policies = [
  { name: 'Annual Leave', type: 'Accrual', accrualRate: '2 days/month', carryForward: 'Max 10 days', status: 'Active' },
  { name: 'Sick Leave', type: 'Fixed', accrualRate: '12 days/year', carryForward: 'No', status: 'Active' },
  { name: 'Maternity Leave', type: 'Fixed', accrualRate: '26 weeks', carryForward: 'N/A', status: 'Active' },
  { name: 'Compensatory Off', type: 'Manual', accrualRate: 'As per OT', carryForward: 'Expires in 30 days', status: 'Draft' },
];

export default function LeavePoliciesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Configurable Leave Policies</CardTitle>
          <CardDescription>Design and manage all leave policies and rules.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>Create Policy</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.name}>
                <TableCell className="font-medium">{policy.name}</TableCell>
                <TableCell>{policy.type}</TableCell>
                <TableCell>Accrual: {policy.accrualRate} <br/> Carry Forward: {policy.carryForward}</TableCell>
                <TableCell><Badge variant={policy.status === 'Active' ? 'secondary' : 'outline'}>{policy.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Advanced policy builder and rule engine are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
