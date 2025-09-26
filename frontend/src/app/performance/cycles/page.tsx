
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const cycles = [
    { name: 'Annual Review 2024', period: 'Jan 1, 2024 - Dec 31, 2024', progress: 75, status: 'In Progress' },
    { name: 'Q3 Check-in', period: 'Jul 1, 2024 - Sep 30, 2024', progress: 25, status: 'Active' },
    { name: 'H1 Engineering Review', period: 'Jan 1, 2024 - Jun 30, 2024', progress: 100, status: 'Completed' },
]

export default function AppraisalCyclesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Appraisal Cycles</CardTitle>
          <CardDescription>Manage and monitor performance review cycles.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Cycle</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cycle Name</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cycles.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.period}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={item.progress} className="w-32"/>
                        <span>{item.progress}%</span>
                    </div>
                </TableCell>
                <TableCell><Badge variant={item.status === 'Completed' ? 'default' : item.status === 'Active' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Real-time progress dashboards and automated reminders are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
