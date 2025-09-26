
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const interviews = [
    { employee: 'Noah Garcia', exitDate: '2024-06-30', status: 'Completed', primaryReason: 'Better Opportunity' },
    { employee: 'Sophia Brown', exitDate: '2024-07-15', status: 'Scheduled', primaryReason: 'N/A' },
    { employee: 'Liam Johnson', exitDate: '2024-07-31', status: 'Pending', primaryReason: 'N/A' },
]

export default function ExitInterviewsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Exit Interviews</CardTitle>
          <CardDescription>Capture and analyze feedback from departing employees.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>Schedule Interview</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Exit Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Primary Reason for Exit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.map(item => (
              <TableRow key={item.employee}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.exitDate}</TableCell>
                <TableCell><Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                <TableCell>{item.primaryReason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Customizable questionnaires and sentiment analysis are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
