'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { navLinks } from '@/lib/links';
import { Separator } from '@/components/ui/separator';
import { LogOut, Settings } from 'lucide-react';

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-sidebar-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M17 9.5H3" />
            <path d="M21 4.5H3" />
            <path d="M21 14.5H3" />
            <path d="M17 19.5H3" />
        </svg>
          <span className="group-data-[collapsible=icon]:hidden">PayFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                tooltip={{ children: link.label }}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{children: 'Settings'}}>
                <Link href="#">
                  <Settings />
                  <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
