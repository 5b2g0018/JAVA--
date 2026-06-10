import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code, Briefcase, PlusCircle, ShieldCheck, LogOut, Palette, User, ChevronDown, Monitor } from 'lucide-react';

// 👑 接收 view, onViewChange, currentUser 參數，並新增 🌟 onOpenDeveloper
export default function Navbar({ view, onViewChange, currentUser, onOpenDeveloper }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 點擊暗號狀態
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // 🎨 下拉選單開關狀態與 Ref 偵測
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 主題狀態：增加了 'theme-light' 和 'theme-ocean'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hub-theme') || 'theme-slate';
  });

  // 主題選單資料陣列
  const themeOptions = [
    { id: 'theme-slate', label: '深邃星空', icon: '🌌' },
    { id: 'theme-emerald', label: '極光森林', icon: '🌲' },
    { id: 'theme-purple', label: '幻彩紫羅蘭', icon: '🔮' },
    { id: 'theme-light', label: '極簡明亮', icon: '☀️' },
    { id: 'theme-ocean', label: '蔚藍海岸', icon: '🏖️' }
  ];

  // 當主題改變時，同步切換 document.body 的 class
  useEffect(() => {
    document.body.classList.remove('theme-slate', 'theme-emerald', 'theme-purple', 'theme-light', 'theme-ocean');
    document.body.classList.add(theme);
    localStorage.setItem('hub-theme', theme);
  }, [theme]);

  // 監聽點擊外部事件來自動關閉主題下拉選單
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 取得當前主題的標籤物件
  const currentThemeObj = themeOptions.find(t => t.id === theme) || themeOptions[0];

  // 偵測網址是否含 ?admin=true
  useEffect(() => {
    const check = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminMode(true);
      }
    };
    check();
    window.addEventListener('popstate', check);
    return () => window.removeEventListener('popstate', check);
  }, []);

  const handleNavClick = (targetView) => {
    setIsOpen(false);
    onViewChange(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 暗號邏輯
  const handleLogoClick = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime > 1000) {
      setClickCount(1);
    } else {
      setClickCount(clickCount + 1);
      if (clickCount + 1 === 5) {
        setIsAdminMode((prev) => !prev);
        setClickCount(0);
        alert(`🤫 暗號成功！管理員模式已${!isAdminMode ? '開啟' : '關閉'}`);
      }
    }
    setLastClickTime(currentTime);
    handleNavClick('marketplace');
  };

  const handleAdminLogout = () => {
    setIsOpen(false);
    setIsAdminMode(false);
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, '', cleanUrl);
    onViewChange('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 原始所有導覽項目
  const navItems = [
    { key: 'marketplace', label: '人才市集', icon: Briefcase },
    { key: 'register', label: '登錄履歷', icon: PlusCircle },
  ];

  // 智慧過濾：根據當前的 view 狀態，自動剔除不需要顯示的按鈕
  const filteredNavItems = navItems.filter(({ key }) => {
    if (key === 'marketplace' && (view === 'marketplace' || view === 'profile')) return false;
    if (key === 'register' && view === 'register') return false;
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex items-center space-x-2 group cursor-pointer select-none"
            onClick={handleLogoClick}
            title="連續點擊 5 次開啟神祕通道"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 group-hover:scale-110 transition-transform duration-300">
              <Code size={20} className="stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-wider logo-text transition-colors duration-300">
              TalentHub
            </span>
          </div>

          {/* Desktop Nav (電腦版導覽列) */}
          <div className="hidden md:flex items-center space-x-2">

            {/* 🌟 智慧過濾主按鈕區 */}
            {filteredNavItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 nav-btn ${view === key || (key === 'marketplace' && view === 'profile') ? 'active' : ''
                  }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {(view === key || (key === 'marketplace' && view === 'profile')) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                )}
              </button>
            ))}

            {/* 🌟 新增：電腦版「開發者介紹」獨立按鈕 */}
            <button
              onClick={onOpenDeveloper}
              className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 text-cyan-400/90 border border-cyan-500/20 bg-cyan-500/5 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <Monitor size={16} />
              <span>開發者介紹</span>
            </button>

            {/* 🎨 主題切換下拉選單 */}
            <div className="relative inline-flex items-center gap-1.5 ml-2" ref={dropdownRef}>
              <Palette size={16} className="text-slate-400" />
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/80 text-xs font-medium text-slate-200 transition-all cursor-pointer focus:outline-none select-none"
              >
                <span>{currentThemeObj.label} {currentThemeObj.icon}</span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* 下拉選單浮磚本體 */}
              {isDropdownOpen && (
                <div className="absolute top-full left-5 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  {themeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setTheme(option.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${theme === option.id
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                        }`}
                    >
                      <span>{option.label}</span>
                      <span>{option.icon}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 後台管理 */}
            {isAdminMode && (
              <div className="flex items-center gap-1 ml-1 pl-2 border-l border-slate-800"
                style={{ animation: 'adminReveal 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 border ${view === 'admin'
                    ? 'text-rose-400 border-rose-500/40 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                    : 'text-slate-500 border-slate-800 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/5'
                    }`}
                >
                  <ShieldCheck size={16} />
                  <span>後台管理</span>
                </button>

                <button
                  onClick={handleAdminLogout}
                  title="登出管理員模式"
                  className="p-2 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-300 cursor-pointer"
                >
                  <LogOut size={15} />
                </button>
              </div>
            )}

            {/* 分隔微光線 */}
            <div className="h-4 w-[1px] bg-slate-800/80 mx-2" />

            {/* 👑 獨立出來的登入狀態按鈕 */}
            {!currentUser ? (
              <button
                onClick={() => handleNavClick('login')}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 border ${view === 'login'
                  ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'text-slate-300 border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                  }`}
              >
                <User size={16} />
                <span>會員登入 / 註冊</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer flex items-center space-x-1.5 border ${view === 'dashboard'
                  ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'text-emerald-400/80 border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-0.5" />
                <span>我的主控台</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Button (手機版漢堡排) */}
          <div className="flex items-center space-x-2 md:hidden">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 rounded-lg text-slate-400 hover:text-cyan-400">
              <Palette size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-slate-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (手機版抽屜) */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 glass-panel border-t border-slate-800/80 transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="px-4 py-4 space-y-2">
          {/* 手機版過濾按鈕 */}
          {filteredNavItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 text-slate-400"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}

          {/* 🌟 新增：手機版「開發者介紹」按鈕 */}
          <button
            onClick={() => {
              setIsOpen(false); // 點擊後順手關閉漢堡排抽屜
              onOpenDeveloper();
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 text-cyan-400 bg-cyan-500/5 border border-cyan-500/10"
          >
            <Monitor size={18} />
            <span>💻 開發者介紹</span>
          </button>

          {/* 手機版登入狀態 */}
          {!currentUser ? (
            <button
              onClick={() => handleNavClick('login')}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 text-slate-400 hover:text-emerald-400"
            >
              <User size={18} />
              <span>會員登入 / 註冊</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-2.5 text-emerald-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>我的主控台</span>
            </button>
          )}

          {/* 手機版主題切換 */}
          <button
            onClick={() => {
              const themeIds = themeOptions.map(t => t.id);
              const currentIndex = themeIds.indexOf(theme);
              const nextIndex = (currentIndex + 1) % themeIds.length;
              setTheme(themeIds[nextIndex]);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-400 flex items-center space-x-2.5"
          >
            <Palette size={18} />
            <span>切換主題 ({currentThemeObj.label} {currentThemeObj.icon})</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes adminReveal {
          from { opacity: 0; transform: scale(0.85) translateX(10px); }
          to   { opacity: 1; transform: scale(1)     translateX(0); }
        }
      `}</style>
    </nav>
  );
}