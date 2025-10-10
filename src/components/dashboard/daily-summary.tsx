
'use server';

import { summarizeDailyActivity, DailyActivityInput } from '@/ai/flows/summarize-daily-activity';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, Zap } from 'lucide-react';

export default async function DailySummary({ data }: { data: DailyActivityInput }) {
  const { summary, suggestions } = await summarizeDailyActivity(data);

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Activity />
          Daily Health Summary
        </CardTitle>
        <CardDescription>
          Here is a summary of your activity and AI-powered suggestions.
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
