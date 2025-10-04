'use client';
import {
  Activity,
  ArrowUpRight,
  Banknote,
  Briefcase,
  CalendarCheck,
  CreditCard,
  Users,
} from 'lucide-react';
import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const recentHires = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    role: 'Product Manager',
    avatar: PlaceHolderImages.find((p) => p.id === 'employee-1'),
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    role: 'Software Engineer',
    avatar: PlaceHolderImages.find((p) => p.id === 'employee-2'),
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    role: 'UX Designer',
    avatar: PlaceHolderImages.find((p) => p.id === 'employee-3'),
  },
];

const upcomingLeaves = [
    { name: 'Liam Johnson', dates: 'July 25 - Aug 2', type: 'Vacation' },
    { name: 'Sophia Brown', dates: 'July 28', type: 'Sick Leave' },
    { name: 'Noah Garcia', dates: 'Aug 5 - Aug 10', type: 'Personal' },
]

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'permission_denied') {
      toast({
        variant: 'destructive',
        title: "Access Denied",
        description: "You do not have permission to view that page.",
      });
      // Remove the query param from the URL to prevent the toast from showing again on refresh
      router.replace(pathname);
    }
  }, [searchParams, router, pathname, toast]);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">+5 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 urgent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payroll</CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">July 31</div>
              <p className="text-xs text-muted-foreground">In 14 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">Leaves, Expenses</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Hires</CardTitle>
                <CardDescription>
                  Welcome to our newest team members.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/employees">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden xl:table-column">Role</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentHires.map((hire) => (
                    <TableRow key={hire.email}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={hire.avatar?.imageUrl} alt="Avatar" data-ai-hint={hire.avatar?.imageHint} />
                            <AvatarFallback>{hire.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-0.5">
                            <div className="font-medium">{hire.name}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {hire.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">{hire.role}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">Onboarding</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leaves</CardTitle>
              <CardDescription>
                Team members who will be out of office soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               {upcomingLeaves.map((leave, index) => (
                    <div className="flex items-center gap-4" key={index}>
                        <div className="rounded-md bg-muted p-2">
                            <CalendarCheck className="h-6 w-6 text-muted-foreground"/>
                        </div>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{leave.name}</p>
                            <p className="text-sm text-muted-foreground">{leave.dates}</p>
                        </div>
                        <div className="ml-auto font-medium">{leave.type}</div>
                    </div>
               ))}
                <Button asChild size="sm" className="mt-2 w-full">
                <Link href="/leave">
                  View Leave Calendar
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}