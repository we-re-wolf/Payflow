import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, PlusCircle, Briefcase, Users, MessageSquare, FileText } from 'lucide-react';
import Link from 'next/link';

const jobOpenings = [
    {
        role: 'Software Engineer',
        department: 'Technology',
        status: 'Open',
        candidates: 25,
        hiringManager: 'John Doe',
    },
    {
        role: 'Product Manager',
        department: 'Product',
        status: 'Open',
        candidates: 12,
        hiringManager: 'Jane Smith',
    },
    {
        role: 'UX Designer',
        department: 'Design',
        status: 'Interviewing',
        candidates: 8,
        hiringManager: 'Alice Johnson',
    },
    {
        role: 'Marketing Specialist',
        department: 'Marketing',
        status: 'Offer Extended',
        candidates: 3,
        hiringManager: 'Bob Williams',
    },
    {
        role: 'DevOps Engineer',
        department: 'Technology',
        status: 'On Hold',
        candidates: 5,
        hiringManager: 'John Doe',
    },
];


export default function ListJobOpeningsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">53</div>
              <p className="text-xs text-muted-foreground">+15 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviewing</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11</div>
              <p className="text-xs text-muted-foreground">3 scheduled today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers Extended</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 accepted</p>
            </CardContent>
          </Card>
        </div>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Job Openings</CardTitle>
            <CardDescription>
              Manage your company's active and pending job positions.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              <PlusCircle className="h-4 w-4" />
              New Posting
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell text-right">Candidates</TableHead>
                <TableHead className="hidden lg:table-cell">Hiring Manager</TableHead>
                 <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobOpenings.map((job) => (
                <TableRow key={job.role}>
                  <TableCell>
                    <div className="font-medium">{job.role}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{job.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        job.status === 'Open' ? 'default' : 
                        job.status === 'Interviewing' ? 'secondary' :
                        job.status === 'Offer Extended' ? 'outline' :
                        'destructive'
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">{job.candidates}</TableCell>
                  <TableCell className="hidden lg:table-cell">{job.hiringManager}</TableCell>
                   <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                        <Link href="#">
                            View
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Job posting builder and multi-channel publishing are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
