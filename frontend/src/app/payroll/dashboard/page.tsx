
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Banknote, Users, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const payrollStatus = {
    month: "July 2024",
    progress: 60,
    status: "In Progress",
    totalPayout: "$250,450.00",
    employees: 152,
    exceptions: 4,
};

const recentRuns = [
    { month: 'June 2024', status: 'Completed', runDate: '2024-06-30' },
    { month: 'May 2024', status: 'Completed', runDate: '2024-05-31' },
    { month: 'April 2024', status: 'Completed', runDate: '2024-04-30' },
];

export default function PayrollDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Dashboard</CardTitle>
          <CardDescription>Overview of your organization's payroll status.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-8 p-6 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Payroll for {payrollStatus.month}</h3>
                    <Badge variant={payrollStatus.status === 'Completed' ? 'default' : 'secondary'}>{payrollStatus.status}</Badge>
                </div>
                <Progress value={payrollStatus.progress} className="w-full mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Payout</p>
                        <p className="text-xl font-bold">{payrollStatus.totalPayout}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Employees</p>
                        <p className="text-xl font-bold">{payrollStatus.employees}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Exceptions</p>
                        <p className="text-xl font-bold text-destructive">{payrollStatus.exceptions}</p>
                    </div>
                    <div>
                         <Button asChild className="mt-4">
                            <Link href="/payroll/run-payroll">
                                Continue Payroll Run
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                <CardTitle>Recent Payroll Runs</CardTitle>
                <CardDescription>
                    History of your past payroll activities.
                </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/payroll/reports">
                        View Reports
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pay Period</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Run Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentRuns.map(run => (
                            <TableRow key={run.month}>
                                <TableCell className="font-medium">{run.month}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{run.status}</Badge>
                                </TableCell>
                                <TableCell>{run.runDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 <div className="mt-6 text-center text-muted-foreground">
                    <p>Detailed payroll analytics and reports are coming soon.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
