import { Project, Experience, Education, SkillCategory, FolderStructure } from './types';

export const PERSONAL_INFO = {
  name: "José Artur Kassala",
  birthDate: "1997-07-31",
  location: "Bairro da Graça, Benguela, Angola",
  role: "Fullstack Developer & Project Manager",
  email: "arturjose0@gmail.com",
  phone: "+244 932 693 623",
  linkedin: "linkedin.com/in/arturjose0",
  github: "github.com/arturjose0",
  bio: "Natural de Lobito, Benguela. Auto-didata e aprendo rápido. Experiência robusta em liderança de equipas de TI, desenvolvimento fullstack e gestão de projetos tecnológicos."
};

export const PROJECTS: Project[] = [
  { name: "Site oficial do Piaget", description: "Website institucional", category: "Web" },
  { name: "Fórum Global de Psicologia", description: "Plataforma para eventos", category: "Web" },
  { name: "Fasmapay", description: "API de validação de comprovativos", category: "Backend/API" },
  { name: "Sudopay", description: "App mobile de verificação de comprovativos", category: "Mobile" },
  { name: "Pequemp", description: "Software para gestão de múltiplas empresas", category: "Desktop/Web" },
  { name: "Gestora", description: "Sistema web de facturação", category: "Web" },
  { name: "Kassenu", description: "Software Desktop de facturação e gestão de Stock", category: "Desktop" },
  { name: "FASRH", description: "Software de gestão de recursos humanos", category: "Enterprise" },
  { name: "Jose_inqueritos", description: "App mobile para inquéritos offline (Governo de Benguela)", category: "Mobile" },
  { name: "Plataforma Chance", description: "Plataforma UE para Saúde Sexual e reprodutiva", category: "Web" },
  { name: "Jogos VIVA Seguros", description: "4 Jogos interactivos desenvolvidos", category: "Game Dev" }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Fundador e Gestor de Projectos",
    company: "SudoMake",
    period: "2019 – Presente",
    details: [
      "Liderança no desenvolvimento de soluções digitais inovadoras.",
      "Coordenação de equipa multidisciplinar.",
      "Desenvolvimento de sistemas de faturação e APIs bancárias.",
      "Criação de Dicionário Português–Umbundo."
    ]
  },
  {
    role: "Director Geral Adjunto & Programador",
    company: "Fasma, Lobito",
    period: "2023",
    details: [
      "Supervisão de operações estratégicas.",
      "Desenvolvimento do site oficial e sistema de RH (FasRh).",
      "Inovação em serviços digitais."
    ]
  },
  {
    role: "Programador",
    company: "ISP Jean Piaget de Benguela",
    period: "2022-2023",
    details: [
      "Desenvolvimento de plataformas estratégicas (Site, CESP).",
      "Reforço de segurança contra ataques hackers.",
      "Alinhamento tecnológico com objetivos pedagógicos."
    ]
  },
  {
    role: "Docente",
    company: "Instituto Médio Politécnico Maria Elizeth",
    period: "2022",
    details: [
      "Lecionei TLP (C#) e Gestão de Projetos.",
      "Introdução de metodologias ágeis."
    ]
  },
  {
    role: "Gestor de Projectos",
    company: "Vedobil, Lobito",
    period: "2020-2022",
    details: [
      "Planeamento e execução de projetos tecnológicos.",
      "Desenvolvimento do sistema Kacennu (Faturação/Stock).",
      "Liderança de equipas de TI."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Instituto Superior Politécnico Jean Piaget de Benguela",
    degree: "Licenciatura em Engenharia de Informática de Gestão",
    year: "2018 – Finalista"
  },
  {
    institution: "Instituto Médio Politécnico do Lobito",
    degree: "Metalomecânica",
    year: "2014 – 2017"
  },
  {
    institution: "PHC CS",
    degree: "Certificação",
    year: "2023"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Web Fullstack",
    skills: ["PHP", "Laravel", "HTML5", "Javascript", "CSS", "Vue.js"]
  },
  {
    category: "Desktop",
    skills: ["Java", "C++", "Pascal", "C#"]
  },
  {
    category: "Mobile",
    skills: ["Flutter", "Dart"]
  },
  {
    category: "Design",
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Canva"]
  },
  {
    category: "AI & Data",
    skills: ["Python", "Node", "OpenCV", "PowerBI", "SQL Server", "MySQL", "PostgreSQL"]
  },
  {
    category: "Infra & OS",
    skills: ["Windows Server 2022", "Linux (Ubuntu/Kali)", "MacOS", "ERP Primavera"]
  }
];

// Mock File System
export const FILE_SYSTEM: FolderStructure = {
    'Documents': [
        { name: 'Project_Proposal_SudoMake.docx', type: 'file', size: '2.4 MB', dateModified: '2023-10-15', content: 'Confidential Proposal' },
        { name: 'Invoice_Fasma_001.pdf', type: 'pdf', size: '156 KB', dateModified: '2023-09-20' },
        { name: 'ISP_Piaget_Report.docx', type: 'file', size: '1.2 MB', dateModified: '2022-12-10' },
        { name: 'Notes.txt', type: 'file', size: '1 KB', dateModified: '2023-11-01', content: 'Call client at 9 AM' },
    ],
    'Downloads': [
        { name: 'vs_code_setup.exe', type: 'file', size: '89 MB', dateModified: 'Today' },
        { name: 'flutter_sdk.zip', type: 'file', size: '850 MB', dateModified: 'Yesterday' },
        { name: 'CV_Jose_Artur_Kassala.pdf', type: 'pdf', size: '2 MB', dateModified: '2024-05-20' },
    ],
    'Music': [
        { name: 'Kizomba_Mix_2024.mp3', type: 'audio', size: '12 MB', dateModified: '2024-01-15' },
        { name: 'Semba_Angola.mp3', type: 'audio', size: '8 MB', dateModified: '2023-12-25' },
    ],
    'Videos': [
        { name: 'App_Demo_Fasmapay.mp4', type: 'video', size: '450 MB', dateModified: '2023-08-10' },
        { name: 'Tutorial_Laravel.mp4', type: 'video', size: '1.2 GB', dateModified: '2022-05-05' },
    ],
    'Pictures': [
        { name: 'Profile_Pic.jpg', type: 'image', size: '2.4 MB', dateModified: '2024-01-01' },
        { name: 'Team_Meeting.png', type: 'image', size: '5.1 MB', dateModified: '2023-11-15' },
        { name: 'Architecture_Diagram.png', type: 'image', size: '1.8 MB', dateModified: '2023-10-30' },
    ]
};