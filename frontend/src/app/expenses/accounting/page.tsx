
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Library } from "lucide-react";

const integrations = [
    { name: 'QuickBooks', status: 'Connected', lastSync: '5 minutes ago' },
    { name: 'Xero', status: 'Inactive', lastSync: 'N/A' },
    { name: 'SAP', status: 'Error', lastSync: '1 day ago' },
]

export default function AccountingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seamless Accounting Integration</CardTitle>
        <CardDescription>Connect with your accounting software for real-time data sync.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {integrations.map(item => (
             <Card key={item.name}>
                <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <Library className="h-8 w-8 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Status: <span className={
                                item.status === 'Connected' ? 'text-green-500' :
                                item.status === 'Error' ? 'text-destructive' : ''
                            }>{item.status}</span>
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                </CardHeader>
             </Card>
        ))}
        <div className="mt-6 text-center text-muted-foreground">
            <p>Automated journal entries and chart of accounts mapping are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
