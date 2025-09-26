
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

const attendanceNavLinks = [
  { href: '/attendance', label: 'Attendance Dashboard', icon: BarChart4 },
  { href: '/attendance/shifts', label: 'Configure Shifts', icon: Settings },
  { href: '/attendance/requests', label: 'Shift Requests', icon: ListPlus },
  { href: '/attendance/rosters', label: 'Manage Rosters', icon: Rows },
  { href: '/attendance/check-in', label: 'Check-in/out', icon: MapPin },
  { href: '/attendance/biometrics', label: 'Biometric Devices', icon: Fingerprint },
  { href: '/attendance/auto-attendance', label: 'Auto-Attendance Sync', icon: Timer },
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
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {attendanceNavLinks.map((link) => (
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
