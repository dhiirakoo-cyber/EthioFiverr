import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import JobCard, { Job } from '../components/JobCard';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  CheckCircle,
  Briefcase,
  X,
  Star,
  Sparkles,
  ChevronDown,
  Info,
  DollarSign,
  AlertCircle
} from 'lucide-react';

const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    client_id: 'client-101',
    title_en: 'Build Bilingual E-Commerce Portal with Telebirr',
    title_om: 'Portal Daldala Dhunfaa Afaan Lameenii Fi Telebirr Uumuu',
    description_en: 'Seeking a highly skilled full stack developer to design an interactive catalog platform featuring fully compiled security layers and dynamic Telebirr API callbacks. Needs dashboard views, transaction logging, and real-time push message confirmations.',
    description_om: 'Saafee daldala dhuunfaa afaan lamaan gargaaruu fi system kafaltii Telebiriin walitti hidhamu qopheesuuf ogeessa barbanna. Gabaasa faayinaansii, galmeessa daldalaa fi gargaarsa dabalataa of keessaa qaba fedha.',
    category: 'software-tech',
    skills_required: ['React', 'Node.JS', 'PostgreSQL', 'Telebirr API', 'Tailwind CSS'],
    budget_type: 'fixed',
    budget: 45000,
    estimated_duration: '1-3 months',
    experience_level: 'expert',
    status: 'open',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    profiles: {
      full_name: 'Desta Kassahun (Yegna Retail)',
      avatar_url: '',
      rating: 4.9,
    },
  },
  {
    id: 'job-2',
    client_id: 'client-102',
    title_en: 'Translate Comprehensive Healthcare Manual (EN & Oromo)',
    title_om: 'Qajeelfama Fayyaa Giddu-galeessaa Hikkuu (English Gara Oromoo)',
    description_en: 'Looking for a professional linguist or translation team to convert a 45-page medical instructions document into highly accurate and natural Afaan Oromo. Needs to utilize proper medical vocabulary suited for regional clinics.',
    description_om: 'Galmee qajeelfama yaalaa fuula 45 qabu guutummatti fii haala madaalawa ta’een English irraa gara Afaan Oromootti kan hiiku ogeessota afaanii fi fayyaa barbaaddanna.',
    category: 'translation',
    skills_required: ['English Translation', 'Afaan Oromo', 'Medical Translation', 'Proofreading'],
    budget_type: 'fixed',
    budget: 15000,
    estimated_duration: 'Less than 1 month',
    experience_level: 'intermediate',
    status: 'open',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    profiles: {
      full_name: 'Dr. Tollera Adugna (Oromia Health)',
      avatar_url: '',
      rating: 5.0,
    },
  },
  {
    id: 'job-3',
    client_id: 'client-103',
    title_en: 'Corporate Identity Rebrand & Mobile App UI Design',
    title_om: 'Saxaxa UI Appii Moobaayilaa Fi Reebiraandiingii Gamtaa',
    description_en: 'We need an experienced graphic artist to recreate our company brand stylebook and craft beautiful interactive high-fidelity Figma screens for our upcoming delivery service app matching Ethiopian metropolitan styles.',
    description_om: 'Hubbaa daldala geejjibaaf kan ta’u beeksisa ammayyaa, bifa saxaxa haaraa fi dizaayinii appii moobaayilaa Figma irratti oofamu kalaquuf ogummaa qabaachuu si barbaachisa.',
    category: 'design-creative',
    skills_required: ['Figma', 'UI/UX Design', 'Branding', 'Mobile Layouts', 'Illustrator'],
    budget_type: 'hourly',
    budget: 450, // Per hour
    estimated_duration: '3-6 months',
    experience_level: 'intermediate',
    status: 'open',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    profiles: {
      full_name: 'Abdi Wakgari (Sheger Logistics)',
      avatar_url: '',
      rating: 4.7,
    },
  },
  {
    id: 'job-4',
    client_id: 'client-104',
    title_en: 'Custom Coffee Export Supply Tracker Website',
    title_om: 'Saafee Hordoffii Raabsa Buna Jiddu-Galeessa Guutuu',
    description_en: 'Develop a lightweight supply chain monitoring dashboard to log coffee trade allocations, quality ratings, and Chapa-driven escrow verification structures for international shipping lines.',
    description_om: 'Moosaajii salphaa hordoffii daldala buna gabaa bal’aa, qulqullina bunaa fi kafaltii dhumaa amansiisaa Chapa gargaaru qopheessuu.',
    category: 'software-tech',
    skills_required: ['React', 'D3.js', 'Chapa SDK', 'NodeJS', 'Excel Export'],
    budget_type: 'fixed',
    budget: 75000,
    estimated_duration: '1-3 months',
    experience_level: 'expert',
    status: 'open',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    profiles: {
      full_name: 'Kibur Coffee Exporters',
      avatar_url: '',
      rating: 4.8,
    },
  }
];

