import { HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-primary',
        className
      )}
    >
      <HeartPulse className="h-8 w-8" />
      <span className="text-2xl font-bold font-headline">FitPulse</span>
    </div>
  );
}
