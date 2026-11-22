/* -------------------------------------------------------------------------- */
/*  Latent Space Explorer — single source of truth                            */
/* -------------------------------------------------------------------------- */

export const TONES = {
  cyan: '#00F0FF',
  violet: '#8B5CF6',
  emerald: '#10B981',
  slate: '#94A3B8',
}

export const GITHUB_PROFILE = 'https://github.com/SashaKolhatkar'
export const RESUME_URL = '/resume.pdf'
export const EMAIL = 'sashakolhatkar28@gmail.com'

export const DOMAIN_META = {
  predictive: { label: 'Predictive ML', tone: 'cyan', short: 'ML' },
  nlp: { label: 'NLP & LLMs', tone: 'violet', short: 'NLP' },
  fullstack: { label: 'Full-Stack AI', tone: 'emerald', short: 'FS' },
  academic: { label: 'Academic Foundation', tone: 'slate', short: 'EDU' },
}

/* -------------------------------------------------------------------------- */
/*  Nodes                                                                     */
/*  kind: project | skill | education                                         */
/*  domain: drives colour + "By Domain" clusters                              */
/*  tech: drives "By Tech Stack" clusters                                      */
/*  year: drives "By Timeline" clusters                                        */
/* -------------------------------------------------------------------------- */

export const NODES = [
  // Projects ---------------------------------------------------------------
  {
    id: 'batterysense',
    label: 'BatterySense AI',
    kind: 'project',
    domain: 'predictive',
    tech: 'ml',
    year: 2025,
    meta: 'PROJECT 01 · 2025',
    summary: 'EV battery SOH, RUL and anomaly detection behind one FastAPI service.',
  },
  {
    id: 'sentimentiq',
    label: 'SentimentIQ',
    kind: 'project',
    domain: 'nlp',
    tech: 'ml',
    year: 2025,
    meta: 'PROJECT 02 · 2025',
    summary: 'Sentiment, emotion, bot and topic intelligence for reviews and social data.',
  },
  {
    id: 'memoza',
    label: 'Memoza',
    kind: 'project',
    domain: 'fullstack',
    tech: 'frontend',
    year: 2025,
    meta: 'PROJECT 03 · 2025',
    summary: 'Adaptive task planning with dynamic scheduling and Google Calendar sync.',
  },
  {
    id: 'smart-crop',
    label: 'Smart Crop',
    kind: 'project',
    domain: 'predictive',
    tech: 'ml',
    year: 2024,
    meta: 'PROJECT 04 · 2024',
    summary: 'Soil NPK + climate data → crop recommendation at ~88% held-out accuracy.',
  },
  {
    id: 'quizforge',
    label: 'QuizForge',
    kind: 'project',
    domain: 'nlp',
    tech: 'frontend',
    year: 2026,
    meta: 'PROJECT 05 · 2026',
    summary: 'Autonomous MCQ generation for educational assessment with Google Gemini.',
  },

  // Core skills ------------------------------------------------------------
  { id: 'python', label: 'Python', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2021, meta: 'CORE SKILL', summary: 'Primary language for modelling, data pipelines and services.' },
  { id: 'scikit-learn', label: 'Scikit-learn', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2023, meta: 'CORE SKILL', summary: 'Classical ML modelling, pipelines and evaluation.' },
  { id: 'xgboost', label: 'XGBoost', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2025, meta: 'CORE SKILL', summary: 'Gradient-boosted trees for tabular regression.' },
  { id: 'random-forest', label: 'Random Forest', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2024, meta: 'CORE SKILL', summary: 'Ensemble classifier used in crop and battery models.' },
  { id: 'isolation-forest', label: 'Isolation Forest', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2025, meta: 'CORE SKILL', summary: 'Unsupervised anomaly detection for degradation signals.' },
  { id: 'pandas', label: 'Pandas', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2023, meta: 'CORE SKILL', summary: 'Feature engineering and tabular data wrangling.' },
  { id: 'numpy', label: 'NumPy', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2023, meta: 'CORE SKILL', summary: 'Numerical arrays and vectorised transforms.' },
  { id: 'flask', label: 'Flask', kind: 'skill', domain: 'predictive', tech: 'ml', year: 2024, meta: 'CORE SKILL', summary: 'Lightweight inference API for the crop model.' },
  { id: 'nlp', label: 'NLP', kind: 'skill', domain: 'nlp', tech: 'ml', year: 2023, meta: 'CORE SKILL', summary: 'Text classification, topic modelling and linguistic features.' },
  { id: 'gemini', label: 'Google Gemini', kind: 'skill', domain: 'nlp', tech: 'ml', year: 2026, meta: 'CORE SKILL', summary: 'LLM generation layer for autonomous assessment content.' },
  { id: 'fastapi', label: 'FastAPI', kind: 'skill', domain: 'fullstack', tech: 'backend', year: 2025, meta: 'CORE SKILL', summary: 'Typed, high-performance inference and application APIs.' },
  { id: 'react', label: 'React.js', kind: 'skill', domain: 'fullstack', tech: 'frontend', year: 2024, meta: 'CORE SKILL', summary: 'Interactive dashboards and product interfaces.' },
  { id: 'postgresql', label: 'PostgreSQL', kind: 'skill', domain: 'fullstack', tech: 'backend', year: 2025, meta: 'CORE SKILL', summary: 'Relational persistence for adaptive planning data.' },
  { id: 'sqlalchemy', label: 'SQLAlchemy', kind: 'skill', domain: 'fullstack', tech: 'backend', year: 2025, meta: 'CORE SKILL', summary: 'ORM and query layer for Python services.' },
  { id: 'sqlite', label: 'SQLite', kind: 'skill', domain: 'fullstack', tech: 'backend', year: 2025, meta: 'CORE SKILL', summary: 'Embedded storage for battery telemetry and results.' },
  { id: 'nextjs', label: 'Next.js', kind: 'skill', domain: 'fullstack', tech: 'frontend', year: 2026, meta: 'CORE SKILL', summary: 'App-router frontend for Gemini-powered tooling.' },
  { id: 'typescript', label: 'TypeScript', kind: 'skill', domain: 'fullstack', tech: 'frontend', year: 2026, meta: 'CORE SKILL', summary: 'Type-safe contracts across the QuizForge stack.' },
  { id: 'tailwind', label: 'Tailwind CSS', kind: 'skill', domain: 'fullstack', tech: 'frontend', year: 2026, meta: 'CORE SKILL', summary: 'Design-system-driven UI implementation.' },
  { id: 'deploy', label: 'Vercel / Render', kind: 'skill', domain: 'fullstack', tech: 'backend', year: 2025, meta: 'CORE SKILL', summary: 'Frontend and API deployment pipeline.' },

  // Education & certifications ---------------------------------------------
  {
    id: 'btech',
    label: 'B.Tech AI & ML',
    kind: 'education',
    domain: 'academic',
    tech: 'ml',
    year: 2021,
    meta: 'EDUCATION · 2021—25',
    summary: 'SSIPMT, Raipur · 7th semester · 7.20 CGPA.',
  },
  {
    id: 'nlp-cert',
    label: 'NLP Mastery',
    kind: 'education',
    domain: 'nlp',
    tech: 'ml',
    year: 2023,
    meta: 'CERTIFICATION · L&T',
    summary: 'Natural Language Processing Mastery with Real-World Applications (L&T).',
  },
  {
    id: 'c1',
    label: 'C1 Advanced',
    kind: 'education',
    domain: 'academic',
    tech: 'backend',
    year: 2023,
    meta: 'CERTIFICATION',
    summary: 'C1 Advanced English — certified advanced proficiency.',
  },
]

