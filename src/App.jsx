import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TalentCard from './components/TalentCard';
import TalentModal from './components/TalentModal';
import RegisterForm from './components/RegisterForm';
import TalentProfile from './components/TalentProfile';
import AdminPanel from './components/AdminPanel';
import AuthForm from './components/AuthForm';
import UserDashboard from './components/UserDashboard';

// 🌟 引入 Firebase 資料庫實例
import { db } from './firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

// ─── 8 間不同公司職缺訊息 (104 真實招募資料) ──────────────────────────
const MOCK_JOBS = [
  { id: "job_1", companyName: "智影顧問股份有限公司", title: "前端工程師 (React.js / TypeScript)", salary: "月薪 40,000 - 60,000 元", location: "台北市大安區", description: "主要協助 Web 及 Mobile-Web 前端功能開發、優化產品架構。技術棧涵蓋 React.js、JavaScript/TypeScript 與 CSS。負責 UI 實作並與設計師、後端夥伴密切協作，打造流暢的使用者介面。", applicants: [] },
  { id: "job_2", companyName: "奧丁丁集團 (歐簿客科技)", title: "【OwlPay】Senior Frontend Engineer / 資深前端工程師", salary: "待遇面議 (月薪 70,000 元以上)", location: "台北市北投區", description: "主導 OwlPay 區塊鏈與全球支付金融產品前端架構規劃與開發。深度優化前端載入效能，協助團隊建立可維護性、具擴充性的前端組件與程式碼，需具備多種前端程式語言綜合整合能力。", applicants: [] },
  { id: "job_3", companyName: "智穎智能股份有限公司 (Moldintel)", title: "Frontend Engineer 前端工程師 (AI SaaS 平台)", salary: "待遇面議 (依經驗彈性敘薪)", location: "桃園市桃園區", description: "與產品設計師、後端工程師密切合作，開發 Moldintel AI SaaS 智慧製造雲端平台前端應用。建構模具監控、大數據資料視覺化圖表與 AI 模型回饋等高度互動式界面。", applicants: [] },
  { id: "job_4", companyName: "公勝保險經紀人股份有限公司", title: "資訊部前端工程師 (Frontend Engineer)", salary: "月薪 33,000 元以上 (依實力調高)", location: "高雄市左營區", description: "與後端工程師、機器學習工程師和產品經理共同討論並提供技術建議，參與核心保險財顧資訊平台系統的架顧討論。負責保險 SaaS 系統落地實作、功能調校與介面開發。", applicants: [] },
  { id: "job_5", companyName: "星辰無限創智有限公司", title: "資深 UI/UX 設計師 (Senior UIUX Designer)", salary: "月薪 60,000 - 75,000 元", location: "台中市西屯區", description: "負責公司核心 Web 與 Mobile 產品的全流程 UI/UX 設計。包含前期需求釐清、使用者流程規劃 (User Flow)、線稿圖 (Wireframe) 製作、高擬真介面設計 (Figma) 以及設計規範交付與前端對接。", applicants: [] },
  { id: "job_6", companyName: "昕睿資訊股份有限公司", title: "UI/UX 設計師 (Figma / 原型設計)", salary: "月薪 38,000 - 55,000 元", location: "台北市松山區", description: "負責公司自有平台及客製化專案之 UI/UX 設計。使用 Figma 獨立製作 User Flow、Wireframe 及高動態 Prototype，建立標準設計系統元件庫，提供前端工程師精確的設計標註規範。", applicants: [] },
  { id: "job_7", companyName: "微碧愛普科技有限公司 (Weiby App)", title: "iOS App Developer 開發工程師 (Swift / UIKit)", salary: "月薪 50,000 - 60,000 元", location: "台中市西區", description: "負責餐飲智慧點餐生態系之原生 iOS App 設計、開發與日常維護。主要使用 Swift 語言進行核心邏輯優化，與後端 API 進行 RESTful 串接，考慮不同 iOS 系統版本相容性並提升操作體驗。", applicants: [] },
  { id: "job_8", companyName: "GaragePlay 車庫娛樂股份有限公司", title: "iOS App 開發工程師 (娛樂串流影音系統)", salary: "待遇面議 (依經驗核薪)", location: "台北市大同區", description: "負責車庫娛樂大型行動端應用程式、線上電影串流平台與電影票務系統的 iOS 原生 App 程式設計、架構開發與 App Store 上架維護。與 UI 設計師配合完成精緻動畫與介面流暢度。", applicants: [] }
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalTalent, setModalTalent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [subTab, setSubTab] = useState('talents');

  // ☁️ 雲端狀態
  const [users, setUsers] = useState([]);
  const [talents, setTalents] = useState([]);
  const [jobs, setJobs] = useState(MOCK_JOBS);

  // 🛠️ 填寫聯絡資料彈窗的控制狀態
  const [activeApplyJob, setActiveApplyJob] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // 🌟 新增狀態：控制「開發者介紹」全螢幕個人網站內嵌視窗的開關
  const [showDeveloper, setShowDeveloper] = useState(false);

  // 💖 核心功能：初始化收藏名單 (從 localStorage 讀取以防重新整理後消失)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('hub_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // 監聽收藏狀態變化，自動同步回本地快取
  useEffect(() => {
    localStorage.setItem('hub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 切換收藏狀態的方法
  const handleToggleFavorite = (talentId) => {
    setFavorites(prev =>
      prev.includes(talentId)
        ? prev.filter(id => id !== talentId)
        : [...prev, talentId]
    );
  };

  // 💾 1. 初始化記憶
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('hub_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem('hub_current_view');
    if (savedView) return savedView;
    const savedUser = localStorage.getItem('hub_current_user');
    return savedUser ? 'dashboard' : 'marketplace';
  });

  useEffect(() => {
    localStorage.setItem('hub_current_view', view);
  }, [view]);

  // 🚀 2. 初始化從 Firebase 撈取資料
  const initializeFirebaseData = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, "app_users"));
      const cloudUsers = [{ id: 'shadow_id', email: 'shadow@student.edu.tw', password: 'password123' }];
      userSnapshot.forEach((doc) => { cloudUsers.push({ id: doc.id, ...doc.data() }); });
      setUsers(cloudUsers);

      const talentSnapshot = await getDocs(collection(db, "resumes"));
      const cloudTalents = [];
      talentSnapshot.forEach((doc) => { cloudTalents.push({ id: doc.id, ...doc.data() }); });
      setTalents(cloudTalents);

      const jobSnapshot = await getDocs(collection(db, "jobs"));
      const cloudJobs = [];
      jobSnapshot.forEach((doc) => { cloudJobs.push({ id: doc.id, ...doc.data() }); });

      if (cloudJobs.length === 0) {
        for (let job of MOCK_JOBS) { await setDoc(doc(db, "jobs", job.id), job); }
        setJobs(MOCK_JOBS);
      } else {
        setJobs(cloudJobs);
      }
    } catch (error) {
      console.error("🔥 讀取同步失敗：", error);
    }
  };

  useEffect(() => {
    initializeFirebaseData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🚀 3. 【註冊功能同步上傳】
  const handleSetUsers = async (updatedUsers) => {
    try {
      const newUser = updatedUsers[updatedUsers.length - 1];
      if (newUser && newUser.email && newUser.email !== 'shadow@student.edu.tw') {
        await setDoc(doc(db, "app_users", newUser.email), {
          email: newUser.email,
          password: newUser.password,
          id: newUser.id
        });
      }
      setUsers(updatedUsers);
    } catch (e) {
      console.error("註冊帳號同步雲端失敗:", e);
    }
  };

  // 🚀 4. 【發布/修改履歷同步上傳】
  const handlePublish = async (newTalent) => {
    if (!currentUser || !currentUser.email) {
      alert('登入狀態異常，請重新登入！');
      setView('login');
      return;
    }
    const userEmail = String(currentUser.email);
    const documentId = userEmail.replace(/\./g, '_');
    const talent = {
      id: documentId,
      name: newTalent.name || '未命名用戶',
      title: newTalent.title || '未指定職稱',
      motto: newTalent.motto || '',
      avatar: newTalent.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      email: userEmail,
      yearsOfExp: Number(newTalent.yearsOfExp) || 0,
      expectedSalary: newTalent.expectedSalary || '',
      bio: newTalent.bio || '',
      experience: newTalent.experience || [],
      education: newTalent.education || [],
      skills: newTalent.skills || [],
      portfolio: newTalent.portfolio || [],
      isApproved: false
    };
    try {
      await setDoc(doc(db, "resumes", documentId), talent);
      setTalents(prev => {
        const exists = prev.some(t => t.id === documentId);
        if (exists) return prev.map(t => t.id === documentId ? talent : t);
        return [...prev, talent];
      });
      alert('🎉 履歷已成功發布！請等待管理員審核上架。');
      setTimeout(() => { setView('dashboard'); }, 300);
    } catch (error) {
      alert(`儲存至雲端失敗: ${error.message}`);
    }
  };

  // 🚀 5-A. 【點擊立即投遞：開啟填寫資料視窗】
  const handleOpenApplyModal = (job) => {
    if (!currentUser) {
      alert("請先登入會員再投遞職缺！");
      setView("login");
      return;
    }

    const hasApplied = job.applicants?.some(app =>
      (typeof app === 'string' && app === currentUser.email) ||
      (typeof app === 'object' && app.email === currentUser.email)
    );
    if (hasApplied) {
      alert("您已經投遞過這家公司囉！");
      return;
    }

    const myProfile = talents.find(t => t.email === currentUser.email);
    setContactName(myProfile ? myProfile.name : '');
    setContactEmail(currentUser.email);
    setContactPhone('');
    setActiveApplyJob(job);
  };

  // 🚀 5-B. 【彈出視窗內按下確認：正式送出到 Firebase】
  const handleConfirmSubmitApplication = async (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) {
      alert('請填寫姓名與聯絡信箱！');
      return;
    }

    try {
      const jobId = activeApplyJob.id;
      const targetJob = jobs.find(j => j.id === jobId);

      const applicationPack = {
        email: contactEmail.trim(),
        name: contactName.trim(),
        phone: contactPhone.trim() || '未提供電話',
        appliedAt: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
      };

      const updatedApplicants = [...(targetJob.applicants || []), applicationPack];

      await updateDoc(doc(db, "jobs", jobId), { applicants: updatedApplicants });
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicants: updatedApplicants } : j));

      alert(`🎉 投遞成功！您的聯絡資料已送出給 ${targetJob.companyName}。`);
      setActiveApplyJob(null);
    } catch (error) {
      console.error("投遞失敗：", error);
      alert("投遞發生錯誤，請稍後再試！");
    }
  };

  // 🚀 6. 【會員自行刪除簡歷】
  const handleUserDeleteResume = async () => {
    if (!currentUser || !currentUser.email) return;
    const documentId = currentUser.email.replace(/\./g, '_');
    try {
      await deleteDoc(doc(db, "resumes", documentId));
      setTalents(prev => prev.filter(t => t.id !== documentId));
      alert('🗑️ 您的個人簡歷已成功從雲端移除。');
    } catch (error) {
      console.error("刪除失敗:", error);
    }
  };

  // 🚀 7. 【後台管理員：切換審核狀態】
  const handleApproveToggle = async (id, approve) => {
    try {
      await updateDoc(doc(db, "resumes", id), { isApproved: approve });
      setTalents(prev => prev.map(t => (t.id === id ? { ...t, isApproved: approve } : t)));
    } catch (error) {
      console.error("審核變更失敗:", error);
    }
  };

  // 🚀 8. 【後台管理員：永久刪除履歷】
  const handleDeleteTalent = async (id) => {
    if (window.confirm('確定要從雲端資料庫永久刪除這位人才的履歷嗎？')) {
      try {
        await deleteDoc(doc(db, "resumes", id));
        setTalents(prev => prev.filter(t => t.id !== id));
        alert('已成功從雲端抹除該筆履歷。');
      } catch (error) {
        console.error("管理員刪除失敗:", error);
      }
    }
  };

  // 篩選功能
  const filteredTalents = talents.filter(t => {
    if (!t.isApproved) return false;
    const q = searchQuery.toLowerCase();
    const skill = skillFilter.toLowerCase();
    return (t.name?.toLowerCase().includes(q) || t.title?.toLowerCase().includes(q)) &&
      (skill ? t.skills?.some(s => s.toLowerCase().includes(skill)) : true);
  });

  const filteredJobs = jobs.filter(j => {
    const q = searchQuery.toLowerCase();
    return j.companyName?.toLowerCase().includes(q) || j.title?.toLowerCase().includes(q) || j.description?.toLowerCase().includes(q);
  });

  // 計算當前使用者的投遞紀錄
  const myApplications = jobs.filter(job =>
    job.applicants?.some(app =>
      (typeof app === 'string' && app === currentUser?.email) ||
      (typeof app === 'object' && app.email === currentUser?.email)
    )
  ).map(job => {
    const targetPack = job.applicants.find(app => (app.email || app) === currentUser?.email);
    return {
      id: job.id,
      title: job.title,
      companyName: job.companyName,
      appliedAt: targetPack?.appliedAt || "近期投遞"
    };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-55 bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar view={view} onViewChange={setView} currentUser={currentUser} onOpenDeveloper={() => setShowDeveloper(true)} />

        <main className="flex-grow p-4 lg:p-8 pt-24">

          {/* ── Marketplace 首頁 ── */}
          {view === 'marketplace' && (
            <>
              <Hero onViewChange={setView} currentUser={currentUser} />

              {/* 頁籤切換 */}
              <div className="flex justify-center gap-4 my-6">
                <button onClick={() => setSubTab('talents')} className={`px-8 py-3 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${subTab === 'talents' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20 scale-105' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}>
                  🔍 尋找人才
                </button>
                <button onClick={() => setSubTab('jobs')} className={`px-8 py-3 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${subTab === 'jobs' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20 scale-105' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}>
                  🏢 尋找職缺
                </button>
              </div>

              {/* 搜尋列 */}
              <div className="my-8 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto w-full px-2">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input type="text" placeholder={subTab === 'talents' ? "搜尋人才名稱或職稱…" : "搜尋公司名稱、職缺關鍵字…"} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500/60" />
                </div>
              </div>

              {/* 內容渲染 */}
              <div className="max-w-7xl mx-auto w-full">
                {subTab === 'talents' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTalents.map(t => (
                      /* 🌟 傳入收藏狀態控制與切換方法到 TalentCard 元件 */
                      <TalentCard
                        key={t.id}
                        talent={t}
                        currentUser={currentUser}
                        onViewProfile={() => setModalTalent(t)}
                        isFavorite={favorites.includes(t.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredJobs.map(job => {
                      const isApplied = job.applicants?.some(app => (typeof app === 'string' && app === currentUser?.email) || (typeof app === 'object' && app.email === currentUser?.email));
                      return (
                        <div key={job.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
                          <div>
                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-1">{job.title}</h3>
                            <p className="text-sm text-slate-400 mb-4">🏢 {job.companyName}</p>
                            <p className="text-sm text-slate-500 line-clamp-3 bg-slate-950/40 p-3 rounded-xl">{job.description}</p>
                          </div>
                          <div className="flex justify-between items-center pt-4 mt-auto border-t border-slate-800/60">
                            <span className="text-base font-bold text-emerald-400">{job.salary}</span>
                            <button
                              onClick={() => handleOpenApplyModal(job)}
                              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${isApplied ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white active:scale-95'}`}
                              disabled={isApplied}
                            >
                              {isApplied ? '✓ 已投遞' : '🚀 立即投遞'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── 其他頁面 ── */}
          {view === 'login' && <AuthForm users={users} setUsers={handleSetUsers} onLoginSuccess={(user) => { setCurrentUser(user); localStorage.setItem('hub_current_user', JSON.stringify(user)); setView('dashboard'); }} onCancel={() => setView('marketplace')} />}

          {view === 'dashboard' && currentUser && (
            <div className="max-w-4xl mx-auto w-full space-y-6">
              {/* 🌟 修改此處：將 favorites 相關狀態與所有人才陣列一併傳給 UserDashboard */}
              <UserDashboard
                currentUser={currentUser}
                myProfile={talents.find(t => t.email === currentUser.email) || null}
                talents={talents}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewChange={setView}
                onCreateResume={() => setView('register')}
                onEditResume={() => setView('register')}
                onDeleteResume={handleUserDeleteResume}
                onLogout={() => { setCurrentUser(null); localStorage.removeItem('hub_current_user'); setView('marketplace'); }}
              />

              {/* 求職紀錄歷史看板 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-lg font-bold mb-3">📋 求職追蹤（我的投遞紀錄）</h3>
                {myApplications.length === 0 ? (
                  <p className="text-sm text-slate-500 py-4 text-center">還沒有投遞紀錄，快去尋找職缺吧！</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {myApplications.map(app => (
                      <div key={app.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs text-slate-500">📅 {app.appliedAt}</span>
                        <h4 className="font-bold text-slate-200">{app.title}</h4>
                        <p className="text-sm text-slate-400">{app.companyName}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'register' && <RegisterForm onPublish={handlePublish} onCancel={() => setView(currentUser ? 'dashboard' : 'marketplace')} initialData={talents.find(t => t.email === currentUser?.email) || null} />}
          {view === 'profile' && selectedTalent && <TalentProfile talent={selectedTalent} onBack={() => setView('marketplace')} />}
          {view === 'admin' && <AdminPanel talents={talents} onApprove={handleApproveToggle} onDelete={handleDeleteTalent} onBack={() => setView('marketplace')} />}
        </main>
        <Footer />
      </div>

      {/* ── 👤 人才詳細彈窗 ── */}
      {modalTalent && <TalentModal talent={modalTalent} onClose={() => setModalTalent(null)} />}

      {/* ── 🏢 📥 填寫聯絡資料投遞彈窗 (Apply Form Modal) ── */}
      {activeApplyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">JOB APPLICATION</span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">確認投遞資料</h3>
              </div>
              <button
                onClick={() => setActiveApplyJob(null)}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/60 mb-5">
              <p className="text-xs text-slate-500">您即將應徵：</p>
              <h4 className="font-bold text-cyan-400 text-base">{activeApplyJob.title}</h4>
              <p className="text-sm text-slate-400">🏢 {activeApplyJob.companyName}</p>
            </div>

            <form onSubmit={handleConfirmSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">聯絡姓名 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="請輸入您的真實姓名或稱呼"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">聯絡電子信箱 <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">聯絡電話 <span className="text-slate-500">(選填)</span></label>
                <input
                  type="tel"
                  placeholder="例：0912345678"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveApplyJob(null)}
                  className="flex-1 py-3 text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-750 rounded-xl transition-all"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl shadow-lg shadow-cyan-500/10 active:scale-95 transition-all"
                >
                  確認送出投遞
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 💻 📥 全新加入：開發者個人網站內嵌滿版彈窗 (Iframe Modal) ── */}
      {showDeveloper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full h-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">

            {/* 視窗頂部控制列 */}
            <div className="flex justify-between items-center px-6 py-4 bg-slate-950 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
                </div>
                <span className="text-sm font-semibold text-slate-400 tracking-wider hidden sm:inline ml-2">
                  DEVELOPER PORTFOLIO
                </span>
              </div>

              <button
                onClick={() => setShowDeveloper(false)}
                className="text-slate-400 hover:text-white transition-colors px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold flex items-center gap-1"
              >
                ✕ 關閉視窗
              </button>
            </div>

            {/* Iframe 滿版加載區塊 */}
            <div className="flex-grow w-full h-full bg-black relative">
              <iframe
                src="https://5b2g0018.github.io/5b2g0018/"
                title="Developer Portfolio"
                className="w-full h-full border-none"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}