import React, { useState, useEffect } from 'react';
import { StudentProfile, Subject, PracticeQuestion } from '../../types';
import { storageService } from '../../services/storageService';
import { apiRequest } from '../../services/apiService';
import {
  Target,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Trophy,
  Flame,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface PracticeArenaViewProps {
  currentUser: StudentProfile;
  initialSubjectId?: string;
  initialTopicName?: string;
  onUpdatedProfile: () => void;
  onNavigateToTutor?: (subjectId: string, topicName?: string) => void;
}

export const PracticeArenaView: React.FC<PracticeArenaViewProps> = ({
  currentUser,
  initialSubjectId,
  initialTopicName,
  onUpdatedProfile,
  onNavigateToTutor
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || currentUser.subjects[0]?.id || ''
  );
  const [selectedTopicName, setSelectedTopicName] = useState<string>(initialTopicName || '');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const selectedSubject = currentUser.subjects.find(s => s.id === selectedSubjectId) || currentUser.subjects[0];

  useEffect(() => {
    if (selectedSubject && selectedSubject.topics.length > 0 && !selectedTopicName) {
      // Pick first topic or one that needs reinforcement
      const weak = selectedSubject.topics.find(t => t.status === 'needs_reinforcement');
      setSelectedTopicName(weak ? weak.name : selectedSubject.topics[0].name);
    }
  }, [selectedSubjectId]);

  const loadQuestions = async () => {
    if (!selectedSubject) return;
    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScoreCount({ correct: 0, total: 0 });

    try {
      const data = await apiRequest('/api/practice/generate', {
        method: 'POST',
        body: JSON.stringify({
          subjectName: selectedSubject.name,
          topicName: selectedTopicName || selectedSubject.topics[0]?.name || 'General',
          gradeName: currentUser.gradeName,
          countryName: currentUser.countryName,
          age: currentUser.age,
          count: 3
        })
      });

      if (data && data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      }
    } catch (e: any) {
      console.error('Error fetching questions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedSubjectId, selectedTopicName]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctOptionIndex;
    setIsAnswerSubmitted(true);

    const newCorrect = isCorrect ? scoreCount.correct + 1 : scoreCount.correct;
    const newTotal = scoreCount.total + 1;
    setScoreCount({ correct: newCorrect, total: newTotal });

    // Persist real exercise result to student mastery and knowledge map
    storageService.recordExerciseAttempt(
      selectedSubject.id,
      currentQ.topicId || `t-${currentIndex}`,
      selectedTopicName || currentQ.topicName || selectedSubject.topics[0]?.name || 'Tema general',
      isCorrect,
      currentQ.question
    );

    onUpdatedProfile();
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetryCurrent = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg text-xs font-bold mb-1.5">
            <Target className="w-4 h-4" />
            <span>Práctica Adaptativa de Ejercicios</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Pone a prueba tus conocimientos
          </h2>
          <p className="text-xs text-slate-500">
            Dificultad adaptada a {currentUser.gradeName} ({currentUser.age} años). Detectamos errores y reforzamos tus puntos débiles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubjectId}
            onChange={e => setSelectedSubjectId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currentUser.subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} {s.isCustom ? '★' : ''}
              </option>
            ))}
          </select>

          {selectedSubject && selectedSubject.topics.length > 0 && (
            <select
              value={selectedTopicName}
              onChange={e => setSelectedTopicName(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs truncate"
            >
              {selectedSubject.topics.map(t => (
                <option key={t.id} value={t.name}>
                  {t.name} {t.status === 'needs_reinforcement' ? '⚠️' : ''}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Main Practice Area */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 min-h-[420px] flex flex-col justify-between">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">
              Generando ejercicios a tu medida...
            </h4>
            <p className="text-xs text-slate-500">
              Personalizando según tu historial en {selectedSubject?.name}.
            </p>
          </div>
        ) : isFinished ? (
          /* Finished Screen */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              ¡Sesión de práctica completada!
            </h3>
            <p className="text-sm text-slate-600 max-w-md">
              Obtuviste <strong className="text-blue-600 font-bold">{scoreCount.correct} de {questions.length} correctas</strong>. Tus métricas de dominio y mapa de progreso han sido actualizados en tu perfil.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={loadQuestions}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Hacer nuevos ejercicios
              </button>

              {onNavigateToTutor && (
                <button
                  onClick={() => onNavigateToTutor(selectedSubject.id, selectedTopicName)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Repasar tema con el Tutor IA
                </button>
              )}
            </div>
          </div>
        ) : currentQ ? (
          /* Active Question */
          <div className="space-y-6">
            {/* Question Progress bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ejercicio {currentIndex + 1} de {questions.length} • Dificultad: <span className="text-blue-600">{currentQ.difficulty}</span>
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Aciertos: {scoreCount.correct}/{scoreCount.total}
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/90">
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctOptionIndex;

                let buttonStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-bold';
                  } else if (isSelected) {
                    buttonStyle = 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/20 font-bold';
                  } else {
                    buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  buttonStyle = 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-500/20 font-bold';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-xs sm:text-sm transition-all ${buttonStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Diagnosis Box (Requirement 8: Cuando se equivoque, explica el error y permite volver a intentarlo) */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-in fade-in ${
                  selectedOption === currentQ.correctOptionIndex
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {selectedOption === currentQ.correctOptionIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>¡Excelente respuesta! Correcto.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span>Respuesta incorrecta. Detectamos un error común:</span>
                    </>
                  )}
                </div>

                <p className="leading-relaxed">
                  {selectedOption === currentQ.correctOptionIndex
                    ? currentQ.explanation
                    : (currentQ.commonMistakeExplanation || currentQ.explanation)}
                </p>

                {selectedOption !== currentQ.correctOptionIndex && (
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={handleRetryCurrent}
                      className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Volver a intentar este ejercicio
                    </button>
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-xs font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Ver pista
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hint Box */}
            {showHint && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Pista EDVYNTRA:</span> {currentQ.hint}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {!isAnswerSubmitted ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    {showHint ? 'Ocultar pista' : 'Pedir una pista'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Comprobar respuesta
                  </button>
                </>
              ) : (
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <span>{currentIndex + 1 < questions.length ? 'Siguiente ejercicio' : 'Ver resultados'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            No hay ejercicios cargados para este tema.
          </div>
        )}
      </div>
    </div>
  );
};
