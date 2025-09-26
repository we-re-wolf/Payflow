
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

export default function BulkAssignmentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Salary Structure Assignment</CardTitle>
        <CardDescription>Assign or update salary structures for employees in bulk.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
            <div>
                <label className="text-sm font-medium">Select Structure</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a salary structure" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="eng">Senior Engineer</SelectItem>
                        <SelectItem value="sales">Sales Executive</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
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
            <p className="text-muted-foreground">Or upload a CSV file with Employee ID and Structure ID</p>
            <Button>
                <Upload className="mr-2 h-4 w-4"/>
                Upload CSV
            </Button>
        </div>
        <div className="flex justify-end">
             <Button>
                <FileCheck className="mr-2 h-4 w-4"/>
                Apply Assignment
            </Button>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Impact analysis and approval workflows for bulk changes are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
