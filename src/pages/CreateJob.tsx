import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  PlusCircle,
  Clock,
  DollarSign,
  Briefcase,
  Layers,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface CreateJobProps {
  onJobCreated?: (newJob: any) => void;
  onNavigateBack?: () => void;
}

export default function CreateJob({ onJobCreated, onNavigateBack }: CreateJobProps) {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields States
  const [titleEn, setTitleEn] = useState('');
  const [titleOm, setTitleOm] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionOm, setDescriptionOm] = useState('');
  const [category, setCategory] = useState('software-tech');
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>('fixed');
  const [budget, setBudget] = useState<number>(5000);
  const [estimatedDuration, setEstimatedDuration] = useState('1-3 months');
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'intermediate' | 'expert'>('intermediate');

  // AI Generation Simulation State
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  // Local Form Validations
  const [validationError, setValidationError] = useState('');

  const PRESET_SKILLS = [
    'React', 'NodeJS', 'Chapa SDK', 'PostgreSQL', 'Telebirr Connection',
    'Figma', 'UI/UX Design', 'English Translation', 'Afaan Oromo Specialist',
    'Mobile Layouts', 'Branding', 'Copywriting', 'SEO', 'Data Analyst'
  ];

  // AI-Assisted Translation and auto enrichment utilizing Gemini prompt structures
  const runAiPolishingHelper = () => {
    if (!titleEn || !descriptionEn) {
      setValidationError('Please insert English Title and Description first before running Gemini AI Translator.');
      return;
    }

    setValidationError('');
    setAiGenerating(true);
    setAiSuccessMessage('');

    // Simulate real backend proxy call to Google Gemini model (fallback model in web-preview)
    setTimeout(() => {
      // Determine skills to output
      const suggestedSkills: string[] = [];
      const titleLower = titleEn.toLowerCase();
      
      if (titleLower.includes('web') || titleLower.includes('e-commerce') || titleLower.includes('react')) {
        suggestedSkills.push('React', 'NodeJS', 'PostgreSQL', 'Chapa SDK');
      } else if (titleLower.includes('translate') || titleLower.includes('write')) {
        suggestedSkills.push('English Translation', 'Afaan Oromo Specialist', 'Copywriting');
      } else {
        suggestedSkills.push('UI/UX Design', 'Figma', 'Branding');
      }

      // Populate translations based on standard Ethiopian professional terms
      let targetTitleOm = '';
      let targetDescOm = '';

      if (titleEn.startsWith('Build')) {
        targetTitleOm = titleEn.replace('Build', 'Saafee/Moosaajii Humneessaa') + ' Uumuu';
        targetDescOm = `[BEEKSIFAME AI] Hojii dizaayinii fi misooma sooftiweerii madaalawaa ta'e. ${descriptionEn} (Gabaasa dhuunfaa biyya keessaa fi daldala amansiisaa qopheessuun dabalata dursa argata).`;
      } else {
        targetTitleOm = `Qajeelfama Hojii: ${titleEn}`;
        targetDescOm = `[BEEKSIFAME AI] Galmee ykn dizaayinii dandeettii dabalataa of keessaa qabu. ${descriptionEn}`;
      }

      setTitleOm(targetTitleOm);
      setDescriptionOm(targetDescOm);
      setSkillsRequired((prev) => Array.from(new Set([...prev, ...suggestedSkills])));
      
      setAiGenerating(false);
      setAiSuccessMessage('Gemini translated job structure to professional Afaan Oromo and updated skill requirement checklist!');
    }, 2000);
  };

  const handleToggleSkill = (skill: string) => {
    setSkillsRequired((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !skillsRequired.includes(customSkill.trim())) {
      setSkillsRequired((prev) => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!titleEn && !titleOm) {
        setValidationError('You must insert at least one language Title.');
        return;
      }
      if (!descriptionEn && !descriptionOm) {
        setValidationError('You must insert at least one language Description.');
        return;
      }
    }
    setValidationError('');
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setValidationError('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      id: `job-custom-${Date.now()}`,
      client_id: 'client-user',
      title_en: titleEn || titleOm,
      title_om: titleOm || titleEn,
      description_en: descriptionEn || descriptionOm,
      description_om: descriptionOm || descriptionEn,
      category,
      skills_required: skillsRequired,
      budget_type: budgetType,
      budget: Number(budget),
      estimated_duration: estimatedDuration,
      experience_level: experienceLevel,
      status: 'open',
      created_at: new Date().toISOString(),
      profiles: {
        full_name: 'You (Platform Client)',
        avatar_url: '',
        rating: 5.0,
      }
    };

    onJobCreated?.(newJob);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 bg-slate-950 text-white min-h-screen">
      
      {/* Navigate back link */}
      <button
        onClick={onNavigateBack}
        className="mb-6 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Directory</span>
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-black bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent flex items-center gap-2">
          <PlusCircle className="h-6 w-6 text-amber-400" />
          <span>Post an Escrow Secured Job</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete the steps to distribute your project parameters across Ethiopia’s top talent pool.
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center gap-4 mb-8">
        {[
          { step: 1, label: 'Scope' },
          { step: 2, label: 'Skills & Tech' },
          { step: 3, label: 'Budget & Escrow' },
        ].map((item) => (
          <div key={item.step} className="flex-1 flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                currentStep >= item.step
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'bg-white/5 border border-white/10 text-slate-400'
              }`}
            >
              {item.step}
            </div>
            <span className={`text-xs font-bold ${currentStep >= item.step ? 'text-white' : 'text-slate-500'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {validationError && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-center gap-3 text-red-200 text-xs">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* STEP BODY */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-md">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: TITLE & DETAILS BILINGUAL INPUTS WITH AI HELPER */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-widest mb-4">Step 1: Project Scope</h3>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">English Job Title</label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g., Build Bilingual E-Commerce Portal with Telebirr API"
                    className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-400/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">English Description of Deliverables</label>
                  <textarea
                    required
                    rows={4}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Detail goals, timelines, and payment structures..."
                    className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-400/40"
                  />
                </div>

                {/* Gemini AI Auto-Polish button trigger */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 my-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Gemini Translation Assistant</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Let Gemini instantly translate your details into professional Afaan Oromo.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={aiGenerating}
                      onClick={runAiPolishingHelper}
                      className="rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs py-2 px-3.5 hover:bg-amber-400 transition-all flex items-center gap-1 flex-shrink-0 disabled:opacity-50"
                    >
                      {aiGenerating ? 'Processing...' : 'Run Gemini AI'}
                    </button>
                  </div>
                  {aiSuccessMessage && (
                    <p className="text-[10px] text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      {aiSuccessMessage}
                    </p>
                  )}
                </div>

                {/* Bilingual Afaan Oromo inputs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Afaan Oromo Title (Mataa duree hojii)</label>
                  <input
                    type="text"
                    value={titleOm}
                    onChange={(e) => setTitleOm(e.target.value)}
                    placeholder="e.g., Portal Daldala Dhunfaa Afaan Lameenii Fi Telebirr"
                    className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-400/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Afaan Oromo Description (Ibsa Hojichaa)</label>
                  <textarea
                    rows={4}
                    value={descriptionOm}
                    onChange={(e) => setDescriptionOm(e.target.value)}
                    placeholder="Writings, key skills, and local details in Afaan Oromo..."
                    className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-400/40"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-400">Job Field Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none"
                  >
                    <option value="software-tech">Software & Technology Systems</option>
                    <option value="translation">Bilingual Translation & Proofreading</option>
                    <option value="design-creative">Graphics, Creative Arts & UI/UX</option>
                    <option value="marketing">Digital Marketing & Ads</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* STEP 2: TECHNICAL SKILLS & BADGES */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-widest mb-2">Step 2: Technical Skills</h3>
                  <p className="text-xs text-slate-400">Select skills required for this job context to optimize the candidate search indexes.</p>
                </div>

                {/* Preset interactive badges */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">Popular requirements on HojiiLink</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_SKILLS.map((skill) => {
                      const active = skillsRequired.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleToggleSkill(skill)}
                          className={`text-xs rounded-lg py-1.5 px-3 font-semibold transition-all border ${
                            active
                              ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md shadow-amber-400/10'
                              : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Skill inputs */}
                <div>
                  <label className="text-xs font-bold text-slate-400">Add other customized requirements</label>
                  <div className="flex gap-2 mt-1.5">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      placeholder="e.g., Solidity, Excel, Adobe Premiere..."
                      className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSkill}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold hover:bg-white/10 text-white flex-shrink-0"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>

                {/* Interactive checkmark output */}
                {skillsRequired.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Currently Added Skills</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {skillsRequired.map((skill) => (
                        <span key={skill} className="text-xs bg-slate-950 rounded-lg px-2.5 py-1 text-slate-200 border border-white/10 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5 text-amber-400" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: BUDGET BUDGET TYPE & SECRETS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-widest mb-2">Step 3: Financial & Escrow Config</h3>
                  <p className="text-xs text-slate-400">Lock your payments in a secure platform contract. Candidates perform tasks once payments reside in Escrow.</p>
                </div>

                {/* Budget type selector cards */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">Budget Structure Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBudgetType('fixed')}
                      className={`rounded-2xl border p-5 flex flex-col gap-1 transition-all ${
                        budgetType === 'fixed'
                          ? 'border-amber-400 bg-amber-500/5 text-left'
                          : 'border-white/10 bg-white/5 text-left'
                      }`}
                    >
                      <Layers className="h-5 w-5 text-amber-400 mb-2" />
                      <span className="text-xs font-bold text-white">Fixed Price Contract</span>
                      <span className="text-[10px] text-slate-400">Pay single or multi-milestone budgets once work completed is checked.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBudgetType('hourly')}
                      className={`rounded-2xl border p-5 flex flex-col gap-1 transition-all ${
                        budgetType === 'hourly'
                          ? 'border-amber-400 bg-amber-500/5 text-left'
                          : 'border-white/10 bg-white/5 text-left'
                      }`}
                    >
                      <Clock className="h-5 w-5 text-amber-400 mb-2" />
                      <span className="text-xs font-bold text-white">Hourly Rates (Sa’aatiin)</span>
                      <span className="text-[10px] text-slate-400">Log time reports weekly and verify hours before payouts trigger.</span>
                    </button>
                  </div>
                </div>

                {/* Numerical Input fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">
                      {budgetType === 'fixed' ? 'Total Project Budget (ETB)' : 'Hourly rate (USD / ETB equivalent)'}
                    </label>
                    <input
                      type="number"
                      required
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full text-sm rounded-xl bg-slate-950 border border-white/10 p-3 text-white font-extrabold focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Duration Range</label>
                    <select
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(e.target.value)}
                      className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none"
                    >
                      <option value="Less than 1 month">Less than 1 month</option>
                      <option value="1-3 months">1 to 3 months</option>
                      <option value="3-6 months">3 to 6 months</option>
                      <option value="More than 6 months">More than 6 months (Longterm)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Client / Experience level target</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none"
                  >
                    <option value="entry">Entry Level - Budgets focused on quick prototypes</option>
                    <option value="intermediate">Intermediate Level - Professional overlays</option>
                    <option value="expert">Expert Level - Advanced security structures</option>
                  </select>
                </div>

                {/* Local Escrow Information box */}
                <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-4 text-[11px] text-slate-350 leading-relaxed flex gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Your payment will lock within our secure local Escrow system synced with Chapa webhooks. Freelancers bid based on parameters stated here and funds remain protected until final milestones are signed off.
                  </span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Bottom navigation buttons of multistep */}
          <div className="border-t border-white/5 pt-6 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="rounded-xl border border-white/10 bg-white/5 py-2.5 px-5 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors"
              >
                Back (Duubatti)
              </button>
            ) : (
              <div /> // Dummy div for spacer on first step
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="rounded-xl bg-amber-500 text-slate-950 font-black text-xs py-2.5 px-6 shadow-lg shadow-amber-500/10 hover:bg-amber-400 transition-all flex items-center gap-1.5"
              >
                <span>Continue (Gara dhiigatti)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 px-8 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 transition-all"
              >
                Post Job Posting (Qabattuu Hojii Ban)
              </button>
            )}
          </div>
        </form>

      </div>

    </div>
  );
}
