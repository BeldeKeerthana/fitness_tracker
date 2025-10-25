
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/logo';

export default function HomePage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-login');
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link href="#" className="flex items-center justify-center" prefetch={false}>
                    <Logo />
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button asChild variant="ghost">
                        <Link href="/login" prefetch={false}>
                            Sign In
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/onboarding" prefetch={false}>
                            Get Started
                        </Link>
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
                            className="object-cover object-center z-0"
                        />
                    )}
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Your Fitness Journey Starts Here</div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                                    Achieve Your Fitness Goals with FitPulse
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    FitPulse is your personal AI-powered fitness tracker. Get personalized workout plans, monitor your progress, and stay motivated.
                                </p>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button asChild size="lg">
                                        <Link href="/onboarding" prefetch={false}>
                                            Get Started for Free
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="/login" prefetch={false}>
                                            Sign In
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
