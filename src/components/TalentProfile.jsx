import React from 'react';
import { ArrowLeft, Mail, User } from 'lucide-react';
import Skills from './Skills';
import Portfolio from './Portfolio';

export default function TalentProfile({ talent, onBack }) {
  if (!talent) return null;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 lg:px-8 space-y-10">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
      >
        <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
        返回人才市集
      </button>

      {/* Hero Card */}
      <div className="glass-panel rounded-3xl border border-slate-800 bg-slate-900/20 p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
            {talent.avatar ? (
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <User size={48} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center sm:text-left space-y-3 flex-1">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-100">{talent.name}</h1>
              <p className="text-emerald-400 font-semibold mt-1">{talent.title}</p>
            </div>
            <p className="text-slate-400 font-light italic leading-relaxed">
              「{talent.motto}」
            </p>
            {talent.email && (
              <a
                href={`mailto:${talent.email}`}
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail size={14} />
                {talent.email}
              </a>
            )}
            {/* All skills as tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(talent.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-950/60 text-slate-300"
                >
                  {typeof skill === 'object' ? skill.name : skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {talent.skills && talent.skills.length > 0 && (
        <Skills
          skills={talent.skills.map(s => (typeof s === 'object' ? s.name : s))}
        />
      )}

      {/* Portfolio Section */}
      {talent.portfolio && talent.portfolio.length > 0 && (
        <Portfolio projects={talent.portfolio} />
      )}
    </div>
  );
}
