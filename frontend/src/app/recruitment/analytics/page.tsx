import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function RecruitmentAnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Analytics</CardTitle>
          <CardDescription>Track and analyze your hiring process with key metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 days</div>
                <p className="text-xs text-muted-foreground">-2 days from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Source of Hire</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Referrals</span><span>45%</span></div>
                  <div className="flex justify-between"><span>Job Boards</span><span>35%</span></div>
                  <div className="flex justify-between"><span>Direct</span><span>20%</span></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Funnel Conversion</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Application to Hire</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Detailed analytics and custom reports are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
