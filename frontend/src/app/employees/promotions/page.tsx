
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const movements = [
    { employee: 'Jackson Lee', type: 'Promotion', from: 'Software Engineer', to: 'Senior Engineer', status: 'Completed', effectiveDate: '2024-07-01' },
    { employee: 'Isabella Nguyen', type: 'Transfer', from: 'Design (Austin)', to: 'Design (SF)', status: 'Pending Approval', effectiveDate: '2024-08-15' },
    { employee: 'Liam Johnson', type: 'Promotion', from: 'Analyst', to: 'Senior Analyst', status: 'Approved', effectiveDate: '2024-09-01' },
]

export default function PromotionsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Promotions & Transfers</CardTitle>
          <CardDescription>Manage and track all internal employee movements.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>Initiate Movement</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Movement Type</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Effective Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((move) => (
              <TableRow key={move.employee}>
                <TableCell className="font-medium">{move.employee}</TableCell>
                <TableCell>{move.type}</TableCell>
                <TableCell>From: {move.from} <br/> To: {move.to}</TableCell>
                <TableCell><Badge variant={move.status === 'Completed' ? 'default' : move.status === 'Approved' ? 'secondary' : 'outline'}>{move.status}</Badge></TableCell>
                <TableCell>{move.effectiveDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Full workflow management and bulk processing features are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
