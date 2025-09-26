
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function RunPayrollPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Run Payroll for July 2024</CardTitle>
        <CardDescription>Process salaries, deductions, and taxes for the current cycle.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Step 1: Input Validation</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Completed</div>
                    <p className="text-xs text-muted-foreground">All employee data is valid.</p>
                </CardContent>
            </Card>
             <Card className="border-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Step 2: Process Payroll</CardTitle>
                    <PlayCircle className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">In Progress</div>
                    <p className="text-xs text-muted-foreground">Processing 152 employees...</p>
                    <Progress value={60} className="mt-2" />
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Step 3: Finalize</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Pending</div>
                    <p className="text-xs text-muted-foreground">Awaiting processing completion.</p>
                </CardContent>
            </Card>
        </div>

        <div className="p-4 border rounded-lg bg-destructive/10 text-destructive">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5"/>
                <h3 className="font-semibold">4 Exceptions Found</h3>
            </div>
            <p className="text-sm ml-7">Unresolved attendance records and negative balances detected. <Button variant="link" className="p-0 h-auto text-destructive">View Details</Button></p>
        </div>

        <div className="flex justify-between items-center mt-4">
            <Button variant="outline">Cancel Run</Button>
            <div className="flex gap-2">
                <Button variant="secondary">Preview Payslips</Button>
                <Button disabled>Finalize Payroll</Button>
            </div>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Off-cycle payments and additional salary components are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
