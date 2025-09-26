import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileCheck, Upload } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const declarations = [
    { employee: 'Olivia Martin', status: 'Approved', declared: '$8,500', proofs: 'Complete' },
    { employee: 'Jackson Lee', status: 'Pending Approval', declared: '$10,200', proofs: 'Partial' },
    { employee: 'Isabella Nguyen', status: 'Draft', declared: '$0', proofs: 'None' },
];

export default function DeclarationsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Tax Declarations & Proofs</CardTitle>
          <CardDescription>Manage and approve employee tax declarations and submitted proofs.</CardDescription>
        </div>
         <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Upload className="h-4 w-4"/>Bulk Upload</Button>
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>New Declaration</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Declared Amount</TableHead>
              <TableHead>Proof Status</TableHead>
              <TableHead>Declaration Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {declarations.map((item) => (
              <TableRow key={item.employee}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.declared}</TableCell>
                <TableCell><Badge variant={item.proofs === 'Complete' ? 'secondary' : 'outline'}>{item.proofs}</Badge></TableCell>
                <TableCell><Badge variant={item.status === 'Approved' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Digital proof submission portal and automated validation are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
