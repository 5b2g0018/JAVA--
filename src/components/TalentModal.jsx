import React, { useEffect, useRef } from 'react';
import {
  X, Mail, Clock, DollarSign, Briefcase, GraduationCap,
  ExternalLink, User, ChevronRight, Code, Wind, Terminal,
  Sparkles, Cpu, Database, Award,
} from 'lucide-react';

// ─── Skill config helper (mirrors Skills.jsx) ────────────────────────────────
const getSkillConfig = (skillName) => {
  const n = skillName.toLowerCase();
  if (n.includes('react') || n.includes('next'))
    return { icon: Code, level: 90, color: 'from-emerald-400 to-teal-400', bar: 'bg-gradient-to-r from-emerald-400 to-teal-400' };
  if (n.includes('tailwind') || n.includes('css'))
    return { icon: Wind, level: 95, color: 'from-teal-400 to-cyan-400', bar: 'bg-gradient-to-r from-teal-400 to-cyan-400' };
  if (n.includes('python'))
    return { icon: Terminal, level: 85, color: 'from-cyan-400 to-emerald-400', bar: 'bg-gradient-to-r from-cyan-400 to-emerald-400' };
  if (n.includes('ai') || n.includes('prompt') || n.includes('提示詞'))
    return { icon: Sparkles, level: 92, color: 'from-emerald-400 via-teal-400 to-cyan-400', bar: 'bg-gradient-to-r from-emerald-400 to-cyan-400' };
  if (n.includes('typescript') || n.includes('js') || n.includes('javascript'))
    return { icon: Cpu, level: 88, color: 'from-emerald-400 to-cyan-400', bar: 'bg-gradient-to-r from-emerald-400 to-cyan-400' };
  if (n.includes('sql') || n.includes('database') || n.includes('資料庫') || n.includes('mongo'))
    return { icon: Database, level: 80, color: 'from-emerald-400 to-cyan-400', bar: 'bg-gradient-to-r from-emerald-400 to-cyan-400' };
  return { icon: Award, level: 80, color: 'from-slate-400 to-slate-200', bar: 'bg-gradient-to-r from-slate-400 to-slate-200' };
};

