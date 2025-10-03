'use client'; // Required for using hooks like usePathname

import { Toaster } from "@/components/ui/toaster";
import { AdminHeader } from "@/components/admin-header";
import { usePathname } from "next/navigation"; // Import the usePathname hook

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeader = pathname !== '/admin/login'; // Only show header if not on the login page

  return (
    <div className="min-h-screen bg-muted/40">
        {showHeader && <AdminHeader />} {/* Conditionally render the header */}
        {children}
        <Toaster />
    </div>
  );
}