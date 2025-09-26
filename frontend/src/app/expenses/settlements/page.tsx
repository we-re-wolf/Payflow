
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandCoins } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const settlements = [
    { claimId: 'EXP-004', advanceId: 'ADV-001', settledAmount: '$350.00', refund: '$150.00', status: 'Completed' },
    { claimId: 'EXP-005', advanceId: 'ADV-002', settledAmount: '$200.00', refund: '$0.00', status: 'Pending Approval' },
    { claimId: 'EXP-006', advanceId: 'ADV-003', settledAmount: '$800.00', refund: '$200.00', status: 'In Process' },
]

export default function SettlementsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Settle Advances Against Expenses</CardTitle>
          <CardDescription>Reconcile expense claims with employee advances automatically.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Advance ID</TableHead>
              <TableHead>Settled Amount</TableHead>
              <TableHead>Refund to Employee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map(item => (
              <TableRow key={item.claimId}>
                <TableCell className="font-medium">{item.claimId}</TableCell>
                <TableCell>{item.advanceId}</TableCell>
                <TableCell>{item.settledAmount}</TableCell>
                <TableCell>{item.refund}</TableCell>
                <TableCell><Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Intelligent matching and automated reconciliation are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
