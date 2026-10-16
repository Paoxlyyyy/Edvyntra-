import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { StudentProfile } from '../../types';
import { storageService } from '../../services/storageService';
import { UserCheck, Plus, X, GraduationCap, ChevronRight, User, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: StudentProfile) => void;
  onGoToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  onGoToRegister
}) => {
  if (!isOpen) return null;

  const users = storageService.getAllUsers();
  const currentUser = storageService.getCurrentUser();

  const handleChoose = (user: StudentProfile) => {
    storageService.setCurrentUser(user.id);
    onSelectUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showSlogan={false} />
            <div>
              <h3 className="text-base font-bold text-white">Iniciar sesión</h3>
              <p className="text-xs text-slate-300">Selecciona tu perfil de estudiante guardado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User list */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {users.length > 0 ? (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Cuentas en este dispositivo ({users.length})
              </p>
              {users.map(u => {
                const isCurrent = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => handleChoose(u)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 truncate">{u.name}</p>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                              Activo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">
                          {u.gradeName} • {u.countryName} ({u.age} años)
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 text-sm">
              No hay perfiles guardados aún.
            </div>
          )}

          {/* Create new account action */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                onGoToRegister();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-700 font-bold rounded-2xl text-xs sm:text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Crear una nueva cuenta de estudiante
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Cada estudiante mantiene únicamente su propio perfil, materias y progreso de forma persistente.
          </p>
        </div>
      </div>
    </div>
  );
};
