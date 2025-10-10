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
