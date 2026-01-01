
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  goal: string;
  description: string;
  tags: string[];
  skills: string[];
  implementation: string[];
  results: string;
  image: string;
  tech: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
