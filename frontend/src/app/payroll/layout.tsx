
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const payrollNavLinks = [
  { href: '/payroll/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/payroll/salary-structures', label: 'Structures', icon: WalletCards },
  { href: '/payroll/bulk-assignment', label: 'Assignment', icon: BookUser },
  { href: '/payroll/run-payroll', label: 'Run Payroll', icon: PlayCircle },
  { href: '/payroll/payslips', label: 'Payslips', icon: Paperclip },
  { href: '/payroll/cost-centers', label: 'Cost Centers', icon: Landmark },
  { href: '/payroll/loans', label: 'Loans', icon: HandCoins },
  { href: '/payroll/reports', label: 'Reports', icon: BarChart4 },
];

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = payrollNavLinks.find((link) => pathname.startsWith(link.href))?.href || payrollNavLinks[0].href;

  return (
    <div className="flex flex-col gap-4">
       <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {payrollNavLinks.map((link) => (
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
