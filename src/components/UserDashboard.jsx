import React from 'react';
import {
    User, FileText, PlusCircle, CheckCircle2, Clock, LogOut,
    Briefcase, GraduationCap, Sparkles, Mail, DollarSign, Award, Edit3
} from 'lucide-react';

export default function UserDashboard({ currentUser, myProfile, onCreateResume, onLogout }) {
    const hasProfile = !!myProfile;
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
                    {hasProfile && <button onClick={onCreateResume} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 border border-slate-800 text-emerald-400"><Edit3 size={12} className="inline mr-1" />修改履歷</button>}
                </div>

                {!hasProfile ? (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-950/30 space-y-4">
                        <p className="text-slate-300 font-medium">您目前尚未在人才市集建立個人履歷</p>
                        <button onClick={onCreateResume} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm"><PlusCircle size={16} />立即填寫並發布簡歷</button>
                    </div>
                ) : (
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-4">
                        <div className={`p-4 rounded-xl border ${myProfile.isApproved ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-400'}`}>
                            {myProfile.isApproved ? '✓ 履歷狀態：已審核通過（市集展示中）' : '⏳ 履歷狀態：待審核中'}
                        </div>
                        <div className="space-y-2">
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