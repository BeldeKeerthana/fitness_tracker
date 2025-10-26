import { challenges } from '@/lib/data';
import ChallengeCard from '@/components/challenges/challenge-card';

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Challenges</h1>
        <p className="text-muted-foreground">
          Join a weekly challenge and compete with others.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
