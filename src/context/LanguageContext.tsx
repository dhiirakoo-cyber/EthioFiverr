import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'om';

type TranslationKeys =
  | 'brand'
  | 'tagline'
  | 'taglineSub'
  | 'searchPlaceholder'
  | 'jobs'
  | 'talents'
  | 'postJob'
  | 'login'
  | 'getStarted'
  | 'categories'
  | 'recentJobs'
  | 'activeTalents'
  | 'statsFreelancers'
  | 'statsJobs'
  | 'statsMilestones'
  | 'allCategories'
  | 'softwareDev'
  | 'designCreative'
  | 'writingTranslation'
  | 'digitalMarketing'
  | 'heroSectionTitle'
  | 'heroSub'
  | 'findWork'
  | 'hireTalent'
  | 'trustedBy'
  | 'ctaSubtitle'
  | 'ctaButton'
  | 'copyright';

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    brand: 'HojiiLink Ethiopia',
    tagline: 'Empowering Ethiopian & International Freelancers',
    taglineSub: 'Connecting top talent in Ethiopia with global and local opportunities with secure Escrow CBE & Telebirr payments.',
    searchPlaceholder: 'Search jobs, projects, or core skills (e.g. React, Python, Translation)...',
    jobs: 'Find Work',
    talents: 'Find Talent',
    postJob: 'Post a Job',
    login: 'Sign In',
    getStarted: 'Join Platform',
    categories: 'Popular Categories',
    recentJobs: 'Featured Job Opportunities',
    activeTalents: 'Elite Ethiopian Freelancers',
    statsFreelancers: 'Registered Professionals',
    statsJobs: 'Completed Milestones',
    statsMilestones: 'Earned in ETB',
    allCategories: 'Browse All Categories',
    softwareDev: 'Software & Tech development',
    designCreative: 'Graphics & Creative Design',
    writingTranslation: 'Bilingual translation & Writing',
    digitalMarketing: 'Digital Marketing & Ads',
    heroSectionTitle: 'Direct Bridge Between Elite Talent and Top Businesses',
    heroSub: 'Secure contract escrow, automated AI job matching, and bilingual accessibility tailored for Ethiopian developers, designers, and specialists.',
    findWork: 'Browse Marketplace',
    hireTalent: 'Hire Freelancer',
    trustedBy: 'TRUSTED BY ENTERPRISES ACROSS ETHIOPIA',
    ctaSubtitle: 'Ready to elevate your career or expand your software capacity?',
    ctaButton: 'Create Free Account',
    copyright: '© 2026 HojiiLink Ethiopia. All rights reserved. Secure escrow payments integrated with Chapa.'
  },
  om: {
    brand: 'HojiiLink Itoophiyaa',
    tagline: 'Freelanceroota Itoophiyaa fi Addunyaa Humneessuu',
    taglineSub: 'Dandeettiiwwan olaanoo Itoophiyaa carraawwan addunyaa fi biyya keessaa waliin Chapa, CBE fi Telebiriin walitti hidha.',
    searchPlaceholder: 'Hojii, pirojektoota ykn dandeettiiwwan barbaadi (React, Python, Translation)...',
    jobs: 'Hojii Barbaadi',
    talents: 'Dandeettii Barbaadi',
    postJob: 'Hojii Baasi',
    login: 'Seeni',
    getStarted: 'Nutti Dabalami',
    categories: 'Koreewwan Jaallatamoodan',
    recentJobs: 'Akkasumas Carraawwan Hojii',
    activeTalents: 'Freelanceroota Itoophiyaa Filatamoo',
    statsFreelancers: 'Ogeessota Galmeeffaman',
    statsJobs: 'Miltoota Hojii Xumuraman',
    statsMilestones: 'ETB n Kan Kafalame',
    allCategories: 'Ramaddii Hundumaa Ilaali',
    softwareDev: 'Misooma Sooftiweerii & Teeknoologii',
    designCreative: 'Giraafiksii & Saxaxa Kalaqaa',
    writingTranslation: 'Hiikkaa Bilingual & Barreessuu',
    digitalMarketing: 'Beeksisa Fi Beeysisa Intarneeti',
    heroSectionTitle: 'Rikaa Kallattii Dandeettii Ol’aanaa Fi Dhaabbata Gurguddaa Gidduu',
    heroSub: 'Kafaltii Escrow amansiisaa, AI hojii walitti simsiisuu fi dandeettii afaan lameenii ogeessota Itoophiyaaf qophaaye.',
    findWork: 'Gabaa Hojii Ilaali',
    hireTalent: 'Ogeessa Qacari',
    trustedBy: 'DHAABBATA GURGUDDAAN ITOOPHIYAA KEESSATTI AMANAME',
    ctaSubtitle: 'Dandeettii kee guddisuu ykn dandeettii sooftiweerii kee babal’isuuf qophiidhaa?',
    ctaButton: 'Akkaawuntii Bilisaan Uumi',
    copyright: '© 2026 HojiiLink Itoophiyaa. Mirgi qabeenyummaa seeraan eegamaadha. Kafaltii amansiisaa Chapa.'
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('hojiilink_lang');
    return (saved === 'en' || saved === 'om') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hojiilink_lang', lang);
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
