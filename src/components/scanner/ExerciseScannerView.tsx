import React, { useState } from 'react';
import { StudentProfile, ScannedExerciseResult } from '../../types';
import { storageService } from '../../services/storageService';
import { apiRequest } from '../../services/apiService';
import {
  ScanLine,
  UploadCloud,
  FileImage,
  Sparkles,
  Lightbulb,
  Compass,
  BookOpen,
  CopyPlus,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ZoomIn,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface ExerciseScannerViewProps {
  currentUser: StudentProfile;
  onSendToTutor?: (query: string, subjectName: string) => void;
  onSendToPractice?: (subjectName: string, exercises: any[]) => void;
}

export const ExerciseScannerView: React.FC<ExerciseScannerViewProps> = ({
  currentUser,
  onSendToTutor,
  onSendToPractice
}) => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeAction, setActiveAction] = useState<'solve' | 'hint' | 'explain' | 'similar'>('solve');
  const [result, setResult] = useState<ScannedExerciseResult | null>(null);
  const [activePracticeIndex, setActivePracticeIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);

  // Sample exercises for instant test if user doesn't have an image on hand
  const sampleExercises = [
    {
      title: 'Ecuación Cuadrática (Matemática)',
      description: '2x² - 8x + 6 = 0',
      tag: 'Álgebra 9º / Bachillerato',
      base64Svg: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMzM0MTU1Ij5FamVyY2ljaW8gZGUgZXhhbWVuIC0gRVNNQVRFOjwvdGV4dD48dGV4dCB4PSI1MCIgeT0iMTEwIiBmb250LWZhbWlseT0iR2VvcmdpYSIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwZjE3MmEiPjJ4wrIgLSA4eCArIDYgPSAwPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NzQ4YiI+RW5jdWVudHJhIGxhcyBzb2x1Y2lvbmVzIHJlYWxlcyBwYXJhIHguPC90ZXh0Pjwvc3ZnPg=='
    },
    {
      title: 'Cinemática MRU (Ciencias / Física)',
      description: 'v = d / t (Calcular distancia recorrida)',
      tag: 'Física Secundaria / Media',
      base64Svg: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMzM0MTU1Ij5Qcm9ibGVtYSBkZSBGaXNpY2E6PC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSIxMDUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzBmMTcyYSI+VW4gYXV0b21vdmlsIHZpYWphIGEgNzIga20vaDwvdGV4dD48dGV4dCB4PSI1MCIgeT0iMTQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2NDc0OGIiPlF1ZSBkaXN0YW5jaWEgZW4gbWV0cm9zIHJlY29ycmUgZW4gMjUgc2VndW5kb3M/PC90ZXh0Pjwvc3ZnPg=='
    },
    {
      title: 'Gramática y Sintaxis (Lenguaje)',
      description: 'Oración compuesta subordinada',
      tag: 'Lenguaje y Literatura',
      base64Svg: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMzM0MTU1Ij5BbmFsaXNpcyBzaW50YWN0aWNvOjwvdGV4dD48dGV4dCB4PSI1MCIgeT0iMTA1IiBmb250LWZhbWlseT0iR2VvcmdpYSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwZjE3MmEiPiJFbCBlc3R1ZGlhbnRlIHF1ZSBlc3R1ZGlvIGNvbiBFRFZZTlRSQSBhcHJvYm8uIjwvdGV4dD48dGV4dCB4PSI1MCIgeT0iMTQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NDc0OGIiPklkZW50aWZpY2EgbGEgcHJvcG9zaWNpb24gc3Vib3JkaW5hZGEgYWRqZXRpdmEuPC90ZXh0Pjwvc3ZnPg=='
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImageBase64(reader.result as string);
      processImage(reader.result as string, activeAction);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof sampleExercises[0]) => {
    setSelectedImageBase64(sample.base64Svg);
    processImage(sample.base64Svg, activeAction);
  };

  const processImage = async (imageSrc: string, actionType: 'solve' | 'hint' | 'explain' | 'similar') => {
    setIsProcessing(true);
    setActiveAction(actionType);
    setSelectedAnswer(null);
    setHasCheckedAnswer(false);

    try {
      const data = await apiRequest('/api/scanner', {
        method: 'POST',
        body: JSON.stringify({
          imageBase64: imageSrc,
          action: actionType,
          gradeName: currentUser.gradeName,
          studentName: currentUser.name,
          age: currentUser.age
        })
      });

      if (data) {
        setResult({
          id: `scan-${Date.now()}`,
          imageUrl: imageSrc,
          detectedText: data.detectedText || 'Ejercicio analizado',
          subjectSuggestion: data.subjectSuggestion || 'Matemática',
          topicSuggestion: data.topicSuggestion || 'Ecuaciones',
          difficulty: data.difficulty || 'Intermedio',
          hint: data.hint || 'Revisa las variables del ejercicio.',
          explanation: data.explanation || 'Explicación del ejercicio.',
          guidedSteps: data.guidedSteps || [],
          similarExercises: data.similarExercises || []
        });

        // Register in activities
        storageService.recordExerciseAttempt(
          currentUser.subjects[0]?.id || 'sub-1',
          'scan-t1',
          data.topicSuggestion || 'Escáner',
          true
        );
      }
    } catch (err: any) {
      console.error('Scan error:', err);
      alert(`Aviso del Escáner IA: ${err.message || 'Error al procesar la imagen'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg text-xs font-bold mb-1.5">
            <ScanLine className="w-4 h-4" />
            <span>Escáner Inteligente con Reconocimiento Óptico</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Escanea tu ejercicio del cuaderno o libro
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Toma una foto o sube una imagen. EDVYNTRA transcribirá el ejercicio y te ofrecerá 4 formas interactivas de resolverlo.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Calibrado para: {currentUser.gradeName.split(' ')[0]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-blue-600" />
              <span>Subir fotografía del ejercicio</span>
            </h3>

            {/* Upload Box */}
            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/40 text-center">
              <FileImage className="w-10 h-10 text-slate-400 mb-2 group-hover:text-blue-600" />
              <span className="text-xs font-bold text-slate-700">
                Haz clic para subir o arrastra una imagen
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Formatos: JPG, PNG, WEBP (hasta 15MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Instant Sample Selectors */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                O prueba con estos ejercicios de muestra:
              </p>
              <div className="space-y-1.5">
                {sampleExercises.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(sample)}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{sample.title}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{sample.description}</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md shrink-0">
                      Probar
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Image Display */}
          {selectedImageBase64 && (
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Vista previa del ejercicio</span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Imagen cargada
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-56 flex items-center justify-center p-2">
                <img
                  src={selectedImageBase64}
                  alt="Ejercicio escaneado"
                  className="max-h-52 w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Processing & 4 Actions (Requirement 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Action Tabs: Resolver conmigo, Dame una pista, Explícame el tema, Crear ejercicios parecidos */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => {
                if (selectedImageBase64) processImage(selectedImageBase64, 'solve');
                else setActiveAction('solve');
              }}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                activeAction === 'solve'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Resolver conmigo</span>
            </button>

            <button
              onClick={() => {
                if (selectedImageBase64) processImage(selectedImageBase64, 'hint');
                else setActiveAction('hint');
              }}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                activeAction === 'hint'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Dame una pista</span>
            </button>

            <button
              onClick={() => {
                if (selectedImageBase64) processImage(selectedImageBase64, 'explain');
                else setActiveAction('explain');
              }}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                activeAction === 'explain'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Explícame el tema</span>
            </button>

            <button
              onClick={() => {
                if (selectedImageBase64) processImage(selectedImageBase64, 'similar');
                else setActiveAction('similar');
              }}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                activeAction === 'similar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CopyPlus className="w-4 h-4" />
              <span>Ejercicios parecidos</span>
            </button>
          </div>

          {/* Result Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs min-h-[380px] flex flex-col">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center animate-spin">
                  <ScanLine className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  Analizando el ejercicio...
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Detectando ecuaciones, símbolos matemáticos y adaptando la respuesta a tu grado escolar.
                </p>
              </div>
            ) : result ? (
              <div className="space-y-5">
                {/* Detected Exercise Header */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {result.subjectSuggestion} • {result.topicSuggestion}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      Dificultad: {result.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold mb-1">
                    Transcripción detectada:
                  </p>
                  <p className="text-sm font-mono font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200">
                    {result.detectedText}
                  </p>
                </div>

                {/* Content according to activeAction */}
                {activeAction === 'solve' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>Resolución guiada paso a paso:</span>
                    </h4>

                    <div className="space-y-2">
                      {result.guidedSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 bg-blue-50/50 border border-blue-200/70 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium leading-relaxed"
                        >
                          {step}
                        </div>
                      ))}
                    </div>

                    {onSendToTutor && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onSendToTutor(`Quiero profundizar en este ejercicio: ${result.detectedText}`, result.subjectSuggestion)}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <span>Consultar dudas al Tutor IA</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeAction === 'hint' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Pista clave para desbloquear el ejercicio:</span>
                    </h4>
                    <p className="text-sm text-amber-950 font-medium leading-relaxed">
                      {result.hint}
                    </p>
                    <p className="text-[11px] text-amber-800 pt-2 border-t border-amber-200/70">
                      💡 Consejo: Intenta aplicar esta pista en una hoja borrador antes de mirar la solución completa.
                    </p>
                  </div>
                )}

                {activeAction === 'explain' && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Explicación conceptual del tema:</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed whitespace-pre-line">
                      {result.explanation}
                    </p>
                  </div>
                )}

                {activeAction === 'similar' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <CopyPlus className="w-4 h-4 text-emerald-600" />
                        <span>Ejercicios parecidos para practicar:</span>
                      </h4>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {result.similarExercises.length} ejercicios disponibles
                      </span>
                    </div>

                    {result.similarExercises.length > 0 ? (
                      <div className="space-y-3">
                        {result.similarExercises.map((ex, eIdx) => (
                          <div key={eIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                            <p className="text-xs sm:text-sm font-bold text-slate-900">
                              {eIdx + 1}. {ex.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {ex.options.map((opt, oIdx) => (
                                <button
                                  key={oIdx}
                                  onClick={() => {
                                    setSelectedAnswer(oIdx);
                                    setHasCheckedAnswer(true);
                                  }}
                                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                                    hasCheckedAnswer && oIdx === ex.correctIndex
                                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                      : selectedAnswer === oIdx
                                      ? 'bg-blue-50 border-blue-400 text-blue-900'
                                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {hasCheckedAnswer && (
                              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                                <span className="font-bold">Explicación:</span> {ex.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 text-xs text-slate-500 rounded-xl">
                        Haz clic en &quot;Resolver conmigo&quot; o sube una imagen para generar ejercicios similares.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <ScanLine className="w-12 h-12 mb-3 text-slate-300" />
                <h4 className="text-sm font-bold text-slate-600">
                  Ningún ejercicio escaneado todavía
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Sube una foto o selecciona uno de los ejercicios de muestra a la izquierda para comenzar el análisis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
