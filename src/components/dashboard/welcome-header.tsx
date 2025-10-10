import { generateMotivationalQuote } from '@/ai/flows/generate-motivational-quote';
import { user } from '@/lib/data';

export default async function WelcomeHeader() {
  const { quote } = await generateMotivationalQuote();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold font-headline">Hello, {user.name}!</h1>
      <p className="text-muted-foreground mt-2 italic">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
