import React, { useState, useEffect } from 'react';
import {
    User, FileText, PlusCircle, Clock, LogOut,
    Briefcase, Mail, DollarSign, Edit3, Trash2, Download, Heart
} from 'lucide-react';
// 👑 引入我們精心打造的 TalentCard
import TalentCard from './TalentCard';

export default function UserDashboard({
    currentUser,
    myProfile,
    onCreateResume,
    onEditResume,
    onDeleteResume,
    onLogout,
    // 👑 新增擴充參數：所有人才列表、目前登入者的收藏 ID 陣列、切換收藏方法、打開履歷彈窗方法
    talents = [],
    favorites = [],
    onToggleFavorite,
    onViewProfile
}) {
    const hasProfile = !!myProfile;

    // 🟢 自動感應在線狀態
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        setIsOnline(true);
        return () => {
            setIsOnline(false);
        };
    }, []);

    // ─── 刪除簡歷的確認視窗邏輯 ───
    const handleDeleteClick = () => {
        const confirmDelete = window.confirm(
            "⚠️ 確定要刪除您的個人簡歷嗎？\n此動作將完全清除您的履歷市集資料，且無法復原。"
        );
        if (confirmDelete) {
            onDeleteResume();
        }
    };

    // ─── 👑 智慧型網頁直印 PDF 邏輯 ───
    const handleExportPDF = () => {
        if (!myProfile) return;
        // 瞬間拉起瀏覽器的列印視窗，搭配專屬 CSS 即可完美輸出
        window.print();
    };

    // ─── 👑 過濾出目前使用者收藏的人才名單 ───
    const favoriteTalents = talents.filter(talent => favorites.includes(talent.id));

    return (
        <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 space-y-8 relative z-10">

            {/* ================= 會員上方橫幅 ================= */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase block mb-1">MEMBER DASHBOARD / 會員專區</span>
                    <h1 className="text-xl font-bold text-white">你好，<span className="text-emerald-400">{currentUser.email}</span> 👋</h1>
                </div>
                <button onClick={onLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-850 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"><LogOut size={14} />登出帳號</button>
            </div>

            {/* ================= 履歷管理區塊 ================= */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6 print:border-none print:bg-white print:text-black">
                <div className="flex justify-between items-center border-b border-slate-850 pb-4 print:hidden">
                    <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2"><FileText size={20} className="text-emerald-400" />我的專屬人才簡歷</h2>

                    {/* 🌟 按鈕功能群組 */}
                    {hasProfile && (
                        <div className="flex items-center gap-2">
                            {/* 👑 匯出 PDF 按鈕 */}
                            <button
                                onClick={handleExportPDF}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 border border-slate-800 text-cyan-400 hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-1"
                                title="將此履歷匯出列印為 PDF"
                            >
                                <Download size={12} />匯出 PDF
                            </button>

                            {/* 修改履歷按鈕 */}
                            <button
                                onClick={onEditResume}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 border border-slate-800 text-emerald-400 hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-1"
                            >
                                <Edit3 size={12} />修改履歷
                            </button>

                            {/* 刪除簡歷按鈕 */}
                            <button
                                onClick={handleDeleteClick}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-slate-950 transition-all shadow-lg shadow-rose-500/5 cursor-pointer flex items-center gap-1"
                            >
                                <Trash2 size={12} />刪除簡歷
                            </button>
                        </div>
                    )}
                </div>

                {!hasProfile ? (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-950/30 space-y-4 print:hidden">
                        <p className="text-slate-300 font-medium">您目前尚未在人才市集建立個人履歷</p>
                        <button onClick={onCreateResume} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm cursor-pointer"><PlusCircle size={16} />立即填寫並發布簡歷</button>
                    </div>
                ) : (
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-4 print:bg-white print:border-none print:text-black">

                        {/* 全自動感知在線狀態區塊 */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-slate-900/50 border-slate-800 print:hidden">
                            {/* 左側：動態狀態與動態波浪呼吸燈 */}
                            <div className="flex items-center gap-2 text-sm">
                                {myProfile.isApproved ? (
                                    isOnline ? (
                                        <div className="flex items-center gap-3 text-emerald-400">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <span className="font-semibold">✓ 履歷狀態：在線上 <span className="text-xs text-emerald-500/80">( 市集展示中 )</span></span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <span className="h-2 w-2 rounded-full bg-slate-600"></span>
                                            <span>⏳ 履歷狀態：已下線 <span className="text-xs text-slate-500">( 市集已隱藏 )</span></span>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center gap-2 text-amber-400">
                                        <Clock size={16} />
                                        <span>⏳ 履歷狀態：待審核中</span>
                                    </div>
                                )}
                            </div>

                            {/* 右側：全自動提示文字小標籤 */}
                            {myProfile.isApproved && (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded border border-slate-800 text-slate-500 bg-slate-950/80">
                                    系統已自動啟用在線感應
                                </span>
                            )}
                        </div>

                        {/* 履歷資料展示 */}
                        <div className="space-y-3 pt-2">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div>
                                    <h3 className="text-2xl font-black text-white print:text-black">{myProfile.name}</h3>
                                    <p className="text-sm text-emerald-400 font-bold mt-1 print:text-emerald-600">{myProfile.title}</p>
                                    <p className="text-xs text-slate-400 italic mt-2 print:text-slate-600">「 {myProfile.motto} 」</p>
                                </div>

                                {/* 👑 列印時會自動派上用場的聯絡小資訊 */}
                                <div className="space-y-1.5 text-xs text-slate-400 print:text-slate-700">
                                    {myProfile.email && <div className="flex items-center gap-2"><Mail size={12} className="text-teal-400 print:text-slate-500" /> {myProfile.email}</div>}
                                    {myProfile.expectedSalary && <div className="flex items-center gap-2"><DollarSign size={12} className="text-cyan-400 print:text-slate-500" /> 期望薪資：{myProfile.expectedSalary}</div>}
                                    {myProfile.yearsOfExp !== undefined && <div className="flex items-center gap-2"><Briefcase size={12} className="text-emerald-400 print:text-slate-500" /> 專業經驗：{myProfile.yearsOfExp} 年</div>}
                                </div>
                            </div>

                            {/* 專業技能渲染 */}
                            {myProfile.skills && myProfile.skills.length > 0 && (
                                <div className="pt-4 border-t border-slate-900 print:border-slate-200">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 print:text-slate-500">專業核心技能 / Core Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {myProfile.skills.map((skill, idx) => {
                                            const name = typeof skill === 'object' ? skill.name : skill;
                                            return (
                                                <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-800 bg-slate-900/50 text-slate-300 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                                                    {name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ================= 👑 新增：我的收藏人才專區 (智慧連動) ================= */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6 print:hidden">
                <div className="border-b border-slate-850 pb-4">
                    <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        <Heart size={20} className="text-rose-500 fill-rose-500/20" />
                        我收藏的市集菁英 ({favoriteTalents.length})
                    </h2>
                </div>

                {favoriteTalents.length === 0 ? (
                    <div className="text-center py-10 rounded-2xl border border-dashed border-slate-800 bg-slate-950/20">
                        <p className="text-slate-500 text-xs">目前還沒有收藏任何人才，快去人才市集逛逛吧！</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favoriteTalents.map((talent) => (
                            <TalentCard
                                key={talent.id}
                                talent={talent}
                                currentUser={currentUser}
                                isFavorite={true} // 既然出現在這，絕對是已收藏狀態
                                onToggleFavorite={onToggleFavorite}
                                onViewProfile={onViewProfile}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}