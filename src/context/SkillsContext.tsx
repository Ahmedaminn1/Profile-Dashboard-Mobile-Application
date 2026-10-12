import React, { createContext, useContext, useState } from 'react';
import { SkillItem } from '@/components/SkillCard';

const initialSkills: SkillItem[] = [
  { id: 1, title: 'React', level: 'متقدم', badge: 'خبير', icon: 'logo-react' },
  { id: 2, title: 'Next.js', level: 'متقدم', badge: 'خبير', icon: 'code-slash-outline' },
  { id: 3, title: 'TypeScript', level: 'متقدم', badge: 'خبير', icon: 'code-slash-outline' },
  { id: 4, title: 'React Native', level: 'متقدم', badge: 'خبير', icon: 'logo-react' },
  { id: 5, title: 'Redux / Zustand', level: 'متقدم', badge: 'خبير', icon: 'cube-outline' },
  { id: 6, title: 'JavaScript', level: 'متقدم', badge: 'محترف', icon: 'logo-javascript' },
  { id: 7, title: 'HTML5 & CSS3', level: 'متقدم', badge: 'خبير', icon: 'logo-html5' },
  { id: 8, title: 'Tailwind CSS', level: 'متقدم', badge: 'محترف', icon: 'color-palette-outline' },
  { id: 9, title: 'React Query', level: 'متقدم', badge: 'محترف', icon: 'server-outline' },
  { id: 10, title: 'Git & GitHub', level: 'متقدم', badge: 'خبير', icon: 'logo-github' },
  { id: 11, title: 'Node.js', level: 'متوسط', badge: 'جيد جداً', icon: 'logo-nodejs' },
  { id: 12, title: 'Figma (UI/UX)', level: 'متوسط', badge: 'جيد', icon: 'logo-figma' },
];

interface SkillsContextValue {
  skills: SkillItem[];
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  removeSkill: (id: number) => void;
}

const SkillsContext = createContext<SkillsContextValue | undefined>(undefined);

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    setSkills((prev) => [
      ...prev,
      { ...skill, id: Date.now() },
    ]);
  };

  const removeSkill = (id: number) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SkillsContext.Provider value={{ skills, addSkill, removeSkill }}>
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkills(): SkillsContextValue {
  const ctx = useContext(SkillsContext);
  if (!ctx) throw new Error('useSkills must be used inside <SkillsProvider>');
  return ctx;
}
