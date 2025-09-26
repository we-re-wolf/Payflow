import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Filter } from "lucide-react";
import Link from "next/link";

const applicants = [
  { name: 'Elena Rodriguez', position: 'Software Engineer', status: 'Screening', source: 'LinkedIn', applied: '2 days ago', avatar: '/placeholder.svg' },
  { name: 'Marcus Chen', position: 'Product Manager', status: 'Interviewing', source: 'Referral', applied: '5 days ago', avatar: '/placeholder.svg' },
  { name: 'Aisha Khan', position: 'UX Designer', status: 'Offer', source: 'Job Board', applied: '1 week ago', avatar: '/placeholder.svg' },
];

export default function ManageApplicantsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Manage Applicants</CardTitle>
            <CardDescription>View, filter, and manage all candidates in your pipeline.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="ml-auto gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={applicant.avatar} alt="Avatar" />
                        <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{applicant.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{applicant.position}</TableCell>
                  <TableCell><Badge variant="secondary">{applicant.status}</Badge></TableCell>
                  <TableCell>{applicant.source}</TableCell>
                  <TableCell>{applicant.applied}</TableCell>
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
            <p>Full applicant database with bulk actions and auto-assignment is coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
