import type { User, WorkoutHistory, WorkoutCategory, Exercise, ReportData, Challenge } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const user: User = {
  name: 'Alex',
  email: 'alex@example.com',
  avatar: PlaceHolderImages.find((img) => img.id === 'user-avatar')?.imageUrl ?? '',
};

export const workoutHistory: WorkoutHistory[] = [
  { id: '1', activity: 'Morning Run', duration: '30 min', calories: '300 kcal', date: '2024-07-21' },
  { id: '2', activity: 'Weight Training', duration: '45 min', calories: '450 kcal', date: '2024-07-20' },
  { id: '3', activity: 'Yoga Session', duration: '60 min', calories: '250 kcal', date: '2024-07-19' },
  { id: '4', activity: 'HIIT', duration: '20 min', calories: '350 kcal', date: '2024-07-18' },
  { id: '5', activity: 'Evening Walk', duration: '40 min', calories: '150 kcal', date: '2024-07-17' },
];

const getImageUrl = (id: string) => PlaceHolderImages.find((img) => img.id === id);

export const workoutCategories: WorkoutCategory[] = [
  {
    id: 'cardio',
    title: 'Cardio',
    description: 'Boost your heart rate and endurance.',
    image: {
      id: 'cardio-workout',
      url: getImageUrl('cardio-workout')?.imageUrl ?? '',
      hint: getImageUrl('cardio-workout')?.imageHint ?? '',
    },
  },
  {
    id: 'strength',
    title: 'Strength',
    description: 'Build muscle and increase your power.',
    image: {
      id: 'strength-workout',
      url: getImageUrl('strength-workout')?.imageUrl ?? '',
      hint: getImageUrl('strength-workout')?.imageHint ?? '',
    },
  },
  {
    id: 'balance',
    title: 'Balance',
    description: 'Improve stability and core strength.',
    image: {
      id: 'balance-workout',
      url: getImageUrl('balance-workout')?.imageUrl ?? '',
      hint: getImageUrl('balance-workout')?.imageHint ?? '',
    },
  },
  {
    id: 'legs',
    title: 'Legs',
    description: 'Focus on lower body strength and toning.',
    image: {
      id: 'legs-workout',
      url: getImageUrl('legs-workout')?.imageUrl ?? '',
      hint: getImageUrl('legs-workout')?.imageHint ?? '',
    },
  },
];

export const exercises: { [key: string]: Exercise[] } = {
  cardio: [
    {
      id: 'jumping-jacks',
      title: 'Jumping Jacks',
      description: 'A full-body exercise that you can do anywhere.',
      steps: [
        'Stand upright with your legs together, arms at your sides.',
        'Bend your knees slightly, and jump into the air.',
        'As you jump, spread your legs to be about shoulder-width apart. Stretch your arms out and over your head.',
        'Jump back to starting position.',
      ],
      benefits: ['Improves cardiovascular health', 'Strengthens bones', 'Full-body workout'],
      videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8',
    },
    {
      id: 'high-knees',
      title: 'High Knees',
      description: 'A great way to warm up and get your heart rate up.',
      steps: [
        'Stand with your feet hip-width apart.',
        'Lift your left knee to your chest.',
        'Switch to lift your right knee to your chest. Continue the movement, alternating legs and moving at a sprinting or running pace.',
      ],
      benefits: ['Increases heart rate', 'Improves coordination and momentum', 'Warms up lower body'],
      videoUrl: 'https://www.youtube.com/embed/QPf_9E-fqsc',
    },
  ],
  strength: [
    {
      id: 'push-ups',
      title: 'Push-ups',
      description: 'A classic bodyweight exercise to build upper body strength.',
      steps: [
        'Get on all fours, placing your hands slightly wider than your shoulders.',
        'Straighten your arms and legs.',
        'Lower your body until your chest nearly touches the floor.',
        'Push yourself back up.',
      ],
      benefits: ['Builds upper body and core strength', 'No equipment needed', 'Strengthens chest, shoulders, and triceps'],
      videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
    }
  ],
  balance: [
    {
      id: 'tree-pose',
      title: 'Tree Pose (Vrikshasana)',
      description: 'A yoga pose that improves balance and stability.',
      steps: [
        'Stand tall and straight with arms by the side of your body.',
        'Bend your right knee and place your right foot high up on your left thigh.',
        'Once you are well balanced, take a deep breath in, gracefully raise your arms over your head from the side, and bring your palms together in \'Namaste\' mudra (hands-folded position).',
        'Hold the pose for a few breaths. With a slow exhalation, gently bring down your hands from the sides. You may gently release the right leg.',
      ],
      benefits: ['Strengthens spine, thighs, calves, ankles and feet', 'Improves balance and concentration', 'Stretches the groin and inner thighs'],
      videoUrl: 'https://www.youtube.com/embed/yVE4XXFFO7I',
    }
  ],
  legs: [
    {
      id: 'squats',
      title: 'Squats',
      description: 'A fundamental exercise for building lower body strength.',
      steps: [
        'Stand with your feet a little wider than your hips, toes facing front.',
        'Drive your hips back—bending at the knees and ankles and pressing your knees slightly open.',
        'Sit into a squat position while keeping your heels and toes on the ground, your chest up and your shoulders back.',
        'Strive to eventually reach parallel, meaning your hips are in line with your knees.',
      ],
      benefits: ['Strengthens lower body muscles', 'Improves mobility', 'Increases core strength'],
      videoUrl: 'https://www.youtube.com/embed/C_VtOYc6j5c',
    }
  ],
};


