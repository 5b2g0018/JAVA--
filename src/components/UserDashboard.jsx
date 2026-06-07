import React, { useState, useEffect } from 'react';
import {
    User, FileText, PlusCircle, CheckCircle2, Clock, LogOut,
    Briefcase, GraduationCap, Sparkles, Mail, DollarSign, Award, Edit3, Trash2
} from 'lucide-react';

// 🌟 1. 在參數中除了 onEditResume 外，再加入 onDeleteResume
export default function UserDashboard({ currentUser, myProfile, onCreateResume, onEditResume, onDeleteResume, onLogout }) {
    const hasProfile = !!myProfile;

    // 🟢 自動感應在線狀態：只要使用者開著這個主控台，預設就是「在線上」
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        // 當組件載入（使用者看著網頁）時，自動判定為上線
        setIsOnline(true);

        return () => {
            // 當組件卸載（使用者切換頁面、登出、關閉網頁）時，自動判定為下線
            setIsOnline(false);
        };
    }, []);

    // ─── 刪除簡歷的確認視窗邏輯 ───
    const handleDeleteClick = () => {
        const confirmDelete = window.confirm(
            "⚠️ 確定要刪除您的個人簡歷嗎？\n此動作將完全清除您的履歷市集資料，且無法復原。"
        );
        if (confirmDelete) {
            // 如果點選確定，就執行上層傳進來的刪除邏輯
            onDeleteResume();
        }
    };

    return (
        <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 space-y-8 relative z-10">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase block mb-1">MEMBER DASHBOARD / 會員專區</span>
                    <h1 className="text-xl font-bold text-white">你好，<span className="text-emerald-400">{currentUser.email}</span> 👋</h1>
                </div>
                <button onClick={onLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-850 text-slate-400 hover:text-rose-400 transition-all"><LogOut size={14} />登出帳號</button>
            </div>

            <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-850 pb-4">
                    <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2"><FileText size={20} className="text-emerald-400" />我的專屬人才簡歷</h2>

                    {/* 🌟 按鈕功能群組 */}
                    {hasProfile && (
                        <div className="flex items-center gap-2">
                            {/* 修改履歷按鈕 */}
                            <button
                                onClick={onEditResume}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 border border-slate-800 text-emerald-400 hover:bg-slate-900 transition-all"
                            >
                                <Edit3 size={12} className="inline mr-1" />修改履歷
                            </button>

                            {/* 👑 這裡新增了「刪除簡歷」按鈕，使用精緻的微醺紅 (rose) 視覺特效 */}
                            <button
                                onClick={handleDeleteClick}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-slate-950 transition-all shadow-lg shadow-rose-500/5"
                            >
                                <Trash2 size={12} className="inline mr-1" />刪除簡歷
                            </button>
                        </div>
                    )}
                </div>

                {!hasProfile ? (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-950/30 space-y-4">
                        <p className="text-slate-300 font-medium">您目前尚未在人才市集建立個人履歷</p>
                        <button onClick={onCreateResume} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm"><PlusCircle size={16} />立即填寫並發布簡歷</button>
                    </div>
                ) : (
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-4">

                        {/* 全自動感知在線狀態區塊 */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-slate-900/50 border-slate-800">

                            {/* 左側：動態狀態與動態波浪呼吸燈 */}
                            <div className="flex items-center gap-2 text-sm">
                                {myProfile.isApproved ? (
                                    isOnline ? (
                                        <div className="flex items-center gap-3 text-emerald-400">
                                            {/* 🟢 在線動態呼吸綠燈特效 */}
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <span className="font-semibold">✓ 履歷狀態：在線上 <span className="text-xs text-emerald-500/80">( 市集展示中 )</span></span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 text-slate-500">
                                            {/* ⚫ 離線暗灰燈 */}
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
                        <div className="space-y-2 pt-2">
                            <h3 className="text-lg font-black text-white">{myProfile.name}</h3>
                            <p className="text-xs text-emerald-400 font-bold">{myProfile.title}</p>
                            <p className="text-xs text-slate-400 italic">「 {myProfile.motto} 」</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}