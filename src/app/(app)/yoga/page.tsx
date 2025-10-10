
import Image from 'next/image';
import { yogaPoses } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import YogaPoseCard from '@/components/yoga/yoga-pose-card';

export default function YogaPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Embrace the Flow of Yoga
        </h1>
        <p className="text-xl font-bold font-headline text-muted-foreground">
          &ldquo;Yoga is the journey of the self, through the self, to the self.&rdquo;
        </p>
        <Card className="max-w-3xl mx-auto text-left">
            <CardHeader>
                <CardTitle className="font-headline">The Benefits of Yoga</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                Yoga is a holistic practice that combines physical postures, breathing techniques, and meditation. Regular practice offers a multitude of benefits, including increased flexibility, improved muscle strength and tone, better respiration, enhanced energy and vitality, and a more balanced metabolism. It also helps in reducing stress, promoting mental clarity, and fostering a sense of inner peace.
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {yogaPoses.map((pose) => (
          <YogaPoseCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
  );
}
