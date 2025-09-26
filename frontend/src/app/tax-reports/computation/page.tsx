import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TaxComputationPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Income Tax Computation Report</CardTitle>
          <CardDescription>Generate detailed tax computation reports and statutory forms like Form 16.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Select defaultValue="form16">
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Report" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="form16">Form 16</SelectItem>
                    <SelectItem value="computation">Tax Computation Sheet</SelectItem>
                    <SelectItem value="summary">Tax Summary Report</SelectItem>
                </SelectContent>
            </Select>
            <Button size="sm" className="gap-1"><Download className="h-4 w-4"/>Generate & Download</Button>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="p-12 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
            <FileText className="h-12 w-12 text-muted-foreground"/>
            <p className="text-muted-foreground">Select a report type and click "Generate" to view and download.</p>
        </div>
        <div className="mt-6 text-muted-foreground">
            <p>Bulk generation and digital signing of Form 16 are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
