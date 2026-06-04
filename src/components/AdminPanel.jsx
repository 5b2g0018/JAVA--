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
  Eye,
  X,
  Mail,
  Briefcase,
  FolderGit2,
  Trash2 // 🌟 引入垃圾桶圖標用於刪除按鈕
} from 'lucide-react';

export default function AdminPanel({ talents, onApprove, onDelete, onBack }) {
  const [filter, setFilter] = useState('all');
  const [selectedTalent, setSelectedTalent] = useState(null);

  const pending = talents.filter(t => !t.isApproved);
  const approved = talents.filter(t => t.isApproved);

  const displayed =
    filter === 'pending'
      ? pending
      : filter === 'approved'
        ? approved
        : talents;

  return (
    /* 🛠️ pt-28 加高，完美避開固定在頂部的 Navbar 遮擋，讓返回按鈕正常顯示 */
    <div className="max-w-6xl mx-auto pt-28 pb-10 px-4 lg:px-8 space-y-10">

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
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${filter === tab.key
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
            className={`glass-panel rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all duration-300 ${talent.isApproved
              ? 'border-emerald-500/10 bg-slate-900/20'
              : 'border-amber-500/15 bg-amber-500/5'
              }`}
          >
            {/* 左側資料容器 */}
            <div className="flex items-center gap-4 w-full sm:w-auto min-w-0 flex-1">
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

              {/* Info 區塊 */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-base font-bold text-slate-100">{talent.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${talent.isApproved
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      }`}
                  >
                    {talent.isApproved ? '✓ 已批准' : '⏳ 待審核'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 block">{talent.title}</p>
                <p className="text-xs text-slate-600 block italic truncate max-w-md">「{talent.motto}」</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(talent.skills || []).slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-800 bg-slate-950/60 text-slate-400"
                    >
                      {typeof skill === 'object' ? skill.name : skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: 列表卡片右側的按鈕區塊 */}
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end border-t border-slate-800/50 sm:border-t-0 pt-3 sm:pt-0">
              <button
                type="button"
                onClick={() => setSelectedTalent(talent)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-750 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <Eye size={14} />
                <span>查看內容</span>
              </button>

              {!talent.isApproved ? (
                <>
                  <button
                    type="button"
                    onClick={() => onApprove(talent.id, true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer whitespace-nowrap"
                  >
                    <CheckCircle2 size={14} />
                    批准上架
                  </button>
                  {/* 🌟 待審核狀態加上的紅色「刪除履歷」按鈕 */}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`確定要永久刪除 ${talent.name} 的履歷嗎？`)) {
                        onDelete(talent.id);
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:text-rose-200 hover:shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Trash2 size={14} />
                    刪除履歷
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onApprove(talent.id, false)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <XCircle size={14} />
                  撤銷下架
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 詳情內容彈窗 (Modal) */}
      {selectedTalent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setSelectedTalent(null)} />

          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 text-slate-200 z-10 scrollbar-none">

            <button
              onClick={() => setSelectedTalent(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* 1. 個人基本頭部資料 */}
            <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                {selectedTalent.avatar ? (
                  <img src={selectedTalent.avatar} alt={selectedTalent.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <User size={28} />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{selectedTalent.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${selectedTalent.isApproved
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}
                  >
                    {selectedTalent.isApproved ? '已批准上架' : '待審核狀態'}
                  </span>
                </div>
                <p className="text-xs text-cyan-400 flex items-center gap-1.5 mt-1">
                  <Briefcase size={13} /> {selectedTalent.title}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Mail size={13} /> {selectedTalent.email || '未填寫 Email'}
                </p>
              </div>
            </div>

            {/* 2. 個人簡介 / 座右銘 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">座右銘 / 個人簡介</h4>
              <p className="text-sm bg-slate-950/50 p-4 rounded-xl border border-slate-850 italic text-slate-300 leading-relaxed">
                「 {selectedTalent.motto || '這傢伙很懶，什麼都沒寫。'} 」
              </p>
            </div>

            {/* 3. 所有技術專長 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">完整技術專長</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedTalent.skills && selectedTalent.skills.length > 0 ? (
                  selectedTalent.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-lg border border-slate-750">
                      {typeof skill === 'object' ? skill.name : skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-light">無選取專長標籤</span>
                )}
              </div>
            </div>

            {/* 4. 提交的作品集內容清單 */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FolderGit2 size={14} className="text-emerald-400" />
                提交的精選作品項目 ({selectedTalent.portfolio?.length || 0})
              </h4>
              <div className="space-y-3">
                {selectedTalent.portfolio && selectedTalent.portfolio.length > 0 ? (
                  selectedTalent.portfolio.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-850 bg-slate-950/30 space-y-2">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h5 className="text-sm font-bold text-white">
                          <span className="text-emerald-400 mr-1.5">#{idx + 1}</span>
                          {proj.title || '未命名作品'}
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {proj.tags && (Array.isArray(proj.tags) ? proj.tags : proj.tags.split(',')).map((t, i) => (
                            <span key={i} className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 rounded">
                              {typeof t === 'string' ? t.trim() : t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-light whitespace-pre-line">
                        {proj.description || '無作品細節描述說明。'}
                      </p>

                      {proj.image && (
                        <div className="mt-2 max-w-md rounded-lg overflow-hidden border border-slate-800">
                          <img src={proj.image} alt="專案作品截圖" className="w-full h-auto object-cover opacity-85" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center rounded-xl border border-slate-850 text-slate-500 text-xs font-light">
                    此用戶未填寫任何精選作品項目。
                  </div>
                )}
              </div>
            </div>

            {/* 5. 彈窗底部快捷操作列 */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedTalent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                關閉
              </button>

              {/* 🌟 彈窗(Modal) 內底部的操作組合 */}
              {!selectedTalent.isApproved ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`確定要永久刪除 ${selectedTalent.name} 的履歷嗎？`)) {
                        onDelete(selectedTalent.id);
                        setSelectedTalent(null);
                      }
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 transition-all cursor-pointer whitespace-nowrap"
                  >
                    永久刪除履歷
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApprove(selectedTalent.id, true);
                      setSelectedTalent(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    核准並直接上架
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onApprove(selectedTalent.id, false);
                    setSelectedTalent(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-400 shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  撤銷下架
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}