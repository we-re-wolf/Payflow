
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const recruitmentNavLinks = [
  { href: '/recruitment/hiring-needs', label: 'Needs', icon: Activity },
  { href: '/recruitment/staffing-plans', label: 'Plans', icon: ClipboardList },
  { href: '/recruitment/job-openings', label: 'Openings', icon: List },
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
  const activeTab = recruitmentNavLinks.find((link) => pathname.startsWith(link.href))?.href || recruitmentNavLinks[0].href;

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {recruitmentNavLinks.map((link) => (
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
