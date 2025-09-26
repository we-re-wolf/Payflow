import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, FileCheck } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requisitions = [
    { id: 'REQ-001', title: 'Senior Backend Engineer', department: 'Technology', status: 'Approved', date: '2023-10-26' },
    { id: 'REQ-002', title: 'Marketing Lead', department: 'Marketing', status: 'Pending', date: '2023-10-28' },
    { id: 'REQ-003', title: 'HR Business Partner', department: 'Human Resources', status: 'Rejected', date: '2023-10-25' },
];

export default function HiringNeedsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Headcount</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">vs. 10 last quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Requisitions</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 new this week</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 successful hires</p>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                <CardTitle>Job Requisitions</CardTitle>
                <CardDescription>
                    Create and track requests for new hires.
                </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                    <PlusCircle className="h-4 w-4" />
                    New Requisition
                </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requisitions.map(req => (
                            <TableRow key={req.id}>
                                <TableCell>{req.id}</TableCell>
                                <TableCell className="font-medium">{req.title}</TableCell>
                                <TableCell>{req.department}</TableCell>
                                <TableCell><Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Pending' ? 'secondary' : 'destructive'}>{req.status}</Badge></TableCell>
                                <TableCell>{req.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 <div className="mt-6 text-center text-muted-foreground">
                    <p>Full job requisition, referral portal, and approval workflow features are coming soon.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
