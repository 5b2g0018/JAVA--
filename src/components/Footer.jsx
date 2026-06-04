import React from 'react';
import { ArrowUp, Code } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t border-slate-900/60 bg-slate-950 py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 rounded-full bg-emerald-500/5 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

        {/* Brand/Logo Info */}
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Code size={16} />
          </div>
          <span className="text-sm font-semibold tracking-wider text-slate-300">
            TalentHub <span className="text-slate-600">|</span> 獨立人才與開發者市集
          </span>
        </div>

        {/* Center Credits */}
        <p className="text-xs text-slate-500 font-light text-center md:text-left">
          © {new Date().getFullYear()} TalentHub. All Rights Reserved. Built with React & Tailwind CSS.
        </p>

        {/* Scroll To Top Trigger */}
        <button
          onClick={handleScrollToTop}
          className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300 shadow-xl cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>

      </div>
    </footer>
  );
}
