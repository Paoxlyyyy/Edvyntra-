import { StudentProfile, Subject, ActivityItem, Topic } from '../types';
import { buildDefaultSubjectsForGrade } from '../data/educationSystems';

const STORAGE_KEY_CURRENT_USER_ID = 'edvyntra_current_user_id';
const STORAGE_KEY_USERS = 'edvyntra_users_db_v1';

// Seed default profile matching user specification
function createDefaultSeedProfile(): StudentProfile {
  const baseSubjects = buildDefaultSubjectsForGrade('SV', 'sv-9');

  // Let's configure realistic progress on Alex's profile matching prompt examples:
  // Matemáticas — 72%, Ciencias Naturales — 84%, Lenguaje y Literatura — 91%, Programación — En progreso
  const mathSubject = baseSubjects.find(s => s.name.toLowerCase().includes('matemática'));
  if (mathSubject) {
    mathSubject.progressPercent = 72;
    mathSubject.totalExercisesDone = 25;
    mathSubject.correctExercises = 18;
    if (mathSubject.topics[0]) {
      mathSubject.topics[0].masteryScore = 90;
      mathSubject.topics[0].exercisesAttempted = 10;
      mathSubject.topics[0].exercisesCorrect = 9;
      mathSubject.topics[0].status = 'mastered';
    }
    if (mathSubject.topics[1]) {
      mathSubject.topics[1].masteryScore = 45;
      mathSubject.topics[1].exercisesAttempted = 8;
      mathSubject.topics[1].exercisesCorrect = 4;
      mathSubject.topics[1].status = 'needs_reinforcement';
    }
    if (mathSubject.topics[2]) {
      mathSubject.topics[2].masteryScore = 75;
      mathSubject.topics[2].exercisesAttempted = 7;
      mathSubject.topics[2].exercisesCorrect = 5;
      mathSubject.topics[2].status = 'in_progress';
    }
  }

  const scienceSubject = baseSubjects.find(s => s.name.toLowerCase().includes('ciencia'));
  if (scienceSubject) {
    scienceSubject.progressPercent = 84;
    scienceSubject.totalExercisesDone = 20;
    scienceSubject.correctExercises = 17;
    if (scienceSubject.topics[0]) {
      scienceSubject.topics[0].masteryScore = 95;
      scienceSubject.topics[0].exercisesAttempted = 10;
      scienceSubject.topics[0].exercisesCorrect = 10;
      scienceSubject.topics[0].status = 'mastered';
    }
    if (scienceSubject.topics[1]) {
      scienceSubject.topics[1].masteryScore = 60;
      scienceSubject.topics[1].exercisesAttempted = 5;
      scienceSubject.topics[1].exercisesCorrect = 3;
      scienceSubject.topics[1].status = 'in_progress';
    }
  }

  const langSubject = baseSubjects.find(s => s.name.toLowerCase().includes('lenguaje'));
  if (langSubject) {
    langSubject.progressPercent = 91;
    langSubject.totalExercisesDone = 22;
    langSubject.correctExercises = 20;
    if (langSubject.topics[0]) {
      langSubject.topics[0].masteryScore = 95;
      langSubject.topics[0].exercisesAttempted = 12;
      langSubject.topics[0].exercisesCorrect = 11;
      langSubject.topics[0].status = 'mastered';
    }
  }

  // Custom subject added by Alex: Programación con Python
  const pythonCustomSubject: Subject = {
    id: 'custom-prog-python',
    name: 'Programación con Python',
    category: 'Tecnología & Programación',
    description: 'Aprende a programar desde cero: variables, condicionales, bucles y lógica computacional.',
    icon: 'Terminal',
    color: 'sky',
    isCustom: true,
    progressPercent: 40,
    totalExercisesDone: 10,
    correctExercises: 4,
    topics: [
      {
        id: 'py-t1',
        name: 'Sintaxis básica y variables',
        masteryScore: 80,
        exercisesAttempted: 5,
        exercisesCorrect: 4,
        status: 'mastered'
      },
      {
        id: 'py-t2',
        name: 'Condicionales (if / else) y operadores',
        masteryScore: 30,
        exercisesAttempted: 5,
        exercisesCorrect: 2,
        status: 'needs_reinforcement'
      },
      {
        id: 'py-t3',
        name: 'Bucles (for y while)',
        masteryScore: 0,
        exercisesAttempted: 0,
        exercisesCorrect: 0,
        status: 'not_started'
      }
    ]
  };

  const allSubjects = [...baseSubjects, pythonCustomSubject];

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  const initialActivities: ActivityItem[] = [
    {
      id: 'act-1',
      timestamp: `${dateStr}, hace 25 min`,
      type: 'practice_exercise',
      subjectName: 'Matemática',
      topicName: 'Ecuaciones cuadráticas',
      description: 'Completó 5 ejercicios de práctica adaptativa con 60% de aciertos.',
      score: 60,
      isCorrect: true
    },
    {
      id: 'act-2',
      timestamp: `${dateStr}, hace 1 hora`,
      type: 'tutor_query',
      subjectName: 'Ciencia, Salud y Medio Ambiente',
      topicName: 'Estructura del átomo',
      description: 'Consultó al Tutor IA sobre la diferencia entre número atómico y número másico.',
    },
    {
      id: 'act-3',
      timestamp: `Ayer, 4:20 PM`,
      type: 'practice_exercise',
      subjectName: 'Lenguaje y Literatura',
      topicName: 'El ensayo crítico y argumentativo',
      description: 'Resolvió cuestionario de lectura crítica y figuras literarias con 95% de acierto.',
      score: 95,
      isCorrect: true
    },
    {
      id: 'act-4',
      timestamp: `Hace 2 días`,
      type: 'subject_added',
      subjectName: 'Programación con Python',
      description: 'Añadió la materia adicional "Programación con Python" a su plan de estudio.'
    }
  ];

  return {
    id: 'user-demo-alex',
    name: 'Alex Rivera',
    age: 14,
    countryCode: 'SV',
    countryName: 'El Salvador',
    gradeId: 'sv-9',
    gradeName: '9.º Grado (Tercer Ciclo)',
    subjects: allSubjects,
    academicInterests: ['Tecnología e Inteligencia Artificial', 'Ciencias Exactas', 'Robótica'],
    recentActivities: initialActivities,
    streakDays: 4,
    lastActiveDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
  };
}

