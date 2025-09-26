
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Search, ZoomIn, ZoomOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const ceo = {
  name: "Sarah Chen",
  role: "CEO",
  avatar: PlaceHolderImages.find(p => p.id === 'user-avatar'),
  children: [
    {
      name: "John Doe",
      role: "CTO",
      avatar: PlaceHolderImages.find(p => p.id === 'employee-2'),
      children: [
        { name: "Olivia Martin", role: "Product Manager", avatar: PlaceHolderImages.find(p => p.id === 'employee-1') },
        { name: "Jackson Lee", role: "Software Engineer", avatar: PlaceHolderImages.find(p => p.id === 'employee-2') },
      ],
    },
    {
      name: "Jane Smith",
      role: "CPO",
      avatar: PlaceHolderImages.find(p => p.id === 'employee-3'),
      children: [
        { name: "Isabella Nguyen", role: "UX Designer", avatar: PlaceHolderImages.find(p => p.id === 'employee-3') },
      ],
    },
  ],
};

const OrgChartNode = ({ node }: { node: typeof ceo }) => (
  <div className="flex flex-col items-center">
    <div className="flex flex-col items-center p-4 border rounded-lg bg-card">
      <Avatar>
        <AvatarImage src={node.avatar?.imageUrl} data-ai-hint={node.avatar?.imageHint} />
        <AvatarFallback>{node.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="font-semibold mt-2">{node.name}</p>
      <p className="text-xs text-muted-foreground">{node.role}</p>
    </div>
    {node.children && node.children.length > 0 && (
      <>
        <div className="w-px h-8 bg-border" />
        <div className="flex justify-center gap-8">
          {node.children.map((child) => (
            <div key={child.name} className="flex flex-col items-center relative">
               <div className="absolute top-0 w-full h-8 border-t border-l border-r rounded-tl-lg rounded-tr-lg" style={{transform: 'translateY(-100%)'}}></div>
               <OrgChartNode node={child as any} />
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);


export default function OrgChartPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Organizational Chart</CardTitle>
            <CardDescription>Visualize your company's reporting structure.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon"><Search className="h-4 w-4"/></Button>
            <Button variant="outline" size="icon"><ZoomIn className="h-4 w-4"/></Button>
            <Button variant="outline" size="icon"><ZoomOut className="h-4 w-4"/></Button>
            <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4"/>Export</Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto p-8">
        <div className="min-w-[800px]">
          <OrgChartNode node={ceo as any} />
        </div>
        <div className="mt-8 text-center text-muted-foreground">
            <p>Interactive org chart with real-time updates and permissions is coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
