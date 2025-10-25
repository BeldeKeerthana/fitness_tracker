import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/logo';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-login');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <Logo />
      </header>
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="p-8 md:p-12 lg:p-16 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary">
            Track Your Fitness. Master Your Life.
          </h1>
          <p className="text-lg text-muted-foreground">
            FitPulse is your personal AI-powered fitness partner, helping you
            track workouts, set goals, and stay motivated on your journey to a
            healthier you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/onboarding">Get Started for Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-full w-full">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    data-ai-hint={heroImage.imageHint}
                    className="object-cover"
                />
            )}
        </div>
      </main>
    </div>
  );
}
