import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { EDUCATION_SYSTEMS, ADDITIONAL_SUBJECTS_CATALOG, getSystemByCode, buildDefaultSubjectsForGrade } from '../../data/educationSystems';
import { CountryCode, StudentProfile, Subject } from '../../types';
import { storageService } from '../../services/storageService';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Plus,
  Trash2,
  HelpCircle,
  GraduationCap,
  Globe,
  User,
  Zap
} from 'lucide-react';

interface RegistrationWizardProps {
  onComplete: (profile: StudentProfile) => void;
  onCancel: () => void;
}

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(14);
  const [countryCode, setCountryCode] = useState<CountryCode>('SV');
  const [gradeId, setGradeId] = useState('');
  
  // Selected subjects: base curricular + added custom
  const [baseSubjects, setBaseSubjects] = useState<Subject[]>([]);
  const [additionalSubjects, setAdditionalSubjects] = useState<Subject[]>([]);
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [showAddCustomInput, setShowAddCustomInput] = useState(false);

  // Academic interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const availableInterests = [
    'Ciencias Exactas & Matemáticas',
    'Tecnología e Inteligencia Artificial',
    'Programación & Robótica',
    'Literatura & Escritura Creativa',
    'Ciencias Naturales & Biología',
    'Historia & Ciencias Sociales',
    'Arte, Diseño & Creatividad',
    'Educación Financiera & Emprendimiento',
    'Idiomas Extranjeros'
  ];

  // Current system based on countryCode
  const currentSystem = getSystemByCode(countryCode);

  // Initialize or update grade when country changes
  useEffect(() => {
    if (currentSystem.grades.length > 0) {
      // Pick a default grade suitable for age if possible
      const matchingGrade = currentSystem.grades.find(g => {
        if (age <= 13) return g.id.includes('7') || g.id.includes('1') || g.id.includes('bas');
        if (age <= 15) return g.id.includes('9') || g.id.includes('3') || g.id.includes('sec');
        return g.id.includes('bach') || g.id.includes('prep') || g.id.includes('med');
      }) || currentSystem.grades[0];

      setGradeId(matchingGrade.id);
    }
  }, [countryCode]);

  // Update base subjects when gradeId changes (Requirement 3: Automatic configuration)
  useEffect(() => {
    if (countryCode && gradeId) {
      const generated = buildDefaultSubjectsForGrade(countryCode, gradeId);
      setBaseSubjects(generated);
    }
  }, [countryCode, gradeId]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAddCatalogSubject = (catalogItem: typeof ADDITIONAL_SUBJECTS_CATALOG[0]) => {
    // Avoid duplicate
    if (
      baseSubjects.some(s => s.name.toLowerCase() === catalogItem.name.toLowerCase()) ||
      additionalSubjects.some(s => s.name.toLowerCase() === catalogItem.name.toLowerCase())
    ) {
      return;
    }

    const newSubj: Subject = {
      id: `add-${catalogItem.id}-${Date.now()}`,
      name: catalogItem.name,
      category: catalogItem.category,
      description: catalogItem.description,
      icon: catalogItem.icon,
      color: catalogItem.color,
      isCustom: true,
      progressPercent: 0,
      totalExercisesDone: 0,
      correctExercises: 0,
      topics: catalogItem.suggestedTopics.map((tName, idx) => ({
        id: `t-${catalogItem.id}-${idx + 1}`,
        name: tName,
        masteryScore: 0,
        exercisesAttempted: 0,
        exercisesCorrect: 0,
        status: 'not_started' as const
      }))
    };

    setAdditionalSubjects([...additionalSubjects, newSubj]);
  };

  const handleCreateCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSubjectName.trim()) return;

    const trimmed = customSubjectName.trim();
    if (
      baseSubjects.some(s => s.name.toLowerCase() === trimmed.toLowerCase()) ||
      additionalSubjects.some(s => s.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      alert('Ya tienes una materia con este nombre.');
      return;
    }

    const customSubj: Subject = {
      id: `custom-${Date.now()}`,
      name: trimmed,
      category: 'Materia personalizada',
      description: 'Materia añadida por el estudiante para acompañamiento con el Tutor IA.',
      icon: 'BookMarked',
      color: 'indigo',
      isCustom: true,
      progressPercent: 0,
      totalExercisesDone: 0,
      correctExercises: 0,
      topics: [
        {
          id: `t-cust-1`,
          name: 'Conceptos fundamentales',
          masteryScore: 0,
          exercisesAttempted: 0,
          exercisesCorrect: 0,
          status: 'not_started' as const
        },
        {
          id: `t-cust-2`,
          name: 'Resolución de problemas y práctica',
          masteryScore: 0,
          exercisesAttempted: 0,
          exercisesCorrect: 0,
          status: 'not_started' as const
        }
      ]
    };

    setAdditionalSubjects([...additionalSubjects, customSubj]);
    setCustomSubjectName('');
    setShowAddCustomInput(false);
  };

  const handleRemoveAdditional = (id: string) => {
    setAdditionalSubjects(additionalSubjects.filter(s => s.id !== id));
  };

  const handleFinishRegistration = () => {
    const selectedGrade = currentSystem.grades.find(g => g.id === gradeId) || currentSystem.grades[0];
    const combinedSubjects = [...baseSubjects, ...additionalSubjects];

    const newProfile: StudentProfile = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'Estudiante',
      age: Number(age),
      countryCode,
      countryName: currentSystem.countryName,
      gradeId: selectedGrade.id,
      gradeName: selectedGrade.name,
      subjects: combinedSubjects,
      academicInterests: selectedInterests,
      recentActivities: [
        {
          id: `act-init-${Date.now()}`,
          timestamp: 'Justo ahora',
          type: 'subject_added',
          subjectName: 'Perfil educativo configurado',
          description: `¡Bienvenido a EDVYNTRA! Se configuró tu plan con ${baseSubjects.length} materias oficiales de ${currentSystem.countryName} y ${additionalSubjects.length} materias adicionales.`
        }
      ],
      streakDays: 1,
      lastActiveDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    storageService.saveUser(newProfile);
    onComplete(newProfile);
  };

  const currentGradeObj = currentSystem.grades.find(g => g.id === gradeId) || currentSystem.grades[0];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Container Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 p-6 sm:p-8 text-white relative">
          <div className="flex items-center justify-between">
            <Logo size="sm" showSlogan={false} />
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-cyan-200 border border-white/10">
              Paso {step} de 4
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-4">
            {step === 1 && '¿Cómo te llamas y qué edad tienes?'}
            {step === 2 && 'Tu país y sistema educativo'}
            {step === 3 && 'Tus materias oficiales y adicionales'}
            {step === 4 && 'Tus intereses académicos'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {step === 1 && 'EDVYNTRA adaptará el tono y la complejidad del tutor a tu etapa de aprendizaje (12 a 18 años).'}
            {step === 2 && 'Mostraremos los grados y niveles exactos de tu país, sin asumir un currículo genérico.'}
            {step === 3 && 'Configuramos automáticamente tus materias oficiales y puedes añadir cualquier otra que te guste.'}
            {step === 4 && 'Opcional: Ayuda al tutor IA a darte ejemplos y analogías más interesantes para ti.'}
          </p>

          {/* Step Progress indicators */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            {[1, 2, 3, 4].map(sIndex => (
              <div
                key={sIndex}
                className={`h-1.5 rounded-full transition-all ${
                  sIndex <= step ? 'bg-cyan-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 flex-1">
          {/* STEP 1: Name & Age */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Tu nombre o cómo te gusta que te llamen *
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Alex Rivera, Sofía, Mateo..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-medium"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  El tutor utilizará tu nombre para saludarte y darte retroalimentación personalizada.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-800">
                    Tu edad: <span className="text-blue-600 font-extrabold text-base">{age} años</span>
                  </label>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                    {age <= 14 ? 'Secundaria / Tercer Ciclo' : 'Bachillerato / Media Superior'}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {[12, 13, 14, 15, 16, 17, 18].map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAge(a)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                        age === a
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Adaptamos la dificultad de las explicaciones a tu edad y etapa escolar.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Country & Grade */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Country Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  País o sistema educativo *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {EDUCATION_SYSTEMS.map(sys => {
                    const isSelected = countryCode === sys.code;
                    return (
                      <button
                        key={sys.code}
                        type="button"
                        onClick={() => setCountryCode(sys.code)}
                        className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{sys.flag}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate">{sys.countryName}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{sys.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grade Selection adapted to Country */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>Grado académico que estás cursando *</span>
                  <span className="text-xs text-blue-600 font-semibold">
                    {currentSystem.countryName}
                  </span>
                </label>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {currentSystem.grades.map(grade => {
                    const isSelected = gradeId === grade.id;
                    return (
                      <button
                        key={grade.id}
                        type="button"
                        onClick={() => setGradeId(grade.id)}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/15 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold">{grade.name}</p>
                          <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                            {grade.level} • Edad típica: {grade.typicalAgeRange}
                          </p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Automatic Subjects + Add Custom Subjects */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Automated Base Subjects Notice */}
              <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                  <Zap className="w-4 h-4 text-sky-600" />
                  <span>Materias configuradas automáticamente para {currentGradeObj.name}</span>
                </div>
                <p className="text-xs text-sky-700 mt-1">
                  Según el sistema educativo de <strong>{currentSystem.countryName}</strong>, estas son tus asignaturas oficiales base:
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {baseSubjects.map(sub => (
                    <span
                      key={sub.id}
                      className="inline-flex items-center gap-1.5 bg-white border border-sky-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Added Elective / Custom Subjects */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-800">
                    Materias adicionales que deseas agregar ({additionalSubjects.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddCustomInput(!showAddCustomInput)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Crear personalizada
                  </button>
                </div>

                {/* Show custom form if toggled */}
                {showAddCustomInput && (
                  <form onSubmit={handleCreateCustomSubject} className="mb-3 p-3 bg-slate-50 border border-slate-300 rounded-xl flex gap-2">
                    <input
                      type="text"
                      value={customSubjectName}
                      onChange={e => setCustomSubjectName(e.target.value)}
                      placeholder="Nombre de la materia (ej. Robótica, Canto, Diseño 3D...)"
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!customSubjectName.trim()}
                      className="px-3 py-1.5 bg-blue-600 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg shadow-xs"
                    >
                      Agregar
                    </button>
                  </form>
                )}

                {/* Currently selected additional subjects */}
                {additionalSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {additionalSubjects.map(subj => (
                      <span
                        key={subj.id}
                        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        {subj.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveAdditional(subj.id)}
                          className="text-indigo-400 hover:text-red-500 transition-colors ml-1"
                          title="Eliminar materia adicional"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Electives to Add */}
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Sugerencias populares para agregar (haz clic para sumar a tu lista):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {ADDITIONAL_SUBJECTS_CATALOG.slice(0, 6).map(item => {
                    const isAlreadyAdded = additionalSubjects.some(s => s.name.toLowerCase() === item.name.toLowerCase());
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleAddCatalogSubject(item)}
                        disabled={isAlreadyAdded}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                          isAlreadyAdded
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold opacity-80 cursor-default'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{item.category}</p>
                        </div>
                        {isAlreadyAdded ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Plus className="w-4 h-4 text-blue-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Academic Interests */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">
                  ¿Qué temas o áreas te despiertan mayor curiosidad? (Opcional)
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  El tutor utilizará estos temas para proponer ejemplos y analogías más entretenidas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                  {availableInterests.map(interest => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-200 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary overview */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
                <p>
                  <strong className="text-slate-800">Estudiante:</strong> {name.trim() || 'Estudiante'} ({age} años)
                </p>
                <p>
                  <strong className="text-slate-800">Nivel:</strong> {currentGradeObj.name} • {currentSystem.countryName}
                </p>
                <p>
                  <strong className="text-slate-800">Total materias:</strong> {baseSubjects.length} oficiales + {additionalSubjects.length} adicionales
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-200/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl transition-colors"
            >
              Cancelar
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !name.trim()) {
                  setName('Estudiante');
                }
                setStep((step + 1) as any);
              }}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishRegistration}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              Crear mi perfil y entrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
