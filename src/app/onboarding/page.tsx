'use client';

import Link from 'next/link';
import { handleOnboarding } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';

export default function OnboardingPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <Card className="w-full max-w-sm">
              <CardHeader className="text-center">
              <Logo className="mb-4" />
              <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
              <CardDescription>
                  Let&apos;s get you started on your fitness journey.
              </CardDescription>
              </CardHeader>
              <CardContent>
              <form action={handleOnboarding} className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Alex" required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" name="email" placeholder="alex@example.com" required />
                  </div>
                  <Button type="submit" className="w-full">
                  Create Account
                  </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="underline">
                  Sign in
                  </Link>
              </div>
              </CardContent>
          </Card>
        </div>
    );
}
