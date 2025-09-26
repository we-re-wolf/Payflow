
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Settings,
  ListPlus,
  Rows,
  MapPin,
  Fingerprint,
  Timer,
  FilePenLine,
  Upload,
  BarChart4
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const attendanceNavLinks = [
  { href: '/attendance', label: 'Dashboard', icon: BarChart4 },
  { href: '/attendance/shifts', label: 'Shifts', icon: Settings },
  { href: '/attendance/requests', label: 'Requests', icon: ListPlus },
  { href: '/attendance/rosters', label: 'Rosters', icon: Rows },
  { href: '/attendance/check-in', label: 'Check-in/out', icon: MapPin },
  { href: '/attendance/biometrics', label: 'Biometrics', icon: Fingerprint },
  { href: '/attendance/auto-attendance', label: 'Auto-Sync', icon: Timer },
  { href: '/attendance/regularization', label: 'Regularization', icon: FilePenLine },
  { href: '/attendance/bulk-upload', label: 'Bulk Upload', icon: Upload },
];

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
       <Tabs value={pathname} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
          {attendanceNavLinks.map((link) => (
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
