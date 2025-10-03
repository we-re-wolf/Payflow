'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState('enter-email'); // 'enter-email', 'verify-token', 'reset-password'
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Step 1: Request the reset token
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      toast({
        title: "Check Your Email",
        description: response.data.message,
      });
      setStep('verify-token'); // Move to the next step
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Error",
        description: error.response?.data?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify the token
  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post('/auth/verify-reset-token', { token });
      toast({
        title: "Token Verified",
        description: "You can now set a new password.",
      });
      setStep('reset-password'); // Move to the final step
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Verification Failed",
        description: error.response?.data?.message || "Invalid or expired token.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Set the new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ variant: 'destructive', title: "Passwords do not match" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ variant: 'destructive', title: "Password too short", description: "Must be at least 8 characters." });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/reset-password', { token, newPassword });
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push('/login'); // Redirect to login after success
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Reset Failed",
        description: error.response?.data?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        {step === 'enter-email' && (
          <form onSubmit={handleRequestReset}>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email to receive a password reset token.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Token'}
              </Button>
            </CardFooter>
          </form>
        )}

        {step === 'verify-token' && (
          <form onSubmit={handleVerifyToken}>
            <CardHeader>
              <CardTitle className="text-2xl">Verify Token</CardTitle>
              <CardDescription>
                A token has been sent to {email}. Please paste it below.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="token">Password Reset Token</Label>
                <Input id="token" type="text" placeholder="Paste token here" required value={token} onChange={(e) => setToken(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Token'}
              </Button>
              <Button variant="link" size="sm" onClick={() => setStep('enter-email')}>
                Use a different email
              </Button>
            </CardFooter>
          </form>
        )}

        {step === 'reset-password' && (
          <form onSubmit={handleResetPassword}>
            <CardHeader>
              <CardTitle className="text-2xl">Set New Password</CardTitle>
              <CardDescription>
                Create a new password for your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}