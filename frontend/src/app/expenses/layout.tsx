
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  FileText,
  GitPullRequest,
  HandCoins,
  Receipt,
  Library,
  BarChart4,
} from 'lucide-react';

const expensesNavLinks = [
  { href: '/expenses/claims', label: 'Claim Expenses', icon: FileText },
  { href: '/expenses/workflows', label: 'Approval Workflows', icon: GitPullRequest },
  { href: '/expenses/advances', label: 'Employee Advances', icon: HandCoins },
  { href: '/expenses/settlements', label: 'Settle Advances', icon: Receipt },
  { href: '/expenses/accounting', label: 'Accounting Integration', icon: Library },
  { href: '/expenses/analytics', label: 'Claim Analytics', icon: BarChart4 },
];

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {expensesNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
              {
                'bg-muted font-semibold text-primary': pathname === link.href,
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
