
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const kras = [
    { name: 'Increase User Engagement', description: 'Achieve a 15% increase in daily active users.', alignedGoals: 3, status: 'On Track' },
    { name: 'Reduce System Downtime', description: 'Maintain 99.99% uptime for all critical services.', alignedGoals: 5, status: 'At Risk' },
    { name: 'Improve Customer Satisfaction', description: 'Achieve a Net Promoter Score (NPS) of 50 or higher.', alignedGoals: 8, status: 'On Track' },
]

export default function KrasPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Key Result Areas (KRAs)</CardTitle>
          <CardDescription>Align individual goals with overarching company objectives.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New KRA</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KRA Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Aligned Goals</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kras.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.alignedGoals}</TableCell>
                <TableCell><Badge variant={item.status === 'On Track' ? 'secondary' : 'destructive'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Visual alignment mapping and KRA analytics are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
