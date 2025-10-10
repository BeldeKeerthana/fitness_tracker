'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { YogaPose } from '@/lib/types';

export default function YogaPoseCard({ pose }: { pose: YogaPose }) {
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
