import React from 'react';
import {
  LayoutDashboard,
  Bot,
  ScanLine,
  Target,
  Compass,
  Layers,
  Plus,
  Settings,
  HelpCircle
} from 'lucide-react';
import { StudentProfile } from '../../types';

export type AppView = 'dashboard' | 'tutor' | 'scanner' | 'practice' | 'knowledge_map';

interface SidebarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  currentUser: StudentProfile | null;
  onOpenAddSubject: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  currentUser,
  onOpenAddSubject,
  onOpenSettings
}) => {
  const navItems = [
    {
      id: 'dashboard' as AppView,
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Resumen y materias'
    },
    {
      id: 'tutor' as AppView,
      label: 'Tutor IA',
      icon: Bot,
      badge: '4 modos',
      description: 'Pistas y explicaciones'
    },
    {
      id: 'scanner' as AppView,
      label: 'Escáner',
      icon: ScanLine,
      description: 'Foto de cuaderno/libro'
    },
    {
      id: 'practice' as AppView,
      label: 'Práctica',
      icon: Target,
      description: 'Ejercicios adaptativos'
    },
    {
      id: 'knowledge_map' as AppView,
      label: 'Progreso',
      icon: Compass,
      description: 'Mapa de dominio real'
    }
  ];

  return (
    <>
      {/* 1. Desktop Lateral Sidebar (hidden on mobile, visible lg:) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 shrink-0 min-h-[calc(100vh-4rem)] p-4 justify-between">
        <div className="space-y-6">
          {/* Main Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Plataforma Educativa
            </p>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Subjects List with Add button */}
          {currentUser && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between px-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Tus Materias ({currentUser.subjects.length})
                </span>
                <button
                  onClick={onOpenAddSubject}
                  className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                  title="Agregar materia adicional"
                >
                  <Plus className="w-3 h-3" />
                  <span>Sumar</span>
                </button>
              </div>

              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {currentUser.subjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSelectView('tutor')}
                    className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-xs flex items-center justify-between group transition-colors"
                  >
                    <span className="truncate font-semibold text-slate-700 group-hover:text-blue-600">
                      {s.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500 shrink-0 ml-1">
                      {s.progressPercent}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Educational Profile summary */}
        {currentUser && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate">
                  {currentUser.gradeName.split(' ')[0]} • {currentUser.countryName}
                </p>
              </div>
              <button
                onClick={onOpenSettings}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors shrink-0"
                title="Ajustes de perfil"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* 2. Mobile Bottom Navigation Bar (Requirement 11) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-xl ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
