
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const settlements = [
    { employee: 'Noah Garcia', exitDate: '2024-06-30', status: 'Paid', settlementAmount: '$5,200.00' },
    { employee: 'Sophia Brown', exitDate: '2024-07-15', status: 'Pending Approval', settlementAmount: '$4,800.00' },
    { employee: 'Liam Johnson', exitDate: '2024-07-31', status: 'In Process', settlementAmount: '$6,100.00' },
]

export default function SettlementsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Full and Final Settlements</CardTitle>
          <CardDescription>Manage and process final settlements for exiting employees.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>Initiate Settlement</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Exit Date</TableHead>
              <TableHead>Settlement Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map(item => (
              <TableRow key={item.employee}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.exitDate}</TableCell>
                <TableCell>{item.settlementAmount}</TableCell>
                <TableCell><Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Comprehensive settlement calculator and payment integration are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
