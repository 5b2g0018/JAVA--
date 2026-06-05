import React from 'react';
import { ArrowRight, PlusCircle, Search } from 'lucide-react';

export default function Hero({ onViewChange }) {
  const handleScrollToGrid = () => {
    const element = document.getElementById('marketplace-grid');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-12 px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-slow-reverse pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 space-y-8">

        {/* Hello Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-semibold tracking-wider uppercase">
            🚀 獨立人才與開發者市集
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          尋找 <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-glow-emerald">頂尖獨立人才</span>
          <br />
          <span className="text-slate-100 text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2 block">
            登錄你的數位履歷
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          TalentHub 彙整了優秀工程師、設計師與社群策劃的個人數位履歷。
          無論是尋找外包夥伴，還是展示你的程式美感，這裡都能幫您建立最有溫度的連結。
        </p>

        {/* Social Icons & Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto">
          <button
            onClick={handleScrollToGrid}
            className="w-full sm:flex-1 flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 hover:shadow-cyan-500/30 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            尋找人才
            <Search className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>

          <button
            onClick={() => {
              onViewChange('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:flex-1 flex items-center justify-center px-7 py-4 rounded-xl text-base font-bold text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
          >
            <PlusCircle className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            登錄我的履歷
          </button>
        </div>

      </div>
    </section>
  );
}
