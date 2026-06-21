import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Palette,
  Languages,
  TrendingUp,
  Search,
  Star,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Award,
  CircleDollarSign,
  Sparkles,
  ChevronRight,
  BadgeCheck,
  Lock,
  Globe2,
  Smartphone,
  Cpu
} from 'lucide-react';

const TOP_FREELANCERS = [
  {
    id: 'f1',
    name: 'Yared Shimelis',
    titleEn: 'Senior Full-Stack Developer & DevOps Specialist',
    titleOm: 'Ekisperto Misooma Sooftiweerii Ol’aanaa',
    skills: ['React', 'NodeJS', 'PostgreSQL', 'Docker', 'AWS', 'Kubernetes'],
    rating: 4.9,
    completedJobs: 48,
    rateEn: '$35/hr (approx. 4,100 ETB)',
    rateOm: 'Sa’aatiitti $35 (gara 4,100 ETB)',
    location: 'Addis Ababa, Ethiopia',
    avatar: '/src/assets/images/ethiopian_dev_portrait_1782080577027.jpg',
    badge: 'Elite Pro',
    completedMilestones: '98% Milestones Completed'
  },
  {
    id: 'f3',
    name: 'Helina Kebede',
    titleEn: 'Senior UI/UX Architect & Interaction Designer',
    titleOm: 'Saxaxituu UI/UX Addaa Fi Kalaqa Riikaa',
    skills: ['Figma', 'UI Design', 'Design Systems', 'Mobile App Prototyping', 'React Native'],
    rating: 5.0,
    completedJobs: 33,
    rateEn: '$30/hr (approx. 3,500 ETB)',
    rateOm: 'Sa’aatiitti $30 (gara 3,500 ETB)',
    location: 'Hawassa, Ethiopia',
    avatar: '/src/assets/images/ethiopian_designer_portrait_1782080587649.jpg',
    badge: 'Verified Specialist',
    completedMilestones: '100% Client Satisfaction'
  },
  {
    id: 'f2',
    name: 'Bona Tesfaye',
    titleEn: 'Bilingual Translator & Localization Engineer',
    titleOm: 'Abbaa Dandeettii Hiikkaa Afaanii & Qophii Barruu',
    skills: ['English Translation', 'Afaan Oromo Writing', 'SEO Strategy', 'Copywriting', 'Technical Documentation'],
    rating: 4.8,
    completedJobs: 92,
    rateEn: '$22/hr (approx. 2,500 ETB)',
    rateOm: 'Sa’aatiitti $22 (gara 2,500 ETB)',
    location: 'Adama, Ethiopia',
    avatar: '/src/assets/images/ethiopian_content_portrait_1782080615734.jpg',
    badge: 'Top Rated',
    completedMilestones: '120+ Translated Documents'
  }
];

const PREVIEW_JOBS = [
  {
    id: 'j1',
    titleEn: 'Build Bilingual E-Commerce Portal with Telebirr Escrow API',
    titleOm: 'Kore Birrii & Escrow Kafaltii Hirmaachisu Portal Daldalaa',
    descriptionEn: 'Seeking a highly skilled full stack developer to design an interactive catalog platform featuring fully compiled security layers, secure wallet callbacks, and automated Chapa payouts.',
    descriptionOm: 'Saafee daldala dhuunfaa afaan lamaan gargaaruu fi system kafaltii Telebiriin walitti hidhamu qopheesuuf ogeessa barbanna.',
    budget: 45000,
    budgetType: 'fixed',
    skillsRequired: ['React', 'NodeJS', 'Chapa SDK', 'Telebirr Connection', 'PostgreSQL'],
    clientRating: 5.0,
  },
  {
    id: 'j2',
    titleEn: 'Translate Agricultural Guidelines (English to Afaan Oromo)',
    titleOm: 'Qajeelfama Qonnaa Ammayyaa Hikkuu (English Gara Oromoo)',
    descriptionEn: 'Translate comprehensive hybrid farming documentation containing high-grade technical terminologies from English into natural, grammatically rich Afaan Oromo.',
    descriptionOm: 'Barreeffama qajeelfama qonna ammayyaa gama tekinikaalitiin qophaaye English irraa gara Oromootti hiikuu barbaanna.',
    budget: 12000,
    budgetType: 'fixed',
    skillsRequired: ['English Translation', 'Afaan Oromo Specialist', 'Bilingual Proofreading'],
    clientRating: 4.9,
  }
];

