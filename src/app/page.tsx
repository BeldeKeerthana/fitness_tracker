
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/logo';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-login');

  return (
    <div className="relative min-h-screen">
      <header className="absolute top-0 left-0 right-0 p-4 z-10">
        <Logo />
      </header>
      <main className="flex items-center justify-center min-h-screen p-4">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    data-ai-hint={heroImage.imageHint}
                    className="object-cover -z-10 brightness-50"
                />
            )}
            <div className="container px-4 md:px-6 text-center text-white">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
                Your Personal AI Fitness Partner
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                FitPulse helps you achieve your fitness goals with personalized workout plans, real-time tracking, and AI-powered insights.
                </p>
            </div>
            <div className="mt-8 space-x-4">
                <Button asChild size="lg">
                <Link href="/onboarding">Get Started</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                <Link href="/login">Sign In</Link>
                </Button>
            </div>
            </div>
        </section>
      </main>
    </div>
  );
}
