
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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

const performanceNavLinks = [
  { href: '/performance/appraisals', label: 'Appraisals', icon: Notebook },
  { href: '/performance/cycles', label: 'Appraisal Cycles', icon: Repeat },
  { href: '/performance/goals', label: 'Goal Tracking', icon: Target },
  { href: '/performance/kras', label: 'KRAs', icon: FileCheck2 },
  { href: '/performance/feedback', label: 'Performance Feedback', icon: MessagesSquare },
  { href: '/performance/self-evaluation', label: 'Self Evaluation', icon: UserCheck },
  { href: '/performance/scoring', label: 'Scoring Formulas', icon: Calculator },
  { href: '/performance/reports', label: 'Overview Reports', icon: BarChart4 },
];

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {performanceNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
              {
                'bg-muted font-semibold text-primary': pathname.startsWith(link.href),
              }
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="lg:hidden">
        {/* Mobile menu could go here if needed */}
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-1">
        {children}
      </div>
    </div>
  );
}
