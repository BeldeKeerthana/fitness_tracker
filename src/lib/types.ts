export type User = {
  name: string;
  email: string;
  avatar: string;
};

export type Stat = {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
};

export type WorkoutHistory = {
  id: string;
  activity: string;
  duration: string;
  calories: string;
  date: string;
};

export type WorkoutCategory = {
  id: string;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
    hint: string;
  };
};

export type Exercise = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  benefits: string[];
  videoUrl: string;
};

export type ReportData = {
  date: string;
  'Workout Time': number;
  'Calories Burnt': number;
  Steps: number;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  metric: 'Steps' | 'Calories Burnt' | 'Workout Time';
  goal: number;
  participants: number;
  image: {
    id: string;
    url: string;
    hint: string;
  };
};

export type YogaPose = {
  id: string;
  title: string;
  level: 'Basic' | 'Intermediate' | 'Hard';
  benefits: string[];
  videoUrl: string;
  image: {
    id: string;
    url: string;
    hint: string;
  };
};

// Types for AI functionality (currently using static data)
export interface DailyActivityOutput {
  summary: string;
  suggestions: string[];
}
