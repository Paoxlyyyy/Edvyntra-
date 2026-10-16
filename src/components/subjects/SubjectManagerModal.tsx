import React, { useState } from 'react';
import { Subject } from '../../types';
import { ADDITIONAL_SUBJECTS_CATALOG } from '../../data/educationSystems';
import { storageService } from '../../services/storageService';
import {
  X,
  Search,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Check,
  Bot,
  Layers,
  GraduationCap,
  AlertCircle
} from 'lucide-react';

interface SubjectManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  onSubjectsUpdated: () => void;
  onOpenTutorForSubject?: (subject: Subject) => void;
}

export const SubjectManagerModal: React.FC<SubjectManagerModalProps> = ({
  isOpen,
  onClose,
  subjects,
  onSubjectsUpdated,
  onOpenTutorForSubject
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'catalog' | 'custom' | 'current'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Custom subject form
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('Tecnología & Programación');
  const [customDescription, setCustomDescription] = useState('');

  const categories = [
    'Todas',
    'Tecnología & Programación',
    'Ciencias & Exploración',
    'Arte & Creatividad',
    'Habilidades & Finanzas',
    'Idiomas'
  ];

  const handleAddCatalogItem = (item: typeof ADDITIONAL_SUBJECTS_CATALOG[0]) => {
    // Check if exists
    if (subjects.some(s => s.name.toLowerCase() === item.name.toLowerCase())) {
      return;
    }

    const newSubj: Subject = {
      id: `subj-add-${Date.now()}`,
      name: item.name,
      category: item.category,
      description: item.description,
      icon: item.icon,
      color: item.color,
      isCustom: true,
      progressPercent: 0,
      totalExercisesDone: 0,
      correctExercises: 0,
      topics: item.suggestedTopics.map((tName, idx) => ({
        id: `t-${item.id}-${idx + 1}`,
        name: tName,
        masteryScore: 0,
        exercisesAttempted: 0,
        exercisesCorrect: 0,
        status: 'not_started' as const
      }))
    };

    storageService.addSubjectToCurrentUser(newSubj);
    onSubjectsUpdated();
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    if (subjects.some(s => s.name.toLowerCase() === customName.trim().toLowerCase())) {
      alert('Ya tienes una materia con este nombre.');
      return;
    }

    const newCustomSubj: Subject = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: customCategory,
      description: customDescription.trim() || 'Materia personalizada añadida para estudio asistido por IA.',
      icon: 'BookMarked',
      color: 'indigo',
      isCustom: true,
      progressPercent: 0,
      totalExercisesDone: 0,
      correctExercises: 0,
      topics: [
        {
          id: `t-c-1`,
          name: 'Conceptos fundamentales y teoría',
          masteryScore: 0,
          exercisesAttempted: 0,
          exercisesCorrect: 0,
          status: 'not_started' as const
        },
        {
          id: `t-c-2`,
          name: 'Ejercicios prácticos y proyectos',
          masteryScore: 0,
          exercisesAttempted: 0,
          exercisesCorrect: 0,
          status: 'not_started' as const
        }
      ]
    };

    storageService.addSubjectToCurrentUser(newCustomSubj);
    setCustomName('');
    setCustomDescription('');
    onSubjectsUpdated();
    setActiveTab('current');
  };

  const handleRemove = (subjectId: string) => {
    if (confirm('¿Deseas eliminar esta materia adicional de tu plan?')) {
      storageService.removeSubjectFromCurrentUser(subjectId);
      onSubjectsUpdated();
    }
  };

  const filteredCatalog = ADDITIONAL_SUBJECTS_CATALOG.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const baseSubjects = subjects.filter(s => !s.isCustom);
  const customSubjects = subjects.filter(s => s.isCustom);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Administrar y Agregar Materias</h3>
              <p className="text-xs text-slate-300">
                Las materias adicionales no reemplazan tus asignaturas básicas: se suman a tu experiencia.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/60">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            Explorar catálogo ({ADDITIONAL_SUBJECTS_CATALOG.length})
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4 text-blue-600" />
            Escribir materia propia
          </button>

          <button
            onClick={() => setActiveTab('current')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'current'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Tus materias actuales ({subjects.length})
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* TAB 1: CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Buscar materia (ej. Python, Robótica, IA, Finanzas...)"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {filteredCatalog.map(item => {
                  const isAdded = subjects.some(s => s.name.toLowerCase() === item.name.toLowerCase());
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isAdded
                          ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                          {isAdded && (
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> En tu plan
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {item.suggestedTopics.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                        {isAdded ? (
                          <button
                            type="button"
                            disabled
                            className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl cursor-default flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Ya agregada
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddCatalogItem(item)}
                            className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" /> Agregar materia
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: WRITE CUSTOM SUBJECT */}
          {activeTab === 'custom' && (
            <form onSubmit={handleCreateCustom} className="max-w-xl mx-auto space-y-4 py-2">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800 leading-relaxed">
                  <strong>Crea cualquier materia que desees estudiar.</strong> El Tutor IA de EDVYNTRA se adaptará a tu nivel para explicarte temas, crear ejercicios y responder dudas sobre esta materia personalizada.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Nombre de la materia *
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  placeholder="Ej. Ciberseguridad, Producción Musical, Astronomía de Agujeros Negros..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Categoría o Área
                </label>
                <select
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tecnología & Programación">Tecnología & Programación</option>
                  <option value="Ciencias & Exploración">Ciencias & Exploración</option>
                  <option value="Arte & Creatividad">Arte & Creatividad</option>
                  <option value="Habilidades & Finanzas">Habilidades & Finanzas</option>
                  <option value="Idiomas">Idiomas</option>
                  <option value="Humanidades & Sociedad">Humanidades & Sociedad</option>
                  <option value="Otra área">Otra área</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Descripción o qué te gustaría aprender (Opcional)
                </label>
                <textarea
                  value={customDescription}
                  onChange={e => setCustomDescription(e.target.value)}
                  placeholder="Ej. Me interesa aprender los fundamentos de cómo proteger contraseñas y cómo funciona la criptografía básica."
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar materia a mi plan
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CURRENT SUBJECTS */}
          {activeTab === 'current' && (
            <div className="space-y-6">
              {/* Official Base Subjects */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Materias Básicas / Curriculares ({baseSubjects.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {baseSubjects.map(sub => (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{sub.name}</p>
                        <p className="text-[11px] text-slate-500">{sub.category} • {sub.topics.length} temas</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-blue-600">{sub.progressPercent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Added Custom Subjects */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Materias Adicionales agregadas por ti ({customSubjects.length})
                </h4>

                {customSubjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {customSubjects.map(sub => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs sm:text-sm font-bold text-indigo-950 truncate">{sub.name}</p>
                          <p className="text-[11px] text-indigo-600 truncate">{sub.category}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {onOpenTutorForSubject && (
                            <button
                              onClick={() => {
                                onClose();
                                onOpenTutorForSubject(sub);
                              }}
                              className="text-[11px] font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                            >
                              <Bot className="w-3 h-3" />
                              Tutor
                            </button>
                          )}
                          <button
                            onClick={() => handleRemove(sub.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Eliminar materia adicional"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-500">
                    No has agregado materias adicionales todavía. Puedes agregar Robótica, Python, Inteligencia Artificial, Finanzas u otra materia en las pestañas anteriores.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Total en tu plan: <strong className="text-slate-800">{subjects.length} materias</strong>
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
