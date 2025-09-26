
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const employeeNavLinks = [
  { href: '/employees/repository', label: 'Repository', icon: Users },
  { href: '/employees/org-chart', label: 'Org Chart', icon: Network },
  { href: '/employees/onboarding', label: 'Onboarding', icon: UserPlus },
  { href: '/employees/promotions', label: 'Promotions', icon: ArrowRightLeft },
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
  const activeTab = employeeNavLinks.find((link) => pathname.startsWith(link.href))?.href || employeeNavLinks[0].href;

  return (
     <div className="flex flex-col gap-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {employeeNavLinks.map((link) => (
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