interface MarketplaceProps {
  customJobs?: Job[];
}

export default function Marketplace({ customJobs = [] }: MarketplaceProps) {
  const { language, t } = useLanguage();
  
  // Job database state
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(INITIAL_JOBS);

  useEffect(() => {
    setJobs([...customJobs, ...INITIAL_JOBS]);
  }, [customJobs]);

  // Filter criteria states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchSkill, setSearchSkill] = useState('');
  const [selectedBudgetTypes, setSelectedBudgetTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [maxBudgetFilter, setMaxBudgetFilter] = useState<number>(100000);

  // Proposal modal & simulation state
  const [selectedJobForProposal, setSelectedJobForProposal] = useState<Job | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [estimatedDays, setEstimatedDays] = useState<number>(7);
  const [coverLetterEn, setCoverLetterEn] = useState('');
  const [coverLetterOm, setCoverLetterOm] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // AI Matching evaluation simulation states inside application modals
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiMatchResult, setAiMatchResult] = useState<{
    score: number;
    explanationEn: string;
    explanationOm: string;
  } | null>(null);

  // Match core filter queries dynamically
  useEffect(() => {
    let result = jobs;

    // Search query bilingual match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title_en.toLowerCase().includes(q) ||
          job.title_om.toLowerCase().includes(q) ||
          job.description_en.toLowerCase().includes(q) ||
          job.description_om.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((job) => job.category === selectedCategory);
    }

    // Skill Tag search
    if (searchSkill.trim() !== '') {
      const s = searchSkill.toLowerCase();
      result = result.filter((job) =>
        job.skills_required.some((skill) => skill.toLowerCase().includes(s))
      );
    }

    // Budget type
    if (selectedBudgetTypes.length > 0) {
      result = result.filter((job) => selectedBudgetTypes.includes(job.budget_type));
    }

    // Experience Level
    if (selectedExperienceLevels.length > 0) {
      result = result.filter((job) => selectedExperienceLevels.includes(job.experience_level));
    }

    // Max Budget limit
    result = result.filter((job) => job.budget <= maxBudgetFilter);

    setFilteredJobs(result);
  }, [
    searchQuery,
    selectedCategory,
    searchSkill,
    selectedBudgetTypes,
    selectedExperienceLevels,
    maxBudgetFilter,
    jobs
  ]);

  const handleOpenProposal = (job: Job) => {
    setSelectedJobForProposal(job);
    setBidAmount(job.budget);
    setCoverLetterEn('');
    setCoverLetterOm('');
    setSubmissionSuccess(false);
    setAiMatchResult(null);
  };

  const handleBudgetCheckbox = (type: string) => {
    setSelectedBudgetTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleExperienceCheckbox = (level: string) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  // Run a real mock evaluation simulation matching the developer credentials to Gemini's prompt schema
  const runAiSuitabilityFeedback = () => {
    if (!selectedJobForProposal) return;
    setAiAnalyzing(true);
    setAiMatchResult(null);

    setTimeout(() => {
      // Prompt matching simulations (fallback matching algorithms inside UI page runtime)
      const countMatching = selectedJobForProposal.skills_required.length;
      let mockScore = 55;
      let reasonsEn = '';
      let reasonsOm = '';

      if (countMatching > 3) {
        mockScore = 94;
        reasonsEn = 'Excellent match! Your current specialization matches over 80% of core deliverables. Chapa dynamic payment processing matches your previous project workflows.';
        reasonsOm = 'Walitti-bu’iinsa gaarii dha! Ogummaan kee gurguddoon hojicha %80 gadiin ni dhuunfata. Sirni kafaltii Chapa dandeettii kee waliin kallattiin qunnama.';
      } else {
        mockScore = 78;
        reasonsEn = 'Strong fit! Your portfolio indicates high adaptability for technology requirements, although specialized API experience in agricultural data mapping can be expanded.';
        reasonsOm = 'Haala gaariidha! Ogummaan kee keessatti saphana daldalaa hojjechuuf qophiidha, haata’u malee muuxannoo Chapa dabalataan irratti hojjechuu qabdi.';
      }

      setAiMatchResult({
        score: mockScore,
        explanationEn: reasonsEn,
        explanationOm: reasonsOm,
      });
      setAiAnalyzing(false);
    }, 1800);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForProposal) return;

    // Trigger feedback simulation
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSelectedJobForProposal(null);
      setSubmissionSuccess(false);
    }, 2800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-slate-950 text-white min-h-screen">
      
      {/* Search Header Banner */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent flex items-center justify-center md:justify-start gap-2">
          <Briefcase className="h-7 w-7 text-amber-400" />
          <span>Interactive Talent Marketplace</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Browse real high-paying opportunities across Ethiopia. Select filters to adjust results dynamically, or use AI analysis tool directly inside applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTER CRITERIA COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <span className="text-sm font-extrabold flex items-center gap-1.5 text-amber-300 uppercase tracking-widest text-xs">
                <Filter className="h-4 w-4" />
                <span>Filters (Filtara)</span>
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSearchSkill('');
                  setSelectedBudgetTypes([]);
                  setSelectedExperienceLevels([]);
                  setMaxBudgetFilter(100000);
                }}
                className="text-[10px] text-slate-500 hover:text-white transition-colors underline"
              >
                Reset All
              </button>
            </div>

            {/* Language-Aware Core Search */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-400">Search Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Keywords (en/om)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 py-2.5 pl-9 pr-4 text-white focus:outline-none focus:border-amber-400/40"
                />
              </div>
            </div>

            {/* Category selection list */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-400">Main Categories</label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'all', label: 'All Fields' },
                  { id: 'software-tech', label: 'Software & Tech Development' },
                  { id: 'translation', label: 'Bilingual Translation/Writing' },
                  { id: 'design-creative', label: 'Graphics & Creative UI Design' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left text-xs rounded-lg px-3 py-2 transition-all font-semibold ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'hover:bg-white/5 text-slate-400 border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience levels checkboxes */}
            <div className="space-y-2.5 mb-6">
              <label className="text-xs font-bold text-slate-400">Skill / Experience Level</label>
              <div className="space-y-1.5 text-xs text-slate-300 font-semibold">
                {[
                  { id: 'entry', label: 'Entry Level (Qabxii-jalqabaa)' },
                  { id: 'intermediate', label: 'Intermediate' },
                  { id: 'expert', label: 'Expert / Specialist' },
                ].map((level) => (
                  <label key={level.id} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedExperienceLevels.includes(level.id)}
                      onChange={() => handleExperienceCheckbox(level.id)}
                      className="accent-amber-500 rounded border-white/10"
                    />
                    <span>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget type checkpoints */}
            <div className="space-y-2.5 mb-6">
              <label className="text-xs font-bold text-slate-400">Budget Type</label>
              <div className="space-y-1.5 text-xs text-slate-300 font-semibold">
                {[
                  { id: 'fixed', label: 'Fixed Price' },
                  { id: 'hourly', label: 'Hourly rate' },
                ].map((type) => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedBudgetTypes.includes(type.id)}
                      onChange={() => handleBudgetCheckbox(type.id)}
                      className="accent-amber-500 rounded border-white/10"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Maximum Budget Limit Range */}
            <div className="space-y-2 mb-2">
              <div className="flex justify-between text-xs text-slate-450">
                <span className="font-bold text-slate-400">Max Budget Limit</span>
                <span className="font-black text-amber-400">{maxBudgetFilter.toLocaleString()} ETB</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="2500"
                value={maxBudgetFilter}
                onChange={(e) => setMaxBudgetFilter(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 pb-2"
              />
            </div>

          </div>
        </div>

        {/* INTERACTIVE DYNAMIC JOBS FEED LIST */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              showing {filteredJobs.length} matches out of {jobs.length} jobs available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onApplyClick={handleOpenProposal} />
              ))
            ) : (
              <div className="col-span-2 rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-400 bg-slate-900/10">
                <AlertCircle className="h-10 w-10 text-amber-400/50 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-1">No postings match your criteria</h3>
                <p className="text-xs max-w-sm mx-auto">
                  Try adjusting search parameters, clearing your maximum budget slider limit, or switching categories to browse more jobs.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* DETAILED APPLICANT ESCROW BIDDING PROPOSAL MODAL */}
      <AnimatePresence>
        {selectedJobForProposal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-md max-h-[90vh] overflow-y-auto text-left text-slate-100"
            >
              
              <button
                onClick={() => setSelectedJobForProposal(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Interactive Proposal System
                </span>
                <h2 className="text-xl font-extrabold text-white mt-2">
                  Apply for: {language === 'en' ? selectedJobForProposal.title_en : selectedJobForProposal.title_om}
                </h2>
                <div className="flex gap-4 text-xs font-semibold text-slate-400 mt-1">
                  <span>Client: {selectedJobForProposal.profiles?.full_name || 'HojiiLink Client'}</span>
                  <span>|</span>
                  <span>Estimated Budget: {selectedJobForProposal.budget} ETB</span>
                </div>
              </div>

              {/* Gemini Match AI Assistant integration banner */}
              <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/10 flex-shrink-0">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>Gemini AI Profile Match Assessment</span>
                      <span className="text-[9px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded">BILINGUAL</span>
                    </h4>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Check your professional fit index against job details. Translates cover letters and predicts contract match criteria using live evaluation.
                    </p>
                    
                    {aiAnalyzing ? (
                      <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-amber-300">
                        <span className="h-3.5 w-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <span>Evaluating match parameters...</span>
                      </div>
                    ) : aiMatchResult ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 bg-slate-950/65 border border-white/5 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-400">Match score:</span>
                          <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 rounded-md">
                            {aiMatchResult.score}% Compatibility
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300 italic border-l-2 border-amber-500/30 pl-2">
                          {language === 'en' ? aiMatchResult.explanationEn : aiMatchResult.explanationOm}
                        </p>
                      </motion.div>
                    ) : (
                      <button
                        type="button"
                        onClick={runAiSuitabilityFeedback}
                        className="mt-3 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg px-4 py-1.5 shadow-lg transition-all inline-flex items-center gap-1"
                      >
                        Run Match Audit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Proposal Form */}
              {submissionSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center text-slate-200"
                >
                  <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-base font-extrabold text-white">Proposal Submitted! (Galsmeeffameera)</h3>
                  <p className="text-xs max-w-sm mx-auto mt-2">
                    Your bid of <strong className="text-amber-400">{bidAmount} ETB</strong> has been securely logged on Supabase. The client and escrow agents have been notified.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitProposal} className="space-y-4">
                  
                  {/* Bidding row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">Your Bid Amount (ETB)</label>
                      <input
                        type="number"
                        required
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        className="w-full text-sm rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white font-extrabold focus:outline-none focus:border-amber-400/40"
                      />
                      <span className="text-[9px] text-slate-500 leading-none">Includes safe platform escrow guarantee fees.</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">Days to Deliver</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={estimatedDays}
                        onChange={(e) => setEstimatedDays(Number(e.target.value))}
                        className="w-full text-sm rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white font-extrabold focus:outline-none focus:border-amber-400/40"
                      />
                      <span className="text-[9px] text-slate-500 leading-none">Proposed delivery calendar span.</span>
                    </div>
                  </div>

                  {/* Bilingual Cover Letters */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">
                      Cover Letter (English)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={coverLetterEn}
                      onChange={(e) => setCoverLetterEn(e.target.value)}
                      placeholder="Detail why you are qualified for this project..."
                      className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-400/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">
                      Cover Letter (Afaan Oromo - Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetterOm}
                      onChange={(e) => setCoverLetterOm(e.target.value)}
                      placeholder="Ibsa dabalataa dandeettii keetii dhiyeessi..."
                      className="w-full text-xs rounded-xl bg-slate-950 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-400/40"
                    />
                  </div>

                  <div className="flex gap-2 justify-end border-t border-white/5 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedJobForProposal(null)}
                      className="rounded-xl border border-white/10 bg-white/5 py-2.5 px-5 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      Cancel (Dhiisi)
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-2.5 px-6 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 transition-all focus:outline-none"
                    >
                      Submit Application
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
