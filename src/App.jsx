import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TalentCard from './components/TalentCard';
import TalentModal from './components/TalentModal';
import RegisterForm from './components/RegisterForm';
import TalentProfile from './components/TalentProfile';
import AdminPanel from './components/AdminPanel';
// 🌟 完美引入的登入/註冊元件與會員控制台元件
import AuthForm from './components/AuthForm';
import UserDashboard from './components/UserDashboard';

// ─── Rich Mock Data (10 Rich Talents Included) ───────────────────────────────
const MOCK_TALENTS = [
  {
    id: 1,
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
      {
        title: 'TalentHub 人才市集平台',
        description: '多人數位履歷展示平台，支援人才登錄、篩選搜尋、管理員審核與完整個人履歷瀏覽。',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Vite', 'Tailwind CSS', 'LocalStorage'],
      },
    ],
    isApproved: true,
  },
  {
    id: 2,
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
      { role: 'Node.js 後端工程師', company: '新創加速器 ABC Labs', period: '2021.03 – 2022.07' },
      { role: '軟體工程師實習生', company: '台灣大哥大', period: '2020.07 – 2021.02' },
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
      {
        title: '即時協作白板工具',
        description: '基於 WebSocket 的多人即時協作繪圖工具，支援無限畫布、形狀工具與版本歷史記錄。',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Socket.io', 'Canvas API', 'TypeScript'],
      },
    ],
    isApproved: true,
  },
  {
    id: 3,
    name: '陳建宏',
    title: 'AI 研究員 / 機器學習工程師',
    motto: '深信 AI 不只是工具，更是改變人類思維的革命。',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'chen@example.com',
    yearsOfExp: 4,
    expectedSalary: '月薪 80,000–110,000',
    bio: '專注於自然語言處理（NLP）與電腦視覺領域的 AI 研究員，有學術論文發表經驗。熟悉 PyTorch、HuggingFace 等主流 AI 框架，以及大型語言模型的微調（Fine-tuning）與部署。熱衷於將研究成果轉化為實際應用，並具備優秀的跨領域協作與技術溝通能力。',
    experience: [
      { role: 'AI 研究員', company: '中央研究院資訊所', period: '2023.09 – 至今' },
      { role: '機器學習工程師', company: '趨勢科技', period: '2021.06 – 2023.08' },
    ],
    education: [
      { degree: '資訊科學博士班（修業中）', school: '國立陽明交通大學', year: '2023 – 至今' },
      { degree: '資訊工程學系碩士', school: '國立清華大學', year: '2019 – 2021' },
    ],
    skills: ['Python', 'SQL / Database', 'PyTorch', 'LLM Tuning'],
    portfolio: [
      {
        title: '繁體中文情感分析模型',
        description: '基於 BERT 架構微調的繁中情感分析模型，準確率達 93.2%，已整合至客服系統協助判斷用戶情緒。',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        tags: ['Python', 'PyTorch', 'HuggingFace', 'NLP'],
      },
      {
        title: 'AI 履歷篩選助理',
        description: '協助 HR 自動解析應徵者履歷 PDF，以 AI 摘要關鍵能力並評分，大幅縮短初篩時間。',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
        tags: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
      },
    ],
    isApproved: true,
  },
  {
    id: 4,
    name: '黃斜豆',
    title: '全端實習生 / 學生',
    motto: '沒有解決不了的 Bug，只有不夠肝的工程師！目前努力刷題中。',
    avatar: '',
    email: 'shadow@student.edu.tw',
    yearsOfExp: 0,
    expectedSalary: '時薪 200–250',
    bio: '目前是資工系大四學生，熱衷於全端 Web 開發與自動化腳本編寫。熟悉基本網頁技術並積極參與開源社群。個性樂觀、抗壓性強，能快速吸收新知識，目前正努力刷 LeetCode 尋求軟體開發實習機會。',
    experience: [
      { role: '校園網路中心助理', company: '大學計算機中心', period: '2023.09 – 至今' }
    ],
    education: [{ degree: '資訊工程學系', school: '逢甲大學', year: '2022 – 2026' }],
    skills: ['Node.js', 'Python', 'HTML / CSS', 'Git'],
    portfolio: [
      {
        title: '智慧校園導覽 App',
        description: '大三期末專題作品，利用路徑演算法規劃校園內最短步行導覽路線。',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
        tags: ['Java', 'Android', 'SQLite Studio'],
      }
    ],
    isApproved: false,
  },
  {
    id: 5,
    name: '林思妤',
    title: 'UI/UX 設計師 / 前端愛好者',
    motto: '好的設計能說故事，好的程式碼能賦予它靈魂。',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'lin.design@example.com',
    yearsOfExp: 3,
    expectedSalary: '月薪 50,000–65,000',
    bio: '專注於使用者經驗（UX）研究與視覺設計（UI）的設計師。擅長使用 Figma 建立完整的設計系統（Design System），並具備良好的 Tailwind CSS 編寫能力，能與前端工程師無縫對接。',
    experience: [
      { role: 'UI/UX 設計師', company: '美感數位互動', period: '2022.05 – 至今' }
    ],
    education: [{ degree: '商業設計學系', school: '國立臺灣科技大學', year: '2018 – 2022' }],
    skills: ['Figma', 'UI/UX', 'Tailwind CSS', 'Next.js'],
    portfolio: [
      {
        title: '虛擬貨幣交易所介面優化',
        description: '耗時三個月進行使用者調研，重新定義數位資產的視覺排版與交易下單操作流暢度。',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80',
        tags: ['Figma', 'UIUX Design', 'User Research'],
      }
    ],
    isApproved: true,
  },
  {
    id: 6,
    name: '張家豪',
    title: '後端資深工程師 / 資料庫專家',
    motto: '資料庫優化一條索引，勝過前端重構一萬行。',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    email: 'chang.db@example.com',
    yearsOfExp: 7,
    expectedSalary: '月薪 95,000–130,000',
    bio: '具備 7 年大型分散式系統開發經驗的後端老手。精通高併發架構設計、微服務架構與關聯式資料庫深度優化.處理過百萬級日活躍用戶數據。',
    experience: [
      { role: '資深核心後端工程師', company: '獵豹跨國電商平台', period: '2020.01 – 至今' },
      { role: '後端工程師', company: '國泰金控數數發中心', period: '2018.02 – 2019.12' }
    ],
    education: [{ degree: '資訊管理學系碩士', school: '國立交通大學', year: '2015 – 2017' }],
    skills: ['MySQL', 'PostgreSQL', 'Golang', 'Redis', 'Kafka'],
    portfolio: [
      {
        title: '分散式巨量日誌收集系統',
        description: '使用 Golang 開發高吞吐量的數據流核心，每日穩定處理超過億級的日誌行為數據。',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        tags: ['Golang', 'Kafka', 'Elasticsearch'],
      }
    ],
    isApproved: true,
  },
  {
    id: 7,
    name: '周杰克',
    title: 'iOS App 開發工程師',
    motto: '專注於極致的 Apple 美學與流暢的物理動畫互動。',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    email: 'jay.ios@example.com',
    yearsOfExp: 3,
    expectedSalary: '月薪 65,000–80,000',
    bio: '專注於原生 iOS App 開發，極度熱愛 SwiftUI 與現代化宣告式 UI 開發。追求畫面的流暢刷新率與系統底層效能的平衡。',
    experience: [
      { role: 'iOS 工程師', company: '獨立 App 軟體工作室', period: '2023.01 – 至今' }
    ],
    education: [{ degree: '數位媒體設計學系', school: '元智大學', year: '2018 – 2022' }],
    skills: ['Swift', 'SwiftUI', 'CoreData', 'Combine'],
    portfolio: [
      {
        title: '番茄鐘極簡 productivity 工具',
        description: '上架於 App Store 獲得 4.8 星高評分的質感專注工具，支援動態島與桌面 Widget。',
        image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=800&q=80',
        tags: ['SwiftUI', 'Dynamic Island', 'App Store'],
      }
    ],
    isApproved: false,
  },
  {
    id: 8,
    name: '許婉婷',
    title: '雲端架構師 / SRE 工程師',
    motto: '自動化維運是一切軟體優雅穩定運作的基石。',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'wt.hsu@example.com',
    yearsOfExp: 4,
    expectedSalary: '月薪 85,000–105,000',
    bio: '擁有 AWS 專家級認證的雲端架構師。專長基礎設施即程式碼（IaC），協助過多個傳統企業將在地伺服器成功無縫搬遷上雲。',
    experience: [
      { role: '雲端架構顧問', company: '國際外商雲端整合服務', period: '2022.03 – 至今' }
    ],
    education: [{ degree: '通訊工程學系', school: '國立成功大學', year: '2016 – 2020' }],
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Terraform'],
    portfolio: [
      {
        title: '跨國多雲自動化備援計畫',
        description: '運用 Terraform 自動部署異地備援基礎設施，實現災難復原 RTO < 5 分鐘的高可用指標。',
        image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
        tags: ['Terraform', 'AWS Lambda', 'SRE'],
      }
    ],
    isApproved: true,
  },
  {
    id: 9,
    name: '吳冠宇',
    title: '區塊鏈合約工程師',
    motto: 'Code is Law. 在鏈上的世界裡，容不得任何一絲粗心。',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    email: 'wu.crypto@example.com',
    yearsOfExp: 3,
    expectedSalary: '月薪 90,000–120,000',
    bio: '深耕 Web3 生態系的技術開發者，專精以太坊 Solidity 智能合約安全編寫，熟悉各類 DeFi 協議機制，對 EVM 底層有深入的認知。',
    experience: [
      { role: '智能合約工程師', company: '新加坡區塊鏈新創基金', period: '2023.05 – 至今' }
    ],
    education: [{ degree: '資訊工程學系', school: '國立清華大學', year: '2019 – 2023' }],
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Rust', 'Hardhat'],
    portfolio: [
      {
        title: 'DeFi 去中心化質押借貸協議',
        description: '編寫並通過慢霧科技安全審計的 ERC-20 鎖倉利息合約，鏈上總鎖倉量(TVL)曾突破百萬美金。',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
        tags: ['Solidity', 'Hardhat', 'ERC20'],
      }
    ],
    isApproved: true,
  },
  {
    id: 10,
    name: '林冠亨',
    title: '技術專案經理 / 敏捷教練',
    motto: '程式碼用來跟機器溝通，而我的工作是讓技術團隊達成共識。',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    email: 'andy.liu@example.com',
    yearsOfExp: 6,
    expectedSalary: '月薪 80,000–100,000',
    bio: '具有技術背景的專案經理（PMP），致力於在團隊中推廣 Agile 與 Scrum 敏捷敏捷開發流程，消除部門壁垒並提高產品交付速度。',
    experience: [
      { role: 'Technical Project Manager', company: '軟體跨國研發中心', period: '2021.10 – 至今' }
    ],
    education: [{ degree: '企業管理學系學士', school: '國立政治大學', year: '2014 – 2018' }],
    skills: ['Scrum', 'Project Management', 'Jira', 'Agile Engineering'],
    portfolio: [
      {
        title: '大型產品線敏捷轉型引導',
        description: '帶領 60 人團隊由傳統瀑布式成功轉型為雙週衝刺的 Scrum架構，使功能上線產出提升 35%。',
        image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80',
        tags: ['Agile', 'Scrum Coaching', 'Jira Software'],
      }
    ],
    isApproved: false,
  }
];

