'use client';

import { useState, useEffect } from 'react';
import { Watch, Heart, AlertTriangle, PhoneCall } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ConnectPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [progress, setProgress] = useState(0);

  const handleConnect = () => {
    setIsConnecting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setIsConnected(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setHeartRate(72);
  };

  // Simulate heart rate fluctuation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setHeartRate((prev) => {
          const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
          const newRate = prev + change;
          return Math.max(60, Math.min(110, newRate)); // Keep it in a semi-realistic range
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Connect to Watch</h1>
        <p className="text-muted-foreground">
          Monitor your health metrics in real-time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Watch />
            Smartwatch Integration
          </CardTitle>
          <CardDescription>
            Connect your watch to sync your heart rate 24/7 and enable emergency alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Feature Demonstration</AlertTitle>
            <AlertDescription>
              This is a UI demonstration. For security reasons, web applications cannot directly access watch sensors or make emergency calls. This would require a native mobile app.
            </AlertDescription>
          </Alert>

          {!isConnected && !isConnecting && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p>Connect your smartwatch to begin monitoring.</p>
              <Button onClick={handleConnect}>
                <Watch className="mr-2 h-4 w-4" />
                Connect to Watch
              </Button>
            </div>
          )}

          {isConnecting && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground">Connecting...</p>
              <Progress value={progress} className="w-1/2" />
            </div>
          )}

          {isConnected && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg">
                <div className="flex items-end gap-2">
                  <Heart className={`h-10 w-10 text-red-500 ${heartRate > 100 ? 'animate-ping' : ''}`} />
                  <span className="text-7xl font-bold font-mono text-primary">
                    {heartRate}
                  </span>
                  <span className="text-lg text-muted-foreground">BPM</span>
                </div>
                <p className="text-sm text-muted-foreground">Real-time Heart Rate</p>
              </div>

              {heartRate > 100 && (
                 <Alert variant="destructive">
                    <PhoneCall className="h-4 w-4" />
                    <AlertTitle>High Heart Rate Detected!</AlertTitle>
                    <AlertDescription>
                        In a real app, an emergency call would be initiated now. Your heart rate is {heartRate} BPM.
                    </AlertDescription>
                </Alert>
              )}

              <Button onClick={handleDisconnect} variant="destructive" className="w-full">
                Disconnect Watch
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
