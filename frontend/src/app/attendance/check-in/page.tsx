
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect, useRef } from "react";

export default function CheckInPage() {
    const { toast } = useToast();
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this app.',
            });
          }
        };
    
        getCameraPermission();
      }, [toast]);


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Check-in / Check-out</CardTitle>
        <CardDescription>Mark your attendance with geolocation and photo verification.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative aspect-video w-full rounded-md border bg-muted">
            <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
            {!(hasCameraPermission) && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature.
                    </AlertDescription>
                </Alert>
                </div>
            )}
        </div>
        <div className="flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2"/>
            <span>Location: 123 Tech Park, Silicon Valley, CA (Verified)</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Button size="lg" className="gap-2" disabled={!hasCameraPermission} onClick={() => toast({ title: 'Checked In!', description: 'Your attendance has been marked successfully.'})}>
                <LogIn className="h-5 w-5"/>
                Check-in
            </Button>
            <Button size="lg" variant="destructive" className="gap-2" disabled={!hasCameraPermission} onClick={() => toast({ title: 'Checked Out!', description: 'Your have been checked out successfully.'})}>
                <LogOut className="h-5 w-5"/>
                Check-out
            </Button>
        </div>
        <div className="mt-4 text-center text-muted-foreground">
            <p>Geofencing and offline capabilities are coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
