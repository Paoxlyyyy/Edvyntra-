import { CountryEducationSystem, Subject, GradeOption } from '../types';

export const EDUCATION_SYSTEMS: CountryEducationSystem[] = [
  {
    code: 'SV',
    countryName: 'El Salvador',
    flag: '🇸🇻',
    description: 'Sistema Educativo Nacional (MINED) — Tercer Ciclo y Educación Media / Bachillerato',
    grades: [
      {
        id: 'sv-7',
        name: '7.º Grado (Tercer Ciclo)',
        level: 'Tercer Ciclo de Educación Básica',
        typicalAgeRange: '12 - 13 años',
        defaultSubjects: [
          {
            id: 'mat-sv-7',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Números enteros, proporciones, ecuaciones lineales elementales y geometría básica (ESMATE).',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Números enteros y valor absoluto', 'Proporcionalidad directa e inversa', 'Ecuaciones de primer grado', 'Patrones y figuras geométricas']
          },
          {
            id: 'len-sv-7',
            name: 'Lenguaje y Literatura',
            category: 'Humanidades',
            description: 'Comprensión lectora, textos narrativos, gramática castellana y ortografía puntual.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['El cuento maravilloso y de ciencia ficción', 'Clases de oraciones y conectores', 'Reglas de acentuación', 'Figuras retóricas iniciales']
          },
          {
            id: 'cie-sv-7',
            name: 'Ciencia, Salud y Medio Ambiente',
            category: 'Ciencias Naturales',
            description: 'Materia y energía, ecosistemas de El Salvador, sistema solar y salud integral.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Ecosistemas y biodiversidad local', 'Materia, densidad y estados', 'Nutrición y sistema digestivo', 'Tierra y universo']
          },
          {
            id: 'soc-sv-7',
            name: 'Estudios Sociales y Cívica',
            category: 'Ciencias Sociales',
            description: 'Geografía física y humana de Centroamérica, convivencia y derechos humanos.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Geografía física de Centroamérica', 'Población y sociedad centroamericana', 'Democracia y participación ciudadana', 'Cultura de paz y resolución de conflictos']
          },
          {
            id: 'ing-sv-7',
            name: 'Idioma Extranjero (Inglés)',
            category: 'Idiomas',
            description: 'Vocabulario esencial, estructuras comunicativas en presente simple y lectura introductoria.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Greetings and Personal Information', 'Daily Routines & Simple Present', 'Classroom Objects & School Life', 'Family and Describing People']
          },
          {
            id: 'civ-sv-7',
            name: 'Educación Moral y Cívica',
            category: 'Desarrollo Personal',
            description: 'Valores comunitarios, identidad nacional, toma de decisiones y ciudadanía.',
            icon: 'HeartHandshake',
            color: 'rose',
            topics: ['Valores y ética en la convivencia', 'Identidad salvadoreña y patrimonio', 'Derechos y deberes de la niñez']
          }
        ]
      },
      {
        id: 'sv-8',
        name: '8.º Grado (Tercer Ciclo)',
        level: 'Tercer Ciclo de Educación Básica',
        typicalAgeRange: '13 - 14 años',
        defaultSubjects: [
          {
            id: 'mat-sv-8',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Operaciones algebraicas con polinomios, sistemas de ecuaciones lineales y congruencia de triángulos.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Operaciones con polinomios', 'Sistemas de dos ecuaciones lineales', 'Función lineal y su gráfica', 'Congruencia y semejanza de triángulos']
          },
          {
            id: 'len-sv-8',
            name: 'Lenguaje y Literatura',
            category: 'Humanidades',
            description: 'La novela gótica y de aventuras, el ensayo escolar, análisis sintáctico y géneros dramáticos.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['La novela de aventuras y policiaca', 'El teatro y el diálogo dramático', 'Sintaxis: sujeto, predicado y complementos', 'El párrafo argumentativo']
          },
          {
            id: 'cie-sv-8',
            name: 'Ciencia, Salud y Medio Ambiente',
            category: 'Ciencias Naturales',
            description: 'Cinemática básica, fuerzas y leyes de movimiento, anatomía humana y recursos hidrológicos.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Movimiento rectilíneo uniforme (MRU)', 'Fuerzas y Leyes de Newton', 'Sistema nervioso y endocrino', 'Cambio climático y cuencas hidrográficas']
          },
          {
            id: 'soc-sv-8',
            name: 'Estudios Sociales y Cívica',
            category: 'Ciencias Sociales',
            description: 'Historia de América precolombina y colonial, geografía continental y derechos fundamentales.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Pueblos originarios de América', 'Época colonial y mestizaje', 'Geografía humana de América', 'Derechos humanos y Constitución salvadoreña']
          },
          {
            id: 'ing-sv-8',
            name: 'Idioma Extranjero (Inglés)',
            category: 'Idiomas',
            description: 'Pasado simple, descripciones de experiencias, conectores y vocabulario cotidiano.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Past Simple (Regular & Irregular Verbs)', 'Memories and Historical Events', 'Comparative & Superlative Adjectives', 'Future with Going to & Will']
          }
        ]
      },
      {
        id: 'sv-9',
        name: '9.º Grado (Tercer Ciclo)',
        level: 'Tercer Ciclo de Educación Básica',
        typicalAgeRange: '14 - 15 años',
        defaultSubjects: [
          {
            id: 'mat-sv-9',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Productos notables, factorización, ecuaciones cuadráticas, Teorema de Pitágoras y estadística.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Productos notables y factorización', 'Ecuaciones cuadráticas', 'Función cuadrática y parábolas', 'Teorema de Pitágoras y razones trigonométricas', 'Probabilidad y estadística']
          },
          {
            id: 'len-sv-9',
            name: 'Lenguaje y Literatura',
            category: 'Humanidades',
            description: 'Literatura contemporánea, poesía lírica, análisis del discurso y redacción de ensayos académicos.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Literatura contemporánea y vanguardias', 'Poesía lírica y métrica', 'El ensayo crítico y argumentativo', 'Oraciones compuestas coordinadas y subordinadas']
          },
          {
            id: 'cie-sv-9',
            name: 'Ciencia, Salud y Medio Ambiente',
            category: 'Ciencias Naturales',
            description: 'Estructura atómica, enlaces químicos, genética básica, electromagnetismo y energía.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Estructura del átomo y tabla periódica', 'Enlaces químicos y reacciones', 'Genética de Mendel y herencia', 'Electricidad, magnetismo y circuitos']
          },
          {
            id: 'soc-sv-9',
            name: 'Estudios Sociales y Cívica',
            category: 'Ciencias Sociales',
            description: 'Historia contemporánea de El Salvador en el siglo XX, Acuerdos de Paz y globalización.',
            icon: 'Globe',
            color: 'amber',
            topics: ['El Salvador en el siglo XX y conflicto armado', 'Los Acuerdos de Paz de 1992', 'Institucionalidad democrática salvadoreña', 'Globalización y desafíos medioambientales']
          },
          {
            id: 'ing-sv-9',
            name: 'Idioma Extranjero (Inglés)',
            category: 'Idiomas',
            description: 'Presente perfecto, verbos modales, condicionales iniciales y comprensión lectora.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Present Perfect Tense', 'Modal Verbs (can, must, should)', 'First & Second Conditionals', 'Reading comprehension & Short essays']
          }
        ]
      },
      {
        id: 'sv-bach-1',
        name: '1.er Año de Bachillerato General',
        level: 'Educación Media (Bachillerato)',
        typicalAgeRange: '15 - 16 años',
        defaultSubjects: [
          {
            id: 'mat-sv-b1',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Álgebra formal, trigonometría analítica, vectores y secciones cónicas.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Ecuaciones racionales y con radicales', 'Trigonometría analítica e identidades', 'Vectores y geometría analítica', 'Secciones cónicas (circunferencia, parábola, elipse)']
          },
          {
            id: 'len-sv-b1',
            name: 'Lenguaje y Literatura',
            category: 'Humanidades',
            description: 'Literatura clásica grecolatina, Renacimiento, Siglo de Oro y ensayo filosófico.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Literatura grecolatina clásica', 'Siglo de Oro español', 'Análisis semántico y pragmático', 'Ensayo académico y producción textual']
          },
          {
            id: 'cie-sv-b1',
            name: 'Ciencias Naturales (Física y Química I)',
            category: 'Ciencias Naturales',
            description: 'Cinemática vectorial, dinámica de Newton, estequiometría química y gases ideales.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Cinemática vectorial en dos dimensiones', 'Leyes de Newton y trabajo mecánico', 'Estequiometría y ley de conservación de masa', 'Gases ideales y termodinámica básica']
          },
          {
            id: 'soc-sv-b1',
            name: 'Estudios Sociales',
            category: 'Ciencias Sociales',
            description: 'Ciencias sociales como disciplina, investigación social y transformaciones mundiales del siglo XIX-XX.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Metodología de la investigación social', 'Revoluciones industriales y transformaciones mundiales', 'El Salvador: Estado, economía y transformaciones agrarias']
          },
          {
            id: 'ing-sv-b1',
            name: 'Idioma Extranjero (Inglés Intermedio)',
            category: 'Idiomas',
            description: 'Voz pasiva, oraciones relativas, comunicación formal y debates académicos.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Passive Voice in Present & Past', 'Relative Clauses (defining & non-defining)', 'Phrasal Verbs & Idiomatic Expressions', 'Academic Essay Writing']
          },
          {
            id: 'tec-sv-b1',
            name: 'Informática Educativa',
            category: 'Tecnología',
            description: 'Pensamiento computacional, algoritmos, hoja de cálculo avanzada y seguridad digital.',
            icon: 'Cpu',
            color: 'indigo',
            topics: ['Lógica algorítmica y diagramas de flujo', 'Hojas de cálculo y análisis de datos', 'Ciberseguridad y huella digital']
          }
        ]
      },
      {
        id: 'sv-bach-2',
        name: '2.º Año de Bachillerato General',
        level: 'Educación Media (Bachillerato)',
        typicalAgeRange: '16 - 17 años',
        defaultSubjects: [
          {
            id: 'mat-sv-b2',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Cálculo diferencial, sucesiones y series, probabilidad avanzada y estadística inferencial (PAES/AVANZO).',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Límites y continuidad', 'Cálculo diferencial (la derivada)', 'Sucesiones aritméticas y geométricas', 'Probabilidad combinatoria y distribuciones']
          },
          {
            id: 'len-sv-b2',
            name: 'Lenguaje y Literatura',
            category: 'Humanidades',
            description: 'Literatura latinoamericana contemporánea, Boom latinoamericano, autores salvadoreños y retórica.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['El Boom Latinoamericano (García Márquez, Cortázar)', 'Literatura salvadoreña (Roque Dalton, Salarrué)', 'Crítica literaria y ensayo argumentativo', 'Comunicación audiovisual y medios masivos']
          },
          {
            id: 'cie-sv-b2',
            name: 'Ciencias Naturales (Física y Química II / Biología)',
            category: 'Ciencias Naturales',
            description: 'Electrodinámica, electromagnetismo, ondas, química del carbono y biología molecular.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Circuitos eléctricos y Ley de Ohm', 'Ondas mecánicas, acústica y óptica', 'Química orgánica e hidrocarburos', 'Biología molecular, ADN y biotecnología']
          },
          {
            id: 'soc-sv-b2',
            name: 'Estudios Sociales y Cívica',
            category: 'Ciencias Sociales',
            description: 'Realidad nacional salvadoreña contemporánea, geopolítica, desafíos socioeconómicos y Estado de Derecho.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Geopolítica mundial y nuevas tendencias económicas', 'Estructura productiva y migración salvadoreña', 'Estado de derecho, democracia y transparencia', 'Proyecto de graduación e investigación social']
          },
          {
            id: 'ing-sv-b2',
            name: 'Idioma Extranjero (Inglés B1+)',
            category: 'Idiomas',
            description: 'Condicionales mixtos, reporte indirecto (Reported Speech), presentaciones orales y preparación AVANZO.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Reported Speech (Direct to Indirect)', 'Third Conditional & Mixed Conditionals', 'Advanced Reading & Text Analysis', 'Professional Communication & Interviews']
          }
        ]
      },
      {
        id: 'sv-bach-tec',
        name: 'Bachillerato Técnico Vocacional (1.º, 2.º y 3.º Año)',
        level: 'Educación Media Técnica',
        typicalAgeRange: '15 - 18 años',
        defaultSubjects: [
          {
            id: 'mat-sv-tec',
            name: 'Matemática Aplicada',
            category: 'Ciencias Exactas',
            description: 'Álgebra aplicada, trigonometría industrial, estadística y cálculo de procesos.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Álgebra aplicada y ecuaciones', 'Trigonometría y vectores en la técnica', 'Estadística para el control de calidad', 'Introducción al cálculo aplicado']
          },
          {
            id: 'cie-sv-tec',
            name: 'Ciencias Experimentales (Física y Química Técnica)',
            category: 'Ciencias Naturales',
            description: 'Mecánica de fluidos, termodinámica de procesos, electricidad y química de materiales.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Mecánica de fluidos y presión', 'Termodinámica y calorimetría', 'Electricidad industrial y circuitos', 'Propiedades de los materiales']
          },
          {
            id: 'len-sv-tec',
            name: 'Lenguaje y Comunicación Técnica',
            category: 'Humanidades',
            description: 'Redacción de informes técnicos, oratoria laboral y comprensión de manuales.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Redacción de manuales y protocolos técnicos', 'Presentación efectiva de proyectos', 'Comprensión lectora de textos científicos']
          },
          {
            id: 'ing-sv-tec',
            name: 'Inglés Técnico (ESP)',
            category: 'Idiomas',
            description: 'Terminología especializada, lectura de especificaciones y comunicación en entornos de trabajo.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Technical Vocabulary & Terminology', 'Reading Blueprints and Manuals', 'Workplace Safety Communication', 'Email and Technical Reporting']
          },
          {
            id: 'emp-sv-tec',
            name: 'Emprendimiento y Gestión de Proyectos',
            category: 'Desarrollo Profesional',
            description: 'Modelos de negocio canvas, finanzas para proyectos y formulación técnica.',
            icon: 'Briefcase',
            color: 'amber',
            topics: ['Modelo Canvas para emprendimientos', 'Costos, presupuestos y punto de equilibrio', 'Gestión ágil de proyectos']
          }
        ]
      }
    ]
  },
  {
    code: 'MX',
    countryName: 'México',
    flag: '🇲🇽',
    description: 'Sistema Educativo Nacional (SEP) — Educación Secundaria y Media Superior (Bachillerato / Prepa)',
    grades: [
      {
        id: 'mx-sec-1',
        name: '1.º de Secundaria',
        level: 'Educación Secundaria',
        typicalAgeRange: '12 - 13 años',
        defaultSubjects: [
          {
            id: 'mat-mx-1',
            name: 'Matemáticas I',
            category: 'Ciencias Exactas',
            description: 'Números enteros, fracciones, decimales, proporcionalidad y figuras geométricas.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Operaciones con fracciones y decimales', 'Proporcionalidad directa', 'Áreas y perímetros de polígonos', 'Jerarquía de operaciones']
          },
          {
            id: 'esp-mx-1',
            name: 'Lengua Materna (Español I)',
            category: 'Humanidades',
            description: 'Narrativa, reglamentos, investigación documental y mitos y leyendas.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Mitos y leyendas tradicionales', 'Reglamentos comunitarios y escolares', 'Fichas de trabajo de investigación', 'Cuentos de terror y misterio']
          },
          {
            id: 'bio-mx-1',
            name: 'Ciencias y Tecnología (Biología)',
            category: 'Ciencias Naturales',
            description: 'Evolución darwiniana, biodiversidad mexicana, células y nutrición humana.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Biodiversidad mexicana y endemismo', 'Evolución y selección natural', 'La célula como unidad viva', 'Salud y nutrición en la adolescencia']
          },
          {
            id: 'geo-mx-1',
            name: 'Geografía',
            category: 'Ciencias Sociales',
            description: 'Espacio geográfico, dinámica de placas tectónicas, clima y diversidad cultural.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Mapas, coordenadas y escalas', 'Tectónica de placas y relieve', 'Diversidad cultural y migración']
          },
          {
            id: 'his-mx-1',
            name: 'Historia I',
            category: 'Ciencias Sociales',
            description: 'Desde la Ilustración y las revoluciones burguesas hasta la Primera Guerra Mundial.',
            icon: 'Landmark',
            color: 'orange',
            topics: ['La Ilustración y la Revolución Francesa', 'Revolución Industrial y sociedad', 'Primera Guerra Mundial']
          },
          {
            id: 'ing-mx-1',
            name: 'Lengua Extranjera (Inglés I)',
            category: 'Idiomas',
            description: 'Intercambio de información básica, descripciones y rutinas cotidianas.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Personal pronouns and verb To Be', 'Simple Present and routines', 'Everyday school communication']
          }
        ]
      },
      {
        id: 'mx-sec-2',
        name: '2.º de Secundaria',
        level: 'Educación Secundaria',
        typicalAgeRange: '13 - 14 años',
        defaultSubjects: [
          {
            id: 'mat-mx-2',
            name: 'Matemáticas II',
            category: 'Ciencias Exactas',
            description: 'Sistemas de ecuaciones 2x2, multiplicación y división de polinomios, volumen de prismas.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Sistemas de dos ecuaciones lineales', 'Multiplicación y división de expresiones algebraicas', 'Volumen de prismas y pirámides', 'Histogramas y gráficas poligonales']
          },
          {
            id: 'esp-mx-2',
            name: 'Lengua Materna (Español II)',
            category: 'Humanidades',
            description: 'Novela hispanoamericana, mesa redonda, crónica y textos poéticos.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['La novela en la literatura hispanoamericana', 'Mesa redonda y discusión formal', 'Crónica y reportaje periodístico']
          },
          {
            id: 'fis-mx-2',
            name: 'Ciencias y Tecnología (Física)',
            category: 'Ciencias Naturales',
            description: 'Leyes del movimiento, fuerza, energía, calor y modelos del universo.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Velocidad, aceleración y MRU', 'Leyes de Newton y gravitación', 'Energía cinética y potencial', 'Calor, temperatura y teoría cinética']
          },
          {
            id: 'his-mx-2',
            name: 'Historia II (Historia de México I)',
            category: 'Ciencias Sociales',
            description: 'Culturas mesoamericanas, la Conquista, el Virreinato de la Nueva España e Independencia.',
            icon: 'Landmark',
            color: 'amber',
            topics: ['Culturas de Mesoamérica (Maya, Mexica, Zapoteca)', 'Conquista y caída de Tenochtitlan', 'El Virreinato y el mestizaje', 'Guerra de Independencia de México']
          },
          {
            id: 'civ-mx-2',
            name: 'Formación Cívica y Ética',
            category: 'Ciencias Sociales',
            description: 'Identidad adolescente, derechos humanos, justicia social e inclusión.',
            icon: 'HeartHandshake',
            color: 'rose',
            topics: ['Identidad y toma de decisiones éticas', 'Derechos humanos y no discriminación', 'Cultura de paz y legalidad']
          },
          {
            id: 'ing-mx-2',
            name: 'Lengua Extranjera (Inglés II)',
            category: 'Idiomas',
            description: 'Narración de anécdotas en pasado, planes a futuro y comparaciones.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Past Continuous & Simple Past', 'Expressing Future plans (will / going to)', 'Giving directions and advice']
          }
        ]
      },
      {
        id: 'mx-sec-3',
        name: '3.º de Secundaria',
        level: 'Educación Secundaria',
        typicalAgeRange: '14 - 15 años',
        defaultSubjects: [
          {
            id: 'mat-mx-3',
            name: 'Matemáticas III',
            category: 'Ciencias Exactas',
            description: 'Ecuaciones cuadráticas, Teorema de Tales y Pitágoras, razones trigonométricas y gráficas no lineales.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Ecuaciones cuadráticas por factorización y fórmula general', 'Teorema de Tales y semejanza de triángulos', 'Razones trigonométricas (seno, coseno, tangente)', 'Probabilidad condicional']
          },
          {
            id: 'esp-mx-3',
            name: 'Lengua Materna (Español III)',
            category: 'Humanidades',
            description: 'El ensayo literario, debates formales, diversidad lingüística de México y poesía renacentista.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['El ensayo argumentativo', 'El debate académico formal', 'Diversidad lingüística y lenguas indígenas de México']
          },
          {
            id: 'qui-mx-3',
            name: 'Ciencias y Tecnología (Química)',
            category: 'Ciencias Naturales',
            description: 'Propiedades de la materia, modelo atómico de Bohr, enlace químico, reacciones y neutralización.',
            icon: 'FlaskConical',
            color: 'cyan',
            topics: ['Mezclas, compuestos y elementos', 'Modelo de Bohr y tabla periódica', 'Reacciones químicas y balanceo por tanteo', 'Ácidos, bases y escala de pH']
          },
          {
            id: 'his-mx-3',
            name: 'Historia III (Historia de México II)',
            category: 'Ciencias Sociales',
            description: 'México independiente, Guerra de Reforma, Porfiriato, Revolución Mexicana y México actual.',
            icon: 'Landmark',
            color: 'amber',
            topics: ['Guerra de Reforma y Leyes de Juárez', 'El Porfiriato y modernización desigual', 'La Revolución Mexicana de 1910', 'México contemporáneo y globalización']
          },
          {
            id: 'ing-mx-3',
            name: 'Lengua Extranjera (Inglés III)',
            category: 'Idiomas',
            description: 'Presente perfecto, condicionales tipo 1 y 2, y argumentación estructurada.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Present Perfect with already, yet, ever', 'First and Second Conditionals', 'Modal verbs for speculation']
          }
        ]
      },
      {
        id: 'mx-prep',
        name: 'Bachillerato / Preparatoria (Media Superior)',
        level: 'Educación Media Superior',
        typicalAgeRange: '15 - 18 años',
        defaultSubjects: [
          {
            id: 'mat-mx-prep',
            name: 'Matemáticas y Cálculo',
            category: 'Ciencias Exactas',
            description: 'Álgebra superior, trigonometría, geometría analítica y cálculo diferencial e integral.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Geometría analítica (recta, cónicas)', 'Funciones y sus gráficas', 'Cálculo diferencial: límites y derivadas', 'Cálculo integral e integrales inmediatas']
          },
          {
            id: 'fis-mx-prep',
            name: 'Física Preuniversitaria',
            category: 'Ciencias Naturales',
            description: 'Mecánica clásica, termodinámica, ondas, electromagnetismo y óptica.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Dinámica de Newton y trabajo mecánico', 'Electrostática y circuitos de corriente directa', 'Óptica geométrica y ondas electromagnéticas']
          },
          {
            id: 'qui-mx-prep',
            name: 'Química General y Orgánica',
            category: 'Ciencias Naturales',
            description: 'Estequiometría avanzada, termoquímica, cinemática química y química del carbono.',
            icon: 'FlaskConical',
            color: 'teal',
            topics: ['Estequiometría y reactivo limitante', 'Cinética química y equilibrio químico', 'Grupos funcionales orgánicos (alcoholes, aldehídos)']
          },
          {
            id: 'tlr-mx-prep',
            name: 'Taller de Lectura y Redacción / Literatura',
            category: 'Humanidades',
            description: 'Comprensión de textos científicos, redacción de ensayos académicos y análisis literario.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Estructura y rigor del ensayo académico', 'Textos funcionales y expositivos', 'Corrientes literarias universales']
          },
          {
            id: 'soc-mx-prep',
            name: 'Estructura Socioeconómica de México',
            category: 'Ciencias Sociales',
            description: 'Modelos económicos (sustitución de importaciones, desarrollo estabilizador, neoliberalismo) y estado actual.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Modelos de desarrollo en México', 'Proceso de industrialización', 'Tratados comerciales y desafíos actuales']
          },
          {
            id: 'ing-mx-prep',
            name: 'Inglés Avanzado',
            category: 'Idiomas',
            description: 'Expresión oral fluida, voz pasiva avanzada, redacción académica y preparación de exámenes.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Advanced Conditional Structures', 'Reported Speech & Complex Clauses', 'Academic Writing & Discussion']
          }
        ]
      }
    ]
  },
  {
    code: 'CO',
    countryName: 'Colombia',
    flag: '🇨🇴',
    description: 'Sistema Educativo Nacional (MEN) — Educación Básica Secundaria y Educación Media',
    grades: [
      {
        id: 'co-bas-789',
        name: 'Básica Secundaria (7.º, 8.º y 9.º)',
        level: 'Básica Secundaria',
        typicalAgeRange: '12 - 15 años',
        defaultSubjects: [
          {
            id: 'mat-co-b',
            name: 'Matemáticas',
            category: 'Ciencias Exactas',
            description: 'Pensamiento numérico, variacional y geométrico, álgebra elemental y estadística.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Números racionales e irracionales', 'Expresiones algebraicas y factorización', 'Geometría euclidiana y transformaciones', 'Medidas de tendencia central']
          },
          {
            id: 'esp-co-b',
            name: 'Lengua Castellana',
            category: 'Humanidades',
            description: 'Literatura colombiana y latinoamericana, tipologías textuales, cohesión y coherencia.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Mitos indígenas colombianos y colonia', 'El texto argumentativo e informativo', 'Sintaxis de la oración compuesta', 'Lectura crítica Pruebas Saber']
          },
          {
            id: 'cie-co-b',
            name: 'Ciencias Naturales y Educación Ambiental',
            category: 'Ciencias Naturales',
            description: 'Genética, química de los alimentos, física del movimiento y ecosistemas colombianos.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Genética mendeliana y ADN', 'La materia: mezclas y tabla periódica', 'Leyes de Newton y cinemática', 'Páramos y biodiversidad colombiana']
          },
          {
            id: 'soc-co-b',
            name: 'Ciencias Sociales',
            category: 'Ciencias Sociales',
            description: 'Historia republicana de Colombia, geografía nacional, Constitución Política de 1991.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Independencia y siglo XIX en Colombia', 'Constitución de 1991 y derechos fundamentales', 'Regiones geográficas de Colombia']
          },
          {
            id: 'ing-co-b',
            name: 'Idioma Extranjero (Inglés)',
            category: 'Idiomas',
            description: 'Estándares básicos de competencias en lenguas extranjeras (niveles A2 a B1).',
            icon: 'Languages',
            color: 'violet',
            topics: ['Daily Life & Cultural Traditions', 'Past Experiences & Storytelling', 'Expressing Opinion & Agreement']
          }
        ]
      },
      {
        id: 'co-med-1011',
        name: 'Educación Media (10.º y 11.º - Saber 11)',
        level: 'Educación Media',
        typicalAgeRange: '15 - 17 años',
        defaultSubjects: [
          {
            id: 'mat-co-m',
            name: 'Matemáticas y Cálculo',
            category: 'Ciencias Exactas',
            description: 'Trigonometría analítica en 10º, cálculo diferencial e integral en 11º, preparación Saber 11.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Razones trigonométricas y teorema del seno/coseno', 'Funciones y límites', 'Cálculo diferencial (la derivada)', 'Estadística inferencial y combinatoria']
          },
          {
            id: 'fis-co-m',
            name: 'Física',
            category: 'Ciencias Naturales',
            description: 'Mecánica clásica, fluidos, termodinámica, ondas, electromagnetismo.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Dinámica de Newton y energía', 'Fluidos: Principio de Pascal y Arquímedes', 'Termodinámica y calorimetría', 'Ondas, sonido y óptica']
          },
          {
            id: 'qui-co-m',
            name: 'Química',
            category: 'Ciencias Naturales',
            description: 'Química general, inorgánica, estequiometría, disoluciones y química orgánica.',
            icon: 'FlaskConical',
            color: 'teal',
            topics: ['Estequiometría y cálculos molares', 'Disoluciones y concentración molar', 'Equilibrio químico y pH', 'Química orgánica e hidrocarburos']
          },
          {
            id: 'fil-co-m',
            name: 'Filosofía',
            category: 'Humanidades',
            description: 'Filosofía antigua, moderna y contemporánea, epistemología y ética.',
            icon: 'Sparkles',
            color: 'purple',
            topics: ['Presocráticos, Sócrates, Platón y Aristóteles', 'Racionalismo vs Empirismo', 'Ética kantiana y utilitarismo', 'Filosofía política contemporánea']
          },
          {
            id: 'cie-pol-co',
            name: 'Ciencias Económicas y Políticas',
            category: 'Ciencias Sociales',
            description: 'Economía de mercado, inflación, políticas públicas, conflicto y paz en Colombia.',
            icon: 'Briefcase',
            color: 'amber',
            topics: ['Micro y macroeconomía básica', 'El sistema político colombiano', 'Acuerdo de Paz y memoria histórica']
          },
          {
            id: 'ing-co-m',
            name: 'Inglés (Pruebas Saber 11)',
            category: 'Idiomas',
            description: 'Lectura crítica en inglés, textos inferenciales, gramática aplicada.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Reading comprehension Saber 11', 'Grammar in Context (Conditionals, Passive)', 'Lexical cloze & Discourse markers']
          }
        ]
      }
    ]
  },
  {
    code: 'ES',
    countryName: 'España',
    flag: '🇪🇸',
    description: 'Sistema Educativo (LOMLOE) — Educación Secundaria Obligatoria (ESO) y Bachillerato',
    grades: [
      {
        id: 'es-eso-12',
        name: '1.º y 2.º de E.S.O.',
        level: 'Educación Secundaria Obligatoria',
        typicalAgeRange: '12 - 14 años',
        defaultSubjects: [
          {
            id: 'mat-es-1',
            name: 'Matemáticas',
            category: 'Ciencias Exactas',
            description: 'Aritmética, números enteros y racionales, iniciación al álgebra y geometría plana.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Divisibilidad, mcd y mcm', 'Fracciones y porcentajes', 'Iniciación al álgebra y ecuaciones de 1.er grado', 'Geometría del plano: áreas y perímetros']
          },
          {
            id: 'len-es-1',
            name: 'Lengua Castellana y Literatura',
            category: 'Humanidades',
            description: 'Comprensión lectora, categorías gramaticales, sintaxis simple y géneros literarios.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Morfología: sustantivos, adjetivos, verbos', 'La oración simple: sujeto y predicado', 'Los géneros literarios (lírica, narrativa, teatro)', 'Textos expositivos y descriptivos']
          },
          {
            id: 'byg-es-1',
            name: 'Biología y Geología',
            category: 'Ciencias Naturales',
            description: 'La Tierra en el universo, geosfera, biosfera y reinos de los seres vivos.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Estructura de la Tierra y minerales', 'La atmósfera e hidrosfera', 'Los reinos de los seres vivos', 'Ecosistemas y relaciones tróficas']
          },
          {
            id: 'gyh-es-1',
            name: 'Geografía e Historia',
            category: 'Ciencias Sociales',
            description: 'El medio físico de España y Europa, Prehistoria, Edad Antigua y Edad Media.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Geografía física de España y Europa', 'Prehistoria y primeras civilizaciones', 'Grecia y Roma clásicas', 'La Edad Media en la Península Ibérica']
          },
          {
            id: 'ing-es-1',
            name: 'Primera Lengua Extranjera (Inglés)',
            category: 'Idiomas',
            description: 'Comunicación en el aula, rutinas, descripciones y narración sencilla.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Present Simple & Continuous', 'Past Simple regular/irregular', 'Describing places, people and hobbies']
          }
        ]
      },
      {
        id: 'es-eso-34',
        name: '3.º y 4.º de E.S.O.',
        level: 'Educación Secundaria Obligatoria',
        typicalAgeRange: '14 - 16 años',
        defaultSubjects: [
          {
            id: 'mat-es-2',
            name: 'Matemáticas Académicas',
            category: 'Ciencias Exactas',
            description: 'Polinomios, ecuaciones de 2.º grado, sistemas, trigonometría básica, funciones y probabilidad.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Regla de Ruffini y factorización de polinomios', 'Ecuaciones de 2.º grado y bicuadradas', 'Trigonometría básica y razones', 'Funciones polinómicas, racionales y exponenciales', 'Probabilidad compuesta']
          },
          {
            id: 'len-es-2',
            name: 'Lengua Castellana y Literatura',
            category: 'Humanidades',
            description: 'Sintaxis de la oración compleja, historia literaria desde el Renacimiento al siglo XX.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Oraciones coordinadas y subordinadas', 'El Siglo de Oro: teatro y novela picaresca', 'Romanticismo y Realismo español', 'Generación del 98 y del 27']
          },
          {
            id: 'fyq-es-2',
            name: 'Física y Química',
            category: 'Ciencias Naturales',
            description: 'Cinemática, dinámica de Newton, enlaces químicos, reacciones y estequiometría.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Movimiento rectilíneo y circular uniforme', 'Fuerzas y principios de la dinámica', 'Enlace químico y formulación inorgánica', 'Cálculos estequiométricos']
          },
          {
            id: 'gyh-es-2',
            name: 'Geografía e Historia',
            category: 'Ciencias Sociales',
            description: 'Edad Moderna, revoluciones contemporáneas, imperialismo, Guerras Mundiales y España en el siglo XX.',
            icon: 'Landmark',
            color: 'amber',
            topics: ['El Antiguo Régimen y la Ilustración', 'Revolución Industrial y movimiento obrero', 'Guerras Mundiales y Guerra Fría', 'Historia de España en los siglos XIX y XX']
          },
          {
            id: 'ing-es-2',
            name: 'Primera Lengua Extranjera (Inglés B1)',
            category: 'Idiomas',
            description: 'Voz pasiva, estilo indirecto, condicionales 1 y 2, redacción de ensayos breves.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Conditionals (Zero, First, Second)', 'Passive Voice & Causative verbs', 'Reported Speech', 'Opinion essays & reviews']
          }
        ]
      },
      {
        id: 'es-bach',
        name: 'Bachillerato (1.º y 2.º - Preparación EBAU/EvAU)',
        level: 'Bachillerato',
        typicalAgeRange: '16 - 18 años',
        defaultSubjects: [
          {
            id: 'mat-es-b',
            name: 'Matemáticas I y II (o Ciencias Sociales)',
            category: 'Ciencias Exactas',
            description: 'Álgebra matricial, análisis matemático (derivadas, integrales, límites) y geometría del espacio.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Matrices, determinantes y sistemas (Rouché-Frobenius)', 'Límites, continuidad y teorema de Bolzano', 'Derivadas, aplicaciones y optimización', 'Integrales indefinidas y definidas (Barrow)', 'Geometría analítica en 3D (vectores, planos, rectas)']
          },
          {
            id: 'fil-es-b',
            name: 'Filosofía / Historia de la Filosofía',
            category: 'Humanidades',
            description: 'Grandes autores para la EvAU: Platón, Tomás de Aquino, Descartes, Locke, Kant, Nietzsche.',
            icon: 'Sparkles',
            color: 'purple',
            topics: ['Platón: teoría de las ideas y la caverna', 'Descartes y el método de la duda', 'Kant: crítica de la razón pura y ética', 'Nietzsche: crítica a la cultura occidental']
          },
          {
            id: 'len-es-b',
            name: 'Lengua Castellana y Literatura II',
            category: 'Humanidades',
            description: 'Análisis textual, sintaxis oracional completa, literatura española contemporánea.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Comentario de texto guiado EvAU', 'Análisis sintáctico profundo', 'Novela española de posguerra', 'Poesía española desde 1939']
          },
          {
            id: 'his-es-b',
            name: 'Historia de España',
            category: 'Ciencias Sociales',
            description: 'Crisis del Antiguo Régimen, Constitución de 1812, Restauración, República, Guerra Civil y Transición.',
            icon: 'Landmark',
            color: 'amber',
            topics: ['Constitución de 1812 y reinado de Fernando VII', 'La Restauración borbónica y el turnismo', 'Segunda República y Guerra Civil (1931-1939)', 'Dictadura franquista y Transición democrática']
          },
          {
            id: 'cie-es-b',
            name: 'Física / Química / Biología EvAU',
            category: 'Ciencias Naturales',
            description: 'Campo gravitatorio, electromagnetismo, óptica y física nuclear; o química orgánica y redox.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Campo gravitatorio y leyes de Kepler', 'Campo eléctrico y magnético (Lorentz, Faraday)', 'Ondas, sonido y efecto Doppler', 'Física cuántica y efecto fotoeléctrico']
          },
          {
            id: 'ing-es-b',
            name: 'Inglés II (Nivel B2)',
            category: 'Idiomas',
            description: 'Comprensión textual académica, conectores avanzados, redacción formal para EvAU.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Advanced connectors and cohesion', 'Inversion and emphatic structures', 'Reading comprehension for university entrance']
          }
        ]
      }
    ]
  },
  {
    code: 'AR',
    countryName: 'Argentina',
    flag: '🇦🇷',
    description: 'Sistema Educativo Nacional — Educación Secundaria Básica y Orientada',
    grades: [
      {
        id: 'ar-sec-bas',
        name: 'Secundaria Básica (1.º, 2.º y 3.º Año)',
        level: 'Ciclo Básico Secundario',
        typicalAgeRange: '12 - 15 años',
        defaultSubjects: [
          {
            id: 'mat-ar-b',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Conjuntos numéricos, ecuaciones, funciones lineales y geometría plana.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Números enteros y racionales', 'Ecuaciones e inecuaciones de primer grado', 'Función lineal y proporcionalidad', 'Figuras geométricas y Teorema de Pitágoras']
          },
          {
            id: 'len-ar-b',
            name: 'Prácticas del Lenguaje / Literatura',
            category: 'Humanidades',
            description: 'Comprensión lectora, textos poéticos y narrativos, gramática y normativa.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['El cuento fantástico y realista argentino', 'La argumentación y debate', 'Análisis sintáctico de la oración']
          },
          {
            id: 'cie-ar-b',
            name: 'Ciencias Naturales (Físico-Química y Biología)',
            category: 'Ciencias Naturales',
            description: 'Materia y transformaciones, célula, sistemas del cuerpo humano y biodiversidad.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Estructura atómica y tabla periódica', 'La célula: estructura y funciones', 'Sistemas de nutrición y relación en el ser humano']
          },
          {
            id: 'soc-ar-b',
            name: 'Ciencias Sociales (Historia y Geografía)',
            category: 'Ciencias Sociales',
            description: 'Historia americana y argentina, geografía ambiental y derechos ciudadanos.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Pueblos originarios y colonización', 'Revolución de Mayo y guerras de independencia', 'Geografía ambiental de Argentina']
          },
          {
            id: 'ing-ar-b',
            name: 'Inglés',
            category: 'Idiomas',
            description: 'Vocabulario cotidiano, tiempos verbales simples y comprensión lectora.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Present and Past Tenses', 'Describing daily routines and travel', 'Basic conversational interactions']
          }
        ]
      },
      {
        id: 'ar-sec-ori',
        name: 'Secundaria Orientada (4.º, 5.º y 6.º Año)',
        level: 'Ciclo Orientado',
        typicalAgeRange: '15 - 18 años',
        defaultSubjects: [
          {
            id: 'mat-ar-o',
            name: 'Matemática Superior',
            category: 'Ciencias Exactas',
            description: 'Función cuadrática, exponencial, logarítmica, trigonometría y cálculo inicial.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Función cuadrática y polinomios', 'Funciones exponenciales y logarítmicas', 'Trigonometría analítica', 'Introducción al análisis matemático']
          },
          {
            id: 'lit-ar-o',
            name: 'Literatura Argentina y Latinoamericana',
            category: 'Humanidades',
            description: 'Martín Fierro, Borges, Cortázar, literatura contemporánea y ensayo crítico.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Literatura gauchesca y nacional', 'Borges, Cortázar y el Boom', 'Ensayo crítico y teoría literaria']
          },
          {
            id: 'fis-qui-ar',
            name: 'Física y Química Superior',
            category: 'Ciencias Naturales',
            description: 'Cinemática vectorial, energía, estequiometría, disoluciones y química del carbono.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Leyes de la dinámica y energía mecánica', 'Estequiometría y soluciones químicas', 'Química del carbono y biomoléculas']
          },
          {
            id: 'his-ar-o',
            name: 'Historia Argentina Contemporánea',
            category: 'Ciencias Sociales',
            description: 'El modelo agroexportador, peronismo, dictaduras militares, retorno democrático y siglo XXI.',
            icon: 'Landmark',
            color: 'amber',
            topics: ['Generación del 80 y modelo agroexportador', 'El peronismo histórico (1945-1955)', 'Dictadura militar de 1976 y derechos humanos', 'Recuperación de la democracia en 1983']
          },
          {
            id: 'ing-ar-o',
            name: 'Inglés Avanzado',
            category: 'Idiomas',
            description: 'Nivel B1+/B2: comprensión de textos complejos, debates y redacción.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Complex verb tenses & Passive', 'Critical Reading of Articles', 'Debating current global issues']
          }
        ]
      }
    ]
  },
  {
    code: 'CL',
    countryName: 'Chile',
    flag: '🇨🇱',
    description: 'Sistema Educativo Nacional (Mineduc) — Educación Básica (7.º-8.º) y Enseñanza Media (1.º-4.º)',
    grades: [
      {
        id: 'cl-bas',
        name: '7.º y 8.º Básico',
        level: 'Educación Básica',
        typicalAgeRange: '12 - 14 años',
        defaultSubjects: [
          {
            id: 'mat-cl-b',
            name: 'Matemática',
            category: 'Ciencias Exactas',
            description: 'Potencias, ecuaciones, proporcionalidad, área y volumen, probabilidades.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Potencias y raíz cuadrada', 'Álgebra y ecuaciones lineales', 'Área y volumen de prismas y cilindros', 'Probabilidad y tablas de frecuencias']
          },
          {
            id: 'len-cl-b',
            name: 'Lengua y Literatura',
            category: 'Humanidades',
            description: 'Narrativa, poesía, texto argumentativo, medios de comunicación.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Lectura de narraciones universales', 'El texto argumentativo', 'Ortografía y vocabulario contextual']
          },
          {
            id: 'cie-cl-b',
            name: 'Ciencias Naturales',
            category: 'Ciencias Naturales',
            description: 'Célula, fotosíntesis, materia, fuerzas y movimiento, sistema circulatorio.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Célula vegetal y fotosíntesis', 'Fuerzas, presión y movimiento', 'Estructura atómica y materia']
          },
          {
            id: 'his-cl-b',
            name: 'Historia, Geografía y Ciencias Sociales',
            category: 'Ciencias Sociales',
            description: 'Mundo antiguo, Edad Media, Renacimiento, geografía y territorio chileno.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Grecia y Roma clásicas', 'El mundo medieval y moderno', 'Geografía física y humana de Chile']
          },
          {
            id: 'ing-cl-b',
            name: 'Idioma Extranjero (Inglés)',
            category: 'Idiomas',
            description: 'Expresiones cotidianas, narración en pasado y presente, descripción.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Daily activities & routines', 'Narrating events in Simple Past', 'Giving advice & modal verbs']
          }
        ]
      },
      {
        id: 'cl-med',
        name: 'Enseñanza Media (1.º a 4.º Medio - PAES)',
        level: 'Enseñanza Media',
        typicalAgeRange: '14 - 18 años',
        defaultSubjects: [
          {
            id: 'mat-cl-m',
            name: 'Matemática (M1 y M2 PAES)',
            category: 'Ciencias Exactas',
            description: 'Álgebra y funciones, geometría analítica, probabilidad y estadística, cálculo inicial.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Función cuadrática y sus aplicaciones', 'Trigonometría y vectores en el plano', 'Geometría analítica de la recta', 'Probabilidad condicional y variables aleatorias']
          },
          {
            id: 'len-cl-m',
            name: 'Lengua y Literatura (Competencia Lectora)',
            category: 'Humanidades',
            description: 'Lectura crítica, ensayos, literatura universal, textos periodísticos y argumentativos.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Estrategias de comprensión lectora PAES', 'El discurso argumentativo y falacias', 'Grandes hitos de la literatura universal']
          },
          {
            id: 'cie-cl-m',
            name: 'Ciencias para la Ciudadanía (Biología, Física y Química)',
            category: 'Ciencias Naturales',
            description: 'Salud y bienestar, ambiente y sostenibilidad, tecnología y sociedad.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Genética humana e inmunología', 'Energía y cambio climático', 'Cinemática y dinámica newtoniana', 'Química ambiental y soluciones']
          },
          {
            id: 'his-cl-m',
            name: 'Historia, Geografía y Ciencias Sociales',
            category: 'Ciencias Sociales',
            description: 'Historia de Chile en el siglo XX, conformación del Estado nación, formación ciudadana.',
            icon: 'Landmark',
            color: 'amber',
            topics: ['Guerra Fría y transformaciones en Chile', 'Régimen militar y transición democrática', 'Institucionalidad democrática y derechos ciudadanos']
          },
          {
            id: 'fil-cl-m',
            name: 'Filosofía',
            category: 'Humanidades',
            description: 'Preguntas filosóficas fundamentales, epistemología, ética y política.',
            icon: 'Sparkles',
            color: 'purple',
            topics: ['Naturaleza de la filosofía y el filosofar', 'Teorías del conocimiento', 'Dilemas éticos contemporáneos']
          },
          {
            id: 'ing-cl-m',
            name: 'Inglés',
            category: 'Idiomas',
            description: 'Lectura comprensiva de textos auténticos, formulación de argumentos e interacción oral.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Advanced reading skills', 'Passive and conditional structures', 'Expressing viewpoints & debates']
          }
        ]
      }
    ]
  },
  {
    code: 'INT',
    countryName: 'Internacional / Otros Países',
    flag: '🌎',
    description: 'Currículo estándar internacional de Secundaria y Preparatoria',
    grades: [
      {
        id: 'int-7-8',
        name: 'Secundaria Básica (7.º y 8.º Grado / Grade 7-8)',
        level: 'Middle School / Educación Secundaria Básica',
        typicalAgeRange: '12 - 14 años',
        defaultSubjects: [
          {
            id: 'mat-int-b',
            name: 'Matemáticas',
            category: 'Ciencias Exactas',
            description: 'Aritmética, fracciones, álgebra temprana, razones y geometría básica.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Fracciones, decimales y porcentajes', 'Ecuaciones lineales de una variable', 'Geometría plana: ángulos, triángulos y círculos', 'Estadística básica y probabilidad']
          },
          {
            id: 'len-int-b',
            name: 'Lenguaje y Literatura',
            category: 'Humanidades',
            description: 'Comprensión lectora, gramática, producción de textos narrativos y ensayos breves.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Estructura narrativa y análisis de personajes', 'Gramática y ortografía funcional', 'Redacción de párrafos argumentativos']
          },
          {
            id: 'cie-int-b',
            name: 'Ciencias Integradas (Biología, Física, Química)',
            category: 'Ciencias Naturales',
            description: 'Método científico, la célula viva, fuerzas y energía, transformaciones de la materia.',
            icon: 'Microscope',
            color: 'cyan',
            topics: ['Método científico y experimentación', 'La célula y la vida', 'Fuerzas, gravedad y energía', 'Átomos y moléculas básicas']
          },
          {
            id: 'soc-int-b',
            name: 'Ciencias Sociales e Historia Universal',
            category: 'Ciencias Sociales',
            description: 'Civilizaciones antiguas, geografía global, derechos humanos y convivencia.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Civilizaciones fluviales y clásicas', 'Geografía física y climas del planeta', 'Derechos humanos y ciudadanía global']
          },
          {
            id: 'ing-int-b',
            name: 'Inglés como Segundo Idioma / Lengua Extranjera',
            category: 'Idiomas',
            description: 'Desarrollo de las 4 habilidades: comprensión auditiva, lectura, escritura y conversación.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Basic and intermediate tenses', 'Everyday communication and school vocabulary', 'Short creative writing']
          }
        ]
      },
      {
        id: 'int-9-10',
        name: 'Secundaria Avanzada (9.º y 10.º Grado / Grade 9-10)',
        level: 'High School / Secundaria Superior',
        typicalAgeRange: '14 - 16 años',
        defaultSubjects: [
          {
            id: 'mat-int-m',
            name: 'Álgebra y Geometría',
            category: 'Ciencias Exactas',
            description: 'Álgebra I y II, funciones cuadráticas, geometría euclidiana y trigonometría.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Polinomios y factorización', 'Funciones cuadráticas y exponenciales', 'Teorema de Pitágoras y trigonometría básica', 'Sistemas de ecuaciones']
          },
          {
            id: 'len-int-m',
            name: 'Literatura Universal y Composición',
            category: 'Humanidades',
            description: 'Análisis textual de obras universales, redacción de ensayos de investigación y retórica.',
            icon: 'BookOpen',
            color: 'emerald',
            topics: ['Análisis crítico de novelas clásicas', 'Estructura formal del ensayo de investigación', 'Figuras literarias y oratoria']
          },
          {
            id: 'bio-int-m',
            name: 'Biología y Ecología',
            category: 'Ciencias Naturales',
            description: 'Genética, biotecnología, ecología de poblaciones y fisiología animal y vegetal.',
            icon: 'Microscope',
            color: 'teal',
            topics: ['Estructura celular y metabolismo', 'Genética mendeliana y ADN', 'Evolución y biodiversidad', 'Ecología global y sostenibilidad']
          },
          {
            id: 'fis-int-m',
            name: 'Física y Química General',
            category: 'Ciencias Naturales',
            description: 'Mecánica clásica, cinemática, termodinámica elemental, enlace químico y estequiometría.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Leyes del movimiento de Newton', 'Energía y trabajo', 'Enlace químico y reacciones', 'Estequiometría básica']
          },
          {
            id: 'his-int-m',
            name: 'Historia Contemporánea y Ciudadanía',
            category: 'Ciencias Sociales',
            description: 'De las revoluciones atlánticas a la globalización contemporánea.',
            icon: 'Globe',
            color: 'amber',
            topics: ['Revolución Industrial e Ilustración', 'Guerras Mundiales y Guerra Fría', 'Globalización y derechos globales']
          },
          {
            id: 'ing-int-m',
            name: 'Inglés Avanzado',
            category: 'Idiomas',
            description: 'Argumentación académica, comprensión inferencial y redacción estructurada.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Complex essay writing', 'Debating skills & Critical thinking', 'Advanced grammar in discourse']
          }
        ]
      },
      {
        id: 'int-11-12',
        name: 'Bachillerato Internacional / Preuniversitario (11.º y 12.º Grado)',
        level: 'Preparatoria / High School Senior',
        typicalAgeRange: '16 - 18 años',
        defaultSubjects: [
          {
            id: 'mat-int-adv',
            name: 'Matemáticas Avanzadas y Pre-Cálculo',
            category: 'Ciencias Exactas',
            description: 'Funciones trascendentes, trigonometría avanzada, límites, derivadas y vectores.',
            icon: 'Calculator',
            color: 'blue',
            topics: ['Límites y continuidad', 'Cálculo diferencial (derivadas y aplicaciones)', 'Introducción al cálculo integral', 'Probabilidad y distribuciones estadísticas']
          },
          {
            id: 'fis-int-adv',
            name: 'Física Preuniversitaria',
            category: 'Ciencias Naturales',
            description: 'Cinemática vectorial, dinámica, ondas, electromagnetismo y termodinámica.',
            icon: 'Atom',
            color: 'cyan',
            topics: ['Mecánica vectorial y colisiones', 'Campo gravitatorio y orbitales', 'Circuitos eléctricos y Leyes de Kirchhoff', 'Física moderna y cuántica introductoria']
          },
          {
            id: 'qui-int-adv',
            name: 'Química Preuniversitaria',
            category: 'Ciencias Naturales',
            description: 'Equilibrio químico, cinética, electroquímica, ácidos-bases y química orgánica.',
            icon: 'FlaskConical',
            color: 'teal',
            topics: ['Equilibrio químico y Principio de Le Chatelier', 'Ácidos, bases y amortiguadores pH', 'Cinética química y leyes de velocidad', 'Química orgánica y biomoléculas']
          },
          {
            id: 'lit-int-adv',
            name: 'Literatura y Filosofía Crítica',
            category: 'Humanidades',
            description: 'Pensamiento crítico, filosofía contemporánea, ensayo académico de nivel universitario.',
            icon: 'Sparkles',
            color: 'purple',
            topics: ['Teorías del conocimiento', 'Ética y dilemas bioéticos modernos', 'Crítica literaria y hermenéutica']
          },
          {
            id: 'ing-int-adv',
            name: 'Inglés Académico (Academic Writing & TOEFL/IELTS Prep)',
            category: 'Idiomas',
            description: 'Preparación para ingreso universitario internacional, redacción de ensayos académicos.',
            icon: 'Languages',
            color: 'violet',
            topics: ['Academic Argumentative Essay', 'Speed Reading & Synthesis', 'Presentation & Seminar Skills']
          }
        ]
      }
    ]
  }
];

