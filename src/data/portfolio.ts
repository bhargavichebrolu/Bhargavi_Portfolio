/**
 * Central portfolio content.
 * Every piece of personal information on the site is read from this file.
 *
 * Rules for this file:
 *  - An empty string means "not added yet". The site shows that link as
 *    unavailable instead of linking somewhere broken, so fill values in as
 *    you have them.
 *  - Nothing here should claim metrics, dates, awards or outcomes you have
 *    not verified.
 */
import type { LucideIcon } from "lucide-react";
import {
  Binary,
  Blocks,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  CloudCog,
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  KeyRound,
  LayoutTemplate,
  Layers,
  ListChecks,
  MessageSquareText,
  MessagesSquare,
  Network,
  PlugZap,
  Scale,
  ScanSearch,
  Search,
  Server,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

import photo480 from "@/assets/profile/sai-bhargavi-480.webp";
import photo800 from "@/assets/profile/sai-bhargavi-800.webp";
import photo1200 from "@/assets/profile/sai-bhargavi-1200.webp";
import photoFallback from "@/assets/profile/sai-bhargavi-1200.jpg";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface Profile {
  name: string;
  displayName: string;
  role: string;
  location: string;
  headline: string;
  /** Part of the headline drawn in the accent colour. Must appear in `headline`. */
  headlineAccent: string;
  intro: string;
  photo: {
    src: string;
    srcSetWebp: string;
    width: number;
    height: number;
    alt: string;
  };
  facts: { label: string; value: string }[];
  email: string;
  /** Optional. Only shown in the contact section when filled in. */
  phone: string;
  linkedin: string;
  github: string;
  leetcode: string;
  /** Put your CV in public/cv/ and set this to e.g. "/cv/Sai-Bhargavi-Chebrolu-CV.pdf". */
  cvUrl: string;
}

export interface Technology {
  name: string;
  /** Filename in public/logos, without extension. Used for official brand marks. */
  logo?: string;
  /** Neutral icon for concepts that have no brand mark. */
  glyph?: LucideIcon;
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  technologies: Technology[];
}

export type ProjectVisual =
  "rag" | "gallery" | "testing" | "network" | "grid" | "signal" | "layers";

/**
 * Every field is optional so a project can be published before it is fully
 * written up. Empty sections follow `site.showEmptyCaseStudySections`.
 */
export interface CaseStudy {
  overview?: string;
  problem?: string;
  objectives?: string[];
  architecture?: string;
  /** Boxes of the simplified architecture diagram, in order. */
  architectureNodes?: string[];
  contributions?: string[];
  implementation?: string[];
  challenges?: { challenge: string; solution: string }[];
  evaluation?: string;
  /** Names of the metrics used. Measured values belong in `results`. */
  metrics?: string[];
  /** Only add verified figures here. */
  results?: { label: string; value: string }[];
  resultsSummary?: string;
  learnings?: string[];
}

export type ProjectCategory =
  "featured-ai-research" | "professional-real-world" | "personal-ai-research" | "personal-software";

export type ProjectStatus = "in-progress" | "completed" | "details-pending";

export const projectStatusLabels: Record<ProjectStatus, string> = {
  "in-progress": "In progress",
  completed: "Completed",
  "details-pending": "Details to be added",
};

export interface ProjectGroup {
  key: ProjectCategory;
  /** Anchor id on the homepage. */
  id: string;
  title: string;
  /** Shorter name for the switcher at the top of the projects section. */
  navLabel: string;
  /** Says at a glance what kind of work this group is. */
  label: string;
  subtitle: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short description of the kind of project, shown on its card. */
  category: string;
  summary: string;
  /** Which group of the projects section this belongs to. Sets how the project is displayed. */
  group: ProjectCategory;
  /** Leave out until it is verified. */
  status?: ProjectStatus;
  /** Gives the project its own page at /projects/<slug>, built from `caseStudy`. */
  caseStudyPage?: boolean;
  /** A limit readers should know about, shown with the project. */
  note?: string;
  visual?: ProjectVisual;
  stack: Technology[];
  /** My role, shown on cards for professional projects. */
  contribution?: string;
  /** Short labelled lists shown on the card, e.g. roles or metric names. */
  highlights?: { label: string; items: string[] }[];
  /** Leave empty to show the link as "coming soon". */
  github?: string;
  demo?: string;
  caseStudy: CaseStudy;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  roleNote?: string;
  duration: string;
  location?: string;
  summary: string;
  stats: { value: string; label: string }[];
  responsibilities: string[];
  /** Verified achievements only. Hidden while empty. */
  achievements: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  status?: string;
  dates?: string;
  /** Hidden while empty. */
  details: string[];
}

export interface ProofLink {
  label: string;
  description: string;
  href: string;
  kind: "github" | "leetcode" | "research" | "writing" | "achievement";
}

/* ------------------------------------------------------------------ */
/* Site settings                                                      */
/* ------------------------------------------------------------------ */

export const site = {
  /** Production URL without a trailing slash. Enables canonical and social image tags. */
  url: "",
  socialImage: "/og-image.jpg",
  /** Show projects that have nothing but a title and summary yet on the homepage. */
  showDraftProjects: true,
  /** Show unwritten case study sections as "To be added". Useful while drafting, not for launch. */
  showEmptyCaseStudySections: false,
};

/* ------------------------------------------------------------------ */
/* Profile                                                            */
/* ------------------------------------------------------------------ */

export const profile: Profile = {
  name: "Sai Bhargavi Chebrolu",
  displayName: "Sai Bhargavi",
  role: "AI / Machine Learning Engineer",
  location: "United Kingdom",
  headline: "Building intelligent systems with strong software engineering foundations.",
  headlineAccent: "strong software engineering",
  intro:
    "I am an AI and software engineer with a background in Computer Science and professional software development experience. I am currently pursuing an MSc in Artificial Intelligence at the University of East London, developing practical AI applications and exploring how intelligent systems can solve real-world problems.",
  photo: {
    src: photoFallback,
    srcSetWebp: `${photo480} 480w, ${photo800} 800w, ${photo1200} 1200w`,
    width: 1200,
    height: 1500,
    alt: "Portrait of Sai Bhargavi smiling outdoors in a denim jacket, with blossom and brick buildings in evening light",
  },
  facts: [
    { label: "Studying", value: "MSc Artificial Intelligence, University of East London" },
    { label: "Foundation", value: "BTech Computer Science and professional software development" },
    { label: "Based in", value: "United Kingdom" },
  ],
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  leetcode: "",
  cvUrl: "",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const seo = {
  title: `${profile.displayName} | ${profile.role}`,
  description:
    "Sai Bhargavi Chebrolu is an AI / Machine Learning Engineer in the UK with a software engineering background, building applied AI systems including RAG and LLM applications.",
};

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  heading: "About Me",
  statement: "A software engineer specialising in AI.",
  statementAccent: "specialising in AI",
  bio: [
    "I graduated in Computer Science, where I developed an interest in Java, Spring and Spring Boot. I then worked as a software developer intern at Divami Design Private Limited, building real-world applications and working across frontend technologies, backend development and automation testing.",
    "I became interested in Artificial Intelligence because I recognised its potential to transform software engineering, and I wanted to develop the ability to build intelligent applications. I moved to the UK in January 2026 and am currently pursuing my MSc in Artificial Intelligence at the University of East London.",
    "Today I am developing AI applications, exploring machine learning and LLM technologies, and building research-oriented personal projects.",
  ],
  journeyLabel: "Career Journey",
  journey: [
    {
      marker: "Foundation",
      title: "BTech Computer Science",
      text: "Lakireddy Bali Reddy College of Engineering, India",
    },
    {
      marker: "Industry",
      title: "Software Developer Intern",
      text: "Divami Design Private Limited, approximately one year",
    },
    {
      marker: "January 2026",
      title: "Moved to the UK",
      text: "To specialise in Artificial Intelligence",
    },
    {
      marker: "Now",
      title: "MSc Artificial Intelligence",
      text: "University of East London, with Industrial Placement",
    },
  ],
  strengthsLabel: "Engineering Strengths",
  strengths: [
    {
      title: "Problem Solving",
      text: "Breaking problems down and working through them until they are resolved.",
    },
    {
      title: "End-to-End Application Development",
      text: "Working across frontend, backend, databases and APIs to build complete applications.",
    },
    {
      title: "Reverse Engineering",
      text: "Taking working systems apart to understand how they are built, as a way of learning.",
    },
    {
      title: "Technical Exploration",
      text: "Trying new engineering approaches and finding out what works.",
    },
    {
      title: "Continuous Learning",
      text: "Picking up unfamiliar technologies as the work requires them.",
    },
    {
      title: "Execution and Ownership",
      text: "Following work through to completion.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Skills. Provisional inventory: edit freely, the layout adapts.      */
/* Do not add proficiency levels, years or percentages.                */
/* ------------------------------------------------------------------ */

export const skillsIntro = {
  title: "Technical Arsenal",
  heading: "Technical Skills",
  intro:
    "Select a domain to see the technologies I work with in that area, or open the complete view.",
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: Code2,
    summary: "The languages behind my AI, backend and web work.",
    technologies: [
      { name: "Java", logo: "java", description: "Backend and enterprise applications" },
      { name: "Python", logo: "python", description: "AI, data and APIs" },
      { name: "JavaScript", logo: "javascript", description: "Web applications" },
      { name: "TypeScript", logo: "typescript", description: "Typed JavaScript" },
      { name: "C", logo: "c", description: "Systems programming" },
      { name: "SQL", glyph: Database, description: "Relational data querying" },
    ],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: BrainCircuit,
    summary: "Concepts and frameworks for building intelligent systems.",
    technologies: [
      { name: "Machine Learning", glyph: BrainCircuit, description: "Learning patterns from data" },
      { name: "Deep Learning", glyph: Network, description: "Neural network models" },
      {
        name: "Natural Language Processing",
        glyph: MessageSquareText,
        description: "Working with human language",
      },
      { name: "Generative AI", glyph: Sparkles, description: "Models that create content" },
      { name: "Large Language Models", glyph: Bot, description: "Foundation models for text" },
      { name: "Transformers", glyph: Blocks, description: "Attention-based architectures" },
      { name: "Hugging Face", logo: "huggingface", description: "Models, datasets and tooling" },
      { name: "TensorFlow", logo: "tensorflow", description: "Deep learning framework" },
      { name: "Scikit-learn", logo: "scikitlearn", description: "Classical ML toolkit" },
    ],
  },
  {
    id: "llm",
    name: "LLM Engineering",
    icon: MessagesSquare,
    summary: "Building, grounding and evaluating LLM applications.",
    technologies: [
      { name: "LangChain", logo: "langchain", description: "LLM application framework" },
      {
        name: "Retrieval-Augmented Generation",
        glyph: ScanSearch,
        description: "Grounding answers in documents",
      },
      { name: "Embeddings", glyph: Binary, description: "Vector representations of text" },
      { name: "Sentence Transformers", glyph: Binary, description: "Text embedding models" },
      { name: "Vector Search", glyph: Search, description: "Similarity-based retrieval" },
      {
        name: "Prompt Engineering",
        glyph: MessageSquareText,
        description: "Designing model instructions",
      },
      { name: "LLM Evaluation", glyph: Scale, description: "Measuring answer quality" },
      { name: "RAGAS", glyph: ListChecks, description: "RAG evaluation framework" },
    ],
  },
  {
    id: "backend",
    name: "Backend Engineering",
    icon: Server,
    summary: "Services, APIs and application logic.",
    technologies: [
      { name: "Spring", logo: "spring", description: "Java application framework" },
      { name: "Spring Boot", logo: "springboot", description: "Production-ready Java services" },
      { name: "Node.js", logo: "nodejs", description: "JavaScript runtime" },
      { name: "Express.js", logo: "express", description: "Node.js web framework" },
      { name: "FastAPI", logo: "fastapi", description: "Python API framework" },
      { name: "REST APIs", glyph: PlugZap, description: "HTTP service design" },
      { name: "Hibernate", logo: "hibernate", description: "Java ORM" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Engineering",
    icon: LayoutTemplate,
    summary: "User interfaces for the web.",
    technologies: [
      { name: "React.js", logo: "react", description: "Component-based UI library" },
      { name: "HTML5", logo: "html5", description: "Semantic page structure" },
      { name: "CSS3", logo: "css3", description: "Layout and styling" },
      { name: "Tailwind CSS", logo: "tailwindcss", description: "Utility-first styling" },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database,
    summary: "Relational, document and vector stores.",
    technologies: [
      { name: "MySQL", logo: "mysql", description: "Relational database" },
      { name: "Oracle", logo: "oracle", description: "Enterprise relational database" },
      { name: "MongoDB", logo: "mongodb", description: "Document database" },
      { name: "PostgreSQL", logo: "postgresql", description: "Relational database" },
      { name: "SQLite", logo: "sqlite", description: "Embedded relational database" },
      { name: "FAISS", glyph: Layers, description: "Vector similarity search" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: CloudCog,
    summary: "Hosting, access, version control and delivery.",
    technologies: [
      { name: "AWS", logo: "aws", description: "Cloud platform" },
      { name: "EC2", logo: "ec2", description: "AWS virtual servers" },
      { name: "S3", logo: "s3", description: "AWS object storage" },
      { name: "IAM", logo: "iam", description: "AWS access management" },
      { name: "Git", logo: "git", description: "Version control" },
      { name: "GitHub", logo: "github", description: "Code hosting and collaboration" },
      { name: "CI/CD", glyph: GitBranch, description: "Automated build and delivery" },
    ],
  },
  {
    id: "testing",
    name: "Testing & Quality Engineering",
    icon: FlaskConical,
    summary: "Automated checks across interfaces and APIs.",
    technologies: [
      { name: "Playwright", logo: "playwright", description: "Browser automation testing" },
      { name: "Selenium", logo: "selenium", description: "Web UI automation" },
      { name: "API Testing", glyph: KeyRound, description: "Verifying service behaviour" },
      { name: "Rest Assured", glyph: KeyRound, description: "Java API test automation" },
      { name: "Postman", logo: "postman", description: "API testing client" },
      { name: "Swagger", logo: "swagger", description: "API documentation and testing" },
      { name: "Automation Testing", glyph: Workflow, description: "Repeatable test suites" },
      { name: "JUnit", logo: "junit", description: "Java unit testing" },
      { name: "Pytest", logo: "pytest", description: "Python testing framework" },
    ],
  },
  {
    id: "data",
    name: "Data Engineering & Analytics",
    icon: ChartNoAxesCombined,
    summary: "Processing, analysing and presenting data.",
    technologies: [
      { name: "Apache Spark", logo: "spark", description: "Distributed data processing" },
      { name: "PySpark", logo: "spark", description: "Spark with Python" },
      { name: "Hadoop", logo: "hadoop", description: "Distributed storage and processing" },
      { name: "Hive", logo: "hive", description: "SQL on Hadoop" },
      { name: "Pandas", logo: "pandas", description: "Tabular data analysis" },
      { name: "NumPy", logo: "numpy", description: "Numerical computing" },
      { name: "Power BI", logo: "powerbi", description: "Business dashboards" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Development",
    icon: Wrench,
    summary: "The day-to-day development environment.",
    technologies: [
      { name: "VS Code", logo: "vscode", description: "Code editor" },
      { name: "IntelliJ IDEA", logo: "intellij", description: "Java IDE" },
      { name: "Jupyter Notebook", logo: "jupyter", description: "Interactive notebooks" },
      { name: "Google Colab", logo: "colab", description: "Hosted notebooks" },
      { name: "Maven", logo: "maven", description: "Java build tool" },
      { name: "Docker", logo: "docker", description: "Containerisation" },
      { name: "Jira", logo: "jira", description: "Issue and sprint tracking" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects. Add a new object here and the site picks it up.           */
/* ------------------------------------------------------------------ */

export const projectsIntro = {
  heading: "Projects",
};

/** The order here is the order on the page. */
export const projectGroups: ProjectGroup[] = [
  {
    key: "featured-ai-research",
    id: "featured-project",
    title: "Featured AI Research Project",
    navLabel: "Featured AI Research",
    label: "Independent AI research",
    subtitle:
      "My flagship personal project, combining AI research with full-stack engineering. It is still in progress.",
  },
  {
    key: "professional-real-world",
    id: "professional-projects",
    title: "Professional Experience Projects",
    navLabel: "Professional Experience",
    label: "Real-world professional experience",
    subtitle: "Real-world applications delivered during my professional internship",
  },
  {
    key: "personal-ai-research",
    id: "personal-ai-projects",
    title: "Personal AI & Research Projects",
    navLabel: "Personal AI & Research",
    label: "Independent AI research",
    subtitle:
      "Independent projects exploring machine learning, deep learning, NLP, and intelligent systems",
  },
  {
    key: "personal-software",
    id: "personal-software-projects",
    title: "Personal Software Projects",
    navLabel: "Personal Software",
    label: "Personal software development",
    subtitle: "Full-stack software I have built independently, outside my AI work.",
  },
];

/**
 * A personal AI project whose description is still to come. Only the title,
 * and a summary restating it, are filled in. To complete one, add `stack`,
 * `caseStudy` fields, links and a real `status`; the row then expands.
 */
const pendingAiProject = (
  slug: string,
  title: string,
  category: string,
  summary: string,
): Project => ({
  slug,
  title,
  category,
  summary,
  group: "personal-ai-research",
  status: "details-pending",
  stack: [],
  caseStudy: {},
});

/** Editable placeholder for an internship development project. Replace the title and summary. */
const professionalPlaceholder = (n: number): Project => ({
  slug: `professional-development-project-${n}`,
  title: `Professional Development Project ${n}`,
  category: "Real-world application",
  summary: "Details to be added.",
  group: "professional-real-world",
  status: "details-pending",
  contribution: "Application development",
  stack: [],
  caseStudy: {},
});

export const projects: Project[] = [
  {
    slug: "medquery-ai",
    title: "MedQuery AI",
    category: "Healthcare information retrieval · RAG",
    summary:
      "A full-stack AI, machine learning and Generative AI platform for NHS healthcare information retrieval. It compares embedding models, generates evidence-grounded answers using Retrieval-Augmented Generation, validates their citations and tracks experiments.",
    group: "featured-ai-research",
    status: "in-progress",
    caseStudyPage: true,
    note: "MedQuery AI has not been clinically validated and does not provide medical diagnosis or advice. Evaluation is ongoing, so no final results are claimed.",
    visual: "rag",
    github: "",
    demo: "",
    stack: [
      { name: "Python", logo: "python" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "React", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "SQLite", logo: "sqlite" },
      { name: "FAISS", glyph: Layers },
      { name: "Hugging Face Transformers", logo: "huggingface" },
      { name: "Sentence Transformers", glyph: Binary },
    ],
    highlights: [
      { label: "Embedding models compared", items: ["MiniLM", "MPNet", "E5", "BGE"] },
      { label: "Retrieval evaluation", items: ["Precision@K", "Recall@K", "MRR@K", "nDCG@K"] },
      {
        label: "Answer checks",
        items: ["Citation validation", "Grounding assessment", "Human quality scoring"],
      },
      {
        label: "Engineering",
        items: ["Experiment tracking", "Comparison dashboard", "Automated testing"],
      },
    ],
    caseStudy: {
      overview:
        "MedQuery AI is a full-stack AI, machine learning and Generative AI platform for NHS healthcare information retrieval. It uses Retrieval-Augmented Generation over 698 NHS articles, split into 3,796 chunks, to retrieve relevant evidence and generate answers grounded in it, with citations that are checked automatically. The project is in progress, and I am responsible for it end to end.",
      problem:
        "Healthcare information has to be reliable and relevant, and readers need to be able to see where an answer came from. A language model on its own can write fluent statements that nothing supports, so MedQuery AI grounds its answers in NHS documents and checks the citations behind them.",
      objectives: [
        "Retrieve relevant evidence from a knowledge base of NHS articles",
        "Generate answers grounded in that evidence, with validated citations",
        "Compare embedding models using repeatable retrieval evaluation",
        "Assess how well each answer is grounded, and say so when the evidence is not enough",
        "Track experiments so that results can be compared and reproduced",
      ],
      architecture:
        "NHS articles are cleaned, split into chunks and embedded with four models, each with its own FAISS index. A question is embedded and matched against the chosen index, and the retrieved chunks go to a language model with instructions to answer only from them. Each citation is then validated against its source chunk and the answer's grounding is assessed, before a FastAPI backend returns it to a React and TypeScript interface. Experiment runs are stored in SQLite.",
      architectureNodes: [
        "NHS articles",
        "Cleaning and chunking",
        "Embedding models",
        "FAISS indexes",
        "Retrieval",
        "Language model",
        "Citation validation and grounding",
        "FastAPI + React",
      ],
      contributions: [
        "End-to-end responsibility for the project, across the research pipeline, backend, frontend and evaluation tooling",
      ],
      implementation: [
        "Article cleaning and chunking in Python, tested against the original research data",
        "Embeddings from MiniLM, MPNet, E5 and BGE, using Sentence Transformers and Hugging Face models",
        "Exact vector search over each model's FAISS index",
        "Answer generation behind a provider interface, with a mock provider so that ordinary tests make no paid calls",
        "Citation validation: a citation is kept only if it names a retrieved source and quotes that source exactly",
        "Grounding assessment of every answer sentence, so unsupported answers are never presented as grounded",
        "FastAPI backend, with a React and TypeScript interface for chat, retrieval inspection and experiment comparison",
        "Command-line experiment runner, with runs stored in SQLite and compared on a dashboard",
      ],
      evaluation:
        "Retrieval is scored with ranking metrics on a dataset of 10 in-scope and 8 out-of-scope questions, with relevance judged by article. Answer quality is scored by a person using a versioned guide. Citation validity and grounding coverage are checked automatically, though these are checks rather than proof that an answer is correct. Ten questions are too few for reliable model rankings, and the reference answers are treated as unverified.",
      metrics: [
        "Retrieval: Precision@K, Recall@K, MRR@K and nDCG@K",
        "Answer quality: faithfulness, answer relevance, answer correctness and citation accuracy",
        "Automatic checks: citation validity and grounding coverage",
      ],
      resultsSummary: "Evaluation is still in progress, so no final results are reported here yet.",
    },
  },
  {
    slug: "iirm",
    title: "IIRM",
    category: "Real-world insurance and risk management application",
    summary:
      "A professional real-world project for IIRM Holdings, a global insurance and risk management company, delivered during my internship at Divami Design Private Limited.",
    group: "professional-real-world",
    caseStudyPage: true,
    visual: "testing",
    contribution: "Automation Testing",
    stack: [
      { name: "Playwright", logo: "playwright" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Rest Assured", glyph: KeyRound },
      { name: "Postman", logo: "postman" },
      { name: "Swagger", logo: "swagger" },
      { name: "Jira", logo: "jira" },
      { name: "Visual Studio Code", logo: "vscode" },
    ],
    highlights: [{ label: "Client", items: ["IIRM Holdings"] }],
    caseStudy: {
      overview:
        "IIRM Holdings is a global insurance and risk management company providing services across insurance distribution, reinsurance, wellness, employee benefits and financial consulting. I contributed to this real-world application as an automation tester during my internship at Divami Design Private Limited.",
      contributions: [
        "Participated in requirement-gathering and sprint-planning meetings with clients, Business Analysts and QA teams",
        "Developed and executed UI automation test scripts using Playwright with TypeScript, for functional and regression testing",
        "Performed API testing using Rest Assured, Postman and Swagger",
        "Executed test cases, tracked defects and shared test execution reports with stakeholders",
        "Supported quality validation and reliable delivery of application functionality",
      ],
    },
  },
  professionalPlaceholder(1),
  professionalPlaceholder(2),
  pendingAiProject(
    "semantic-resume-job-matching",
    "Semantic Resume–Job Matching System",
    "Natural language processing",
    "Matching resumes to jobs using semantic techniques.",
  ),
  {
    slug: "explainable-skin-lesion-classification",
    title: "Explainable Skin Lesion Classification Using Deep Learning",
    category: "Deep learning · Computer vision",
    summary:
      "Compares a custom CNN, ResNet50 and EfficientNetB0 for classifying seven types of skin lesion, using Grad-CAM to show what influences each prediction.",
    group: "personal-ai-research",
    status: "details-pending",
    note: "A research project, not a diagnostic tool.",
    github: "",
    demo: "",
    stack: [
      { name: "Python", logo: "python" },
      { name: "TensorFlow", logo: "tensorflow" },
      { name: "Scikit-learn", logo: "scikitlearn" },
      { name: "OpenCV", logo: "opencv" },
      { name: "Pandas", logo: "pandas" },
      { name: "NumPy", logo: "numpy" },
    ],
    caseStudy: {
      implementation: [
        "Multiclass classification across the seven lesion classes of the HAM10000 dataset",
        "A custom CNN, compared with ResNet50 and EfficientNetB0 using transfer learning",
        "Grad-CAM visual explanations of model predictions",
      ],
      metrics: [
        "Accuracy, precision, recall and F1 score",
        "ROC curve and ROC AUC",
        "Confusion matrix",
      ],
    },
  },
  pendingAiProject(
    "fake-news-detection",
    "Fake News Detection Using Traditional ML and Transformer Models",
    "Natural language processing",
    "Detecting fake news using both traditional machine learning and transformer models.",
  ),
  pendingAiProject(
    "email-spam-detection",
    "Email Spam Detection Using Machine Learning and Transformers",
    "Natural language processing",
    "Detecting email spam using machine learning and transformer models.",
  ),
  pendingAiProject(
    "credit-card-fraud-detection",
    "Credit Card Fraud Detection Using Machine Learning",
    "Machine learning",
    "Detecting credit card fraud using machine learning.",
  ),
  pendingAiProject(
    "product-review-sentiment-analysis",
    "Product Review Sentiment Analysis",
    "Natural language processing",
    "Analysing the sentiment of product reviews.",
  ),
  pendingAiProject(
    "employee-attrition-prediction",
    "Employee Attrition Prediction",
    "Predictive modelling",
    "Predicting employee attrition.",
  ),
  // Add the remaining ML/DL project here, using pendingAiProject or a full object.
  {
    slug: "art-platform",
    title: "Art Platform",
    category: "Personal full-stack application",
    summary:
      "A platform I built for my father, an artist, to help artists showcase and sell paintings from home. It covers administration, artist and seller accounts, painting upload and management, and customer browsing and purchasing.",
    group: "personal-software",
    caseStudyPage: true,
    visual: "gallery",
    github: "",
    demo: "",
    stack: [
      { name: "Java", logo: "java" },
      { name: "Spring", logo: "spring" },
      { name: "Spring Boot", logo: "springboot" },
      { name: "React", logo: "react" },
    ],
    highlights: [
      {
        label: "Three roles",
        items: ["Admin", "Individual artists / sellers", "Customers"],
      },
    ],
    caseStudy: {
      overview:
        "A full-stack application I developed for my father, who is an artist, to help artists showcase and sell paintings from home. Artists can create accounts, upload paintings and sell their artwork online, customers can browse and buy, and my father can manage the platform as an administrator.",
      problem:
        "Artists need a straightforward way to present and sell their paintings from home, and a platform owner needs to be able to manage it.",
      objectives: [
        "Let artists create accounts, upload and manage their paintings",
        "Let customers browse and purchase paintings",
        "Give an administrator the means to manage the platform",
      ],
      architecture:
        "A React frontend with a Java backend built on Spring and Spring Boot, serving three roles: admin, individual artists or sellers, and customers.",
      implementation: [
        "Admin: manages the platform",
        "Artists and sellers: upload and manage their paintings",
        "Customers: browse and purchase paintings",
      ],
    },
  },
];

/** Projects with their own case study page. */
export const publishedProjects = projects.filter((p) => p.caseStudyPage);

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experienceIntro = {
  heading: "Professional Experience",
  intro: "Where my engineering foundation was built: developing and testing real applications.",
  projectsLink: "See the projects from this role",
};

export const experience: ExperienceEntry[] = [
  {
    company: "Divami Design Private Limited",
    role: "Software Developer Intern",
    roleNote: "with automation engineering responsibilities",
    duration: "Internship, approximately one year",
    summary: "Worked on real-world application development and automation testing.",
    stats: [
      { value: "2", label: "Real-world application development projects" },
      { value: "1", label: "Real-world automation testing project" },
    ],
    responsibilities: [
      "Application development",
      "Frontend and backend engineering",
      "Working with modern JavaScript frameworks",
      "UI automation testing with Playwright and TypeScript",
      "API testing with Rest Assured, Postman and Swagger",
      "Requirement-gathering and sprint-planning meetings with clients, Business Analysts and QA teams",
      "Test execution, defect tracking and reporting to stakeholders",
      "Collaboration with engineering teams",
    ],
    achievements: [],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const educationIntro = {
  heading: "Education",
};

export const education: EducationEntry[] = [
  {
    degree: "MSc Artificial Intelligence with Industrial Placement",
    institution: "University of East London",
    location: "United Kingdom",
    status: "Currently pursuing",
    details: [],
  },
  {
    degree: "BTech Computer Science",
    institution: "Lakireddy Bali Reddy College of Engineering",
    location: "India",
    details: [],
  },
];

/* ------------------------------------------------------------------ */
/* Achievements and technical proof                                    */
/* ------------------------------------------------------------------ */

export const proofIntro = {
  heading: "Achievements and Technical Proof",
  unavailable: "Link coming soon",
};

export const proofLinks: ProofLink[] = [
  {
    label: "GitHub",
    description: "Repositories and source code",
    href: profile.github,
    kind: "github",
  },
  {
    label: "LeetCode",
    description: "Problem-solving practice",
    href: profile.leetcode,
    kind: "leetcode",
  },
  {
    label: "Research",
    description: "Research work and reports",
    href: "",
    kind: "research",
  },
  {
    label: "Technical writing",
    description: "Articles and write-ups",
    href: "",
    kind: "writing",
  },
  {
    label: "Achievements",
    description: "Relevant achievements",
    href: "",
    kind: "achievement",
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contactIntro = {
  heading: "Contact",
  statement: "Let's build something useful.",
  statementAccent: "something useful",
  intro:
    "I am open to conversations about AI, machine learning and software engineering roles in the UK, and I would be glad to hear from you.",
  formTitle: "Send a message",
};

export const contactConfig = {
  /**
   * Optional form endpoint (e.g. Formspree). When set, the form POSTs JSON here.
   * Otherwise it opens the visitor's email app if `profile.email` is set, and
   * says plainly that it is not connected if neither is.
   */
  formEndpoint: "",
};
