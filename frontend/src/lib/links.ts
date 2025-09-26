import {
  Briefcase,
  Users,
  Clock,
  CalendarDays,
  Receipt,
  TrendingUp,
  Banknote,
  BookCopy,
  type LucideIcon,
  LayoutDashboard,
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recruitment', label: 'Recruitment', icon: Briefcase },
  { href: '/employees', label: 'Employees', icon: Users },
  { href: '/attendance', label: 'Attendance', icon: Clock },
  { href: '/leave', label: 'Leave', icon: CalendarDays },
  { href: '/expenses', label: 'Expenses', icon: Receipt },
  { href: '/performance', label: 'Performance', icon: TrendingUp },
  { href: '/payroll', label: 'Payroll', icon: Banknote },
  { href: '/tax-reports', label: 'Tax & Reports', icon: BookCopy },
];
