
import Image from 'next/image';
import { yogaPoses } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { YogaPose } from '@/lib/types';

function YogaPoseCard({ pose }: { pose: YogaPose }) {
    const getBadgeVariant = (level: YogaPose['level']): 'secondary' | 'default' | 'destructive' => {
        if (level === 'Basic') return 'secondary';
        if (level === 'Intermediate') return 'default';
        return 'destructive';
    }

    return (
      <Card className="flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src={pose.image.url}
            alt={pose.title}
            fill
            data-ai-hint={pose.image.hint}
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline">{pose.title}</CardTitle>
              <Badge variant={getBadgeVariant(pose.level)}>
                {pose.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <div>
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {pose.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={pose.videoUrl}
                title={`YouTube video player for ${pose.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

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
