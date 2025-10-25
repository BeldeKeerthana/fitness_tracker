// NOTE: AI functionality has been temporarily removed to fix deployment issues.
// This component now uses a static quote.
const staticQuote = "The only bad workout is the one that didn't happen.";

export default function WelcomeHeader({ name }: { name: string }) {
  const quote = staticQuote;
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold font-headline">Hello, {name}!</h1>
      <p className="text-xl font-bold font-headline text-primary/90 mt-2">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
