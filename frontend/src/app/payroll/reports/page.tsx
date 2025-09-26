
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PieChart, BarChart, LineChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PayrollReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Payroll Reports & Analytics</CardTitle>
                <CardDescription>Analyze payroll data, costs, and compliance.</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Select>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Report" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="salary">Salary Register</SelectItem>
                        <SelectItem value="statutory">Statutory Summary (PF, ESI)</SelectItem>
                        <SelectItem value="variance">Variance Report</SelectItem>
                    </SelectContent>
                </Select>
                <Button size="sm" className="gap-1"><Download className="h-4 w-4"/>Export</Button>
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost to Company (CTC)</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.8M</div>
                <p className="text-xs text-muted-foreground">For July 2024</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Headcount vs Payroll Cost</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+3.5%</div>
                <p className="text-xs text-muted-foreground">Payroll cost increase vs. last month</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Department Cost</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Engineering</span><span>45%</span></div>
                  <div className="flex justify-between"><span>Sales</span><span>25%</span></div>
                  <div className="flex justify-between"><span>Product</span><span>20%</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Custom report builder and statutory e-filing are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
