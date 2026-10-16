import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, Subject, TutorHelpMode, TutorMessage } from '../../types';
import { storageService } from '../../services/storageService';
import { apiRequest } from '../../services/apiService';
import {
  Bot,
  Send,
  Lightbulb,
  BookOpen,
  FileSpreadsheet,
  Compass,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  User,
  GraduationCap,
  Layers,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface AITutorViewProps {
  currentUser: StudentProfile;
  initialSubject?: Subject | null;
  onNavigateToPractice?: (subjectId: string, topicName?: string) => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  currentUser,
  initialSubject,
  onNavigateToPractice
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubject?.id || currentUser.subjects[0]?.id || ''
  );
  const [selectedTopicName, setSelectedTopicName] = useState<string>('');
  const [helpMode, setHelpMode] = useState<TutorHelpMode>('explicacion');
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedSubject = currentUser.subjects.find(s => s.id === selectedSubjectId) || currentUser.subjects[0];

  // Conversation history
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome-tutor-msg',
      sender: 'tutor',
      text: `¡Hola, ${currentUser.name.split(' ')[0]}! Soy tu **Tutor Educativo con Inteligencia Artificial**. 

Estoy calibrado especialmente para tu nivel de **${currentUser.gradeName}** (${currentUser.age} años) en **${currentUser.countryName}**.

Elige el nivel de ayuda que prefieras arriba (Pista, Explicación, Ejemplo o Solución guiada) y cuéntame qué tema o ejercicio quieres aprender hoy en **${selectedSubject?.name || 'tu materia'}**.`,
      timestamp: 'Ahora',
      mode: 'explicacion',
      subjectName: selectedSubject?.name,
      followUpSuggestions: [
        '¿Cómo resuelvo un ejercicio de este tema?',
        'Dame una pista para empezar',
        'Explícame la regla fundamental con un ejemplo'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Update topic selector when subject changes
  useEffect(() => {
    if (selectedSubject && selectedSubject.topics.length > 0) {
      setSelectedTopicName(selectedSubject.topics[0].name);
    } else {
      setSelectedTopicName('');
    }
  }, [selectedSubjectId]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: TutorMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: textToSend.trim(),
      timestamp: 'Ahora',
      subjectName: selectedSubject?.name,
      topicName: selectedTopicName,
      mode: helpMode
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Find weak topics to inform tutor
      const weakTopics = selectedSubject?.topics
        .filter(t => t.status === 'needs_reinforcement')
        .map(t => t.name) || [];

      const data = await apiRequest('/api/tutor', {
        method: 'POST',
        body: JSON.stringify({
          prompt: textToSend,
          studentName: currentUser.name,
          age: currentUser.age,
          countryName: currentUser.countryName,
          gradeName: currentUser.gradeName,
          subjectName: selectedSubject?.name || 'Materia general',
          topicName: selectedTopicName || undefined,
          mode: helpMode,
          recentErrors: weakTopics
        })
      });

      if (data && data.reply) {
        const tutorReply: TutorMessage = {
          id: `tutor-${Date.now()}`,
          sender: 'tutor',
          text: data.reply,
          timestamp: 'Ahora',
          mode: helpMode,
          subjectName: selectedSubject?.name,
          topicName: selectedTopicName,
          followUpSuggestions: [
            '¿Puedes darme otro ejemplo?',
            '¿Y si los números fueran negativos?',
            'Quiero hacer un ejercicio de práctica ahora'
          ]
        };

        setMessages(prev => [...prev, tutorReply]);
        storageService.recordTutorActivity(selectedSubject?.name || '', selectedTopicName, textToSend);
      } else {
        throw new Error(data?.error || 'No se obtuvo respuesta del Tutor IA.');
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'tutor',
          text: `💡 **Orientación de apoyo para ${selectedSubject?.name}:**\n\nNo te preocupes por el resultado inmediato: el objetivo de EDVYNTRA es que entiendas la lógica. Revisa los datos iniciales y define la incógnita paso a paso. *(Detalle del servicio: ${err.message || 'Error de conexión'})*`,
          timestamp: 'Ahora',
          mode: helpMode
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-6xl mx-auto p-3 sm:p-6 space-y-4">
      {/* Top Banner: Context & Subject Selector */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Student Context Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-900 px-3 py-1 rounded-xl text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>{currentUser.gradeName}</span>
          </div>

          <div className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold">
            {currentUser.age} años • {currentUser.countryName}
          </div>

          {selectedSubject?.isCustom && (
            <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded-lg text-[11px] font-bold">
              Materia Adicional
            </span>
          )}
        </div>

        {/* Subject & Topic Pickers */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Subject Select */}
          <div className="flex-1 md:flex-initial">
            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currentUser.subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} {s.isCustom ? '★' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Select if available */}
          {selectedSubject && selectedSubject.topics.length > 0 && (
            <div className="flex-1 md:flex-initial">
              <select
                value={selectedTopicName}
                onChange={e => setSelectedTopicName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs truncate"
              >
                <option value="">(Todos los temas)</option>
                {selectedSubject.topics.map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name} {t.status === 'needs_reinforcement' ? '⚠️' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* The 4 Help Modes Selector (Requirement 6) */}
      <div className="bg-slate-900 rounded-2xl p-2.5 text-white shadow-md flex items-center justify-between gap-1 overflow-x-auto">
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-slate-400 pl-3">
          Nivel de ayuda:
        </span>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
          {/* Mode 1: Pista */}
          <button
            onClick={() => setHelpMode('pista')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              helpMode === 'pista'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-102'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 shrink-0" />
            <span>1. Pista</span>
          </button>

          {/* Mode 2: Explicación */}
          <button
            onClick={() => setHelpMode('explicacion')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              helpMode === 'explicacion'
                ? 'bg-blue-500 text-white shadow-md font-extrabold scale-102'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>2. Explicación</span>
          </button>

          {/* Mode 3: Ejemplo */}
          <button
            onClick={() => setHelpMode('ejemplo')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              helpMode === 'ejemplo'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold scale-102'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
            <span>3. Ejemplo</span>
          </button>

          {/* Mode 4: Solución Guiada */}
          <button
            onClick={() => setHelpMode('solucion_guiada')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              helpMode === 'solucion_guiada'
                ? 'bg-cyan-400 text-slate-950 shadow-md font-extrabold scale-102'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>4. Solución guiada</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 overflow-y-auto space-y-4 shadow-xs">
        {messages.map(msg => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
            >
              {isTutor && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 relative group text-xs sm:text-sm leading-relaxed ${
                  isTutor
                    ? 'bg-slate-50 border border-slate-200/90 text-slate-800'
                    : 'bg-blue-600 text-white rounded-tr-xs shadow-md shadow-blue-500/10'
                }`}
              >
                {/* Mode Tag if Tutor */}
                {isTutor && msg.mode && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                      {msg.mode === 'pista' && <><Lightbulb className="w-3 h-3 text-amber-500" /> Modo Pista</>}
                      {msg.mode === 'explicacion' && <><BookOpen className="w-3 h-3 text-blue-600" /> Modo Explicación</>}
                      {msg.mode === 'ejemplo' && <><FileSpreadsheet className="w-3 h-3 text-emerald-600" /> Modo Ejemplo</>}
                      {msg.mode === 'solucion_guiada' && <><Compass className="w-3 h-3 text-cyan-600" /> Modo Solución Guiada</>}
                    </span>

                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                      title="Copiar respuesta"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Formatted Text rendering with basic markdown formatting */}
                <div className="space-y-2 whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {/* Follow up quick pill buttons */}
                {isTutor && msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                    {msg.followUpSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl transition-colors shadow-2xs flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-500" />
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isTutor && (
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span>El Tutor IA de EDVYNTRA está adaptando la respuesta a tu grado...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box and Prompt Dispatcher */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-3 sm:p-4 shadow-sm flex flex-col gap-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            placeholder={`Haz una pregunta sobre ${selectedSubject?.name || 'tu materia'} (ej. ¿Cómo despejar x en una cuadrática?)...`}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-2xl shadow-md shadow-blue-500/20 active:scale-95 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Modo activo: <strong>{helpMode.toUpperCase()}</strong></span>
          {onNavigateToPractice && (
            <button
              onClick={() => onNavigateToPractice(selectedSubject.id, selectedTopicName)}
              className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Ir a la Práctica de esta materia</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