// ─── TalentModal ─────────────────────────────────────────────────────────────
export default function TalentModal({ talent, onClose }) {
  const overlayRef = useRef(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on backdrop click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!talent) return null;

  const skillNames = (talent.skills || []).map(s => (typeof s === 'object' ? s.name : s));

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/80 backdrop-blur-md overflow-y-auto py-8 px-4"
      style={{ animation: 'fadeIn 0.25s ease' }}
    >
      {/* Wrapper: relative so the close button can be positioned outside overflow-hidden */}
      <div className="relative w-full max-w-4xl my-auto">

        {/* Close Button — sits OUTSIDE the overflow-hidden panel so it's never clipped */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute -top-3 -right-3 z-[110] p-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-200 cursor-pointer"
          aria-label="關閉"
        >
          <X size={18} />
        </button>

        {/* Modal Panel */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full bg-slate-900 border border-slate-700/80 rounded-[2rem] shadow-[0_0_80px_rgba(16,185,129,0.15),0_0_120px_rgba(6,182,212,0.08)] overflow-hidden"
          style={{ animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          {/* Decorative top glow bar */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

          {/* Floating background blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

        <div className="p-8 lg:p-10 relative z-10 space-y-10">

          {/* ── Hero Section ── */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-7">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-slate-800 border-2 border-emerald-500/30 flex-shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              {talent.avatar ? (
                <img src={talent.avatar} alt={talent.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <User size={48} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1 space-y-3">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-100">{talent.name}</h2>
                <p className="text-emerald-400 font-semibold mt-1 text-base">{talent.title}</p>
              </div>
              <p className="text-slate-400 italic text-sm font-light leading-relaxed">
                「{talent.motto}」
              </p>
              {/* Quick-info chips */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                {talent.email && (
                  <a href={`mailto:${talent.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-teal-400 hover:border-teal-500/50 transition-colors">
                    <Mail size={12} /> {talent.email}
                  </a>
                )}
                {talent.yearsOfExp !== undefined && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-emerald-400">
                    <Clock size={12} /> {talent.yearsOfExp} 年工作經驗
                  </span>
                )}
                {talent.expectedSalary && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-cyan-400">
                    <DollarSign size={12} /> {talent.expectedSalary}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Bio Section ── */}
          {talent.bio && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
                <span className="h-4 w-0.5 bg-emerald-400 rounded-full" />
                自我介紹
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light bg-slate-950/40 rounded-2xl p-5 border border-slate-800">
                {talent.bio}
              </p>
            </div>
          )}

          {/* ── Experience + Education Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Experience */}
            {talent.experience && talent.experience.length > 0 && (
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                  <Briefcase size={14} />
                  工作經歷
                </h3>
                <div className="space-y-3">
                  {talent.experience.map((exp, idx) => (
                    <div key={idx} className="flex gap-3 bg-slate-950/40 rounded-xl p-4 border border-slate-800">
                      <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400" />
                      <div>
                        <p className="text-slate-100 text-sm font-semibold">{exp.role}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{exp.company}</p>
                        <p className="text-slate-600 text-[11px] mt-0.5">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {talent.education && talent.education.length > 0 && (
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-400">
                  <GraduationCap size={14} />
                  學歷
                </h3>
                <div className="space-y-3">
                  {talent.education.map((edu, idx) => (
                    <div key={idx} className="flex gap-3 bg-slate-950/40 rounded-xl p-4 border border-slate-800">
                      <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-teal-400" />
                      <div>
                        <p className="text-slate-100 text-sm font-semibold">{edu.degree}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{edu.school}</p>
                        <p className="text-slate-600 text-[11px] mt-0.5">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Skills with Progress Bars ── */}
          {skillNames.length > 0 && (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
                <span className="h-4 w-0.5 bg-emerald-400 rounded-full" />
                技術專長
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillNames.map((skillName, idx) => {
                  const cfg = getSkillConfig(skillName);
                  const IconComp = cfg.icon;
                  return (
                    <div
                      key={idx}
                      className="group/skill bg-slate-950/40 rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${cfg.color} text-slate-950`}>
                            <IconComp size={14} className="stroke-[2.5]" />
                          </div>
                          <span className="text-sm font-bold text-slate-200">{skillName}</span>
                        </div>
                        <span className="text-sm font-black text-slate-400">{cfg.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cfg.bar} transition-all duration-1000 ease-out`}
                          style={{ width: `${cfg.level}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Portfolio ── */}
          {talent.portfolio && talent.portfolio.length > 0 && (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                <span className="h-4 w-0.5 bg-cyan-400 rounded-full" />
                精選作品集
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {talent.portfolio.map((proj, idx) => (
                  <div
                    key={idx}
                    className="group/proj rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/40 hover:border-emerald-500/20 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all duration-400"
                  >
                    {/* Project Image */}
                    {proj.image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover grayscale-[20%] group-hover/proj:grayscale-0 group-hover/proj:scale-105 transition-all duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-bold text-slate-100 group-hover/proj:text-emerald-400 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(Array.isArray(proj.tags)
                          ? proj.tags
                          : (proj.tags || '').split(',').map(t => t.trim())
                        ).filter(Boolean).map((tag, ti) => (
                          <span
                            key={ti}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-800 bg-slate-900/60 text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Footer CTA ── */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-600">對 {talent.name} 感興趣？</p>
            {talent.email && (
              <a
                href={`mailto:${talent.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 hover:shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={14} />
                立即聯絡
                <ChevronRight size={14} />
              </a>
            )}
          </div>

        </div>
        {/* END Modal Panel */}
        </div>
      {/* END Wrapper */}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
