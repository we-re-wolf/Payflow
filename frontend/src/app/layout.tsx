'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/header';
import Nav from '@/components/nav';
import { usePathname, redirect } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// A component to handle route protection
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/forgot-password') || pathname.startsWith('/change-password') || pathname.startsWith('/admin/login');
  const isAdminAppRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isUserAppRoute = !pathname.startsWith('/admin') && !isAuthPage;

  if (isAuthenticated) {
    const isUserAdmin = user?.roles.includes('Admin');

    if (isAuthPage) {
      redirect(isUserAdmin ? '/admin/dashboard' : '/');
    }

    // THE FIX: If a non-admin is on an admin route, redirect with a query parameter.
    if (!isUserAdmin && isAdminAppRoute) {
      redirect('/?error=permission_denied');
    }

    if (isUserAdmin && isUserAppRoute) {
      redirect('/admin/dashboard');
    }
  } else {
    if (isUserAppRoute) redirect('/login');
    if (isAdminAppRoute) redirect('/admin/login');
  }

  // --- RENDER LOGIC ---
  if (isAuthenticated) {
    if (user?.roles.includes('Admin')) {
      return <>{children}</>;
    }
    if (!isAdminAppRoute) {
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
