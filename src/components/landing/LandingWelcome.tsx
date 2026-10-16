import React from 'react';
import { Logo } from '../common/Logo';
import { Sparkles, Brain, ScanLine, Target, BookMarked, ArrowRight, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../../types';

interface LandingWelcomeProps {
  currentUser: StudentProfile | null;
  onStart: () => void;
  onOpenLogin: () => void;
}

export const LandingWelcome: React.FC<LandingWelcomeProps> = ({
  currentUser,
  onStart,
  onOpenLogin
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100 flex flex-col justify-between text-slate-800">
      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Logo size="md" showSlogan={true} />
        
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-blue-50/80 border border-blue-200/60 rounded-full px-3 py-1.5 text-xs text-blue-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold">{currentUser.name}</span>
              <span className="text-blue-500 font-medium">({currentUser.gradeName.split(' ')[0]})</span>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 px-3.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              Iniciar sesión
            </button>
          )}

          <button
            onClick={onStart}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            {currentUser ? 'Ir a mi Dashboard' : 'Comenzar'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center text-center">
        {/* Age & Audience Pill */}
        <div className="inline-flex items-center gap-2 bg-white/90 border border-blue-100 px-3.5 py-1.5 rounded-full shadow-xs mb-6 text-xs sm:text-sm text-blue-700 font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <span>Tutor Educativo con IA para estudiantes de 12 a 18 años</span>
        </div>

        {/* Large Central Logo */}
        <div className="my-2 p-6 bg-white/70 backdrop-blur-sm rounded-3xl border border-sky-100/80 shadow-xl shadow-blue-500/5 max-w-sm sm:max-w-md w-full">
          <Logo size="xl" showSlogan={true} className="w-full" />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mt-6 max-w-3xl leading-tight">
          Tu tutor inteligente que te <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">acompaña</span> paso a paso.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          No es solo un chatbot. EDVYNTRA adapta sus explicaciones, pistas y ejercicios a tu <strong className="text-slate-800">país</strong>, tu <strong className="text-slate-800">grado escolar</strong> y a las materias oficiales y personalizadas que estás cursando.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={onStart}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
          >
            {currentUser ? 'Continuar como ' + currentUser.name.split(' ')[0] : 'Comenzar ahora gratis'}
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 font-semibold text-base px-6 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs transition-all"
          >
            <UserCheck className="w-5 h-5 text-blue-600" />
            {currentUser ? 'Cambiar de cuenta' : 'Ya tengo una cuenta'}
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left">
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3.5">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Currículo por país</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Materias configuradas automáticamente según tu país (El Salvador, México, Colombia, España, etc.) y grado escolar exacto.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:border-cyan-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 mb-3.5">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Tutor con 4 modos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pistas sin dar la respuesta, explicaciones a tu nivel, ejemplos similares resueltos y soluciones guiadas paso a paso.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3.5">
              <ScanLine className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Escáner de ejercicios</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sube una foto de tu cuaderno o libro. La IA analiza el problema, te da pistas, explica el tema o genera ejercicios parecidos.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3.5">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Práctica adaptativa</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detecta errores comunes, explica el porqué y actualiza tu mapa de conocimiento real entre temas dominados y por reforzar.
            </p>
          </div>
        </div>

        {/* Testimonial / Assurance strip */}
        <div className="mt-10 py-3 px-5 rounded-full bg-slate-200/50 text-xs text-slate-600 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Agrega materias libres (Python, Robótica, IA...)
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Progreso calculado en tiempo real
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-600" /> Privacidad y datos conservados
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>EDVYNTRA © {new Date().getFullYear()} — <strong className="text-slate-700">Aprende · Crea · Avanza</strong></span>
          <span className="text-slate-400">Diseñado para secundaria y bachillerato (12 a 18 años)</span>
        </div>
      </footer>
    </div>
  );
};
