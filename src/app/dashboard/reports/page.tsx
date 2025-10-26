import { weeklyReport, monthlyReport } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivityChart } from '@/components/reports/activity-chart';
import type { ChartConfig } from '@/components/ui/chart';

const workoutTimeConfig: ChartConfig = {
  'Workout Time': {
    label: 'Workout Time (min)',
    color: 'hsl(var(--primary))',
  },
};

const caloriesConfig: ChartConfig = {
    'Calories Burnt': {
      label: 'Calories Burnt (kcal)',
      color: 'hsl(var(--primary))',
    },
  };

const stepsConfig: ChartConfig = {
    Steps: {
      label: 'Steps',
      color: 'hsl(var(--primary))',
    },
};

export default function ReportsPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Reports</h1>
          <p className="text-muted-foreground">
            Visualize your progress over time.
          </p>
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                      <CardHeader>
                          <CardTitle>Weekly Workout Time</CardTitle>
                          <CardDescription>Total minutes of activity per day.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <ActivityChart data={weeklyReport} config={workoutTimeConfig} dataKey="Workout Time" />
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle>Weekly Calories Burnt</CardTitle>
                          <CardDescription>Total kcal burnt per day.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <ActivityChart data={weeklyReport} config={caloriesConfig} dataKey="Calories Burnt" />
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle>Weekly Steps</CardTitle>
                          <CardDescription>Total steps taken per day.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <ActivityChart data={weeklyReport} config={stepsConfig} dataKey="Steps" />
                      </CardContent>
                  </Card>
              </div>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                      <CardHeader>
                          <CardTitle>Monthly Workout Time</CardTitle>
                          <CardDescription>Total minutes of activity per week.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <ActivityChart data={monthlyReport} config={workoutTimeConfig} dataKey="Workout Time" />
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle>Monthly Calories Burnt</CardTitle>
                          <CardDescription>Total kcal burnt per week.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <ActivityChart data={monthlyReport} config={caloriesConfig} dataKey="Calories Burnt" />
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle>Monthly Steps</CardTitle>
                          <CardDescription>Total steps taken per week.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <ActivityChart data={monthlyReport} config={stepsConfig} dataKey="Steps" />
                      </CardContent>
                  </Card>
              </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
