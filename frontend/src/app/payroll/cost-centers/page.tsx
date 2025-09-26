
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Library } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const costCenters = [
    { name: 'Engineering', code: 'ENG', allocated: '$150,000.00', budget: '$160,000.00', variance: '-6.25%' },
    { name: 'Sales', code: 'SAL', allocated: '$80,000.00', budget: '$75,000.00', variance: '+6.67%' },
    { name: 'Marketing', code: 'MKT', allocated: '$45,000.00', budget: '$45,000.00', variance: '0.00%' },
]

export default function CostCentersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Cost Center Management</CardTitle>
          <CardDescription>Book expenses and salaries against different cost centers.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Cost Center</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cost Center Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Allocated Amount</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costCenters.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.allocated}</TableCell>
                <TableCell>{item.budget}</TableCell>
                <TableCell className={item.variance.startsWith('+') ? 'text-destructive' : 'text-green-500'}>
                    {item.variance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Project-based allocation and dynamic rules are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
