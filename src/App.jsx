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
        description: '為電商平台設計的微服務架構後端，具備高可用負載均衡、訊息佇列與自動擴縮容能力。',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        tags: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
      },
    ],
    isApproved: true,
  },
  {
    id: "mock_3",
    name: '林佳瑩',
    title: 'UI/UX 設計師 / 產品企劃',
    motto: '用設計拉近科技與人的距離，打造直覺而優雅的體驗。',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'lin@example.com',
    yearsOfExp: 3,
    expectedSalary: '月薪 50,000–65,000',
    bio: '專注於使用者經驗研究與介面設計設計，擅長從用戶痛點出發，轉化為具備商業價值的產品線稿與高保真原型。精通 Figma 元件庫與設計系統架設，能與前端工程師高效對接。曾主導多款百萬下載級 App 的 UI 改版優化。',
    experience: [
      { role: '資深 UI/UX 設計師', company: '酷玩數位娛樂', period: '2023.05 – 至今' },
      { role: '介面設計師', company: '創思科技創新', period: '2021.09 – 2023.04' },
    ],
    education: [{ degree: '商業設計學系', school: '國立台灣科技大學', year: '2017 – 2021' }],
    skills: ['Figma', 'Prototyping', 'User Research', 'Design System'],
    portfolio: [
      {
        title: '智慧旅遊 App 規劃案',
        description: '全面重新梳理自由行旅客的排行程痛點，透過直覺的拖拉介面與 AI 景點推薦，縮短 40% 的行程規劃時間。',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        tags: ['Figma', 'UI Design', 'UX Research', 'Prototype'],
      },
    ],
    isApproved: true,
  },
  {
    id: "mock_4",
    name: '王大明',
    title: '資料科學家 / Python 後端工程師',
    motto: '數據隱藏著世界的秘密，而我是解密的人。',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'wang@example.com',
    yearsOfExp: 4,
    expectedSalary: '月薪 65,000–85,000',
    bio: '具備大數據處理與統計建模背景，擅長使用 Python 進行資料庫挖掘、機器學習模型訓練與自動化爬蟲開發。熟悉 Django 及 FastAPI 框架，能快速建立高併發的資料分析 API。',
    experience: [
      { role: '資料分析師', company: '未來大數據股份有限公司', period: '2022.02 – 至今' },
    ],
    education: [{ degree: '統計學研究所', school: '國立成功大學', year: '2019 – 2021' }],
    skills: ['Python', 'SQL', 'FastAPI', 'Pandas', 'Machine Learning'],
    portfolio: [
      {
        title: '電商平台推薦流量預測系統',
        description: '基於機器學習演算法建構用戶行為模型，成功將商品推薦點擊率（CTR）提升了 18.5%。',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        tags: ['Python', 'Scikit-Learn', 'MySQL', 'Flask'],
      },
    ],
    isApproved: true,
  },
  {
    id: "job_5",
    name: '張家豪',
    title: 'iOS App 開發工程師',
    motto: '寫出好程式是藝術，讓 App 動作順暢是我的偏執。',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    email: 'chang@example.com',
    yearsOfExp: 3,
    expectedSalary: '月薪 55,000–75,000',
    bio: '專職 Swift / SwiftUI 移動端開發。熱愛封裝高效能、低耦合的 UI 組件，對記憶體洩漏調優（Memory Leaks）及併發處理有深度研究。上架過 3 款個人獨立開發的應用程式。',
    experience: [
      { role: 'iOS 工程師', company: '雲端聯網科技', period: '2023.01 – 至今' },
    ],
    education: [{ degree: '資訊管理學系', school: '國立政治大學', year: '2018 – 2022' }],
    skills: ['Swift', 'SwiftUI', 'Combine', 'Git', 'CocoaPods'],
    portfolio: [
      {
        title: '極簡風番茄鐘專注 App',
        description: '在 App Store 上架獲得 4.8 星好評的專注工具。支援 Widget 桌面組件與動態島即時顯示。',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        tags: ['Swift', 'SwiftUI', 'CoreData', 'WidgetKit'],
      },
    ],
    isApproved: true,
  }
];

