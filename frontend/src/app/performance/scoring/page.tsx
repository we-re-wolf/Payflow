
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const formulas = [
    { name: 'Default Scoring', formula: 'Goals (50%) + Competencies (50%)', assignments: 'All Employees', status: 'Active' },
    { name: 'Leadership Scoring', formula: 'Goals (40%) + Leadership (40%) + 360 Feedback (20%)', assignments: 'Managers', status: 'Active' },
    { name: 'Sales Scoring', formula: 'Sales Target (70%) + Competencies (30%)', assignments: 'Sales Department', status: 'Draft' },
]

export default function ScoringFormulasPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Scoring Formulas</CardTitle>
          <CardDescription>Configure formulas for calculating final performance scores.</CardDescription>
        </div>
        <Button size="sm" asChild className="ml-auto gap-1">
            <Link href="#"><PlusCircle className="h-4 w-4"/>New Formula</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Formula Name</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formulas.map(item => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.formula}</TableCell>
                <TableCell>{item.assignments}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Performance calibration and score normalization tools are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
