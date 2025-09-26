
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Fingerprint, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const devices = [
    { id: 'BIO-DEV-001', name: 'Main Entrance', type: 'Face Recognition', status: 'Online', lastSync: '2 minutes ago' },
    { id: 'BIO-DEV-002', name: 'Warehouse', type: 'Fingerprint', status: 'Offline', lastSync: '1 hour ago' },
    { id: 'BIO-DEV-003', name: 'Floor 2', type: 'Face Recognition', status: 'Online', lastSync: '5 minutes ago' },
]

export default function BiometricsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Biometric Device Integration</CardTitle>
          <CardDescription>Manage and monitor all connected biometric devices.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1"><RefreshCw className="h-4 w-4"/>Sync All</Button>
            <Button size="sm" asChild className="gap-1">
                <a href="#"><PlusCircle className="h-4 w-4"/>Add Device</a>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Sync</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell><Badge variant={item.status === 'Online' ? 'secondary' : 'destructive'}>{item.status}</Badge></TableCell>
                <TableCell>{item.lastSync}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-muted-foreground">
            <p>SDK-based integration and real-time device health monitoring are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
