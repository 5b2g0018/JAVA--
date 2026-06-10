import React from 'react';
import { Download, Heart, User, Briefcase, Calendar, Mail, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard({ currentUser, talents, favorites, toggleFavorite, onViewChange }) {

    // 篩選出目前被登入會員收藏的人才資料
    const myFavoriteTalents = talents ? talents.filter(t => favorites.includes(t.id)) : [];

    // 🌟 PDF 匯出魔法：利用 CSS 列印模式優化，產出不跑版、文字可選取的完美 PDF
    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-28 min-h-screen">

            {/* 🚀 頂部標題區 */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-wide mb-2">我的主控台</h1>
                    <p className="text-slate-400 text-sm">歡迎回來，管理您的個人履歷檔案與收藏的專家名單。</p>
                </div>

                {/* 🌟 匯出 PDF 按鈕 */}
                <button
                    onClick={handleExportPDF}
                    className="self-start md:self-auto px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(6,182,212,0.25)] flex items-center gap-2 cursor-pointer"
                >
                    <Download size={16} className="stroke-[2.5]" />
                    匯出精美履歷 PDF
                </button>
            </div>

            {/* 📊 數據統計快顯卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <FileText size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">履歷填寫進度</p>
                        <p className="text-xl font-bold text-white mt-0.5">100% <span className="text-xs text-emerald-400 font-normal">已開放在市集</span></p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Briefcase size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">被企業瀏覽次數</p>
                        <p className="text-xl font-bold text-white mt-0.5">48 次 <span className="text-xs text-cyan-400 font-normal">+12% 本週</span></p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                        <Heart size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">獲得愛心收藏</p>
                        <p className="text-xl font-bold text-white mt-0.5">7 次 <span className="text-xs text-slate-400 font-normal">人氣爆發中</span></p>
                    </div>
                </div>
            </div>

            {/* 網格版面 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ================= 📝 左側：我的線上履歷 A4 質感預覽區 ================= */}
                <div className="lg:col-span-2">
                    <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden h-full">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                            <User size={18} className="text-emerald-400" />
                            個人履歷檔案
                        </h2>

                        {/* 🖨️ 列印核心範圍 (print-area) */}
                        <div className="print-area p-8 rounded-xl bg-slate-950/40 border border-slate-800/40 text-slate-300 space-y-6 relative">
                            {/* 右上角浮水印裝飾 */}
                            <div className="absolute top-6 right-8 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 print:hidden">
                                <CheckCircle size={12} /> Verified Member
                            </div>

                            {/* 履歷頭部 */}
                            <div className="border-b border-slate-800/80 pb-5">
                                <h3 className="text-2xl font-bold text-white tracking-wide">{currentUser?.name || "傑出工程師"}</h3>
                                <p className="text-emerald-400 font-semibold mt-1.5 text-sm">Full-Stack Web Developer / 全端網頁開發工程師</p>
                                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><Mail size={13} /> {currentUser?.email || "developer@talenthub.com"}</span>
                                    <span className="flex items-center gap-1"><Calendar size={13} /> 經驗: 3 - 5 年</span>
                                </div>
                            </div>

                            {/* 專業技能標籤 */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Professional Skills / 專業技能</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Next.js', 'RESTful API'].map(skill => (
                                        <span key={skill} className="px-3 py-1 text-xs rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-300 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 個人簡介 */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">About Me / 自我介紹</h4>
                                <p className="text-sm text-slate-400 leading-relaxed tracking-wide">
                                    熱愛打造極致使用者體驗與高效能網頁應用的前端開發者。具豐富的 React 生態系建構經驗，善於整合精美 UI 視覺特效與彈性的前端資料狀態流。對技術充滿熱忱，具備良好的跨團隊溝通與敏捷開發能力。
                                </p>
                            </div>

                            {/* 工作經歷 Mock 範例 */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Experience / 工作經歷</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="border-l-2 border-emerald-500/40 pl-3">
                                        <div className="flex justify-between font-semibold text-slate-200 text-xs md:text-sm">
                                            <span>數位科技股份有限公司 · 高級前端工程師</span>
                                            <span className="text-slate-500 text-xs">2024 - 至今</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">主導企業級 B2B 系統前端架構重構，使網頁初次載入速度提升 40%。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= 💖 右側：我收藏的人才專家名單 ================= */}
                <div>
                    <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 h-full flex flex-col">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                            <Heart size={18} className="text-rose-400 fill-rose-400/20" />
                            我收藏的人才 ({myFavoriteTalents.length})
                        </h2>

                        {myFavoriteTalents.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                                <Heart size={32} className="text-slate-700 mb-3" />
                                <p className="text-slate-500 text-sm mb-4">目前您的收藏庫空空如也</p>
                                <button
                                    onClick={() => onViewChange('marketplace')}
                                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
                                >
                                    前往人才市集探索 ➔
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[480px] pr-1">
                                {myFavoriteTalents.map(talent => (
                                    <div
                                        key={talent.id}
                                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/60 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                                                {talent.name ? talent.name[0] : "T"}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{talent.name}</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">{talent.title || '網頁工程師專家'}</p>
                                            </div>
                                        </div>

                                        {/* 一鍵取消收藏 */}
                                        <button
                                            onClick={() => toggleFavorite(talent.id)}
                                            title="取消收藏"
                                            className="p-2 text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
                                        >
                                            <Heart size={15} className="fill-rose-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* 🌟 專用 A4 高清列印樣式 (不影響原本華麗的深色網頁視覺) */}
            <style>{`
        @media print {
          /* 隱藏一切不需要列印的雜物 */
          nav, button, footer, .mb-10, .grid-cols-1.md\\:grid-cols-3, h2, .lg\\:col-span-1 {
            display: none !important;
          }
          /* 頁面邊距重設 */
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          /* 將黑底的卡片完美漂白，變成高級的紙本排版 */
          .print-area {
            background: transparent !important;
            border: none !important;
            color: #222222 !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          .print-area h3 {
            color: #000000 !important;
            font-size: 26px !important;
          }
          .print-area h4 {
            color: #333333 !important;
            border-bottom: 1px solid #ddd !important;
            padding-bottom: 4px !important;
            margin-top: 20px !important;
          }
          .print-area p {
            color: #444444 !important;
          }
          /* 讓技能標籤變成淡灰色外框精美字塊 */
          .print-area span {
            background: #f3f4f6 !important;
            color: #1f2937 !important;
            border: 1px solid #e5e7eb !important;
            padding: 2px 8px !important;
            border-radius: 4px !important;
          }
        }
      `}</style>
        </div>
    );
}