
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart, PieChart, LineChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PerformanceReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Appraisal Overview Reports</CardTitle>
                <CardDescription>Gain insights into organizational performance and talent distribution.</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Select>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Report" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dist">Performance Distribution</SelectItem>
                        <SelectItem value="comp">Competency Analysis</SelectItem>
                        <SelectItem value="trend">Performance Trends</SelectItem>
                    </SelectContent>
                </Select>
                <Button size="sm" className="gap-1"><Download className="h-4 w-4"/>Export</Button>
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Distribution</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Top Performers</span><span>15%</span></div>
                    <div className="flex justify-between"><span>Meeting Expectations</span><span>75%</span></div>
                    <div className="flex justify-between"><span>Needs Improvement</span><span>10%</span></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Competencies</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Leadership</span><span>85%</span></div>
                  <div className="flex justify-between"><span>Communication</span><span>92%</span></div>
                  <div className="flex justify-between"><span>Innovation</span><span>78%</span></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Trend</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+5%</div>
                <p className="text-xs text-muted-foreground">Average score vs. last cycle</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Talent analytics and succession planning tools are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
