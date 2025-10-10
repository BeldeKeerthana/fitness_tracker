
import { generateMotivationalQuote } from '@/ai/flows/generate-motivational-quote';

export default async function WelcomeHeader({ name }: { name: string }) {
  const { quote } = await generateMotivationalQuote();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold font-headline">Hello, {name}!</h1>
      <p className="text-muted-foreground mt-2 italic">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
