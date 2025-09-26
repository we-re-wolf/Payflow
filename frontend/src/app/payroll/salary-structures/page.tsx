
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const structures = [
    { name: 'Senior Engineer', components: 'Basic, HRA, DA, PF', employees: 15, status: 'Active' },
    { name: 'Sales Executive', components: 'Basic, HRA, Commission, PF', employees: 32, status: 'Active' },
    { name: 'Intern', components: 'Stipend', employees: 10, status: 'Draft' },
];

export default function SalaryStructuresPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Salary Structures</CardTitle>
          <CardDescription>Design and manage salary components and structures.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Structure</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Structure Name</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Assigned Employees</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {structures.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.components}</TableCell>
                <TableCell>{item.employees}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Advanced salary structure builder with version control is coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
