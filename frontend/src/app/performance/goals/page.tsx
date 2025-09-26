
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const goals = [
    { name: 'Launch New Feature', progress: 80, owner: 'Olivia Martin', timeframe: 'Q3 2024' },
    { name: 'Refactor Authentication Service', progress: 45, owner: 'Jackson Lee', timeframe: 'Q3 2024' },
    { name: 'Improve Onboarding Flow', progress: 100, owner: 'Isabella Nguyen', timeframe: 'Q2 2024' },
]

export default function GoalTrackingPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Goal Tracking</CardTitle>
          <CardDescription>Set, track, and manage individual and team goals.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Goal</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Goal Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Timeframe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={item.progress} className="w-32"/>
                        <span>{item.progress}%</span>
                    </div>
                </TableCell>
                <TableCell>{item.timeframe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Cascading goals and collaborative goal setting are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
