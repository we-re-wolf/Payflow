
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PieChart, BarChart, LineChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LeaveReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Leave Reports & Analytics</CardTitle>
                <CardDescription>Track and analyze leave patterns and balances.</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Select>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Report" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="balance">Leave Balance Report</SelectItem>
                        <SelectItem value="trend">Leave Trend Analysis</SelectItem>
                        <SelectItem value="utilization">Utilization Report</SelectItem>
                    </SelectContent>
                </Select>
                <Button size="sm" className="gap-1"><Download className="h-4 w-4"/>Export</Button>
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leave Utilization</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Annual leave utilized this year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Leave Types</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Annual Leave</span><span>60%</span></div>
                  <div className="flex justify-between"><span>Sick Leave</span><span>25%</span></div>
                  <div className="flex justify-between"><span>WFH</span><span>15%</span></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leave Trend</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">Leave applications vs. last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Custom report builder and predictive analytics are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
