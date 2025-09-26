
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const leaveNavLinks = [
  { href: '/leave/dashboard', label: 'Dashboard', icon: BarChart4 },
  { href: '/leave/policies', label: 'Policies', icon: Sliders },
  { href: '/leave/allocations', label: 'Allocations', icon: Users },
  { href: '/leave/requests', label: 'Requests', icon: Send },
  { href: '/leave/calendar', label: 'Calendar', icon: Calendar },
  { href: '/leave/blocking', label: 'Block Leave', icon: ShieldX },
  { href: '/leave/encashment', label: 'Encashment', icon: Wallet },
  { href: '/leave/holidays', label: 'Holidays', icon: Globe },
  { href: '/leave/reports', label: 'Reports', icon: FileText },
];

export default function LeaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = leaveNavLinks.find((link) => pathname.startsWith(link.href))?.href || leaveNavLinks[0].href;

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
          {leaveNavLinks.map((link) => (
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