// ─── App Component ───────────────────────────────────────────────────────────
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [talents, setTalents] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalTalent, setModalTalent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  // 👑 模擬純前端的使用者資料庫（預設給一個測試用會員，其綁定了 id: 4 黃斜豆的履歷）
  const [users, setUsers] = useState([
    {
      id: 4, // 對應黃斜豆
      email: 'shadow@student.edu.tw',
      password: 'password123',
    }
  ]);

  // 💾 1. 自動記憶：目前登入的用戶（初始化時直接從 localStorage 讀取紀錄）
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('hub_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 💾 2. 自動記憶：上次停留在哪一個畫面（預設如果已登入就進 dashboard，否則就進 marketplace）
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem('hub_current_view');
    if (savedView) return savedView;

    // 如果沒有上次畫面紀錄，則動態判斷：有登入就去主控台，沒登入就去市集首頁
    const savedUser = localStorage.getItem('hub_current_user');
    return savedUser ? 'dashboard' : 'marketplace';
  });

  // 每當 view 切換時，自動同步把最新畫面存在瀏覽器
  useEffect(() => {
    localStorage.setItem('hub_current_view', view);
  }, [view]);

  // Load mock + localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('talents') || '[]');

    // 為了防止重複，我們需要過濾掉在 LocalStorage 已經存在的自訂履歷
    const mergedTalents = [...MOCK_TALENTS];
    stored.forEach(st => {
      const idx = mergedTalents.findIndex(m => m.id === st.id);
      if (idx !== -1) {
        mergedTalents[idx] = st; // 覆蓋舊資料
      } else {
        mergedTalents.push(st); // 新增
      }
    });
    setTalents(mergedTalents);

    // 同步讀取 localStorage 中的註冊使用者
    const storedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    if (storedUsers.length > 0) {
      setUsers(prev => [...prev, ...storedUsers.filter(su => !prev.some(p => p.email === su.email))]);
    }
  }, []);

  // Persist user-submitted talents (或者是已被修改的 mock 履歷)
  useEffect(() => {
    // 只要是從會員主控台發布或修改過的資料，都持久化保存
    const customTalents = talents.filter(t => t.id > 10 || t.id === 4);
    localStorage.setItem('talents', JSON.stringify(customTalents));
  }, [talents]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 👑 【修改發布邏輯】 綁定當前登入者，建立/修改履歷後正常返回控制台
  const handlePublish = (newTalent) => {
    if (!currentUser) {
      alert('請先登入帳號再發布履歷！');
      setView('login');
      return;
    }

    // 建立履歷，強制使用目前登入者的 id 與 email 作為識別證
    const talent = {
      ...newTalent,
      id: currentUser.id,
      email: currentUser.email,
      isApproved: false // 每次修改或新發布，都需要重新經過管理員審核
    };

    setTalents(prev => {
      const exists = prev.some(t => t.id === currentUser.id);
      if (exists) {
        return prev.map(t => t.id === currentUser.id ? talent : t);
      }
      return [...prev, talent];
    });

    alert('履歷提交成功！已送交管理員進行上架審核。');
    setView('dashboard'); // 提交成功後導向至個人的控制面板
  };

  const handleViewTalent = (talent) => {
    setSelectedTalent(talent);
    setView('profile');
  };

  const handleApproveToggle = (id, approve) => {
    setTalents(prev =>
      prev.map(t => (t.id === id ? { ...t, isApproved: approve } : t))
    );
  };

  const handleDeleteTalent = (id) => {
    if (window.confirm('確定要永久刪除這位人才的履歷嗎？')) {
      setTalents(prev => prev.filter(t => t.id !== id));
    }
  };

  // Filtered marketplace list (approved only)
  const filteredTalents = talents.filter(t => {
    if (!t.isApproved) return false;
    const q = searchQuery.toLowerCase();
    const skill = skillFilter.toLowerCase();
    const matchesQuery = t.name.toLowerCase().includes(q) || t.title.toLowerCase().includes(q);
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
        {/* 👑 傳遞 currentUser 與 setView 給導覽列，以便切換「會員登入 / 註冊」或亮綠燈的「我的主控台」 */}
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
                  <TalentCard key={t.id} talent={t} onViewProfile={() => setModalTalent(t)} />
                ))}
                {filteredTalents.length === 0 && (
                  <p className="text-center col-span-full text-slate-500 py-20">
                    😕 目前無符合條件的人才。
                  </p>
                )}
              </div>
            </>
          )}

          {/* 👑 ── 新增：登入/註冊頁面 ── */}
          {view === 'login' && (
            <AuthForm
              users={users}
              setUsers={(updatedUsers) => {
                setUsers(updatedUsers);
                // 把新註冊的人儲存到 localStorage
                const customUsers = updatedUsers.filter(u => u.id > 10);
                localStorage.setItem('app_users', JSON.stringify(customUsers));
              }}
              onLoginSuccess={(user) => {
                // 💾 登入成功：除了設定狀態，也立刻將使用者存進 localStorage 快取
                setCurrentUser(user);
                localStorage.setItem('hub_current_user', JSON.stringify(user));
                setView('dashboard'); // 登入成功直接轉入主控台
              }}
              onCancel={() => setView('marketplace')}
            />
          )}

          {/* 👑 ── 新增：個人會員主控台 ── */}
          {view === 'dashboard' && currentUser && (
            <UserDashboard
              currentUser={currentUser}
              // 從全部人才庫中篩選出屬於自己 id 的履歷
              myProfile={talents.find(t => t.id === currentUser.id) || null}
              onCreateResume={() => setView('register')}
              // 🌟 新增這一行：當點擊修改履歷時，同樣導入 'register' 填寫頁，藉由下方的 initialData 自動灌入舊資料！
              onEditResume={() => setView('register')}
              onLogout={() => {
                // 💾 安全登出：清除當前使用者快取與畫面紀錄，確保回到首頁
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
              // ✨ 完美帶入舊資料，支援修改功能
              initialData={talents.find(t => t.id === currentUser?.id) || null}
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