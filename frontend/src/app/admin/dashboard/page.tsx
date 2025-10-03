'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart, Settings, FileText, Trash2, Eye, Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Legend, Bar, LineChart as RechartsLineChart, Line, CartesianGrid, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const users = [
  { id: 'USR-001', name: 'Olivia Martin', email: 'olivia.martin@example.com', role: 'Admin', status: 'Active', avatar: PlaceHolderImages.find(p => p.id === 'employee-1') },
  { id: 'USR-002', name: 'Jackson Lee', email: 'jackson.lee@example.com', role: 'User', status: 'Active', avatar: PlaceHolderImages.find(p => p.id === 'employee-2') },
  { id: 'USR-003', name: 'Isabella Nguyen', email: 'isabella.nguyen@example.com', role: 'User', status: 'Inactive', avatar: PlaceHolderImages.find(p => p.id === 'employee-3') },
];

const apiUsageData = [
    { name: 'Auth', calls: 4000 },
    { name: 'Payroll', calls: 3000 },
    { name: 'Leave', calls: 2000 },
    { name: 'Recruitment', calls: 2780 },
    { name: 'Performance', calls: 1890 },
];

const userSignupsData = [
  { date: '2024-07-01', count: 10 },
  { date: '2024-07-02', count: 15 },
  { date: '2024-07-03', count: 8 },
  { date: '2024-07-04', count: 22 },
  { date: '2024-07-05', count: 18 },
];

const userRolesData = [
    { name: 'Admin', value: 5 },
    { name: 'HR Manager', value: 15 },
    { name: 'Employee', value: 132 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentActivities = [
    { action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago' },
    { action: 'Payroll processed', details: 'July 2024', time: '1 hour ago' },
    { action: 'Admin logged in', user: 'admin@payflow.com', time: '3 hours ago' },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254</div>
              <p className="text-xs text-muted-foreground">+50 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">API Usage</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">+20 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button>Configure</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>User Sign-ups</CardTitle>
                    <CardDescription>Daily new user registrations.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={userSignupsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="New Users" />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>API Calls by Module</CardTitle>
                    <CardDescription>Breakdown of API usage.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={apiUsageData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="calls" fill="#82ca9d" name="API Calls" />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>User Management</CardTitle>
                <CardDescription>View, edit, or delete users.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  <PlusCircle className="h-4 w-4" />
                  Create User
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatar?.imageUrl} alt="Avatar" data-ai-hint={user.avatar?.imageHint} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell><Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'}>{user.status}</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button>
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of recent administrative actions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start justify-between">
                                <div>
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">{activity.user || activity.details}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>User Roles Distribution</CardTitle>
                    <CardDescription>Distribution of users by role.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                            <Pie data={userRolesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {userRolesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
