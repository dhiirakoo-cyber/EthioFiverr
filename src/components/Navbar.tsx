import React, { useState } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, Briefcase, User, LogOut, PlusCircle, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-md text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 font-bold text-slate-950 shadow-lg shadow-amber-500/20"
            >
              HL
            </motion.div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
              {t('brand')}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#marketplace" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
              {t('jobs')}
            </a>
            <a href="#talents" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
              {t('talents')}
            </a>
            {user?.role === 'client' && (
              <a href="#post-job" className="flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-400 transition-colors">
                <PlusCircle className="h-4 w-4" />
                {t('postJob')}
              </a>
            )}
          </div>

          {/* Settings & Interaction Actions (Language, Auth) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 px-3 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-amber-400" />
                <span>{language === 'en' ? 'English (EN)' : 'Afaan Oromo (OM)'}</span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl"
                  >
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs ${
                        language === 'en' ? 'bg-amber-500/10 text-amber-300' : 'hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span>English</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500">EN</span>
                    </button>
                    <button
                      onClick={() => toggleLanguage('om')}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs ${
                        language === 'om' ? 'bg-amber-500/10 text-amber-300' : 'hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span>Afaan Oromo</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500">OM</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Authentication States */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/5 py-1 px-3">
                  <div className="h-7 w-7 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                    <User className="h-4 w-4 text-amber-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight">{user.fullName}</p>
                    <span className="text-[9px] uppercase tracking-wider text-amber-400">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-red-400 hover:bg-red-500/20 transition-all"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => login({ id: 'mock-c-1', email: 'dhiirakoo@gmail.com', fullName: 'Diriba Olana (Tech)', role: 'client' })}
                  className="text-xs font-semibold px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-slate-300"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={() => login({ id: 'mock-c-1', email: 'dhiirakoo@gmail.com', fullName: 'Diriba Olana (Tech)', role: 'client' })}
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 rounded-lg shadow-lg hover:from-amber-400 hover:to-yellow-400 transition-all duration-300"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('getStarted')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => toggleLanguage(language === 'en' ? 'om' : 'en')}
              className="rounded-lg p-2 bg-white/5 border border-white/10 text-amber-400 hover:bg-white/10 transition-colors"
              title="Switch Language"
            >
              <Globe className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-t border-white/10 bg-slate-950 shadow-2xl"
          >
            <div className="space-y-1.5 px-4 pb-5 pt-3">
              <a
                href="#marketplace"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                {t('jobs')}
              </a>
              <a
                href="#talents"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                {t('talents')}
              </a>
              {user?.role === 'client' && (
                <a
                  href="#post-job"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold text-amber-300 hover:bg-white/5 transition-all"
                >
                  <PlusCircle className="h-5 w-5" />
                  {t('postJob')}
                </a>
              )}
              
              <div className="border-t border-white/15 my-3 pt-3">
                {user ? (
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                        <User className="h-5 w-5 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-none">{user.fullName}</p>
                        <span className="text-[10px] uppercase text-amber-400">{user.role}</span>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="rounded-lg bg-red-500/10 p-2 text-red-400"
                    >
                      <LogOut className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <button 
                      onClick={() => login({ id: 'mock-c-1', email: 'dhiirakoo@gmail.com', fullName: 'Diriba Olana (Tech)', role: 'client' })}
                      className="rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300"
                    >
                      {t('login')}
                    </button>
                    <button 
                      onClick={() => login({ id: 'mock-c-1', email: 'dhiirakoo@gmail.com', fullName: 'Diriba Olana (Tech)', role: 'client' })}
                      className="rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 py-2.5 text-sm font-bold text-slate-950"
                    >
                      {t('getStarted')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
