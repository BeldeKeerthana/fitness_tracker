'use server';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, Zap } from 'lucide-react';
import type { DailyActivityOutput } from '@/lib/types';

// NOTE: AI functionality has been temporarily removed to fix deployment issues.
// This component now uses static data.
function getStaticSummary(): DailyActivityOutput {
    return {
        summary: "You had a balanced day! You're making good progress on your goals. Consistency is key, so keep up the great work and listen to your body.",
        suggestions: [
            "Try to get to bed 15 minutes earlier tonight.",
            "Add a 10-minute walk after lunch tomorrow.",
            "Drink an extra glass of water in the morning.",
        ],
    };
}


export default async function DailySummary() {
  const { summary, suggestions } = getStaticSummary();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Activity />
          Daily Health Summary
        </CardTitle>
        <CardDescription>
          Here is a summary of your activity and suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{summary}</p>
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Suggestions for Tomorrow:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