export const weeklyReport: ReportData[] = [
  { date: 'Mon', 'Workout Time': 30, 'Calories Burnt': 300, Steps: 5000 },
  { date: 'Tue', 'Workout Time': 45, 'Calories Burnt': 450, Steps: 7000 },
  { date: 'Wed', 'Workout Time': 60, 'Calories Burnt': 250, Steps: 4000 },
  { date: 'Thu', 'Workout Time': 20, 'Calories Burnt': 350, Steps: 6000 },
  { date: 'Fri', 'Workout Time': 75, 'Calories Burnt': 600, Steps: 10000 },
  { date: 'Sat', 'Workout Time': 90, 'Calories Burnt': 800, Steps: 12000 },
  { date: 'Sun', 'Workout Time': 15, 'Calories Burnt': 100, Steps: 2000 },
];

export const monthlyReport: ReportData[] = [
    { date: 'Week 1', 'Workout Time': 285, 'Calories Burnt': 2850, Steps: 44000 },
    { date: 'Week 2', 'Workout Time': 310, 'Calories Burnt': 3100, Steps: 48000 },
    { date: 'Week 3', 'Workout Time': 290, 'Calories Burnt': 2900, Steps: 45000 },
    { date: 'Week 4', 'Workout Time': 350, 'Calories Burnt': 3500, Steps: 52000 },
];

export const challenges: Challenge[] = [
  {
    id: 'steps-challenge-1',
    title: 'The 50,000 Steps Challenge',
    description: 'Walk 50,000 steps this week to complete the challenge.',
    metric: 'Steps',
    goal: 50000,
    participants: 128,
    image: {
      id: 'steps-challenge',
      url: getImageUrl('steps-challenge')?.imageUrl ?? '',
      hint: getImageUrl('steps-challenge')?.imageHint ?? '',
    },
  },
  {
    id: 'calories-challenge-1',
    title: 'The 3,000 Calories Burnt Challenge',
    description: 'Burn 3,000 calories this week through any activity.',
    metric: 'Calories Burnt',
    goal: 3000,
    participants: 76,
    image: {
      id: 'calories-challenge',
      url: getImageUrl('calories-challenge')?.imageUrl ?? '',
      hint: getImageUrl('calories-challenge')?.imageHint ?? '',
    },
  },
  {
    id: 'workout-time-challenge-1',
    title: 'The 5-Hour Workout Challenge',
    description: 'Log 300 minutes of workout time this week.',
    metric: 'Workout Time',
    goal: 300,
    participants: 92,
    image: {
      id: 'workout-time-challenge',
      url: getImageUrl('workout-time-challenge')?.imageUrl ?? '',
      hint: getImageUrl('workout-time-challenge')?.imageHint ?? '',
    },
  },
];
