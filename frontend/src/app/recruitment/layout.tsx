'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Activity,
  ClipboardList,
  FileText,
  Send,
  Users,
  Calendar,
  BarChart2,
  List,
} from 'lucide-react';

const recruitmentNavLinks = [
  { href: '/recruitment/hiring-needs', label: 'Hiring Needs', icon: Activity },
  { href: '/recruitment/staffing-plans', label: 'Staffing Plans', icon: ClipboardList },
  { href: '/recruitment/job-openings', label: 'Job Openings', icon: List },
  { href: '/recruitment/applicants', label: 'Applicants', icon: Users },
  { href: '/recruitment/interviews', label: 'Interviews', icon: Calendar },
  { href: '/recruitment/feedback', label: 'Feedback', icon: FileText },
  { href: '/recruitment/offers', label: 'Offers', icon: Send },
  { href: '/recruitment/analytics', label: 'Analytics', icon: BarChart2 },
];

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {recruitmentNavLinks.map((link) => (
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
