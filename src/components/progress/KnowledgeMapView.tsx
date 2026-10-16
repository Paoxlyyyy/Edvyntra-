import React, { useState } from 'react';
import { StudentProfile, Subject, Topic } from '../../types';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
  Target,
  Bot
} from 'lucide-react';

interface KnowledgeMapViewProps {
  currentUser: StudentProfile;
  onNavigateToPractice: (subjectId: string, topicName?: string) => void;
  onNavigateToTutor: (subjectId: string, topicName?: string) => void;
}

export const KnowledgeMapView: React.FC<KnowledgeMapViewProps> = ({
  currentUser,
  onNavigateToPractice,
  onNavigateToTutor
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(currentUser.subjects[0]?.id || '');

  const activeSubject = currentUser.subjects.find(s => s.id === selectedSubjectId) || currentUser.subjects[0];

  // Aggregate stats across all subjects
  const allTopics: { subjectName: string; subjectId: string; topic: Topic }[] = [];
  currentUser.subjects.forEach(s => {
    s.topics.forEach(t => {
      allTopics.push({
        subjectName: s.name,
        subjectId: s.id,
        topic: t
      });
    });
  });

  const masteredTopics = allTopics.filter(item => item.topic.status === 'mastered');
  const needsWorkTopics = allTopics.filter(item => item.topic.status === 'needs_reinforcement');
  const inProgressTopics = allTopics.filter(item => item.topic.status === 'in_progress');

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg text-xs font-bold mb-1.5">
            <Compass className="w-4 h-4" />
            <span>Mapa de Conocimiento y Progreso Real</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Tu trayectoria de aprendizaje
          </h2>
          <p className="text-xs text-slate-500">
            Indicadores calculados a partir de tus {currentUser.recentActivities.length} actividades registradas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Racha de estudio</p>
            <p className="text-sm font-extrabold text-blue-600 flex items-center justify-end gap-1">
              🔥 {currentUser.streakDays} días
            </p>
          </div>
        </div>
      </div>

      {/* Top Mastery KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Dominados */}
        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-950">{masteredTopics.length}</p>
            <p className="text-xs font-bold text-emerald-800">Temas que dominas</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">Precisión de acierto ≥ 80%</p>
          </div>
        </div>

        {/* Card 2: Por reforzar */}
        <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-amber-950">{needsWorkTopics.length}</p>
            <p className="text-xs font-bold text-amber-800">Temas que necesitas reforzar</p>
            <p className="text-[11px] text-amber-600 mt-0.5">Errores frecuentes detectados</p>
          </div>
        </div>

        {/* Card 3: En progreso */}
        <div className="p-5 rounded-3xl bg-blue-50/70 border border-blue-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-blue-950">{inProgressTopics.length}</p>
            <p className="text-xs font-bold text-blue-800">Temas en progreso</p>
            <p className="text-[11px] text-blue-600 mt-0.5">Prácticas activas en curso</p>
          </div>
        </div>
      </div>

      {/* Subject Tabs and Topics Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Desglose por materia y tema</span>
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {currentUser.subjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubjectId === sub.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {sub.name} ({sub.progressPercent}%)
              </button>
            ))}
          </div>
        </div>

        {/* Active Subject Detail */}
        {activeSubject && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">{activeSubject.name}</h4>
                <p className="text-xs text-slate-500">
                  {activeSubject.category} • {activeSubject.isCustom ? 'Materia adicional' : 'Currículo oficial'}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-500">Dominio global:</span>
                <span className="text-lg font-black text-blue-600 ml-2">{activeSubject.progressPercent}%</span>
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeSubject.topics.map(topic => {
                let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
                let label = 'No iniciado';

                if (topic.status === 'mastered') {
                  badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
                  label = 'Dominado';
                } else if (topic.status === 'needs_reinforcement') {
                  badgeClass = 'bg-amber-50 text-amber-800 border-amber-300';
                  label = 'Necesita refuerzo';
                } else if (topic.status === 'in_progress') {
                  badgeClass = 'bg-blue-50 text-blue-800 border-blue-300';
                  label = 'En progreso';
                }

                return (
                  <div
                    key={topic.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeClass}`}>
                          {label}
                        </span>
                        <span className="text-xs font-extrabold text-slate-700">
                          {topic.masteryScore}%
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{topic.name}</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Intentos: {topic.exercisesAttempted} • Aciertos: {topic.exercisesCorrect}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          topic.status === 'mastered'
                            ? 'bg-emerald-500'
                            : topic.status === 'needs_reinforcement'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${topic.masteryScore}%` }}
                      />
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60">
                      <button
                        onClick={() => onNavigateToTutor(activeSubject.id, topic.name)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Bot className="w-3 h-3" /> Tutor
                      </button>
                      <button
                        onClick={() => onNavigateToPractice(activeSubject.id, topic.name)}
                        className="text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Target className="w-3 h-3" /> Practicar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Topics to Reinforce (Requirement 9) */}
      {needsWorkTopics.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Recomendaciones prioritarias basadas en tus resultados:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {needsWorkTopics.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white border border-amber-200 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.topic.name}</p>
                  <p className="text-[11px] text-amber-700">{item.subjectName} • Precisión actual: {item.topic.masteryScore}%</p>
                </div>
                <button
                  onClick={() => onNavigateToPractice(item.subjectId, item.topic.name)}
                  className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors shrink-0 ml-2"
                >
                  Reforzar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
