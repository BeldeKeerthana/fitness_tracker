import type { Exercise } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{exercise.title}</CardTitle>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">How to do it:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {exercise.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="benefits">
              <AccordionTrigger>Benefits</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {exercise.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Video Tutorial:</h3>
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={exercise.videoUrl}
              title={`YouTube video player for ${exercise.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
