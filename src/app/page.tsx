
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function RootPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-login');

  return (
    <div className="relative min-h-screen w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          data-ai-hint={heroImage.imageHint}
          className="object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm text-card-foreground border-border/50">
          <CardHeader className="text-center space-y-4">
            <Logo className="text-primary-foreground" />
            <CardTitle className="text-3xl font-bold font-headline text-primary-foreground">
              Welcome to FitPulse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-primary-foreground/80">
              Your personal AI-powered fitness tracker. Achieve your goals, one pulse at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="w-full" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full" variant="secondary" size="lg">
                <Link href="/onboarding">Get Started</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
