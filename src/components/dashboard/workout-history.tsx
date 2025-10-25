
import { workoutHistory } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function WorkoutHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
        <CardDescription>A log of your recent activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workoutHistory.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>
                    <div className="font-medium">{workout.activity}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{workout.duration}</Badge>
                </TableCell>
                <TableCell>{workout.calories}</TableCell>
                <TableCell className="text-right">{workout.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