class StorageService {
  private users: Map<string, StudentProfile> = new Map();
  private currentUserId: string | null = null;
  private isLoaded = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    try {
      const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      const storedCurrentId = localStorage.getItem(STORAGE_KEY_CURRENT_USER_ID);

      if (storedUsers) {
        const parsed = JSON.parse(storedUsers) as Record<string, StudentProfile>;
        this.users = new Map(Object.entries(parsed));
      }

      // If empty, seed default Alex profile
      if (this.users.size === 0) {
        const seedProfile = createDefaultSeedProfile();
        this.users.set(seedProfile.id, seedProfile);
        this.currentUserId = seedProfile.id;
        this.saveToStorage();
      } else {
        this.currentUserId = storedCurrentId && this.users.has(storedCurrentId)
          ? storedCurrentId
          : Array.from(this.users.keys())[0];
      }

      this.isLoaded = true;
    } catch (e) {
      console.error('Error loading EDVYNTRA storage:', e);
      const seedProfile = createDefaultSeedProfile();
      this.users.set(seedProfile.id, seedProfile);
      this.currentUserId = seedProfile.id;
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      const obj: Record<string, StudentProfile> = {};
      this.users.forEach((profile, id) => {
        obj[id] = profile;
      });
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(obj));
      if (this.currentUserId) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, this.currentUserId);
      }
    } catch (e) {
      console.error('Error saving EDVYNTRA storage:', e);
    }
  }

  public getCurrentUser(): StudentProfile | null {
    if (!this.isLoaded) this.loadFromStorage();
    if (!this.currentUserId) return null;
    return this.users.get(this.currentUserId) || null;
  }

  public getAllUsers(): StudentProfile[] {
    if (!this.isLoaded) this.loadFromStorage();
    return Array.from(this.users.values());
  }

  public setCurrentUser(userId: string): boolean {
    if (this.users.has(userId)) {
      this.currentUserId = userId;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public saveUser(profile: StudentProfile): void {
    this.users.set(profile.id, profile);
    this.currentUserId = profile.id;
    this.saveToStorage();
  }

  public deleteUser(userId: string): void {
    this.users.delete(userId);
    if (this.currentUserId === userId) {
      const remaining = Array.from(this.users.keys());
      this.currentUserId = remaining.length > 0 ? remaining[0] : null;
    }
    this.saveToStorage();
  }

  public addSubjectToCurrentUser(newSubject: Subject): StudentProfile | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    // Check if subject with same name already exists
    const exists = user.subjects.some(
      s => s.name.toLowerCase().trim() === newSubject.name.toLowerCase().trim()
    );
    if (exists) return user;

    user.subjects.push(newSubject);
    user.recentActivities.unshift({
      id: `act-${Date.now()}`,
      timestamp: 'Justo ahora',
      type: 'subject_added',
      subjectName: newSubject.name,
      description: `Agregó ${newSubject.isCustom ? 'la materia adicional' : 'la materia'} "${newSubject.name}".`
    });

    this.saveUser(user);
    return user;
  }

  public removeSubjectFromCurrentUser(subjectId: string): StudentProfile | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    user.subjects = user.subjects.filter(s => s.id !== subjectId);
    this.saveUser(user);
    return user;
  }

  public updateProfileSettings(updates: Partial<StudentProfile>): StudentProfile | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    const updatedUser = {
      ...user,
      ...updates,
      lastActiveDate: new Date().toISOString()
    };

    this.saveUser(updatedUser);
    return updatedUser;
  }

  public recordExerciseAttempt(
    subjectId: string,
    topicId: string,
    topicName: string,
    isCorrect: boolean,
    details?: string
  ): StudentProfile | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    const subject = user.subjects.find(s => s.id === subjectId);
    if (!subject) return user;

    subject.totalExercisesDone = (subject.totalExercisesDone || 0) + 1;
    if (isCorrect) {
      subject.correctExercises = (subject.correctExercises || 0) + 1;
    }

    let topic = subject.topics.find(t => t.id === topicId || t.name === topicName);
    if (!topic) {
      topic = {
        id: topicId || `t-${Date.now()}`,
        name: topicName || 'Tema general',
        masteryScore: 0,
        exercisesAttempted: 0,
        exercisesCorrect: 0,
        status: 'in_progress'
      };
      subject.topics.push(topic);
    }

    topic.exercisesAttempted += 1;
    if (isCorrect) {
      topic.exercisesCorrect += 1;
    }
    topic.lastStudied = new Date().toISOString();

    // Recalculate topic mastery
    const topicRatio = topic.exercisesCorrect / topic.exercisesAttempted;
    topic.masteryScore = Math.min(100, Math.round(topicRatio * 100));

    if (topic.masteryScore >= 80 && topic.exercisesAttempted >= 3) {
      topic.status = 'mastered';
    } else if (topic.masteryScore < 60 && topic.exercisesAttempted >= 2) {
      topic.status = 'needs_reinforcement';
    } else {
      topic.status = 'in_progress';
    }

    // Recalculate subject overall progress percentage
    if (subject.topics.length > 0) {
      const avgMastery = Math.round(
        subject.topics.reduce((acc, t) => acc + t.masteryScore, 0) / subject.topics.length
      );
      subject.progressPercent = avgMastery;
    } else if (subject.totalExercisesDone > 0) {
      subject.progressPercent = Math.round((subject.correctExercises / subject.totalExercisesDone) * 100);
    }

    // Add activity
    user.recentActivities.unshift({
      id: `act-${Date.now()}`,
      timestamp: 'Justo ahora',
      type: 'practice_exercise',
      subjectName: subject.name,
      topicName: topic.name,
      description: isCorrect
        ? `Resolvió correctamente un ejercicio de ${topic.name}.`
        : `Completó un intento en ${topic.name} (tema a reforzar).`,
      isCorrect,
      score: isCorrect ? 100 : 0
    });

    if (user.recentActivities.length > 25) {
      user.recentActivities = user.recentActivities.slice(0, 25);
    }

    user.lastActiveDate = new Date().toISOString();
    this.saveUser(user);
    return user;
  }

  public recordTutorActivity(subjectName: string, topicName: string, querySnippet: string): void {
    const user = this.getCurrentUser();
    if (!user) return;

    user.recentActivities.unshift({
      id: `act-${Date.now()}`,
      timestamp: 'Justo ahora',
      type: 'tutor_query',
      subjectName,
      topicName,
      description: `Consultó al Tutor IA: "${querySnippet.slice(0, 60)}${querySnippet.length > 60 ? '...' : ''}"`
    });

    if (user.recentActivities.length > 25) {
      user.recentActivities = user.recentActivities.slice(0, 25);
    }

    user.lastActiveDate = new Date().toISOString();
    this.saveUser(user);
  }

  public resetToDefaultAlex(): StudentProfile {
    const seed = createDefaultSeedProfile();
    this.users.set(seed.id, seed);
    this.currentUserId = seed.id;
    this.saveToStorage();
    return seed;
  }
}

export const storageService = new StorageService();