// 🏢 ─── 8 間不同公司職缺訊息 (全新擴充：已完美替換為 104 真實招募資料) ──────────────────────────
const MOCK_JOBS = [
  {
    id: "job_1",
    companyName: "智影顧問股份有限公司",
    title: "前端工程師 (React.js / TypeScript)",
    salary: "月薪 40,000 - 60,000 元",
    location: "台北市大安區",
    description: "主要協助 Web 及 Mobile-Web 前端功能開發、優化產品架構。技術棧涵蓋 React.js、JavaScript/TypeScript 與 CSS。負責 UI 實作並與設計師、後端夥伴密切協作，打造流暢的使用者介面。",
    applicants: []
  },
  {
    id: "job_2",
    companyName: "奧丁丁集團 (歐簿客科技)",
    title: "【OwlPay】Senior Frontend Engineer / 資深前端工程師",
    salary: "待遇面議 (月薪 70,000 元以上)",
    location: "台北市北投區",
    description: "主導 OwlPay 區塊鏈與全球支付金融產品前端架構規劃與開發。深度優化前端載入效能，協助團隊建立可維護性、具擴充性的前端組件與程式碼，需具備多種前端程式語言綜合整合能力。",
    applicants: []
  },
  {
    id: "job_3",
    companyName: "智穎智能股份有限公司 (Moldintel)",
    title: "Frontend Engineer 前端工程師 (AI SaaS 平台)",
    salary: "待遇面議 (依經驗彈性敘薪)",
    location: "桃園市桃園區",
    description: "與產品設計師、後端工程師密切合作，開發 Moldintel AI SaaS 智慧製造雲端平台前端應用。建構模具監控、大數據資料視覺化圖表與 AI 模型回饋等高度互動式界面。",
    applicants: []
  },
  {
    id: "job_4",
    companyName: "公勝保險經紀人股份有限公司",
    title: "資訊部前端工程師 (Frontend Engineer)",
    salary: "月薪 33,000 元以上 (依實力調高)",
    location: "高雄市左營區",
    description: "與後端工程師、機器學習工程師和產品經理共同討論並提供技術建議，參與核心保險財顧資訊平台系統的架構討論。負責保險 SaaS 系統落地實作、功能調校與介面開發。",
    applicants: []
  },
  {
    id: "job_5",
    companyName: "星辰無限創智有限公司",
    title: "資深 UI/UX 設計師 (Senior UIUX Designer)",
    salary: "月薪 60,000 - 75,000 元",
    location: "台中市西屯區",
    description: "負責公司核心 Web 與 Mobile 產品的全流程 UI/UX 設計。包含前期需求釐清、使用者流程規劃 (User Flow)、線稿圖 (Wireframe) 製作、高擬真介面設計 (Figma) 以及設計規範交付與前端對接。",
    applicants: []
  },
  {
    id: "job_6",
    companyName: "昕睿資訊股份有限公司",
    title: "UI/UX 設計師 (Figma / 原型設計)",
    salary: "月薪 38,000 - 55,000 元",
    location: "台北市松山區",
    description: "負責公司自有平台及客製化專案之 UI/UX 設計。使用 Figma 獨立製作 User Flow、Wireframe 及高動態 Prototype，建立標準設計系統元件庫，提供前端工程師精確的設計標註規範。",
    applicants: []
  },
  {
    id: "job_7",
    companyName: "微碧愛普科技有限公司 (Weiby App)",
    title: "iOS App Developer 開發工程師 (Swift / UIKit)",
    salary: "月薪 50,000 - 60,000 元",
    location: "台中市西區",
    description: "負責餐飲智慧點餐生態系之原生 iOS App 設計、開發與日常維護。主要使用 Swift 語言進行核心邏輯優化，與後端 API 進行 RESTful 串接，考慮不同 iOS 系統版本相容性並提升操作體驗。",
    applicants: []
  },
  {
    id: "job_8",
    companyName: "GaragePlay 車庫娛樂股份有限公司",
    title: "iOS App 開發工程師 (娛樂串流影音系統)",
    salary: "待遇面議 (依實務經驗核薪)",
    location: "台北市大同區",
    description: "負責車庫娛樂大型行動端應用程式、線上電影串流平台與電影票務系統的 iOS 原生 App 程式設計、架構開發與 App Store 上架維護。與 UI 設計師配合完成精緻動畫與介面流暢度。",
    applicants: []
  }
];

