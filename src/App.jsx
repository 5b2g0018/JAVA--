import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TalentCard from './components/TalentCard';
import TalentModal from './components/TalentModal';
import RegisterForm from './components/RegisterForm';
import TalentProfile from './components/TalentProfile';
import AdminPanel from './components/AdminPanel';

// ─── Rich Mock Data ───────────────────────────────────────────────────────────
const MOCK_TALENTS = [
  {
    id: 1,
    name: '黃映瑄',
    title: '前端工程師 / 社群企劃',
    motto: '熱愛學習新技術，用程式解決生活中的大小事。',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
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
    skills: ['Node.js', 'React', 'TypeScript', 'AI 溝通 / 提示詞工程', 'SQL / Database'],
    portfolio: [
      {
        title: '微服務訂單管理系統',
        description: '為電商平台設計的微服務架構後端，具備高可用負載均衡、訊息佇列與自動擴縮容能力。',
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
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
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
    skills: ['Python', 'AI 溝通 / 提示詞工程', 'SQL / Database', 'TypeScript'],
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
];

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [view, setView] = useState('marketplace');
  const [talents, setTalents] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalTalent, setModalTalent] = useState(null); // for the popup modal
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  // Load mock + localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('talents') || '[]');
    setTalents([...MOCK_TALENTS, ...stored]);
  }, []);

  // Persist user-submitted talents (id > 1000)
  useEffect(() => {
    const toStore = talents.filter(t => t.id > 1000);
    localStorage.setItem('talents', JSON.stringify(toStore));
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

  const handlePublish = (newTalent) => {
    const talent = { ...newTalent, id: Date.now(), isApproved: false };
    setTalents(prev => [...prev, talent]);
    setView('marketplace');
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

  // Filtered marketplace list (approved only)
  const filteredTalents = talents.filter(t => {
    if (!t.isApproved) return false;
    const q = searchQuery.toLowerCase();
    const skill = skillFilter.toLowerCase();
    const matchesQuery = t.name.toLowerCase().includes(q) || t.title.toLowerCase().includes(q);
    const matchesSkill = skill ? t.skills.some(s => s.toLowerCase().includes(skill)) : true;
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
        <Navbar view={view} onViewChange={setView} />
        <main className="flex-grow p-4 lg:p-8">

          {/* ── Marketplace ── */}
          {view === 'marketplace' && (
            <>
              <Hero onViewChange={setView} />

              {/* Search / Filter Bar */}
              <div className="my-8 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto">
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
              <div id="marketplace-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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

          {view === 'register' && (
            <RegisterForm onPublish={handlePublish} onCancel={() => setView('marketplace')} />
          )}
          {view === 'profile' && selectedTalent && (
            <TalentProfile talent={selectedTalent} onBack={() => setView('marketplace')} />
          )}
          {view === 'admin' && (
            <AdminPanel
              talents={talents}
              onApprove={handleApproveToggle}
              onBack={() => setView('marketplace')}
            />
          )}
        </main>
        <Footer />
      </div>

      {/* ── Talent Detail Modal ── */}
      {modalTalent && (
        <TalentModal talent={modalTalent} onClose={() => setModalTalent(null)} />
      )}
    </div>
  );
}
