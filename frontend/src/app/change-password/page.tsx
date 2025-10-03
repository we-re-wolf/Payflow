'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams
import apiClient from '@/lib/axios';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read query params

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ variant: 'destructive', title: "Passwords do not match" });
      return;
    }
    if (newPassword.length < 8) {
        toast({ variant: 'destructive', title: "Password too short", description: "Password must be at least 8 characters."});
        return;
    }

    setIsLoading(true);
    console.log("Attempting to change password..."); // Debugging log
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      console.log("Password change successful:", response.data); // Debugging log

      toast({
        title: "Password Changed Successfully",
        description: "Please log in with your new password.",
      });
      
      // CORRECTED: Check for a 'next' param to decide where to redirect. Default to /login.
      const nextUrl = searchParams.get('next') || '/login';
      router.push(nextUrl);

    } catch (error: any) {
      // The error object from axios is in `error.response`
      console.error("Password change failed:", error.response?.data || error.message); // Debugging log
      toast({
        variant: 'destructive',
        title: "Failed to Change Password",
        description: error.response?.data?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
          <form onSubmit={handlePasswordChange}>
            <CardHeader>
              <CardTitle className="text-2xl">Set New Password</CardTitle>
              <CardDescription>
                This is a one-time process. Please set a new password.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               <div className="grid gap-2">
                <Label htmlFor="current-password">Temporary Password</Label>
                <Input id="current-password" type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Setting Password...' : 'Set New Password'}
              </Button>
            </CardFooter>
          </form>
      </Card>
    </div>
  );
}