// Rich Elective / Additional Subjects Catalog
export interface AdditionalSubjectCatalogItem {
  id: string;
  name: string;
  category: 'Tecnología & Programación' | 'Ciencias & Exploración' | 'Arte & Creatividad' | 'Habilidades & Finanzas' | 'Idiomas';
  description: string;
  icon: string;
  color: string;
  suggestedTopics: string[];
}

export const ADDITIONAL_SUBJECTS_CATALOG: AdditionalSubjectCatalogItem[] = [
  {
    id: 'prog-python',
    name: 'Programación con Python',
    category: 'Tecnología & Programación',
    description: 'Aprende a programar desde cero: variables, condicionales, bucles, funciones y proyectos prácticos interactivos.',
    icon: 'Terminal',
    color: 'sky',
    suggestedTopics: ['Sintaxis básica y variables', 'Condicionales (if / else)', 'Bucles (for / while)', 'Listas y diccionarios', 'Funciones y módulos']
  },
  {
    id: 'ai-prompting',
    name: 'Inteligencia Artificial y Prompts',
    category: 'Tecnología & Programación',
    description: 'Comprende cómo funcionan los modelos de IA, ingeniería de prompts, ética digital y herramientas para el estudio.',
    icon: 'Bot',
    color: 'indigo',
    suggestedTopics: ['¿Cómo aprende una red neuronal?', 'Ingeniería de prompts efectiva', 'Ética y sesgos en la IA', 'Creación de proyectos con IA']
  },
  {
    id: 'robotica-arduino',
    name: 'Robótica y Arduino',
    category: 'Tecnología & Programación',
    description: 'Circuitos electrónicos básicos, sensores, actuadores y automatización con microcontroladores.',
    icon: 'Cpu',
    color: 'emerald',
    suggestedTopics: ['Circuitos electrónicos y Ley de Ohm', 'Sensores de luz y distancia', 'Motores y servomotores', 'Programación de microcontroladores']
  },
  {
    id: 'web-dev',
    name: 'Desarrollo Web (HTML, CSS y JS)',
    category: 'Tecnología & Programación',
    description: 'Construye tus propias páginas y aplicaciones web con diseño moderno y lógica en JavaScript.',
    icon: 'Globe',
    color: 'blue',
    suggestedTopics: ['Estructura HTML5 semántica', 'Estilos CSS modernos y Flexbox', 'JavaScript interactivo y eventos', 'Publicación en la web']
  },
  {
    id: 'educacion-financiera',
    name: 'Educación Financiera Juvenil',
    category: 'Habilidades & Finanzas',
    description: 'Presupuesto personal, ahorro inteligente, interés compuesto, inversiones básicas y toma de decisiones.',
    icon: 'Coins',
    color: 'amber',
    suggestedTopics: ['Presupuesto personal y control de gastos', 'El poder del interés compuesto', 'Ahorro inteligente y metas financieras', 'Banca digital y seguridad']
  },
  {
    id: 'astronomia',
    name: 'Astronomía y Astrofísica',
    category: 'Ciencias & Exploración',
    description: 'Explora planetas, estrellas, agujeros negros, la historia del telescopio espacial y el origen del universo.',
    icon: 'Compass',
    color: 'violet',
    suggestedTopics: ['El sistema solar y exoplanetas', 'Evolución y vida de las estrellas', 'Galaxias y agujeros negros', 'Misiones espaciales y James Webb']
  },
  {
    id: 'diseno-grafico',
    name: 'Diseño Gráfico y Multimedia',
    category: 'Arte & Creatividad',
    description: 'Teoría del color, tipografía, composición visual, branding y diseño de contenido digital.',
    icon: 'Palette',
    color: 'fuchsia',
    suggestedTopics: ['Teoría del color y psicología visual', 'Tipografía y jerarquía visual', 'Diseño de logotipos e identidad', 'Creación de infografías llamativas']
  },
  {
    id: 'musica-produccion',
    name: 'Música y Producción Sonora',
    category: 'Arte & Creatividad',
    description: 'Teoría musical práctica, ritmo, armonía, composición de melodías y estaciones de audio digital.',
    icon: 'Music',
    color: 'pink',
    suggestedTopics: ['Notas, escalas y ritmo básico', 'Acordes y progresiones armónicas', 'Composición de una melodía', 'Grabación digital básica']
  },
  {
    id: 'oratoria-debate',
    name: 'Oratoria y Debate Crítico',
    category: 'Habilidades & Finanzas',
    description: 'Técnicas de persuasión, comunicación verbal y no verbal, estructuración de argumentos y debates formales.',
    icon: 'Mic',
    color: 'orange',
    suggestedTopics: ['Estructura de un discurso persuasivo', 'Lenguaje corporal y modulación de voz', 'Detección de falacias lógicas', 'Modelo de debate parlamentario']
  },
  {
    id: 'frances-basico',
    name: 'Francés para Principiantes',
    category: 'Idiomas',
    description: 'Pronunciación, saludos, vocabulario elemental y frases útiles para comunicarte en francés.',
    icon: 'Languages',
    color: 'cyan',
    suggestedTopics: ['Salutations et présentations', 'Les chiffres et les jours', 'Parler de ses loisirs', 'Vocabulaire scolaire']
  }
];

export function getSystemByCode(code: string): CountryEducationSystem {
  return EDUCATION_SYSTEMS.find(sys => sys.code === code) || EDUCATION_SYSTEMS[0];
}

export function getGradeById(countryCode: string, gradeId: string): { system: CountryEducationSystem; grade: GradeOption } | null {
  const system = getSystemByCode(countryCode);
  const grade = system.grades.find(g => g.id === gradeId);
  if (!grade) return null;
  return { system, grade };
}

export function buildDefaultSubjectsForGrade(countryCode: string, gradeId: string): Subject[] {
  const data = getGradeById(countryCode, gradeId);
  if (!data) return [];
  
  return data.grade.defaultSubjects.map(def => ({
    id: def.id,
    name: def.name,
    category: def.category,
    description: def.description,
    icon: def.icon,
    color: def.color,
    isCustom: false,
    progressPercent: 0,
    totalExercisesDone: 0,
    correctExercises: 0,
    topics: def.topics.map((tName, idx) => ({
      id: `${def.id}-t${idx + 1}`,
      name: tName,
      masteryScore: 0,
      exercisesAttempted: 0,
      exercisesCorrect: 0,
      status: 'not_started' as const
    }))
  }));
}
