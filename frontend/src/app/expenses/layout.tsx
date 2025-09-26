
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  GitPullRequest,
  HandCoins,
  Receipt,
  Library,
  BarChart4,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const expensesNavLinks = [
  { href: '/expenses/claims', label: 'Claims', icon: FileText },
  { href: '/expenses/workflows', label: 'Workflows', icon: GitPullRequest },
  { href: '/expenses/advances', label: 'Advances', icon: HandCoins },
  { href: '/expenses/settlements', label: 'Settlements', icon: Receipt },
  { href: '/expenses/accounting', label: 'Accounting', icon: Library },
  { href: '/expenses/analytics', label: 'Analytics', icon: BarChart4 },
];

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = expensesNavLinks.find((link) => pathname.startsWith(link.href))?.href || expensesNavLinks[0].href;

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {expensesNavLinks.map((link) => (
            <TabsTrigger key={link.href} value={link.href} asChild>
              <Link href={link.href} className='flex items-center gap-2'>
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
