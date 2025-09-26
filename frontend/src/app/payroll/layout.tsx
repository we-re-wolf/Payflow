
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  WalletCards,
  BookUser,
  PlayCircle,
  Paperclip,
  Landmark,
  HandCoins,
  BarChart4
} from 'lucide-react';

const payrollNavLinks = [
  { href: '/payroll/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/payroll/salary-structures', label: 'Salary Structures', icon: WalletCards },
  { href: '/payroll/bulk-assignment', label: 'Bulk Assignment', icon: BookUser },
  { href: '/payroll/run-payroll', label: 'Run Payroll', icon: PlayCircle },
  { href: '/payroll/payslips', label: 'Payslips', icon: Paperclip },
  { href: '/payroll/cost-centers', label: 'Cost Centers', icon: Landmark },
  { href: '/payroll/loans', label: 'Employee Loans', icon: HandCoins },
  { href: '/payroll/reports', label: 'Payroll Reports', icon: BarChart4 },
];

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {payrollNavLinks.map((link) => (
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
