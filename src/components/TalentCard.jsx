import React from 'react';
import { User, Mail, Briefcase, Clock, DollarSign, ArrowRight } from 'lucide-react';

/* 👑 接收從 App.jsx 傳進來的 currentUser */
export default function TalentCard({ talent, currentUser, onViewProfile }) {
  const displaySkills = talent.skills ? talent.skills.slice(0, 3) : [];

  /* 👑 【正確邏輯修正】
     只有當「有使用者登入(currentUser存在)」且「登入者的 id 符合這張卡片的 id」時，
     才代表這個人才目前在線上，isOnline 才會是 true！ */
  const isOnline = currentUser && currentUser.id === talent.id;

  return (
    <div
      onClick={onViewProfile}
      className="group glass-panel rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/20 hover:bg-slate-900/50 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
    >
      {/* Top gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 flex flex-col h-full">
        {/* Avatar + Name Row */}
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0 group-hover:border-emerald-500/30 transition-colors duration-300">
            {talent.avatar ? (
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <User size={24} />
              </div>
            )}

            {/* 👑 【正確綠燈控制】只有在線 (isOnline === true) 時才渲染綠色閃爍點 */}
            {isOnline && (
              <span className="absolute bottom-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors duration-300 truncate">
              {talent.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{talent.title}</p>
          </div>
        </div>

        {/* Motto */}
        <p className="text-[11px] text-slate-500 leading-relaxed italic mt-3 line-clamp-2">
          「{talent.motto}」
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {talent.yearsOfExp !== undefined && (
            <div className="flex items-center gap-1.5 bg-slate-900/60 rounded-lg px-2.5 py-1.5">
              <Clock size={11} className="text-emerald-400 flex-shrink-0" />
              <span className="text-[10px] text-slate-400 font-medium">{talent.yearsOfExp} 年經驗</span>
            </div>
          )}
          {talent.expectedSalary && (
            <div className="flex items-center gap-1.5 bg-slate-900/60 rounded-lg px-2.5 py-1.5">
              <DollarSign size={11} className="text-cyan-400 flex-shrink-0" />
              <span className="text-[10px] text-slate-400 font-medium truncate">{talent.expectedSalary}</span>
            </div>
          )}
          {talent.email && (
            <div className="col-span-2 flex items-center gap-1.5 bg-slate-900/60 rounded-lg px-2.5 py-1.5">
              <Mail size={11} className="text-teal-400 flex-shrink-0" />
              <span className="text-[10px] text-slate-400 font-medium truncate">{talent.email}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-4 flex-grow">
          {displaySkills.map((skill, idx) => {
            const skillName = typeof skill === 'object' ? skill.name : skill;
            return (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-800 bg-slate-950/60 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-colors duration-300"
              >
                {skillName}
              </span>
            );
          })}
          {talent.skills && talent.skills.length > 3 && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border border-slate-800/40 bg-slate-900/40 text-slate-500">
              +{talent.skills.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Briefcase size={12} className="text-slate-600" />
            <span className="text-[10px] text-slate-600">
              {talent.portfolio ? `${talent.portfolio.length} 件作品` : '0 件作品'}
            </span>
          </div>
          <div className="flex items-center text-emerald-400 text-xs font-bold group-hover:text-emerald-300 transition-colors">
            查看完整履歷
            <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}