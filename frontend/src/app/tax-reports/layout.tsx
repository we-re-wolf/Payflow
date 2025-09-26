
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sliders,
  Upload,
  BookText,
  FileText,
  Gift,
  Library,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const reportsNavLinks = [
  { href: '/tax-reports/tax-configuration', label: 'Configuration', icon: Sliders },
  { href: '/tax-reports/declarations', label: 'Declarations', icon: Upload },
  { href: '/tax-reports/computation', label: 'Computation', icon: FileText },
  { href: '/tax-reports/flexible-benefits', label: 'Benefits', icon: Gift },
  { href: '/tax-reports/salary-register', label: 'Register', icon: BookText },
  { href: '/tax-reports/compliance-accounting', label: 'Compliance', icon: Library },
];

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = reportsNavLinks.find((link) => pathname.startsWith(link.href))?.href || reportsNavLinks[0].href;


  return (
     <div className="flex flex-col gap-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {reportsNavLinks.map((link) => (
            <TabsTrigger key={link.href} value={link.href} asChild>
              <Link href={link.href} className="flex items-center gap-2">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        {children}
      </div>
    </div>
  );
}
