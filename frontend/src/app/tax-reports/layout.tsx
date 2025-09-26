
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sliders,
  Upload,
  BookText,
  FileText,
  Gift,
  Library,
} from 'lucide-react';

const reportsNavLinks = [
  { href: '/tax-reports/tax-configuration', label: 'Tax Configuration', icon: Sliders },
  { href: '/tax-reports/declarations', label: 'Declarations & Proofs', icon: Upload },
  { href: '/tax-reports/computation', label: 'Tax Computation', icon: FileText },
  { href: '/tax-reports/flexible-benefits', label: 'Flexible Benefits', icon: Gift },
  { href: '/tax-reports/salary-register', label: 'Salary Register', icon: BookText },
  { href: '/tax-reports/compliance-accounting', label: 'Compliance & Accounting', icon: Library },
];

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
        {reportsNavLinks.map((link) => (
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
