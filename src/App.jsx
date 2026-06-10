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

// 🌟 核心步驟：引入你建立的 Firebase 資料庫實例
import { db } from './firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

// ─── Rich Mock Data (當雲端完全沒有任何資料時，自動初始化進雲端) ───────────────────────────────
const MOCK_TALENTS = [
  {
    id: "mock_1",
    name: '陳毛豆',
    title: '前端工程師 / 社群企劃',
    motto: '熱愛學習新技術，用程式解決生活中的大小事。',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    email: 'huang@example.com',
    yearsOfExp: 2,
    expectedSalary: '月薪 45,000–60,000',
    bio: '我是一名充滿熱情的前端工程師，專注於打造精緻且使用者友好的數位體驗。擅長將設計稿轉化為高品質 React 應用程式，並結合 Tailwind CSS 打造現代化 UI。對 AI 工具及提示詞工程有深入研究，善用大型語言模型提升開發效率。目前積極尋求能發揮創意、推動產品創新的工作機會。',
    experience: [
      { role: '前端工程師實習生', company: '雲端科技股份有限公司', period: '2024.07 – 2025.01' },
      { role: '社群媒體企劃', company: '自由接案', period: '2023.03 – 至今' },
    ],
    education: [{ degree: '資訊工程學系', school: '國立中央大學', year: '2021 – 2025' }],
    skills: ['React', 'Tailwind CSS', 'Python', 'AI 溝通 / 提示詞工程'],
    portfolio: [
      {
        title: 'AI 智慧記帳本',
        description: '用 React 開發的個人理財工具，支援語音記帳與 AI 自動分類消費項目，並生成精美圖表分析收支。',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'OpenAI API', 'Tailwind CSS', 'LocalStorage'],
      },
    ],
    isApproved: true,
  },
  {
    id: "mock_2",
    name: '李季',
    title: '全端工程師 / DevOps',
    motto: '從前端到後端，我熱愛每一行程式碼帶來的可能性。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'li@example.com',
    yearsOfExp: 5,
    expectedSalary: '月薪 70,000–90,000',
    bio: '擁有 5 年全端開發經驗，專精 Node.js 後端 API 設計與 React 前端架構。對 CI/CD 流程與雲端部署（AWS, GCP）有豐富實戰經驗。善於溝通，具備帶領小型開發團隊的能力，並熱愛運用 AI 工具加速產品迭代。目前尋求能挑戰技術深度並參與開源貢獻的機會。',
    experience: [
      { role: '全端工程師', company: '數位浪潮科技', period: '2022.08 – 至今' },
    ],
    education: [{ degree: '電機工程學系', school: '國立台灣大學', year: '2016 – 2020' }],
    skills: ['Node.js', 'React', 'TypeScript', 'Docker', 'AWS'],
    portfolio: [
      {
        title: '微服務訂單管理系統',
        description: '為電商平台設計的微服務架顧後端，具備高可用負載均衡、訊息佇列與自動擴縮容能力。',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        tags: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
      },
    ],
    isApproved: true,
  }
];

