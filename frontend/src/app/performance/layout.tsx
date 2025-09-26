
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Notebook,
  Repeat,
  Target,
  FileCheck2,
  MessagesSquare,
  UserCheck,
  Calculator,
  BarChart4,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const performanceNavLinks = [
  { href: '/performance/appraisals', label: 'Appraisals', icon: Notebook },
  { href: '/performance/cycles', label: 'Cycles', icon: Repeat },
  { href: '/performance/goals', label: 'Goals', icon: Target },
  { href: '/performance/kras', label: 'KRAs', icon: FileCheck2 },
  { href: '/performance/feedback', label: 'Feedback', icon: MessagesSquare },
  { href: '/performance/self-evaluation', label: 'Self-Evaluation', icon: UserCheck },
  { href: '/performance/scoring', label: 'Scoring', icon: Calculator },
  { href: '/performance/reports', label: 'Reports', icon: BarChart4 },
];

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = performanceNavLinks.find((link) => pathname.startsWith(link.href))?.href || performanceNavLinks[0].href;

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {performanceNavLinks.map((link) => (
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