export const NODE_BY_ID = Object.fromEntries(NODES.map((node) => [node.id, node]))

/* -------------------------------------------------------------------------- */
/*  Semantic graph                                                            */
/* -------------------------------------------------------------------------- */

const PROJECT_STACK = {
  batterysense: ['python', 'fastapi', 'xgboost', 'random-forest', 'isolation-forest', 'sqlite', 'sqlalchemy'],
  sentimentiq: ['python', 'fastapi', 'scikit-learn', 'nlp', 'pandas', 'numpy', 'react'],
  memoza: ['python', 'fastapi', 'react', 'postgresql', 'scikit-learn', 'sqlalchemy', 'deploy'],
  'smart-crop': ['python', 'flask', 'scikit-learn', 'random-forest', 'pandas', 'numpy'],
  quizforge: ['gemini', 'fastapi', 'react', 'nextjs', 'typescript', 'tailwind'],
}

const edgeKey = (a, b) => [a, b].sort().join('::')
const rawEdges = new Map()

const addEdge = (source, target, type = 'stack') => {
  const key = edgeKey(source, target)
  if (source !== target && !rawEdges.has(key)) rawEdges.set(key, { id: key, source, target, type })
}

Object.entries(PROJECT_STACK).forEach(([project, stack]) => {
  stack.forEach((skill) => addEdge(project, skill))
})

