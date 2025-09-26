
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const templates = [
    { name: 'Standard Employee Review', type: 'Annual', sections: 'Goals, Competencies, Feedback', status: 'Active' },
    { name: 'Engineering Mid-Year Check-in', type: 'Quarterly', sections: 'Goals, Technical Skills', status: 'Active' },
    { name: 'Sales Performance Template', type: 'Monthly', sections: 'Targets, Pipeline', status: 'Draft' },
];

export default function AppraisalsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Appraisal Templates</CardTitle>
          <CardDescription>Create and manage appraisal templates for different roles and cycles.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Template</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sections</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.sections}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>A visual template builder and competency libraries are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
