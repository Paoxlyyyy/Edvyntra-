import React from 'react';
import { Logo } from '../common/Logo';
import { StudentProfile } from '../../types';
import {
  User,
  Settings,
  Plus,
  Bot,
  ScanLine,
  Target,
  Compass,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  currentUser: StudentProfile | null;
  activeView: string;
  onSelectView: (view: any) => void;
  onOpenAddSubject: () => void;
  onOpenSettings: () => void;
  onOpenLogin: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeView,
  onSelectView,
  onOpenAddSubject,
  onOpenSettings,
  onOpenLogin,
  onGoHome
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <button onClick={onGoHome} className="text-left focus:outline-none">
            <Logo size="sm" showSlogan={true} />
          </button>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <>
              {/* Add Subject Quick Button */}
              <button
                onClick={onOpenAddSubject}
                className="hidden sm:flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar materia</span>
              </button>

              {/* Profile Chip */}
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 transition-colors"
                title="Configuración de perfil"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold leading-tight">{currentUser.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {currentUser.gradeName.split(' ')[0]} • {currentUser.age}a
                  </p>
                </div>
                <Settings className="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block" />
              </button>
            </>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
