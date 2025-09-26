
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const rosterData = [
  { day: 'Mon, Jul 22', morning: 'Team A', afternoon: 'Team B', night: 'Team C' },
  { day: 'Tue, Jul 23', morning: 'Team A', afternoon: 'Team B', night: 'Team C' },
  { day: 'Wed, Jul 24', morning: 'Team C', afternoon: 'Team A', night: 'Team B' },
  { day: 'Thu, Jul 25', morning: 'Team C', afternoon: 'Team A', night: 'Team B' },
  { day: 'Fri, Jul 26', morning: 'Team B', afternoon: 'Team C', night: 'Team A' },
  { day: 'Sat, Jul 27', morning: 'Team B', afternoon: 'Weekend Off', night: 'Weekend Off' },
  { day: 'Sun, Jul 28', morning: 'Team A', afternoon: 'Weekend Off', night: 'Weekend Off' },
];

export default function RostersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Manage Rosters</CardTitle>
          <CardDescription>Plan and visualize shift assignments for your teams.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Calendar className="h-4 w-4"/>Change Week</Button>
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>Create Roster</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Morning (9 AM - 5 PM)</TableHead>
              <TableHead>Afternoon (1 PM - 9 PM)</TableHead>
              <TableHead>Night (5 PM - 1 AM)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rosterData.map((row) => (
              <TableRow key={row.day}>
                <TableCell className="font-medium">{row.day}</TableCell>
                <TableCell><Badge variant="secondary">{row.morning}</Badge></TableCell>
                <TableCell><Badge variant={row.afternoon.includes('Off') ? 'outline' : 'secondary'}>{row.afternoon}</Badge></TableCell>
                <TableCell><Badge variant={row.night.includes('Off') ? 'outline' : 'secondary'}>{row.night}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Drag-and-drop planning and conflict detection are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
