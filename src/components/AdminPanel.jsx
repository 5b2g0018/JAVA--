import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Users,
  AlertTriangle,
  User,
} from 'lucide-react';

export default function AdminPanel({ talents, onApprove, onBack }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'approved'

  const pending = talents.filter(t => !t.isApproved);
  const approved = talents.filter(t => t.isApproved);

  const displayed =
    filter === 'pending'
      ? pending
      : filter === 'approved'
      ? approved
      : talents;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group mb-4"
          >
            <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            返回人才市集
          </button>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-rose-500/30">
              <ShieldCheck size={22} className="text-rose-400" />
            </div>
            後台管理員審核面板
          </h1>
          <p className="text-slate-500 text-sm font-light mt-1">
            審核用戶提交的履歷，批准後才會顯示於人才市集。
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3">
          <div className="glass-panel rounded-2xl border border-slate-800 px-5 py-3 text-center">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <Users size={14} /> 全部
            </div>
            <div className="text-2xl font-black text-slate-100 mt-1">{talents.length}</div>
          </div>
          <div className="glass-panel rounded-2xl border border-emerald-500/20 px-5 py-3 text-center">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 size={14} /> 已批准
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{approved.length}</div>
          </div>
          <div className="glass-panel rounded-2xl border border-amber-500/20 px-5 py-3 text-center">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Clock size={14} /> 待審核
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">{pending.length}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-1">
        {[
          { key: 'all', label: '全部', count: talents.length },
          { key: 'pending', label: '待審核', count: pending.length },
          { key: 'approved', label: '已批准', count: approved.length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${
              filter === tab.key
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {displayed.length === 0 && (
        <div className="glass-panel rounded-3xl border border-slate-800 p-16 text-center">
          <AlertTriangle size={40} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 font-light">目前此分類無任何資料。</p>
        </div>
      )}

      {/* Talent List */}
      <div className="space-y-4">
        {displayed.map(talent => (
          <div
            key={talent.id}
            className={`glass-panel rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-300 ${
              talent.isApproved
                ? 'border-emerald-500/10 bg-slate-900/20'
                : 'border-amber-500/15 bg-amber-500/5'
            }`}
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
              {talent.avatar ? (
                <img src={talent.avatar} alt={talent.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <User size={24} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="text-base font-bold text-slate-100">{talent.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    talent.isApproved
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}
                >
                  {talent.isApproved ? '✓ 已批准' : '⏳ 待審核'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{talent.title}</p>
              <p className="text-xs text-slate-600 mt-0.5 italic truncate">「{talent.motto}」</p>
              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(talent.skills || []).slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-800 bg-slate-950/60 text-slate-500"
                  >
                    {typeof skill === 'object' ? skill.name : skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!talent.isApproved ? (
                <button
                  onClick={() => onApprove(talent.id, true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  批准上架
                </button>
              ) : (
                <button
                  onClick={() => onApprove(talent.id, false)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-all cursor-pointer"
                >
                  <XCircle size={14} />
                  撤銷下架
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
