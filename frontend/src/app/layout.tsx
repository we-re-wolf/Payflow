
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/header';
import Nav from '@/components/nav';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/forgot-password') || pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>PayFlow</title>
      </head>
      <body className="font-body antialiased">
        {isAuthPage ? (
          <>
            {children}
            <Toaster />
          </>
        ) : (
          <SidebarProvider>
              <Sidebar>
                <Nav />
              </Sidebar>
              <SidebarInset>
                <Header />
                <main className="p-4 sm:p-6">{children}</main>
              </SidebarInset>
            <Toaster />
          </SidebarProvider>
        )}
      </body>
    </html>
  );
}
