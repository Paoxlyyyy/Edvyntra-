export type CountryCode = 
  | 'SV' // El Salvador
  | 'MX' // México
  | 'CO' // Colombia
  | 'ES' // España
  | 'AR' // Argentina
  | 'CL' // Chile
  | 'PE' // Perú
  | 'GT' // Guatemala
  | 'INT'; // Internacional / Otros

export interface GradeOption {
  id: string;
  name: string;
  level: string; // e.g., 'Tercer Ciclo', 'Bachillerato', 'Secundaria'
  typicalAgeRange: string;
  defaultSubjects: {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: string;
    color: string;
    topics: string[];
  }[];
}

export interface CountryEducationSystem {
  code: CountryCode;
  countryName: string;
  flag: string;
  description: string;
  grades: GradeOption[];
}

export interface Topic {
  id: string;
  name: string;
  masteryScore: number; // 0 to 100
  exercisesAttempted: number;
  exercisesCorrect: number;
  lastStudied?: string;
  status: 'not_started' | 'needs_reinforcement' | 'in_progress' | 'mastered';
}

export interface Subject {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon: string;
  color: string;
  isCustom: boolean; // false = oficial del sistema escolar, true = agregada por el estudiante
  topics: Topic[];
  progressPercent: number; // 0 to 100
  totalExercisesDone: number;
  correctExercises: number;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'tutor_query' | 'practice_exercise' | 'scanned_exercise' | 'subject_added';
  subjectName: string;
  topicName?: string;
  description: string;
  score?: number;
  isCorrect?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number; // 12 to 18
  countryCode: CountryCode;
  countryName: string;
  gradeId: string;
  gradeName: string;
  subjects: Subject[];
  academicInterests: string[];
  recentActivities: ActivityItem[];
  streakDays: number;
  lastActiveDate: string;
  createdAt: string;
}

export type TutorHelpMode = 'pista' | 'explicacion' | 'ejemplo' | 'solucion_guiada';

export interface TutorMessage {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: string;
  mode?: TutorHelpMode;
  subjectId?: string;
  subjectName?: string;
  topicName?: string;
  stepByStep?: string[];
  followUpSuggestions?: string[];
}

export interface ScannedExerciseResult {
  id: string;
  imageUrl: string;
  detectedText: string;
  subjectSuggestion: string;
  topicSuggestion: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  hint: string;
  explanation: string;
  guidedSteps: string[];
  similarExercises: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface PracticeQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  difficulty: 'Básico' | 'Intermedio' | 'Desafío';
  question: string;
  options: string[];
  correctOptionIndex: number;
  hint: string;
  explanation: string;
  commonMistakeExplanation?: string;
}
