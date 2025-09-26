import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const benefitPlans = [
    { name: 'Standard FBP', components: 'Fuel, Communication, Meals', employees: 120, status: 'Active' },
    { name: 'Management FBP', components: 'Driver Salary, Books, LTA', employees: 32, status: 'Active' },
    { name: 'Custom FBP for Sales', components: 'Travel, Client Entertainment', employees: 10, status: 'Draft' },
];

export default function FlexibleBenefitsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Flexible Benefits Plan (FBP)</CardTitle>
          <CardDescription>Manage and administer flexible benefit plans for employees.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New FBP Plan</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Assigned Employees</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {benefitPlans.map((item) => (
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
            <p>Employee self-service portal for FBP selection and real-time tax impact are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