// Shared-technology edges between projects (two or more common skills).
Object.entries(PROJECT_STACK).forEach(([a, aStack]) => {
  Object.entries(PROJECT_STACK).forEach(([b, bStack]) => {
    if (a >= b) return
    const shared = aStack.filter((skill) => bStack.includes(skill))
    if (shared.length >= 2) addEdge(a, b, 'shared')
  })
})

// Foundations and credentials.
addEdge('btech', 'python', 'foundation')
addEdge('btech', 'scikit-learn', 'foundation')
addEdge('btech', 'smart-crop', 'foundation')
addEdge('nlp-cert', 'nlp', 'foundation')
addEdge('nlp-cert', 'sentimentiq', 'foundation')
addEdge('c1', 'sentimentiq', 'foundation')

export const EDGES = [...rawEdges.values()]

export const ADJACENCY = NODES.reduce((acc, node) => {
  acc[node.id] = new Set()
  return acc
}, {})
EDGES.forEach(({ source, target }) => {
  ADJACENCY[source]?.add(target)
  ADJACENCY[target]?.add(source)
})

/* -------------------------------------------------------------------------- */
/*  Clusters & generated layouts                                              */
/* -------------------------------------------------------------------------- */

export const CLUSTERS = {
  domain: [
    { id: 'predictive', label: 'PREDICTIVE ML', tone: 'cyan', center: { x: -345, y: -105 } },
    { id: 'nlp', label: 'NLP & LLMS', tone: 'violet', center: { x: 345, y: -120 } },
    { id: 'fullstack', label: 'FULL-STACK AI', tone: 'emerald', center: { x: 275, y: 235 } },
    { id: 'academic', label: 'ACADEMIC FOUNDATION', tone: 'slate', center: { x: -350, y: 235 } },
  ],
  tech: [
    { id: 'ml', label: 'PYTHON & ML', tone: 'cyan', center: { x: -370, y: -30 } },
    { id: 'backend', label: 'FASTAPI & BACKEND', tone: 'emerald', center: { x: 95, y: -200 } },
    { id: 'frontend', label: 'REACT & FRONTEND', tone: 'violet', center: { x: 360, y: 180 } },
  ],
  timeline: [
    { id: 2021, label: '2021 · FOUNDATION', tone: 'slate', center: { x: -565, y: 30 } },
    { id: 2023, label: '2023 · CERTIFICATIONS', tone: 'violet', center: { x: -300, y: -125 } },
    { id: 2024, label: '2024 · FIRST MODELS', tone: 'cyan', center: { x: -25, y: 95 } },
    { id: 2025, label: '2025 · SHIPPING', tone: 'emerald', center: { x: 275, y: -95 } },
    { id: 2026, label: '2026 · LLM SYSTEMS', tone: 'violet', center: { x: 565, y: 110 } },
  ],
}

const PRIORITY = { project: 0, education: 1, skill: 2 }

function buildLayout(key) {
  const groups = new Map()
  NODES.forEach((node) => {
    const groupKey = key === 'timeline' ? node.year : node[key]
    if (!groups.has(groupKey)) groups.set(groupKey, [])
    groups.get(groupKey).push(node)
  })

  const positions = {}
  const halos = []

  CLUSTERS[key].forEach((cluster) => {
    const members = (groups.get(cluster.id) || []).slice().sort(
      (a, b) => PRIORITY[a.kind] - PRIORITY[b.kind] || a.label.localeCompare(b.label),
    )
    let maxDistance = 0

    members.forEach((node, index) => {
      let x
      let y
      if (key === 'timeline') {
        x = cluster.center.x + (index % 2 === 0 ? -34 : 46)
        y = cluster.center.y + (index - (members.length - 1) / 2) * 78
      } else {
        const angle = index * 2.39996 + 0.7
        const radius = node.kind === 'project' ? 26 + index * 14 : 68 + Math.sqrt(index) * 43
        x = cluster.center.x + Math.cos(angle) * radius
        y = cluster.center.y + Math.sin(angle) * radius * 0.74
      }
      positions[node.id] = { x: Math.round(x), y: Math.round(y) }
      maxDistance = Math.max(maxDistance, Math.hypot(x - cluster.center.x, y - cluster.center.y))
    })

    halos.push({
      ...cluster,
      rx: key === 'timeline' ? 115 : Math.max(135, maxDistance + 60),
      ry: key === 'timeline' ? Math.max(120, members.length * 40) : Math.max(115, (maxDistance + 60) * 0.75),
      count: members.length,
    })
  })

  return { positions, halos }
}

export const LAYOUTS = {
  domain: buildLayout('domain'),
  tech: buildLayout('tech'),
  timeline: buildLayout('timeline'),
}

