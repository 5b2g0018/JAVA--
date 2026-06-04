import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Briefcase, PlusCircle, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ view, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 偵測網址是否含 ?admin=true
  useEffect(() => {
    const check = () => {
      const params = new URLSearchParams(window.location.search);
      setIsAdminMode(params.get('admin') === 'true');
    };
    check();
    // 監聽 popstate（瀏覽器前進/後退）
    window.addEventListener('popstate', check);
    return () => window.removeEventListener('popstate', check);
  }, []);

  const handleNavClick = (targetView) => {
    setIsOpen(false);
    onViewChange(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 登出管理員：移除 ?admin=true，並回到市集
  const handleAdminLogout = () => {
    setIsOpen(false);
    setIsAdminMode(false);
    // 用 history.replaceState 把網址還原成不含參數的乾淨狀態
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, '', cleanUrl);
    onViewChange('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { key: 'marketplace', label: '人才市集', icon: Briefcase },
    { key: 'register',    label: '登錄履歷', icon: PlusCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => handleNavClick('marketplace')}
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 group-hover:scale-110 transition-transform duration-300">
              <Code size={20} className="stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-400 group-hover:to-cyan-400 transition-colors duration-300">
              TalentHub
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">

            {/* 一般導覽項目 */}
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 ${
                  view === key || (key === 'marketplace' && view === 'profile')
                    ? 'text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {(view === key || (key === 'marketplace' && view === 'profile')) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                )}
              </button>
            ))}

            {/* 後台管理 — 只有 ?admin=true 才出現，並有入場動畫 */}
            {isAdminMode && (
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-800"
                   style={{ animation: 'adminReveal 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 border ${
                    view === 'admin'
                      ? 'text-rose-400 border-rose-500/40 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                      : 'text-slate-500 border-slate-800 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/5'
                  }`}
                >
                  <ShieldCheck size={16} />
                  <span>後台管理</span>
                </button>

                {/* 登出管理員按鈕 */}
                <button
                  onClick={handleAdminLogout}
                  title="登出管理員模式"
                  className="p-2 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-300 cursor-pointer"
                >
                  <LogOut size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 glass-panel border-t border-slate-800/80 transition-all duration-300 origin-top ${
          isOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-2">

          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 cursor-pointer ${
                view === key || (key === 'marketplace' && view === 'profile')
                  ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-400 border-l-2 border-emerald-400 pl-3'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}

          {/* 手機版後台管理 — 同樣只在 admin mode 顯示 */}
          {isAdminMode && (
            <>
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 cursor-pointer ${
                  view === 'admin'
                    ? 'bg-gradient-to-r from-rose-500/10 to-orange-500/10 text-rose-400 border-l-2 border-rose-400 pl-3'
                    : 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/5'
                }`}
              >
                <ShieldCheck size={18} />
                <span>後台管理</span>
              </button>

              <button
                onClick={handleAdminLogout}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 cursor-pointer text-slate-600 hover:text-rose-400 hover:bg-rose-500/5"
              >
                <LogOut size={18} />
                <span>登出管理員模式</span>
              </button>
            </>
          )}

        </div>
      </div>

      {/* Admin 蹦出動畫 */}
      <style>{`
        @keyframes adminReveal {
          from { opacity: 0; transform: scale(0.85) translateX(10px); }
          to   { opacity: 1; transform: scale(1)    translateX(0); }
        }
      `}</style>
    </nav>
  );
}
