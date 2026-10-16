import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser for JSON and base64 images from exercise scanner (up to 50mb)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 1. CORS Middleware for Web and Android cross-origin requests
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize GoogleGenAI server client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Resilient Gemini caller: tries gemini-3.8-flash, and if unavailable (e.g. 503 spike), tries gemini-3-flash-preview
async function generateWithGemini(contents: any, systemInstruction?: string) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno del servidor.');
  }

  if (!ai) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' },
      },
    });
  }

  const candidateModels = ['gemini-3.8-flash', 'gemini-3-flash-preview'];
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const result = await ai.models.generateContent({
        model: modelName,
        contents,
        config: systemInstruction ? { systemInstruction } : undefined,
      });

      if (result && result.text) {
        return { text: result.text, modelUsed: modelName };
      }
    } catch (err: any) {
      console.warn(`[EDVYNTRA] Modelo ${modelName} falló:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('No se pudo generar respuesta con los modelos de IA disponibles.');
}

// Health & configuration check
app.get('/api/status', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    status: 'ok',
    geminiConfigured: !!apiKey,
    app: 'EDVYNTRA',
    slogan: 'Aprende · Crea · Avanza',
    timestamp: new Date().toISOString()
  });
});

// Helper: Pedagogical system instructions tailored to 12-18 age group
function buildPedagogicalSystemPrompt(
  studentName: string,
  age: number,
  countryName: string,
  gradeName: string,
  subjectName: string,
  topicName?: string
): string {
  return `Eres el Tutor Educativo con Inteligencia Artificial de EDVYNTRA (Eslogan: "Aprende · Crea · Avanza").
Tu misión es acompañar activamente a un estudiante de secundaria/bachillerato en su proceso de aprendizaje.

DATOS DEL ESTUDIANTE:
- Nombre: ${studentName || 'Estudiante'}
- Edad: ${age || 14} años
- País / Sistema escolar: ${countryName || 'América Latina'}
- Grado académico: ${gradeName || 'Secundaria'}
- Materia actual: ${subjectName || 'General'}
${topicName ? `- Tema específico: ${topicName}` : ''}

REGLAS PEDAGÓGICAS Y DE COMUNICACIÓN OBLIGATORIAS:
1. Adapta rigurosamente tu vocabulario, ejemplos y nivel de abstracción a su edad (${age || 14} años) y grado (${gradeName || 'Secundaria'}).
2. No uses jerga universitaria pesada a menos que sea un tema de bachillerato avanzado, ni trates al estudiante como si fuera un niño pequeño de primaria.
3. Sé motivador, constructivo, claro y empático.
4. Fomenta el razonamiento activo: no des simplemente respuestas mecánicas; guía al estudiante a pensar.
5. Utiliza formato Markdown limpio con negritas, viñetas estructuradas y fórmulas legibles.`;
}

// 1. TUTOR API ENDPOINT
app.post('/api/tutor', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const {
      prompt,
      studentName,
      age,
      countryName,
      gradeName,
      subjectName,
      topicName,
      mode = 'explicacion', // 'pista' | 'explicacion' | 'ejemplo' | 'solucion_guiada'
      recentErrors = []
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'El mensaje o consulta del estudiante es requerido.' });
    }

    const modeInstructions: Record<string, string> = {
      pista: 'MODO PISTA: Da UNA pista clave o pregunta socrática que encienda su razonamiento SIN revelar la respuesta final. Invítalo a dar el siguiente paso de manera constructiva.',
      explicacion: 'MODO EXPLICACIÓN: Explica el concepto de forma clara, didáctica y visual con analogías familiares para su edad y grado. Concluye con un breve resumen en 2 puntos.',
      ejemplo: 'MODO EJEMPLO: Proporciona un ejemplo práctico completo, diferente pero análogo al problema planteado, resuelto paso a paso para que el estudiante comprenda el procedimiento.',
      solucion_guiada: 'MODO SOLUCIÓN GUIADA: Desglosa el problema en pasos lógicos secuenciales (Paso 1, Paso 2, Paso 3). Haz una pausa al final del paso 1 o 2 preguntándole cómo continuaría él.'
    };

    const systemPrompt = buildPedagogicalSystemPrompt(
      studentName,
      age,
      countryName,
      gradeName,
      subjectName,
      topicName
    );

    const userPromptContent = `
${modeInstructions[mode] || modeInstructions.explicacion}

${recentErrors.length > 0 ? `Ten en cuenta que el estudiante ha tenido dudas o errores recientes en: ${recentErrors.join(', ')}.` : ''}

Pregunta o consulta del estudiante:
"${prompt}"
    `.trim();

    const result = await generateWithGemini(
      [{ role: 'user', parts: [{ text: userPromptContent }] }],
      systemPrompt
    );

    return res.json({
      reply: result.text,
      mode,
      isAiGenerated: true,
      modelUsed: result.modelUsed,
      subjectName,
      topicName
    });
  } catch (error: any) {
    console.error('Error in /api/tutor:', error);
    res.status(500).json({
      error: 'Error al comunicarse con el Tutor IA de Gemini.',
      details: error.message || 'Error desconocido'
    });
  }
});

// 2. EXERCISE SCANNER API ENDPOINT (Multimodal Vision)
app.post('/api/scanner', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { imageBase64, action = 'solve', gradeName, subjectName, studentName, age } = req.body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'La imagen del ejercicio es requerida en formato base64.' });
    }

    // Clean base64 data and extract mime type
    let cleanBase64 = imageBase64;
    let mimeType = 'image/jpeg';
    let rawTextFromSvg = '';

    if (imageBase64.includes(';base64,')) {
      const parts = imageBase64.split(';base64,');
      mimeType = parts[0].replace('data:', '').trim();
      cleanBase64 = parts[1];

      if (mimeType.includes('svg')) {
        try {
          rawTextFromSvg = Buffer.from(cleanBase64, 'base64').toString('utf-8');
        } catch (_) {}
      }
    } else if (imageBase64.startsWith('data:image/svg+xml')) {
      rawTextFromSvg = decodeURIComponent(imageBase64.replace(/^data:image\/svg\+xml;?(utf8)?,?/, ''));
      cleanBase64 = Buffer.from(rawTextFromSvg).toString('base64');
      mimeType = 'image/png';
    }

    const actionInstructionMap: Record<string, string> = {
      solve: 'Acción solicitada: "Resolver conmigo". Extrae el ejercicio y proporcióname una guía paso a paso interactiva.',
      hint: 'Acción solicitada: "Dame una pista". Extrae el ejercicio e indícame una pista fundamental que me ayude a resolverlo.',
      explain: 'Acción solicitada: "Explícame el tema". Extrae el ejercicio y explica el tema teórico y reglas que sustentan este problema.',
      similar: 'Acción solicitada: "Crear ejercicios parecidos". Extrae el ejercicio y crea 2 ejercicios idénticos en estructura pero con diferentes números para practicar.'
    };

    const prompt = `
Eres el Escáner de Ejercicios Inteligente de EDVYNTRA para un estudiante de ${age || 14} años (${gradeName || 'Secundaria'}).
Analiza la imagen adjunta del cuaderno o libro escolar.

1. Transcribe exactamente el texto o ecuación matemática del ejercicio principal detectado.
2. Identifica la materia escolar probable y el tema específico.
3. Clasifica la dificultad para un estudiante de ${gradeName || 'Secundaria'} (Básico, Intermedio, Avanzado).
4. Ejecuta la acción del usuario: "${actionInstructionMap[action] || actionInstructionMap.solve}".
5. Responde ÚNICAMENTE en formato estructurado JSON con las siguientes claves:
{
  "detectedText": "Texto o ecuación exacta detectada",
  "subjectSuggestion": "Nombre de la materia",
  "topicSuggestion": "Tema escolar específico",
  "difficulty": "Básico | Intermedio | Avanzado",
  "hint": "Pista conceptual",
  "explanation": "Explicación del tema",
  "guidedSteps": ["Paso 1: ...", "Paso 2: ...", "Paso 3: ..."],
  "similarExercises": [
    {
      "question": "Enunciado del ejercicio similar",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correctIndex": 0,
      "explanation": "Por qué es correcta"
    }
  ]
}
IMPORTANTE: Devuelve SOLAMENTE el objeto JSON sin bloques de código markdown ni texto adicional.
    `.trim();

    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const resolvedMime = validMimes.includes(mimeType) ? mimeType : 'image/png';

    const parts: any[] = [];
    if (rawTextFromSvg) {
      parts.push({ text: `Texto extraído del ejercicio: ${rawTextFromSvg}` });
    }
    parts.push({
      inlineData: {
        mimeType: resolvedMime,
        data: cleanBase64
      }
    });
    parts.push({ text: prompt });

    const multimodalContents = [{ role: 'user', parts }];

    const result = await generateWithGemini(multimodalContents);
    const responseText = result.text || '{}';

    let jsonResult: any;
    try {
      const cleaned = responseText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      jsonResult = JSON.parse(cleaned);
    } catch (parseErr) {
      console.warn('Could not parse Gemini scanner response as strict JSON:', responseText);
      jsonResult = {
        detectedText: 'Ejercicio transcrito de la imagen',
        subjectSuggestion: subjectName || 'Matemática',
        topicSuggestion: 'Resolución de problemas',
        difficulty: 'Intermedio',
        hint: 'Observa cuidadosamente las variables y los signos del ejercicio.',
        explanation: responseText,
        guidedSteps: [
          'Paso 1: Identificar datos y la incógnita',
          'Paso 2: Aplicar la relación o fórmula',
          'Paso 3: Comprobar el resultado obtenido'
        ],
        similarExercises: []
      };
    }

    return res.json({
      ...jsonResult,
      isAiGenerated: true,
      modelUsed: result.modelUsed
    });
  } catch (error: any) {
    console.error('Error in /api/scanner:', error);
    res.status(500).json({
      error: 'Error al procesar la imagen del ejercicio con IA.',
      details: error.message || 'Error desconocido'
    });
  }
});

// 3. PRACTICE QUESTIONS GENERATOR
app.post('/api/practice/generate', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const {
      subjectName,
      topicName,
      gradeName,
      countryName,
      age,
      count = 3,
      difficulty = 'adaptativo'
    } = req.body;

    const prompt = `
Genera ${count} ejercicios educativos interactivos para un estudiante de ${age || 14} años en ${gradeName || 'Secundaria'} (${countryName || 'América Latina'}).
Materia: ${subjectName}
Tema: ${topicName || 'General'}
Dificultad solicitada: ${difficulty}

Requisitos:
- Ejercicios realistas, adaptados al nivel curricular escolar exacto.
- Cada ejercicio debe tener 4 opciones (A, B, C, D) con SOLO UNA correcta.
- Explica de forma concisa por qué la opción correcta es válida.
- Agrega una explicación del error común que suelen cometer los estudiantes de esta edad.

Devuelve ÚNICAMENTE un array JSON válido con esta estructura exacta:
[
  {
    "id": "q1",
    "difficulty": "Básico | Intermedio | Desafío",
    "question": "Enunciado claro del problema o pregunta",
    "options": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    "correctOptionIndex": 0,
    "hint": "Pista orientadora",
    "explanation": "Explicación paso a paso de la respuesta correcta",
    "commonMistakeExplanation": "Error común: olvidar cambiar el signo o confundir términos"
  }
]
IMPORTANTE: Devuelve SOLAMENTE el array JSON sin markdown ni comillas invertidas.
    `.trim();

    const result = await generateWithGemini([
      { role: 'user', parts: [{ text: prompt }] }
    ]);

    const responseText = result.text || '[]';
    let questions = [];
    try {
      const cleaned = responseText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      questions = JSON.parse(cleaned);
    } catch (e) {
      console.error('Error parsing practice questions JSON from Gemini:', e);
      throw new Error('La IA no devolvió un formato de preguntas válido.');
    }

    if (Array.isArray(questions) && questions.length > 0) {
      return res.json({
        questions,
        isAiGenerated: true,
        modelUsed: result.modelUsed
      });
    }

    throw new Error('No se generaron preguntas válidas.');
  } catch (error: any) {
    console.error('Error generating practice:', error);
    res.status(500).json({
      error: 'Error al generar ejercicios de práctica con IA.',
      details: error.message || 'Error desconocido'
    });
  }
});

// 4. PRACTICE EVALUATE / EXPLAIN MISTAKE
app.post('/api/practice/evaluate', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { question, selectedOption, correctOption, studentName, gradeName, subjectName } = req.body;

    const prompt = `
Un estudiante de ${gradeName || 'Secundaria'} respondió una pregunta de ${subjectName || 'la materia'}.
Pregunta: "${question}"
Opción elegida por el estudiante (incorrecta): "${selectedOption}"
Opción correcta: "${correctOption}"

Explica con tono amable y didáctico:
1. Por qué la opción elegida es un error común o distractor.
2. Cómo razonar correctamente para llegar a la opción válida.
Mantén la explicación concisa (máximo 3 párrafos).
    `.trim();

    const result = await generateWithGemini([
      { role: 'user', parts: [{ text: prompt }] }
    ]);

    res.json({
      diagnosis: result.text,
      isAiGenerated: true,
      modelUsed: result.modelUsed
    });
  } catch (error: any) {
    console.error('Error evaluating practice:', error);
    res.status(500).json({
      error: 'Error al evaluar el ejercicio.',
      details: error.message
    });
  }
});

// 5. CRITICAL GUARD: Ensure ANY unmatched /api/* route ALWAYS returns JSON 404, NEVER index.html!
app.all('/api/*', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({
    error: `Ruta API no encontrada: ${req.method} ${req.path}`,
    status: 404
  });
});

// Start Express server and mount Vite in development or static dist in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 EDVYNTRA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start EDVYNTRA server:', err);
});
