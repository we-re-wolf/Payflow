import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSignature, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const offers = [
    { candidate: 'Aisha Khan', role: 'UX Designer', status: 'Signed', sentDate: '2023-10-20' },
    { candidate: 'Liam Smith', role: 'Marketing Specialist', status: 'Sent', sentDate: '2023-10-28' },
    { candidate: 'Olivia Brown', role: 'DevOps Engineer', status: 'Declined', sentDate: '2023-10-15' },
];

export default function SendJobOffersPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Send Job Offers</CardTitle>
            <CardDescription>
              Create, send, and track job offers for candidates.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              <PlusCircle className="h-4 w-4" />
              Create Offer
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.candidate}>
                  <TableCell className="font-medium">{offer.candidate}</TableCell>
                  <TableCell>{offer.role}</TableCell>
                  <TableCell>
                      <Badge variant={
                          offer.status === 'Signed' ? 'default' :
                          offer.status === 'Sent' ? 'secondary' : 'destructive'
                      }>{offer.status}</Badge>
                  </TableCell>
                  <TableCell>{offer.sentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 text-center text-muted-foreground">
            <p>Offer letter templates and e-signature integration are coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
