import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, BookText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SalaryRegisterPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Salary Register Report</CardTitle>
          <CardDescription>Review and verify detailed payroll data before finalization.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
             <Select defaultValue="july-2024">
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Pay Period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="july-2024">July 2024</SelectItem>
                    <SelectItem value="june-2024">June 2024</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1"><Filter className="h-4 w-4"/>Filter</Button>
            <Button size="sm" className="gap-1"><Download className="h-4 w-4"/>Download</Button>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="p-12 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
            <BookText className="h-12 w-12 text-muted-foreground"/>
            <p className="text-muted-foreground">Your salary register report for the selected period will be generated here.</p>
        </div>
        <div className="mt-6 text-muted-foreground">
            <p>Detailed payroll register with variance analysis is coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