export const MODE_LABELS = {
  domain: 'By Domain',
  tech: 'By Tech Stack',
  timeline: 'By Timeline',
}

/* -------------------------------------------------------------------------- */
/*  Case studies                                                              */
/* -------------------------------------------------------------------------- */

export const CASE_STUDIES = {
  batterysense: {
    index: '01',
    title: 'BatterySense AI',
    domain: 'Predictive ML',
    tone: 'cyan',
    year: '2025',
    problem:
      'EV operators need a trustworthy read on battery degradation before it becomes an unplanned failure. Raw charge-cycle telemetry alone does not tell you whether a pack is healthy, how long it will last, or which cells are behaving abnormally.',
    solution:
      'A supervised health-estimation pipeline and an unsupervised anomaly layer, exposed together as a typed FastAPI inference service and backed by a lightweight SQL store.',
    pipeline: ['Charge-cycle data', 'Feature engineering', 'RF / GB / XGBoost', 'Isolation Forest', 'FastAPI', 'Dashboard'],
    highlights: [
      'State-of-health (SOH) estimation from voltage, current, temperature and cycle features.',
      'Remaining-useful-life (RUL) prediction for Maintenance planning.',
      'Isolation Forest flags anomalous degradation patterns before failure.',
      'Random Forest, Gradient Boosting and XGBoost compared as candidate regressors.',
      'SQLAlchemy + SQLite persistence for telemetry and inference history.',
    ],
    metrics: [
      { value: '3', label: 'health signals' },
      { value: '3', label: 'tree-based regressors' },
      { value: 'FastAPI', label: 'inference layer' },
    ],
    stack: ['Python', 'FastAPI', 'Random Forest', 'Gradient Boosting', 'XGBoost', 'Isolation Forest', 'SQLite', 'SQLAlchemy'],
    repo: `${GITHUB_PROFILE}?tab=repositories&q=batterysense`,
    repoUnverified: true,
    demo: null,
  },
  sentimentiq: {
    index: '02',
    title: 'SentimentIQ',
    domain: 'NLP & LLMs',
    tone: 'violet',
    year: '2025',
    problem:
      'Social feeds and review dumps are noisy, repetitive and hard to triage. Manual reading cannot keep up with the volume, and basic polarity scores miss emotion, automated accounts and emerging topics.',
    solution:
      'A multi-layer text-intelligence platform that classifies sentiment and emotion, detects bot-like behaviour, groups topics, and exports decision-ready reports.',
    pipeline: ['Reviews / social text', 'Cleaning + TF-IDF', 'Scikit-learn models', 'Topic + bot signals', 'FastAPI', 'React UI', 'PDF / Excel / CSV'],
    highlights: [
      'Sentiment and emotion classification over social posts and customer reviews.',
      'Bot-detection signal layered alongside human opinion.',
      'Topic modelling surfaces recurring themes in large text corpora.',
      'Automated PDF, Excel and CSV report generation.',
      'Python + Pandas + NumPy preprocessing behind a FastAPI service and React front end.',
    ],
    metrics: [
      { value: '4', label: 'intelligence layers' },
      { value: '3', label: 'export formats' },
      { value: 'React', label: 'analysis UI' },
    ],
    stack: ['Python', 'FastAPI', 'React.js', 'Scikit-learn', 'NLP', 'Pandas', 'NumPy'],
    repo: `${GITHUB_PROFILE}/sentimentiq`,
    demo: `${GITHUB_PROFILE}/sentimentiq#readme`,
    demoLabel: 'Project README',
  },
  memoza: {
    index: '03',
    title: 'Memoza',
    domain: 'Full-Stack AI',
    tone: 'emerald',
    year: '2025',
    problem:
      'To-do lists treat every task as equal. Important work gets buried under urgent noise, and estimates rarely survive contact with a real calendar.',
    solution:
      'An adaptive productivity workspace built around the Eisenhower Matrix, with ML-assisted duration prediction, dynamic scheduling and two-way Google Calendar sync.',
    pipeline: ['Task capture', 'Eisenhower classifier', 'Duration model', 'Dynamic scheduler', 'FastAPI + PostgreSQL', 'React UI', 'Calendar sync'],
    highlights: [
      'Four-quadrant Eisenhower prioritisation instead of a flat list.',
      'Scikit-learn duration prediction informs realistic scheduling.',
      'Dynamic rescheduling when priorities or availability change.',
      'Google Calendar synchronisation keeps plans aligned with real time.',
      'React front end with FastAPI, PostgreSQL and Vercel / Render deployment.',
    ],
    metrics: [
      { value: '4', label: 'priority quadrants' },
      { value: 'ML', label: 'duration prediction' },
      { value: 'Live', label: 'calendar sync' },
    ],
    stack: ['Python', 'FastAPI', 'React.js', 'PostgreSQL', 'Scikit-learn', 'Vercel', 'Render'],
    repo: `${GITHUB_PROFILE}/memoza`,
    demo: 'https://sashakolhatkar.github.io/memoza/',
  },
  'smart-crop': {
    index: '04',
    title: 'Smart Crop Recommendation',
    domain: 'Predictive ML',
    tone: 'cyan',
    year: '2024',
    problem:
      'Crop choice is usually made from habit, not from the soil and climate actually present on a plot. That quietly costs yield and wastes inputs.',
    solution:
      'A multi-class Random Forest recommender that turns soil NPK, pH, temperature, humidity and rainfall into a ranked crop suggestion inside a field-lab console.',
    pipeline: ['Soil + climate inputs', 'Feature scaling', 'Random Forest', 'Crop ranking', 'Flask API', 'Field Lab UI'],
    highlights: [
      'Trains on soil NPK, pH, temperature, humidity and rainfall.',
      'Random Forest classifier with ~88% held-out accuracy.',
      'Interactive console with Light / Dark / Eco display modes.',
      'Flask backend serves predictions to a plain HTML / CSS / JS front end.',
    ],
    metrics: [
      { value: '~88%', label: 'held-out accuracy' },
      { value: '6', label: 'agronomic inputs' },
      { value: 'RF', label: 'classifier' },
    ],
    stack: ['Python', 'Flask', 'Scikit-learn', 'Random Forest', 'HTML/CSS/JS'],
    repo: `${GITHUB_PROFILE}/smart-crop-recommendation`,
    demo: 'https://sashakolhatkar.github.io/smart-crop-recommendation/',
  },
  quizforge: {
    index: '05',
    title: 'QuizForge',
    domain: 'NLP & LLMs',
    tone: 'violet',
    year: '2026',
    problem:
      'Writing good multiple-choice assessments is slow and repetitive. Educators need varied, curriculum-aligned questions without authoring every distractor by hand.',
    solution:
      'An autonomous MCQ generator driven by Google Gemini, with a typed FastAPI layer and a modern Next.js interface for review and export.',
    pipeline: ['Topic + parameters', 'Prompt orchestration', 'Google Gemini', 'MCQ validation', 'FastAPI', 'Next.js UI'],
    highlights: [
      'Autonomous MCQ generation from topic prompts using Google Gemini models.',
      'Typed Python service layer built with FastAPI.',
      'Next.js + TypeScript front end with Tailwind CSS design system.',
      'Structured flow from generation to review in a single interface.',
    ],
    metrics: [
      { value: 'Gemini', label: 'generation engine' },
      { value: 'MCQ', label: 'output format' },
      { value: 'Next.js', label: 'delivery layer' },
    ],
    stack: ['Google Gemini', 'FastAPI', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    repo: `${GITHUB_PROFILE}?tab=repositories&q=quizforge`,
    repoUnverified: true,
    demo: null,
  },
}

/* -------------------------------------------------------------------------- */
/*  Recruiter-facing CV summary                                               */
/* -------------------------------------------------------------------------- */

export const CV_SUMMARY = {
  name: 'Sasha Kolhatkar',
  role: 'AI / ML & Data Science Engineer',
  location: 'Raipur, India',
  intro:
    'B.Tech in Artificial Intelligence & Machine Learning with hands-on experience turning models into shipped products — from inference APIs and feature pipelines to React interfaces and deployment.',
  education: [
    {
      title: 'B.Tech in Artificial Intelligence & Machine Learning',
      org: 'Shri Shankaracharya Institute of Professional Management and Technology (SSIPMT), Raipur',
      detail: '7th semester · 7.20 CGPA · 2021—2025',
    },
  ],
  certifications: [
    'Natural Language Processing Mastery with Real-World Applications — L&T',
    'C1 Advanced English',
  ],
  skillGroups: [
    { label: 'Machine Learning', items: ['Python', 'Scikit-learn', 'Random Forest', 'Gradient Boosting', 'XGBoost', 'Isolation Forest', 'Pandas', 'NumPy'] },
    { label: 'NLP & LLMs', items: ['NLP', 'Topic modelling', 'Sentiment / emotion classification', 'Google Gemini', 'Prompt orchestration'] },
    { label: 'Backend & Data', items: ['FastAPI', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'REST APIs'] },
    { label: 'Frontend & Deployment', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Render'] },
  ],
}
