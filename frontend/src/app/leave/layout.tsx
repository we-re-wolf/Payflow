
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart4,
  Sliders,
  Users,
  Send,
  Calendar,
  ShieldX,
  Wallet,
  CalendarCheck,
  Globe,
  FileText
} from 'lucide-react';

const leaveNavLinks = [
  { href: '/leave/dashboard', label: 'Dashboard', icon: BarChart4 },
  { href: '/leave/policies', label: 'Leave Policies', icon: Sliders },
  { href: '/leave/allocations', label: 'Bulk Allocations', icon: Users },
  { href: '/leave/requests', label: 'Leave Requests', icon: Send },
  { href: '/leave/calendar', label: 'Leave Calendar', icon: Calendar },
  { href: '/leave/blocking', label: 'Block Leave', icon: ShieldX },
  { href: '/leave/encashment', label: 'Leave Encashment', icon: Wallet },
  { href: '/leave/holidays', label: 'Holiday Planning', icon: Globe },
  { href: '/leave/reports', label: 'Leave Reports', icon: FileText },
];

export default function LeaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {leaveNavLinks.map((link) => (
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
