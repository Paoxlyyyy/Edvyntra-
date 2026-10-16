import React, { useState } from 'react';
import { StudentProfile, CountryCode } from '../../types';
import { EDUCATION_SYSTEMS, getSystemByCode, buildDefaultSubjectsForGrade } from '../../data/educationSystems';
import { storageService } from '../../services/storageService';
import {
  X,
  User,
  GraduationCap,
  Globe,
  RotateCcw,
  Check,
  AlertCircle,
  Save,
  Trash2,
  Sparkles
} from 'lucide-react';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentProfile;
  onProfileUpdated: () => void;
  onSwitchAccount: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onProfileUpdated,
  onSwitchAccount
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [countryCode, setCountryCode] = useState<CountryCode>(currentUser.countryCode);
  const [gradeId, setGradeId] = useState(currentUser.gradeId);
  const [syncSubjectsOnGradeChange, setSyncSubjectsOnGradeChange] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentSystem = getSystemByCode(countryCode);

  const handleCountryChange = (newCode: CountryCode) => {
    setCountryCode(newCode);
    const newSys = getSystemByCode(newCode);
    if (newSys.grades.length > 0) {
      setGradeId(newSys.grades[0].id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedGrade = currentSystem.grades.find(g => g.id === gradeId) || currentSystem.grades[0];
    const gradeChanged = gradeId !== currentUser.gradeId || countryCode !== currentUser.countryCode;

    let updatedSubjects = [...currentUser.subjects];

    if (gradeChanged && syncSubjectsOnGradeChange) {
      // Keep custom subjects, regenerate base subjects for the new grade
      const customOnes = currentUser.subjects.filter(s => s.isCustom);
      const newBaseOnes = buildDefaultSubjectsForGrade(countryCode, selectedGrade.id);
      updatedSubjects = [...newBaseOnes, ...customOnes];
    }

    storageService.updateProfileSettings({
      name: name.trim() || currentUser.name,
      age: Number(age),
      countryCode,
      countryName: currentSystem.countryName,
      gradeId: selectedGrade.id,
      gradeName: selectedGrade.name,
      subjects: updatedSubjects
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onProfileUpdated();
      onClose();
    }, 800);
  };

  const handleResetAlex = () => {
    if (confirm('¿Deseas restaurar el perfil de demostración predeterminado (Alex Rivera, 9º El Salvador)?')) {
      storageService.resetToDefaultAlex();
      onProfileUpdated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Perfil Educativo y Ajustes</h3>
              <p className="text-xs text-slate-300">Modifica tus datos escolares en cualquier momento</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nombre del estudiante
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Age (12 to 18) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Edad: <span className="text-blue-600 font-extrabold">{age} años</span>
            </label>
            <div className="grid grid-cols-7 gap-1.5">
              {[12, 13, 14, 15, 16, 17, 18].map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(a)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    age === a
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              País o sistema educativo
            </label>
            <select
              value={countryCode}
              onChange={e => handleCountryChange(e.target.value as CountryCode)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EDUCATION_SYSTEMS.map(sys => (
                <option key={sys.code} value={sys.code}>
                  {sys.flag} {sys.countryName}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Grade */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Grado académico que estás cursando *
            </label>
            <select
              value={gradeId}
              onChange={e => setGradeId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currentSystem.grades.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.typicalAgeRange})
                </option>
              ))}
            </select>
          </div>

          {/* Grade Change sync notice */}
          {(gradeId !== currentUser.gradeId || countryCode !== currentUser.countryCode) && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Cambio de grado o sistema escolar detectado</span>
              </div>
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={syncSubjectsOnGradeChange}
                  onChange={e => setSyncSubjectsOnGradeChange(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span className="leading-tight">
                  Actualizar automáticamente las materias básicas curriculares para este nuevo grado (manteniendo tus materias adicionales y progreso).
                </span>
              </label>
            </div>
          )}

          {/* Account Switcher Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchAccount();
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Cambiar o iniciar con otro usuario
            </button>

            <button
              type="button"
              onClick={handleResetAlex}
              className="text-xs text-slate-400 hover:text-slate-600"
              title="Restaurar demo de Alex"
            >
              Restaurar demo
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-cyan-300" />
                  ¡Guardado correctamente!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
