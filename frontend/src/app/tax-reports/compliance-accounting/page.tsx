import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Library } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ComplianceAccountingPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Compliance & Accounting Reports</CardTitle>
          <CardDescription>Generate statutory, compliance, and accounting integration reports.</CardDescription>
        </div>
         <div className="ml-auto flex items-center gap-2">
            <Select>
                <SelectTrigger className="w-60">
                    <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pf">PF ECR File</SelectItem>
                    <SelectItem value="esi">ESI Challan</SelectItem>
                    <SelectItem value="pt">Professional Tax Report</SelectItem>
                    <SelectItem value="gl">General Ledger Export</SelectItem>
                </SelectContent>
            </Select>
            <Button size="sm" className="gap-1"><Download className="h-4 w-4"/>Generate</Button>
        </div>
      </CardHeader>
      <CardContent className="text-center">
         <div className="p-12 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
            <Library className="h-12 w-12 text-muted-foreground"/>
            <p className="text-muted-foreground">Select a report to generate and download for your compliance and accounting needs.</p>
        </div>
        <div className="mt-6 text-muted-foreground">
            <p>Automated journal entries and direct government portal integrations are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
