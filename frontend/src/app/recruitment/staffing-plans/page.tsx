import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Copy, DollarSign } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const plans = [
    { name: 'Q4 2023 Expansion', status: 'Active', budget: '$500,000', headCount: 10 },
    { name: 'Engineering Backfill', status: 'Draft', budget: '$150,000', headCount: 1 },
    { name: '2024 New Grad Program', status: 'Completed', budget: '$800,000', headCount: 15 },
]

export default function StaffingPlansPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Create Staffing Plans</CardTitle>
            <CardDescription>
              Plan your future hiring with templates and cost forecasting.
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href="#"><Copy className="h-4 w-4 mr-1"/>Use Template</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="#"><FilePlus className="h-4 w-4 mr-1"/>New Plan</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
           <Table>
               <TableHeader>
                   <TableRow>
                       <TableHead>Plan Name</TableHead>
                       <TableHead>Status</TableHead>
                       <TableHead>Budget</TableHead>
                       <TableHead>Headcount</TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {plans.map(plan => (
                       <TableRow key={plan.name}>
                           <TableCell className="font-medium">{plan.name}</TableCell>
                           <TableCell><Badge variant={plan.status === 'Active' ? 'default' : 'secondary'}>{plan.status}</Badge></TableCell>
                           <TableCell>{plan.budget}</TableCell>
                           <TableCell>{plan.headCount}</TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
           <div className="mt-6 text-center text-muted-foreground">
            <p>Cost forecasting and budget tracking features are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
