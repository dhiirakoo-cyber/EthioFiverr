import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Star, Clock, Briefcase, ChevronRight, DollarSign } from 'lucide-react';

export interface Job {
  id: string;
  client_id: string;
  title_en: string;
  title_om: string;
  description_en: string;
  description_om: string;
  category: string;
  skills_required: string[];
  budget_type: 'fixed' | 'hourly';
  budget: number;
  estimated_duration: string;
  experience_level: 'entry' | 'intermediate' | 'expert';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
    rating?: number;
  };
}

interface JobCardProps {
  key?: React.Key;
  job: Job;
  onApplyClick?: (job: Job) => void;
}

export default function JobCard({ job, onApplyClick }: JobCardProps) {
  const { language } = useLanguage();

  const title = language === 'en' ? job.title_en : job.title_om;
  const description = language === 'en' ? job.description_en : job.description_om;

  const experienceLabels = {
    entry: 'Entry Level (Qabxii-jalqabaa)',
    intermediate: 'Intermediate Level (Giddu-galeessa)',
    expert: 'Expert Level (Olaanaafi Muuxannoo)',
  };

  const budgetTypeLabels = {
    fixed: 'Fixed Budget (Kafaltii Murtaa’aa)',
    hourly: 'Hourly Rate (Sa’aatiin)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.3)' }}
      className="group rounded-2xl border border-white/10 bg-slate-900/40 p-6 flex flex-col justify-between hover:bg-slate-900/60 transition-all shadow-xl backdrop-blur-md"
    >
      <div>
        {/* Card Header metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex gap-2">
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-extrabold text-amber-300 uppercase tracking-widest">
              {budgetTypeLabels[job.budget_type] || job.budget_type}
            </span>
            <span className="rounded-full bg-slate-800/80 border border-white/5 px-3 py-1 text-[10px] font-bold text-slate-300">
              {job.category.replace('-', ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>{new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-2">
          {title}
        </h3>

        {/* Client Name / Rating */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-300 border border-amber-400/20">
            {job.profiles?.full_name?.charAt(0) || 'C'}
          </div>
          <span>{job.profiles?.full_name || 'HojiiLink Client'}</span>
          {job.profiles?.rating && (
            <div className="flex items-center gap-0.5 text-amber-400 ml-2">
              <Star className="h-3 w-3 fill-amber-400" />
              <span className="font-bold text-[11px]">{job.profiles.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Description Body */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technical Requirements / Skill Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {job.skills_required.map((skill, index) => (
            <span
              key={index}
              className="text-[10px] font-semibold text-slate-300 bg-white/5 border border-white/5 rounded-md px-2.5 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing and Details Footer row */}
      <div className="border-t border-white/5 pt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1">Budget</p>
            <div className="flex items-center gap-0.5 text-amber-400 font-black text-lg">
              <span>{job.budget.toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-400 ml-1">ETB</span>
            </div>
          </div>
          <div className="border-l border-white/5 pl-4">
            <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1">Level / Duration</p>
            <p className="text-xs font-bold text-slate-300 leading-tight">{experienceLabels[job.experience_level]}</p>
            <span className="text-[10px] text-slate-400">{job.estimated_duration}</span>
          </div>
        </div>

        <button
          onClick={() => onApplyClick?.(job)}
          className="flex items-center gap-1 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl py-2.5 px-5 shadow-lg shadow-amber-500/10 hover:from-amber-400 hover:to-yellow-400 transition-all"
        >
          <span>Apply (Iyyadhu)</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
