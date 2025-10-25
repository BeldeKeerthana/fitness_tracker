
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import { ArrowRight, Heart, Brain, Dumbbell } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-login');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/onboarding">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    data-ai-hint={heroImage.imageHint}
                    className="object-cover object-center brightness-50"
                />
            )}
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white font-headline">
                    Your Journey to a Healthier You Starts Here
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Embrace a holistic approach to wellness. Track your fitness, find your inner peace, and build a stronger mind and body.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Balanced Approach to Wellness
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FitPulse combines physical tracking with mental well-being to provide a complete picture of your health.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card>
                <CardHeader className="text-center items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">Physical Health</CardTitle>
                  <CardDescription>
                    Track workouts, monitor your progress with detailed reports, and take on new challenges.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/workouts" className="font-semibold text-primary hover:underline">Explore Workouts &rarr;</Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">Yoga & Flexibility</CardTitle>
                  <CardDescription>
                    Discover a library of yoga poses, from beginner to advanced, to improve your flexibility and mindfulness.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/yoga" className="font-semibold text-primary hover:underline">Discover Yoga Poses &rarr;</Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">Mental Health</CardTitle>
                  <CardDescription>
                    Take a moment for yourself with our guided meditation timer and resources for mental clarity.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/mental-health" className="font-semibold text-primary hover:underline">Find Your Peace &rarr;</Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} FitPulse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