// ─── App Component ───────────────────────────────────────────────────────────
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalTalent, setModalTalent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  // ☁️ 雲端狀態：使用者帳號、人才履歷清單
  const [users, setUsers] = useState([]);
  const [talents, setTalents] = useState([]);

  // 💾 1. 初始化記憶：目前登入的用戶、上次停留在哪一個畫面
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

  // 每當 view 切換時，自動同步把最新畫面存在瀏覽器
  useEffect(() => {
    localStorage.setItem('hub_current_view', view);
  }, [view]);

  // 🚀 2. 一開網頁或切換頁面，去 Firebase 雲端把「註冊帳號」和「履歷資料」撈下來
  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        // --- 撈取帳號資料 ---
        const userSnapshot = await getDocs(collection(db, "app_users"));
        const cloudUsers = [];
        // 預設內建的測試帳號
        cloudUsers.push({ id: 'shadow_id', email: 'shadow@student.edu.tw', password: 'password123' });
        userSnapshot.forEach((doc) => {
          cloudUsers.push({ id: doc.id, ...doc.data() });
        });
        setUsers(cloudUsers);

        // --- 撈取人才履歷資料 ---
        const talentSnapshot = await getDocs(collection(db, "resumes"));
        const cloudTalents = [];
        talentSnapshot.forEach((doc) => {
          cloudTalents.push({ id: doc.id, ...doc.data() });
        });

        // 如果雲端空空如也，自動把 Mock Data 塞進雲端當初始值
        if (cloudTalents.length === 0) {
          for (let talent of MOCK_TALENTS) {
            await setDoc(doc(db, "resumes", talent.id), talent);
          }
          setTalents(MOCK_TALENTS);
        } else {
          setTalents(cloudTalents);
        }
      } catch (error) {
        console.error("讀取 Firebase 失敗，請確認是否選取『測試模式』並已點擊規則發布：", error);
      }
    };

    fetchDataFromFirebase();
  }, [view]);

  // Scroll progress 監聽
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🚀 3. 【註冊功能同步上傳】當有新用戶在 AuthForm 註冊時，同步上傳 Firebase
  const handleSetUsers = async (updatedUsers) => {
    try {
      const newUser = updatedUsers[updatedUsers.length - 1];
      if (newUser && newUser.email && newUser.email !== 'shadow@student.edu.tw') {
        // 以 email 作為雲端文件的 ID，把帳號密碼存上去
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

  // 🚀 4. 【發布/修改履歷同步上傳】（強壯安全修正版：徹底防止 undefined 或狀態未就緒導致死機）
  const handlePublish = async (newTalent) => {
    // 🔍 防禦 1：確保使用者處於正常的登入狀態
    if (!currentUser || !currentUser.email) {
      alert('登入狀態異常或已逾時，請重新登入後再發布履歷！');
      setView('login');
      return;
    }

    const userEmail = String(currentUser.email);
    const documentId = userEmail.replace(/\./g, '_');

    // 🔍 防禦 2：嚴格確保所有物件欄位都有預設值，絕對不丟 undefined 給 Firebase
    const talent = {
      id: documentId,
      name: newTalent.name || '未命名用戶',
      title: newTalent.title || '未指定職稱',
      motto: newTalent.motto || '',
      avatar: newTalent.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      email: userEmail,
      yearsOfExp: Number(newTalent.yearsOfExp) || 0,
      expectedSalary: newTalent.expectedSalary || '',
      bio: newTalent.bio || '',
      experience: newTalent.experience || [],
      education: newTalent.education || [],
      skills: newTalent.skills || [],
      portfolio: newTalent.portfolio || [],
      isApproved: false // 每次修改或新發布，重新送交管理員審核
    };

    try {
      console.log("正在嘗試發布資料至 Firebase，文件ID:", documentId, talent);

      // 指定 ID 寫入雲端 Firestore
      await setDoc(doc(db, "resumes", documentId), talent);

      // 先同步更新 React 當地狀態，防止切換頁面時畫面不同步
      setTalents(prev => {
        const exists = prev.some(t => t.id === documentId);
        if (exists) return prev.map(t => t.id === documentId ? talent : t);
        return [...prev, talent];
      });

      alert('🎉 履歷已成功發布/同步至雲端資料庫！請等待管理員進行上架審核。');

      // 給予 Firebase 300 毫秒的背景寫入緩衝時間，再優雅跳轉
      setTimeout(() => {
        setView('dashboard');
      }, 300);

    } catch (error) {
      console.error("🔥 Firebase 寫入失敗原因:", error);
      alert(`儲存至雲端失敗！錯誤資訊: ${error.message}。請檢查 Firebase 安全性規則！`);
    }
  };

  // 🚀 5. 【會員自行刪除簡歷】
  const handleUserDeleteResume = async () => {
    if (!currentUser || !currentUser.email) return;
    const documentId = currentUser.email.replace(/\./g, '_');

    try {
      await deleteDoc(doc(db, "resumes", documentId));
      setTalents(prev => prev.filter(t => t.id !== documentId));
      alert('🗑️ 您的個人簡歷已成功從雲端資料庫移除，並從人才市集下架。');
    } catch (error) {
      console.error("刪除失敗:", error);
    }
  };

  // 🚀 6. 【後台管理員：切換審核狀態】
  const handleApproveToggle = async (id, approve) => {
    try {
      await updateDoc(doc(db, "resumes", id), { isApproved: approve });
      setTalents(prev =>
        prev.map(t => (t.id === id ? { ...t, isApproved: approve } : t))
      );
    } catch (error) {
      console.error("審核變更失敗:", error);
    }
  };

  // 🚀 7. 【後台管理員：永久刪除履歷】
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

  const handleViewTalent = (talent) => {
    setSelectedTalent(talent);
    setView('profile');
  };

  // 篩選功能 (首頁市集僅顯示審核通過 isApproved === true 的人才)
  const filteredTalents = talents.filter(t => {
    if (!t.isApproved) return false;
    const q = searchQuery.toLowerCase();
    const skill = skillFilter.toLowerCase();
    const matchesQuery = t.name?.toLowerCase().includes(q) || t.title?.toLowerCase().includes(q);
    const matchesSkill = skill ? t.skills?.some(s => s.toLowerCase().includes(skill)) : true;
    return matchesQuery && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-55 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[180px] animate-pulse-slow-reverse" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar view={view} onViewChange={setView} currentUser={currentUser} />

        <main className="flex-grow p-4 lg:p-8 pt-24">

          {/* ── Marketplace 首頁 ── */}
          {view === 'marketplace' && (
            <>
              <Hero onViewChange={setView} currentUser={currentUser} />

              {/* Search / Filter Bar */}
              <div className="my-8 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto w-full px-2">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input
                    type="text"
                    placeholder="搜尋人才名稱或職稱…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
                <div className="relative flex-1 w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🏷️</span>
                  <input
                    type="text"
                    placeholder="過濾技能（如 React、Python…）"
                    value={skillFilter}
                    onChange={e => setSkillFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Talent Grid */}
              <div id="marketplace-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
                {filteredTalents.map(t => (
                  <TalentCard
                    key={t.id}
                    talent={t}
                    currentUser={currentUser}
                    onViewProfile={() => setModalTalent(t)}
                  />
                ))}
                {filteredTalents.length === 0 && (
                  <p className="text-center col-span-full text-slate-500 py-20">
                    😕 目前無符合條件的人才。
                  </p>
                )}
              </div>
            </>
          )}

          {/* ── 登入/註冊頁面 ── */}
          {view === 'login' && (
            <AuthForm
              users={users}
              setUsers={handleSetUsers}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                localStorage.setItem('hub_current_user', JSON.stringify(user));
                setView('dashboard');
              }}
              onCancel={() => setView('marketplace')}
            />
          )}

          {/* ── 個人會員主控台 ── */}
          {view === 'dashboard' && currentUser && (
            <UserDashboard
              currentUser={currentUser}
              myProfile={talents.find(t => t.email === currentUser.email) || null}
              onCreateResume={() => setView('register')}
              onEditResume={() => setView('register')}
              onDeleteResume={handleUserDeleteResume}
              onLogout={() => {
                setCurrentUser(null);
                localStorage.removeItem('hub_current_user');
                localStorage.removeItem('hub_current_view');
                setView('marketplace');
              }}
            />
          )}

          {/* ── 填寫與修改履歷表單 ── */}
          {view === 'register' && (
            <RegisterForm
              onPublish={handlePublish}
              onCancel={() => setView(currentUser ? 'dashboard' : 'marketplace')}
              initialData={talents.find(t => t.email === currentUser?.email) || null}
            />
          )}

          {/* ── 詳細資料獨立分頁 ── */}
          {view === 'profile' && selectedTalent && (
            <TalentProfile talent={selectedTalent} onBack={() => setView('marketplace')} />
          )}

          {/* ── 後台審核管理面板 ── */}
          {view === 'admin' && (
            <AdminPanel
              talents={talents}
              onApprove={handleApproveToggle}
              onDelete={handleDeleteTalent}
              onBack={() => setView('marketplace')}
            />
          )}
        </main>
        <Footer />
      </div>

      {/* ── Talent Detail Modal 彈出視窗 ── */}
      {modalTalent && (
        <TalentModal talent={modalTalent} onClose={() => setModalTalent(null)} />
      )}
    </div>
  );
}