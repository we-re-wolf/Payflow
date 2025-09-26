
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Network,
  UserPlus,
  ArrowRightLeft,
  Bell,
  ShieldAlert,
  LogOut,
  FileText,
} from 'lucide-react';

const employeeNavLinks = [
  { href: '/employees/repository', label: 'Employee Repository', icon: Users },
  { href: '/employees/org-chart', label: 'Org Chart', icon: Network },
  { href: '/employees/onboarding', label: 'Onboarding', icon: UserPlus },
  { href: '/employees/promotions', label: 'Promotions & Transfers', icon: ArrowRightLeft },
  { href: '/employees/reminders', label: 'Reminders', icon: Bell },
  { href: '/employees/grievances', label: 'Grievances', icon: ShieldAlert },
  { href: '/employees/settlements', label: 'Settlements', icon: LogOut },
  { href: '/employees/exit-interviews', label: 'Exit Interviews', icon: FileText },
];

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {employeeNavLinks.map((link) => (
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
