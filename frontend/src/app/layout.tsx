'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/header';
import Nav from '@/components/nav';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/forgot-password') || pathname.startsWith('/change-password') || pathname.startsWith('/admin/login');
    const isAdminAppRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
    const isUserAppRoute = !pathname.startsWith('/admin') && !isAuthPage;

    if (!isAuthenticated) {
      // User is NOT authenticated
      if (isUserAppRoute) {
        router.push('/login');
        return;
      }
      if (isAdminAppRoute) {
        router.push('/admin/login');
        return;
      }
    } else {
      // User IS authenticated
      const isUserAdmin = user?.roles.includes('Admin');

      if (isAuthPage) {
        // Redirect away from login pages
        if (isUserAdmin) {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
        return;
      }

      if (!isUserAdmin && isAdminAppRoute) {
        router.push('/');
        return;
      }

      if (isUserAdmin && isUserAppRoute) {
        router.push('/admin/dashboard');
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Show loading only during initial session check
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (isAuthenticated) {
    if (user?.roles.includes('Admin')) {
      return <>{children}</>;
    }
    if (!isAdminRoute) {
      return (
        <SidebarProvider>
          <Sidebar><Nav /></Sidebar>
          <SidebarInset>
            <Header />
            <main className="p-4 sm:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      );
    }
  }
  
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
