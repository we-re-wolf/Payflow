
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Filter, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from '@/lib/placeholder-images';


const employees = [
  { name: 'Olivia Martin', department: 'Product', role: 'Product Manager', status: 'Active', location: 'San Francisco', avatar: PlaceHolderImages.find(p => p.id === 'employee-1') },
  { name: 'Jackson Lee', department: 'Engineering', role: 'Software Engineer', status: 'Active', location: 'New York', avatar: PlaceHolderImages.find(p => p.id === 'employee-2') },
  { name: 'Isabella Nguyen', department: 'Design', role: 'UX Designer', status: 'On Leave', location: 'Austin', avatar: PlaceHolderImages.find(p => p.id === 'employee-3') },
];

export default function EmployeeRepositoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Employee Repository</CardTitle>
            <CardDescription>Search, filter, and manage all employee records.</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
             <Button size="sm" asChild className="gap-1">
                <Link href="#"><PlusCircle className="h-4 w-4" />Add Employee</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={employee.avatar?.imageUrl} alt="Avatar" data-ai-hint={employee.avatar?.imageHint} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{employee.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                   <TableCell>{employee.role}</TableCell>
                  <TableCell><Badge variant={employee.status === 'Active' ? 'secondary' : 'outline'}>{employee.status}</Badge></TableCell>
                  <TableCell>{employee.location}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                        <Link href="#">
                            View Profile
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Full-featured employee database with custom fields and document management is coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
