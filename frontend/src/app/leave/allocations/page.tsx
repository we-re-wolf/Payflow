
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Users, FileCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BulkAllocationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Leave Allocations</CardTitle>
        <CardDescription>Assign or update leave policies for employees in bulk.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
            <div>
                <label className="text-sm font-medium">Select Policy</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a leave policy" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="new-hire">New Hire Policy</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div>
                <label className="text-sm font-medium">Select Employee Group</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="e.g., Engineering Dept, New Hires" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="eng">Engineering Department</SelectItem>
                        <SelectItem value="sales">Sales Team</SelectItem>
                        <SelectItem value="all">All Employees</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Or upload a CSV file with Employee ID and Policy ID</p>
            <Button>
                <Upload className="mr-2 h-4 w-4"/>
                Upload CSV
            </Button>
        </div>
        <div className="flex justify-end">
             <Button>
                <FileCheck className="mr-2 h-4 w-4"/>
                Apply Allocation
            </Button>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Policy mapping, batch processing, and audit trails are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