function renderCategoryIllustration(catId) {
  switch (catId) {
    case 'tech':
      return (
        <div className="relative w-full h-28 rounded-xl bg-slate-950/90 border border-white/5 overflow-hidden flex flex-col p-2.5 font-mono text-[9px] text-slate-400 shadow-inner group-hover:border-amber-500/30 transition-colors">
          {/* Window header */}
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] text-slate-500 ml-1 font-sans">app.jsx</span>
          </div>
          {/* Syntaxes */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-pink-500 font-bold">const</span>
              <span className="text-amber-400">EscrowPayment</span>
              <span className="text-slate-400">=</span>
              <span className="text-emerald-400">"Chapa"</span>
            </div>
            <div className="flex items-center gap-1 pl-3">
              <span className="text-blue-400 font-semibold">if</span>
              <span className="text-slate-300">(verified)</span>
              <span className="text-pink-400">{'{'}</span>
              <span className="text-emerald-400">release()</span>
              <span className="text-pink-400">{'}'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-400 font-bold">export</span>
              <span className="text-blue-400">default</span>
              <span className="text-amber-300">HojiiLink</span>
            </div>
          </div>
          {/* Subtle amber overlay glow */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none group-hover:from-amber-500/20 transition-all duration-300" />
        </div>
      );
    case 'design':
      return (
        <div className="relative w-full h-28 rounded-xl bg-slate-950/90 border border-white/5 overflow-hidden flex items-center justify-center p-3 shadow-inner group-hover:border-violet-500/30 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.2px,transparent_1.2px)] bg-[size:8px_8px]" />
          <div className="w-full h-full border border-violet-500/20 rounded-lg relative flex flex-col justify-between p-2 bg-violet-950/5">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <div className="w-10 h-1.5 bg-violet-400/20 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            </div>
            <div className="flex gap-2 my-1 justify-center items-center">
              <div className="h-5 w-5 rounded bg-gradient-to-br from-violet-500 to-purple-600 shadow-md transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="h-6 w-1 bg-purple-500/40 rounded-full" />
              <div className="h-5 w-5 border border-violet-400/40 rounded flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping" />
              </div>
            </div>
            <div className="w-full h-1 bg-violet-500/20 rounded-full" />
          </div>
          {/* Radiant overlay glow */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-violet-500/10 to-transparent pointer-events-none group-hover:from-violet-500/20 transition-all duration-300" />
        </div>
      );
    case 'writing':
      return (
        <div className="relative w-full h-28 rounded-xl bg-slate-950/90 border border-white/5 overflow-hidden flex items-center justify-center p-3 shadow-inner group-hover:border-emerald-500/30 transition-colors">
          <div className="w-full flex gap-2 relative">
            {/* EN page */}
            <div className="flex-1 bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2 flex flex-col justify-between h-20 transition-all group-hover:border-emerald-400/40">
              <span className="text-[10px] font-black text-emerald-400 tracking-wider">EN</span>
              <div className="space-y-1">
                <div className="w-full h-1 bg-slate-700 rounded-full" />
                <div className="w-4/5 h-1 bg-slate-700 rounded-full" />
                <div className="w-2/3 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
            {/* Oromoo page */}
            <div className="flex-1 bg-emerald-950/25 border border-amber-500/20 rounded-lg p-2 flex flex-col justify-between h-20 transition-all group-hover:border-amber-400/40">
              <span className="text-[10px] font-black text-amber-300 tracking-wider">OM</span>
              <div className="space-y-1">
                <div className="w-full h-1 bg-slate-600 rounded-full" />
                <div className="w-5/6 h-1 bg-slate-600 rounded-full" />
                <div className="w-1/2 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
            {/* Center spine */}
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-[2px] bg-slate-800" />
          </div>
          {/* Floating translation symbols */}
          <div className="absolute -top-1 bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 rounded shadow animate-bounce" style={{ animationDelay: '0.1s' }}>A</div>
          <div className="absolute -bottom-1 bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 rounded shadow animate-bounce" style={{ animationDelay: '0.7s' }}>H</div>
        </div>
      );
    case 'marketing':
      return (
        <div className="relative w-full h-28 rounded-xl bg-slate-950/90 border border-white/5 overflow-hidden flex flex-col justify-between p-3 shadow-inner group-hover:border-cyan-500/30 transition-colors font-sans">
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/30 px-1.5 py-0.5 border border-cyan-500/20 rounded">
              CTR +142%
            </span>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 border border-emerald-500/20 rounded">
              ROAS 5.2x
            </span>
          </div>
          <div className="flex items-end gap-1.5 w-full justify-around h-12 relative z-10 mb-1">
            <div className="w-2 bg-cyan-950 border border-cyan-500/20 rounded group-hover:h-8 h-4 transition-all duration-700" />
            <div className="w-2 bg-cyan-900 border border-cyan-500/30 rounded group-hover:h-12 h-6 transition-all duration-700 delay-75" />
            <div className="w-2 bg-cyan-800 border border-cyan-500/40 rounded group-hover:h-14 h-8 transition-all duration-700 delay-100" />
            <div className="w-2 bg-gradient-to-t from-cyan-500 to-amber-400 rounded group-hover:h-16 h-10 transition-all duration-700 delay-150" />
          </div>
          {/* Beautiful trend curve svg overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 50">
            <path d="M 12 42 Q 35 22, 60 14 T 88 5" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export default function Home() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const categories = [
    { 
      id: 'tech', 
      label: language === 'en' ? 'Software & Tech' : 'Teeknoologii & Sooftiweerii', 
      count: '248+ Active Jobs', 
      icon: Code2, 
      color: 'from-amber-500/10 to-yellow-500/5 hover:to-amber-500/20 border-amber-500/30 text-amber-400',
      descriptionEn: 'Full-stack engineers, cloud devs, and QA specialists.',
      descriptionOm: 'Misoomsitoota sooftiweerii fi ogeessota teeknoologii.'
    },
    { 
      id: 'design', 
      label: language === 'en' ? 'Design & Creative' : 'Saxaxa & Og-Kalaqa', 
      count: '180+ Active Jobs', 
      icon: Palette, 
      color: 'from-violet-500/10 to-purple-500/5 hover:to-violet-500/20 border-violet-500/30 text-violet-400',
      descriptionEn: 'Premium UI/UX layout design, brand mockups, and illustrations.',
      descriptionOm: 'Saxaxa UI/UX olaanaa fi dandeettii dizaayinii kalaqaa.'
    },
    { 
      id: 'writing', 
      label: language === 'en' ? 'Translation & Copy' : 'Hiikkaa & Barreessu', 
      count: '124+ Active Jobs', 
      icon: Languages, 
      color: 'from-emerald-500/10 to-teal-500/5 hover:to-emerald-500/20 border-emerald-500/30 text-emerald-400',
      descriptionEn: 'Flemish proofreaders, English & Afaan Oromo localized copy.',
      descriptionOm: 'Hiikkaa afaan lameenii fi dokumantota garaa garaa.'
    },
    { 
      id: 'marketing', 
      label: language === 'en' ? 'Digital Marketing' : 'Beeksisa Intarneetii', 
      count: '92+ Active Jobs', 
      icon: TrendingUp, 
      color: 'from-cyan-500/10 to-blue-500/5 hover:to-cyan-500/20 border-cyan-500/30 text-cyan-400',
      descriptionEn: 'Performance marketers, social ads, and local SEO campaigns.',
      descriptionOm: 'Ogeeyyii beeksisa miidiyaa hawaasaa fi SEO.'
    }
  ];

  const premiumButtonClass = "rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all duration-300 flex-shrink-0 cursor-pointer";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] via-[#111C3A] to-[#0A0E1A] text-white overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 relative">
      
      {/* Background radial effects / grid overlay representing prime startup feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-[-100px] left-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 h-[700px] w-[700px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      {/* 1. HERO SHOWCASE SECTION INCLUDING ELITE ETHIOPIAN TALENT PORTRAITS */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/40">
        <div className="mx-auto max-w-7xl font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CTA copy column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/5 px-4 py-1.5 text-xs font-black tracking-wide text-amber-300 border border-amber-500/30 uppercase self-start"
              >
                <Zap className="h-4 w-4 text-amber-400 animate-pulse" />
                <span>{t('tagline')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight"
              >
                {language === 'en' ? (
                  <>
                    Hire the <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-400 bg-clip-text text-transparent">Elite Freelancers</span> of Ethiopia
                  </>
                ) : (
                  <>
                    Freelanceroota <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-400 bg-clip-text text-transparent">Filatamaa</span> Itoophiyaa Qacari
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-100 text-lg sm:text-xl leading-relaxed max-w-2xl font-medium"
              >
                {language === 'en' 
                  ? 'Access the top 3% of Ethiopian software developers, digital designers, and bilingual translation specialists. Backed by safe automated milestones and secured bank-direct local escrow transfers.'
                  : 'Dandeettiiwwan olaanoo Itoophiyaa dhibbeentaa 3% keessaa misoomsitoota sooftiweerii, dizaayinaroota, fi ogeeyyii hiikkaa argadhu. Escrow amansiisaadhaan deeggarame.'}
              </motion.p>

              {/* Dynamic Interactive Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative max-w-xl"
              >
                <div className="flex items-center rounded-2xl border border-slate-600/50 bg-[#16223F]/90 p-2 backdrop-blur-xl shadow-2xl focus-within:border-amber-400 transition-all">
                  <Search className="h-5 w-5 text-slate-300 ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-sm text-white focus:outline-none placeholder:text-slate-400"
                  />
                  <button 
                    onClick={() => {
                      window.location.hash = '#marketplace';
                    }}
                    className={`${premiumButtonClass} px-6 py-3 text-xs`}
                  >
                    {language === 'en' ? 'Browse Jobs' : 'Hojii Barbaadi'}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-300 px-1">
                  <span className="font-bold text-amber-400">Popular:</span>
                  <span className="cursor-pointer hover:text-white transition-colors underline" onClick={() => setSearchTerm('React')}>React</span>
                  <span>•</span>
                  <span className="cursor-pointer hover:text-white transition-colors underline" onClick={() => setSearchTerm('Telebirr')}>Telebirr</span>
                  <span>•</span>
                  <span className="cursor-pointer hover:text-white transition-colors underline" onClick={() => setSearchTerm('Translation')}>Translation</span>
                </div>
              </motion.div>

              {/* Trust markers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-6 text-xs text-slate-300 border-t border-slate-800/40 pt-6"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>Chapa Escrow Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <span>CBE/Telebirr Secured</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span>Gemini AI translation matched</span>
                </div>
              </motion.div>
            </div>

            {/* Profile cards grid column (The Premium Freelancer Hero Showcase!) */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 font-sans">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-blue-500/5 blur-xl rounded-2xl" />
              
              <div className="relative space-y-6">
                
                {/* Visual Label */}
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-amber-300" />
                    Elite Ethiopian Talents Featured
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/50 px-2.5 py-1 rounded inline-flex items-center gap-1.5 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    Online Now
                  </span>
                </div>

                {/* Freelancer showcase loop */}
                {TOP_FREELANCERS.map((dev, idx) => (
                  <motion.div
                    key={dev.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-5 rounded-2xl bg-[#16223F]/80 backdrop-blur-xl border border-slate-600/50 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300 shadow-xl flex items-start gap-4 relative overflow-hidden text-left"
                  >
                    {/* Corner gradient flair */}
                    <div className="absolute right-0 top-0 w-12 h-12 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />

                    {/* Highly polished verified indicator badge */}
                    <span className="absolute top-4 right-4 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[8px] font-extrabold text-amber-300 uppercase tracking-widest">
                      {dev.badge}
                    </span>

                    {/* Image Portrait with error handling referrerPolicy */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-xl object-cover border border-white/15"
                      />
                      <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-slate-950 flex items-center justify-center border border-white/10">
                        <BadgeCheck className="h-3.5 w-3.5 text-amber-400 fill-slate-950" />
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-white text-sm truncate">{dev.name}</h4>
                        <span className="flex items-center text-amber-400 font-black text-xs">
                          <Star className="h-3 w-3 fill-amber-400 mr-0.5" />
                          {dev.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-amber-300 font-semibold mt-0.5 truncate">
                        {language === 'en' ? dev.titleEn : dev.titleOm}
                      </p>

                      {/* Glassmorphic skill tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {dev.skills.slice(0, 3).map((skill, si) => (
                          <span key={si} className="text-[9px] font-bold tracking-wide text-slate-100 bg-white/5 border border-white/5 rounded px-1.5 py-0.5">
                            {skill}
                          </span>
                        ))}
                        {dev.skills.length > 3 && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 rounded px-1.5 py-0.5">
                            +{dev.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Rate and stats row */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-200">
                        <span className="font-medium text-slate-100">
                          {language === 'en' ? 'Rate:' : 'Kafaltii:'} <span className="text-white font-extrabold">{dev.rateEn}</span>
                        </span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {dev.completedMilestones}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. RICH METRIC GRID (Zero white space representation) */}
      <section className="py-12 px-4 border-b border-slate-800/40 bg-[#16223F]/40 backdrop-blur-md relative font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#16223F]/80 backdrop-blur-xl border border-slate-600/50 text-center relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-all" />
              <p className="text-slate-100 text-[10px] uppercase font-black tracking-widest mb-1">{t('statsFreelancers')}</p>
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                4,200+
              </h3>
              <p className="text-xs text-amber-400 font-bold mt-2">Verified Experts</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#16223F]/80 backdrop-blur-xl border border-slate-600/50 text-center relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all" />
              <p className="text-slate-100 text-[10px] uppercase font-black tracking-widest mb-1">{t('statsJobs')}</p>
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                12,500+
              </h3>
              <p className="text-xs text-violet-400 font-bold mt-2">Success Contracts</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#16223F]/80 backdrop-blur-xl border border-slate-600/50 text-center relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-all" />
              <p className="text-slate-100 text-[10px] uppercase font-black tracking-widest mb-1">{t('statsMilestones')}</p>
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                25M+
              </h3>
              <p className="text-xs text-emerald-400 font-bold mt-2">ETB Paid Safely</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#16223F]/80 backdrop-blur-xl border border-slate-600/50 text-center relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
              <p className="text-slate-100 text-[10px] uppercase font-black tracking-widest mb-1">Escrow Success</p>
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                100%
              </h3>
              <p className="text-xs text-cyan-400 font-bold mt-2">No Disputes Lost</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ISOMETRIC SERVICE CATEGORIES (3D Styled Borders & job counters) */}
      <section id="categories" className="py-20 px-4 bg-transparent relative border-b border-slate-800/40 font-sans">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
            <div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">Capabilities Matrix</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-200 to-yellow-400 bg-clip-text text-transparent">{t('categories')}</h2>
            </div>
            <button 
              onClick={() => { window.location.hash = '#marketplace'; }}
              className="text-xs font-bold text-amber-300 hover:text-amber-400 mt-4 md:mt-0 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {t('allCategories')}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 3D isometric layout/illustrations for core capability cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ 
                    y: -6,
                    boxShadow: '0 20px 30px rgba(245, 158, 11, 0.12)' 
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  onClick={() => {
                    setActiveCategory(cat.id === activeCategory ? null : cat.id);
                    window.location.hash = '#marketplace';
                  }}
                  className="p-[1.5px] rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 hover:from-amber-500/60 hover:to-yellow-500/40 transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden"
                >
                  <div className={`w-full h-full rounded-[15px] p-5 bg-[#16223F]/90 backdrop-blur-xl border border-slate-600/50 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between min-h-[350px] relative overflow-hidden text-left group ${
                    cat.id === activeCategory ? 'ring-2 ring-amber-500' : ''
                  }`}>
                    {/* Subtle vector mesh background elements inside each tile to look isometric */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-t from-white/5 to-transparent rounded-full opacity-10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                    
                    <div className="flex items-center justify-between gap-4 mb-3 relative z-10">
                      <div className="h-10 w-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-inner">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-950 bg-amber-400 py-1 px-3 rounded-full shadow-md shadow-amber-400/25">
                        {cat.count}
                      </span>
                    </div>

                    {/* Handcrafted dynamic 3D visual illustrator mock for zero empty space */}
                    <div className="my-2.5 w-full relative z-10">
                      {renderCategoryIllustration(cat.id)}
                    </div>

                    <div className="space-y-1.5 relative z-10 text-left mt-1">
                      <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug">{cat.label}</h3>
                      <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed transition-colors group-hover:text-white">
                        {language === 'en' ? cat.descriptionEn : cat.descriptionOm}
                      </p>
                    </div>

                    <div className="border-t border-slate-600/30 pt-3 mt-4 flex items-center justify-between text-[11px] text-slate-300 group-hover:text-amber-400 transition-colors pointer-events-none relative z-10 text-left">
                      <span className="font-bold uppercase tracking-wider">{language === 'en' ? 'Explore Category' : 'Darbeessa Ilaali'}</span>
                      <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. TRANSITIONAL PREMIUM IMAGE GRID (Beautifully blended 2-column enterprise view) */}
      <section className="py-20 px-4 bg-transparent border-b border-slate-800/40 relative font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual media layout showcasing multi-monitors, stylus UX layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-amber-500/10 blur-[80px] pointer-events-none -z-10" />

              {/* Box 1: Software developers panel with status count overlay */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-white/10 relative h-72 group shadow-2xl"
              >
                <img 
                  src="/src/assets/images/ethiopian_tech_workspace_1782080600426.jpg" 
                  alt="Ethiopian Developers Workspace" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="rounded-full bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2.5 py-1 tracking-wider inline-block mb-2">
                    YEGNA DEVELOPERS
                  </span>
                  <h4 className="text-sm font-extrabold text-white">Full-Stack Hub Addis</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Multi-monitor configuration running Node.js cjs API frameworks</p>
                </div>
              </motion.div>

              {/* Box 2: UI/UX Female designer styled with stylus sketching overlay */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-white/10 relative h-72 sm:translate-y-8 group shadow-2xl"
              >
                <img 
                  src="/src/assets/images/ethiopian_uiux_stylus_1782080632449.jpg" 
                  alt="UI/UX Specialist Stylus Sketching" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="rounded-full bg-violet-500 text-white text-[9px] font-black uppercase px-2.5 py-1 tracking-wider inline-block mb-2">
                    CREATIVE DESIGN
                  </span>
                  <h4 className="text-sm font-extrabold text-white">Interactive Stylus Pro</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Ethiopian designers translating complex enterprise logic into beautiful interfaces</p>
                </div>
              </motion.div>

            </div>

            {/* Content info column */}
            <div className="space-y-6 lg:pl-6 text-left">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 block">Enterprise Standard Match</span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Designed to Match Global Giants: Upwork & Toptal Standards
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                HojiiLink offers custom workspaces loaded with local integrations. Ethiopian developers and translation specialists handle large-scale global software engineering contracts, bilingually localized in both English and Afaan Oromo.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                    <Cpu className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Automated AI Job Matching</h5>
                    <p className="text-xs text-slate-400">Our Gemini API scanning tools evaluate qualifications against job profiles for robust candidates selection.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                    <Smartphone className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Full-Service Escrow Support</h5>
                    <p className="text-xs text-slate-400">Milestone assets remain guarded inside digital vaults; funds release only when the final work standard is completely audited.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED LATEST WORK OPPORTUNITIES FEED */}
      <section id="marketplace" className="py-20 px-4 font-sans">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">Marketplace Feed</p>
              <h2 className="text-3xl font-black">{t('recentJobs')}</h2>
            </div>
            <button 
              onClick={() => { window.location.hash = '#marketplace'; }}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mt-4 md:mt-0 flex items-center gap-1.5 cursor-pointer"
            >
              {language === 'en' ? 'Open Active Marketplace' : 'Gabaa Hojii Banu'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PREVIEW_JOBS.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.01, y: -2 }}
                className="rounded-2xl bg-[#16223F]/80 backdrop-blur-xl border border-slate-600/50 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300 shadow-xl relative overflow-hidden group text-left"
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-[10px] font-black text-amber-300 uppercase tracking-wide">
                      {job.budgetType === 'fixed' ? 'Escrowed Fixed Price' : 'Hourly Engagement'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span className="text-xs font-extrabold">{job.clientRating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white hover:text-amber-300 transition-colors mb-3 leading-snug">
                    {language === 'en' ? job.titleEn : job.titleOm}
                  </h3>

                  <p className="text-xs text-gray-200 leading-relaxed mb-4 line-clamp-3 font-medium">
                    {language === 'en' ? job.descriptionEn : job.descriptionOm}
                  </p>

                  {/* Skills required */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.skillsRequired.map((skill, si) => (
                      <span key={si} className="text-[9px] font-bold text-slate-100 bg-white/10 border border-white/10 rounded-md px-2 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-600/30 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-300 leading-none mb-1">Contract Budget</p>
                    <span className="text-lg font-black text-amber-400">{job.budget.toLocaleString()} ETB</span>
                  </div>
                  <button 
                    onClick={() => { window.location.hash = '#marketplace'; }}
                    className={`${premiumButtonClass} py-2.5 px-5 text-xs inline-flex items-center gap-1.5`}
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PLATFORM TRUST SHIELD SECTION WITH CBE & TELEBIRR COMPLIANCE DETAILS */}
      <section className="py-20 px-4 bg-transparent border-t border-slate-800/40 font-sans">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-600/50 bg-[#16223F]/80 p-8 sm:p-12 relative overflow-hidden text-center backdrop-blur-xl shadow-2xl">
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
          
          <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-7 w-7 text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Secured Dual-Ecosystem Transacting
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            HojiiLink provides state of the art Escrow security. Clients release milestone funds only when work criteria is verified. Dynamic webhook validation with local gateways ensures that payments via CBE, Telebirr, and other wallets undergo robust encryption.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left text-xs font-semibold text-slate-100">
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-amber-500/20 transition-colors">
              <ShieldCheck className="h-4.5 w-4.5 text-amber-400" />
              <span>Chapa Escrow API Integrations</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-amber-500/20 transition-colors">
              <Globe2 className="h-4.5 w-4.5 text-blue-400" />
              <span>Bilingual Interface Support (EN/OM)</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-amber-400/20 transition-colors">
              <Cpu className="h-4.5 w-4.5 text-indigo-400" />
              <span>Google Gemini AI Evaluation Context</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-colors">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-400" />
              <span>Verified Bank Direct Withdrawals</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC CALL TO ACTION */}
      <section className="pb-24 pt-10 px-4 text-center font-sans">
        <div className="mx-auto max-w-4xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-blue-500/5 blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent mb-3">{t('ctaSubtitle')}</h3>
          <p className="text-xs sm:text-sm text-slate-100 max-w-lg mx-auto mb-8 font-medium">
            Create your account today as a Client to list vacancies, or register as a Freelancer to begin local bidding.
          </p>
          <button 
            onClick={() => { window.location.hash = '#post-job'; }}
            className={`${premiumButtonClass} px-10 py-4 text-sm inline-flex items-center gap-2.5`}
          >
            <span>{t('ctaButton')}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="py-10 border-t border-slate-800/40 bg-[#070B13] text-center text-[11px] text-slate-300 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t('copyright')}</p>
          <div className="flex items-center gap-4 font-bold text-slate-300">
            <span className="hover:text-white cursor-pointer transition-colors">Security Policies</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Chapa Escrow Terms</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support Helpdesk</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