// ─── App Component ───────────────────────────────────────────────────────────
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalTalent, setModalTalent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  // 🎯 核心修復：新增 subTab 狀態，用來判定目前是要看人才還是職缺（預設為人才 talents）
  const [subTab, setSubTab] = useState('talents');

  // ☁️ 雲端狀態：使用者帳號、人才履歷清單、🏢 職缺清單
  const [users, setUsers] = useState([]);
  const [talents, setTalents] = useState([]);
  const [jobs, setJobs] = useState(MOCK_JOBS); // 先用預設資料墊著，避免畫面空白

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

  // 🚀 2. 一開網頁，直接暴力初始化上傳（保證成功）
  useEffect(() => {
    const initializeFirebaseData = async () => {
      try {
        console.log("正在努力為映瑄同步資料到 Firebase 中...");

        // 1. 暴力塞入職缺資料
        for (let job of MOCK_JOBS) {
          await setDoc(doc(db, "jobs", job.id), job);
        }
        console.log("🏢 8 間公司的真實職缺已強制同步成功！");

        // 2. 暴力塞入預設人才履歷
        for (let talent of MOCK_TALENTS) {
          await setDoc(doc(db, "resumes", talent.id), talent);
        }
        console.log("👤 預設人才履歷已強制同步成功！");

        // 3. 撈回最新雲端資料確保狀態同步
        const userSnapshot = await getDocs(collection(db, "app_users"));
        const cloudUsers = [{ id: 'shadow_id', email: 'shadow@student.edu.tw', password: 'password123' }];
        userSnapshot.forEach((doc) => {
          cloudUsers.push({ id: doc.id, ...doc.data() });
        });
        setUsers(cloudUsers);

        const talentSnapshot = await getDocs(collection(db, "resumes"));
        const cloudTalents = [];
        talentSnapshot.forEach((doc) => { cloudTalents.push({ id: doc.id, ...doc.data() }); });
        setTalents(cloudTalents);

        const jobSnapshot = await getDocs(collection(db, "jobs"));
        const cloudJobs = [];
        jobSnapshot.forEach((doc) => { cloudJobs.push({ id: doc.id, ...doc.data() }); });
        setJobs(cloudJobs);

      } catch (error) {
        console.error("🔥 暴力同步失敗，原因通常是 Firebase 規則拒絕寫入：", error);
      }
    };

    initializeFirebaseData();
  }, []); // 👈 只有第一次開啟網頁時執行，不重複戳資料庫

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
      alert('登入狀態異常或已逾時，請重新登入後再發布履歷！');
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
      alert('🎉 履歷已成功發布/同步至雲端資料庫！請等待管理員進行上架審核。');
      setTimeout(() => { setView('dashboard'); }, 300);
    } catch (error) {
      console.error("🔥 Firebase 寫入失敗原因:", error);
      alert(`儲存至雲端失敗！錯誤資訊: ${error.message}`);
    }
  };

  // 🚀 全新功能：【投遞職缺履歷】
  const handleApplyJob = async (jobId) => {
    if (!currentUser) {
      alert("請先登入會員再投遞履歷！");
      setView("login");
      return;
    }

    try {
      const targetJob = jobs.find(j => j.id === jobId);
      if (targetJob.applicants && targetJob.applicants.includes(currentUser.email)) {
        alert("您已經投遞過這家公司囉！");
        return;
      }

      const updatedApplicants = [...(targetJob.applicants || []), currentUser.email];

      // 更新雲端 Firebase 資料
      await updateDoc(doc(db, "jobs", jobId), { applicants: updatedApplicants });

      // 更新當地狀態
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicants: updatedApplicants } : j));
      alert(`🎉 成功投遞！您的履歷已送出給 ${targetJob.companyName}。`);
    } catch (error) {
      console.error("投遞失敗：", error);
    }
  };

  // 🚀 5. 【會員自行刪除簡歷】
  const handleUserDeleteResume = async () => {
    if (!currentUser || !currentUser.email) return;
    const documentId = currentUser.email.replace(/\./g, '_');
    try {
      await deleteDoc(doc(db, "resumes", documentId));
      setTalents(prev => prev.filter(t => t.id !== documentId));
      alert('🗑️ 您的個人簡歷已成功從雲端資料庫移除。');
    } catch (error) {
      console.error("刪除失敗:", error);
    }
  };

  // 🚀 6. 【後台管理員：切換審核狀態】
  const handleApproveToggle = async (id, approve) => {
    try {
      await updateDoc(doc(db, "resumes", id), { isApproved: approve });
      setTalents(prev => prev.map(t => (t.id === id ? { ...t, isApproved: approve } : t)));
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

  // 篩選功能 (首頁市集僅顯示審核通過 isApproved === true 的人才)
  const filteredTalents = talents.filter(t => {
    if (!t.isApproved) return false;
    const q = searchQuery.toLowerCase();
    const skill = skillFilter.toLowerCase();
    const matchesQuery = t.name?.toLowerCase().includes(q) || t.title?.toLowerCase().includes(q);
    const matchesSkill = skill ? t.skills?.some(s => s.toLowerCase().includes(skill)) : true;
    return matchesQuery && matchesSkill;
  });

  // 職缺關鍵字篩選
  const filteredJobs = jobs.filter(j => {
    const q = searchQuery.toLowerCase();
    return j.companyName?.toLowerCase().includes(q) || j.title?.toLowerCase().includes(q) || j.description?.toLowerCase().includes(q);
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

              {/* 🎯 頁籤切換按鈕組：尋找人才 vs 尋找職缺 */}
              <div className="flex justify-center gap-4 my-6">
                <button
                  onClick={() => setSubTab('talents')}
                  className={`px-8 py-3 rounded-xl font-bold text-base shadow-lg flex items-center gap-2 transition-all duration-300 ${subTab === 'talents' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20 scale-105' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  🔍 尋找人才
                </button>
                <button
                  onClick={() => setSubTab('jobs')}
                  className={`px-8 py-3 rounded-xl font-bold text-base shadow-lg flex items-center gap-2 transition-all duration-300 ${subTab === 'jobs' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20 scale-105' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  🏢 尋找職缺
                </button>
              </div>

              {/* Search / Filter Bar */}
              <div className="my-8 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto w-full px-2">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input
                    type="text"
                    placeholder={subTab === 'talents' ? "搜尋人才名稱或職稱…" : "搜尋公司名稱、職缺關鍵字…"}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
                {subTab === 'talents' && (
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
                )}
              </div>

              {/* 🎯 根據當前選擇的 subTab 切換渲染 Talent 還是 Jobs */}
              <div className="max-w-7xl mx-auto w-full">
                {subTab === 'talents' ? (
                  /* 👤 人才市集卡片區塊 */
                  <div id="marketplace-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTalents.map(t => (
                      <TalentCard
                        key={t.id}
                        talent={t}
                        currentUser={currentUser}
                        onViewProfile={() => setModalTalent(t)}
                      />
                    ))}
                    {filteredTalents.length === 0 && (
                      <p className="text-center col-span-full text-slate-500 py-20">😕 目前無符合條件的人才。</p>
                    )}
                  </div>
                ) : (
                  /* 🏢 公司職缺卡片區塊 */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between group">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                              熱門職缺
                            </span>
                            <span className="text-sm text-slate-500 flex items-center gap-1">📍 {job.location}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-1">{job.title}</h3>
                          <p className="text-sm text-slate-400 font-medium mb-4">🏢 {job.companyName}</p>
                          <p className="text-sm text-slate-500 line-clamp-3 mb-6 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">{job.description}</p>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-800/60">
                          <div>
                            <p className="text-xs text-slate-500">預估薪資</p>
                            <p className="text-base font-bold text-emerald-400">{job.salary}</p>
                          </div>
                          <button
                            onClick={() => handleApplyJob(job.id)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${job.applicants?.includes(currentUser?.email) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-md shadow-cyan-500/10 active:scale-95'}`}
                            disabled={job.applicants?.includes(currentUser?.email)}
                          >
                            {job.applicants?.includes(currentUser?.email) ? '✓ 已投遞履歷' : '🚀 立即投遞'}
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredJobs.length === 0 && (
                      <p className="text-center col-span-full text-slate-500 py-20">😕 找不到相符的公司職缺。</p>
                    )}
                  </div>
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