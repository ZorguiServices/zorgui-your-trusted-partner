import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Lang } from './translations';

interface LanguageContextType {
  lang: Lang;
  t: typeof translations['ar'];
  toggleLang: () => void;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('ar');
  const t = translations[lang];
  const dir = t.dir;

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'ar' ? 'fr' : 'ar');
  }, []);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
};
