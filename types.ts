import { ReactNode } from 'react';

export interface Project {
  name: string;
  description: string;
  category: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  details: string[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface WindowApp {
  id: string;
  title: string;
  icon: ReactNode;
  component: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  width?: string | number;
  height?: string | number;
}

export interface FileItem {
  name: string;
  type: 'folder' | 'file' | 'image' | 'pdf' | 'audio' | 'video';
  size?: string;
  dateModified?: string;
  content?: string; // For fake download content
}

export interface FolderStructure {
  [key: string]: FileItem[];
}