
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileCheck } from "lucide-react";

export default function BulkUploadPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Attendance Tools</CardTitle>
        <CardDescription>Upload and process attendance records in bulk.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Drag & drop your CSV/Excel file here or</p>
            <Button>
                <FileCheck className="mr-2 h-4 w-4"/>
                Browse Files
            </Button>
        </div>
        <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Need a template to get started?</p>
            <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4"/>
                Download Template
            </Button>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Data import wizard and batch processing are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
