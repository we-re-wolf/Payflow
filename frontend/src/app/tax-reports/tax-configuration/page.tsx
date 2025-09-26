import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const taxRegimes = [
    { name: 'New Tax Regime (Default)', year: '2024-25', status: 'Active' },
    { name: 'Old Tax Regime', year: '2024-25', status: 'Active' },
    { name: 'Senior Citizen Regime', year: '2024-25', status: 'Draft' },
];

export default function TaxConfigurationPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Income Tax Slabs</CardTitle>
          <CardDescription>Configure tax regimes, slabs, and other statutory requirements.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4"/>New Tax Regime</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <Select defaultValue="2024-25">
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Financial Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2024-25">FY 2024-25</SelectItem>
                    <SelectItem value="2023-24">FY 2023-24</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Regime Name</TableHead>
              <TableHead>Financial Year</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxRegimes.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell><Badge variant={item.status === 'Active' ? 'secondary' : 'outline'}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Advanced tax slab builder and multi-jurisdiction support are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
