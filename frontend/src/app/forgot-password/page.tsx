
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState('enter-email'); // 'enter-email', 'verify-otp', 'reset-password'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just simulate sending an OTP
    console.log(`Sending OTP to ${email}`);
    toast({
      title: "OTP Sent",
      description: "Check your email for the One-Time Password.",
    });
    setStep('verify-otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otp === '123456') { // Dummy OTP for now
      toast({
        title: "OTP Verified",
        description: "You can now reset your password.",
      });
      setStep('reset-password');
    } else {
      toast({
        variant: 'destructive',
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: "Passwords do not match",
        description: "Please make sure your new passwords match.",
      });
      return;
    }
    if (newPassword.length < 6) {
        toast({
            variant: 'destructive',
            title: "Password too short",
            description: "Password must be at least 6 characters.",
        });
        return;
    }
    // Simulate password reset
    console.log(`Password reset for ${email}`);
    toast({
      title: "Password Reset Successful",
      description: "You can now log in with your new password.",
    });
    // Ideally, redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        {step === 'enter-email' && (
          <form onSubmit={handleSendOtp}>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email and we'll send you an OTP to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Send OTP</Button>
            </CardFooter>
          </form>
        )}

        {step === 'verify-otp' && (
          <form onSubmit={handleVerifyOtp}>
            <CardHeader>
              <CardTitle className="text-2xl">Verify OTP</CardTitle>
              <CardDescription>
                An OTP has been sent to {email}. Please enter it below.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">Verify OTP</Button>
              <Button variant="link" size="sm" onClick={() => setStep('enter-email')}>
                Use a different email
              </Button>
            </CardFooter>
          </form>
        )}

        {step === 'reset-password' && (
          <form onSubmit={handleResetPassword}>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                Create a new password for your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Reset Password</Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
