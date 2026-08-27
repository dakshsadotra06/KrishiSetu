'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'krishisetu_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (savedLang === 'EN' || savedLang === 'HI') {
          return savedLang;
        }
      } catch {
        // ignore
      }
    }
    return 'EN';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language.toLowerCase();
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang.toLowerCase();
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextLang: Language = prev === 'EN' ? 'HI' : 'EN';
      try {
        localStorage.setItem(STORAGE_KEY, nextLang);
        document.documentElement.lang = nextLang.toLowerCase();
      } catch {
        // ignore
      }
      return nextLang;
    });
  }, []);

  const t = useCallback(
    (key: string, defaultText?: string): string => {
      const langDict = translations[language];
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      // fallback to EN
      if (translations.EN && translations.EN[key]) {
        return translations.EN[key];
      }
      return defaultText || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
