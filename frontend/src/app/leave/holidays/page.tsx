
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download, Globe } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const holidays = [
  { name: 'New Year\'s Day', date: 'Jan 1, 2024', type: 'Fixed', location: 'Global' },
  { name: 'Independence Day', date: 'Jul 4, 2024', type: 'Fixed', location: 'USA' },
  { name: 'Diwali', date: 'Nov 1, 2024', type: 'Floating', location: 'India' },
];

export default function HolidayPlanningPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Holiday Planning</CardTitle>
          <CardDescription>Manage regional and company-wide holiday calendars.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Globe className="h-4 w-4"/>Import Regional Holidays</Button>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4"/>Add Holiday
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <Select defaultValue="2024">
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Holiday Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidays.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell><Badge variant={item.type === 'Fixed' ? 'secondary' : 'outline'}>{item.type}</Badge></TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>One-click import from global holiday database is coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
