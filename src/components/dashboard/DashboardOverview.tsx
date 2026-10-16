import React from 'react';
import { StudentProfile, Subject, Topic } from '../../types';
import {
  Sparkles,
  Plus,
  BookOpen,
  Target,
  Bot,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  Settings,
  GraduationCap
} from 'lucide-react';

interface DashboardOverviewProps {
  currentUser: StudentProfile;
  onOpenAddSubject: () => void;
  onOpenSettings: () => void;
  onNavigateToTutor: (subjectId?: string, topicName?: string) => void;
  onNavigateToScanner: () => void;
  onNavigateToPractice: (subjectId?: string, topicName?: string) => void;
  onNavigateToMap: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentUser,
  onOpenAddSubject,
  onOpenSettings,
  onNavigateToTutor,
  onNavigateToScanner,
  onNavigateToPractice,
  onNavigateToMap
}) => {
  const firstName = currentUser.name.split(' ')[0] || 'Estudiante';

  // Base vs Custom Subjects
  const baseSubjects = currentUser.subjects.filter(s => !s.isCustom);
  const customSubjects = currentUser.subjects.filter(s => s.isCustom);

  // Extract all topics
  const allTopics: { subject: Subject; topic: Topic }[] = [];
  currentUser.subjects.forEach(s => {
    s.topics.forEach(t => allTopics.push({ subject: s, topic: t }));
  });

  const masteredTopics = allTopics.filter(item => item.topic.status === 'mastered');
  const needsWorkTopics = allTopics.filter(item => item.topic.status === 'needs_reinforcement');

  // Overall average progress
  const averageProgress = currentUser.subjects.length > 0
    ? Math.round(
        currentUser.subjects.reduce((acc, s) => acc + s.progressPercent, 0) / currentUser.subjects.length
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. Personal Greeting Banner (Requirement 5) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-950/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Grado: {currentUser.gradeName.split(' ')[0]} ({currentUser.age} años)
              </span>
              <span className="text-xs text-slate-300 bg-white/5 px-2.5 py-1 rounded-full">
                {currentUser.countryName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              ¡Hola, {firstName}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Tu tutor educativo de <strong>EDVYNTRA</strong> está listo. Continuemos avanzando en tus materias oficiales y personalizadas.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Racha</p>
              <p className="text-2xl font-black text-amber-400 mt-0.5">🔥 {currentUser.streakDays} d</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[110px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Dominio general</p>
              <p className="text-2xl font-black text-cyan-300 mt-0.5">{averageProgress}%</p>
            </div>

            <button
              onClick={onOpenSettings}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 text-slate-200 transition-colors self-center"
              title="Ajustes de perfil"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Quick Action Cards (Tutor, Scanner, Practice) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Tutor card */}
        <button
          onClick={() => onNavigateToTutor()}
          className="p-5 rounded-3xl bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs transition-all text-left flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 transition-colors">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Tutor IA Personalizado
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pistas, explicaciones, ejemplos y soluciones guiadas paso a paso.
            </p>
          </div>
        </button>

        {/* Scanner card */}
        <button
          onClick={onNavigateToScanner}
          className="p-5 rounded-3xl bg-white hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-300 shadow-xs transition-all text-left flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
            <ScanLine className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Escáner de Ejercicios
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sube foto de tu cuaderno y resuélvelo guiado por IA con visión.
            </p>
          </div>
        </button>

        {/* Practice card */}
        <button
          onClick={() => onNavigateToPractice()}
          className="p-5 rounded-3xl bg-white hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 shadow-xs transition-all text-left flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 flex items-center justify-center shrink-0 transition-colors">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Práctica Adaptativa
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ejercicios que detectan errores comunes y te explican el porqué.
            </p>
          </div>
        </button>
      </div>

      {/* 3. Subjects Section with "Agregar materia" button (Requirement 3 & 5) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Estas son tus materias ({currentUser.subjects.length})
            </h2>
            <p className="text-xs text-slate-500">
              Configuradas a partir de tu sistema educativo en {currentUser.countryName} y tus asignaturas añadidas.
            </p>
          </div>

          {/* Visible "Agregar materia" Button (Requirement 3) */}
          <button
            onClick={onOpenAddSubject}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar materia</span>
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {currentUser.subjects.map(subject => {
            const hasProgress = subject.progressPercent > 0;
            return (
              <div
                key={subject.id}
                className="p-4 rounded-2xl border border-slate-200/90 hover:border-blue-300 bg-slate-50/60 hover:bg-white transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {subject.isCustom ? 'Materia Adicional' : 'Curricular Oficial'}
                    </span>
                    <span className="text-xs font-black text-blue-600">
                      {hasProgress ? `${subject.progressPercent}%` : 'En progreso'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {subject.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {subject.description || `${subject.topics.length} temas escolares`}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${Math.max(subject.progressPercent, 5)}%` }}
                    />
                  </div>
                </div>

                {/* Direct quick action buttons for this subject */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                  <button
                    onClick={() => onNavigateToTutor(subject.id)}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    Tutor IA
                  </button>

                  <button
                    onClick={() => onNavigateToPractice(subject.id)}
                    className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                  >
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                    Ejercicios
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Mastery Analysis: Temas que dominas vs Temas que necesitas reforzar (Requirement 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temas que dominas */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Temas que dominas ({masteredTopics.length})</span>
            </h3>
            <button
              onClick={onNavigateToMap}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Ver mapa completo
            </button>
          </div>

          {masteredTopics.length > 0 ? (
            <div className="space-y-2">
              {masteredTopics.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-emerald-950">{item.topic.name}</p>
                    <p className="text-[11px] text-emerald-700">{item.subject.name}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    {item.topic.masteryScore}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Completa ejercicios de práctica con más de 80% de aciertos para registrar tus temas dominados.
            </div>
          )}
        </div>

        {/* Temas que necesitas reforzar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Temas que necesitas reforzar ({needsWorkTopics.length})</span>
            </h3>
            <button
              onClick={() => onNavigateToPractice()}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Practicar ahora
            </button>
          </div>

          {needsWorkTopics.length > 0 ? (
            <div className="space-y-2">
              {needsWorkTopics.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-2xl flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-amber-950">{item.topic.name}</p>
                    <p className="text-[11px] text-amber-700">{item.subject.name} • {item.topic.masteryScore}% de acierto</p>
                  </div>
                  <button
                    onClick={() => onNavigateToPractice(item.subject.id, item.topic.name)}
                    className="text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-xl transition-colors"
                  >
                    Reforzar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-emerald-600 bg-emerald-50/40 rounded-2xl border border-emerald-100">
              ¡No tienes temas con errores recurrentes registrados por ahora!
            </div>
          )}
        </div>
      </div>

      {/* 5. Actividad reciente & Recomendaciones personalizadas (Requirement 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Actividad Reciente */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Actividad reciente</span>
          </h3>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {currentUser.recentActivities.length > 0 ? (
              currentUser.recentActivities.slice(0, 6).map(act => (
                <div
                  key={act.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{act.subjectName}</span>
                      <span className="text-[10px] text-slate-400">• {act.timestamp}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{act.description}</p>
                  </div>
                  {act.score !== undefined && (
                    <span className="font-extrabold text-blue-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200 shrink-0">
                      {act.score}%
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">
                No hay actividades registradas aún.
              </p>
            )}
          </div>
        </div>

        {/* Recomendaciones personalizadas */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-slate-50 rounded-3xl border border-blue-200/70 shadow-xs p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Recomendaciones personalizadas</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Basadas en tu grado escolar ({currentUser.gradeName}) y tus resultados reales.
            </p>

            <div className="space-y-2.5 mt-4">
              {needsWorkTopics.length > 0 ? (
                <div className="p-3 bg-white rounded-2xl border border-blue-200/80 text-xs space-y-1">
                  <p className="font-bold text-slate-800">
                    🎯 Refuerzo urgente en {needsWorkTopics[0].subject.name}
                  </p>
                  <p className="text-slate-600">
                    Tu dominio en &quot;{needsWorkTopics[0].topic.name}&quot; es del {needsWorkTopics[0].topic.masteryScore}%. Realiza 3 ejercicios guiados hoy.
                  </p>
                  <button
                    onClick={() => onNavigateToPractice(needsWorkTopics[0].subject.id, needsWorkTopics[0].topic.name)}
                    className="text-xs font-bold text-blue-600 hover:underline pt-1 inline-block"
                  >
                    Comenzar refuerzo →
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-white rounded-2xl border border-blue-200/80 text-xs space-y-1">
                  <p className="font-bold text-slate-800">
                    🌟 Excelente ritmo en tus materias básicas
                  </p>
                  <p className="text-slate-600">
                    Estás al día con tus temas. Puedes explorar una materia adicional como Programación con Python o Inteligencia Artificial.
                  </p>
                  <button
                    onClick={onOpenAddSubject}
                    className="text-xs font-bold text-blue-600 hover:underline pt-1 inline-block"
                  >
                    Explorar materias adicionales →
                  </button>
                </div>
              )}

              <div className="p-3 bg-white rounded-2xl border border-blue-200/80 text-xs space-y-1">
                <p className="font-bold text-slate-800">
                  📸 ¿Tienes tareas del cuaderno?
                </p>
                <p className="text-slate-600">
                  Usa el Escáner para pedir pistas sobre tus ejercicios sin esperar a que te den la respuesta sin explicar.
                </p>
                <button
                  onClick={onNavigateToScanner}
                  className="text-xs font-bold text-blue-600 hover:underline pt-1 inline-block"
                >
                  Abrir Escáner →
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-blue-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
            <span>EDVYNTRA AI Engine</span>
            <span>Aprende · Crea · Avanza</span>
          </div>
        </div>
      </div>
    </div>
  );
};
