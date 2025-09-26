
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const onboardingTasks = [
  { name: 'Elena Rodriguez', progress: 75, status: 'In Progress', manager: 'John Doe', avatar: PlaceHolderImages.find(p => p.id === 'employee-1') },
  { name: 'Marcus Chen', progress: 100, status: 'Completed', manager: 'Jane Smith', avatar: PlaceHolderImages.find(p => p.id === 'employee-2') },
  { name: 'Aisha Khan', progress: 25, status: 'Not Started', manager: 'John Doe', avatar: PlaceHolderImages.find(p => p.id === 'employee-3') },
];

export default function OnboardingPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Employee Onboarding</CardTitle>
          <CardDescription>Manage and track the onboarding process for new hires.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><SlidersHorizontal className="h-4 w-4"/>Manage Templates</Button>
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>Initiate Onboarding</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>New Hire</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboardingTasks.map((task) => (
              <TableRow key={task.name}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={task.avatar?.imageUrl} alt="Avatar" data-ai-hint={task.avatar?.imageHint} />
                      <AvatarFallback>{task.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{task.name}</div>
                  </div>
                </TableCell>
                <TableCell>{task.manager}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} className="w-32" />
                    <span>{task.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Automated workflows, document collection, and a self-service portal are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
