import React from 'react';
import { Code, Wind, Terminal, Sparkles, Cpu, Database, Award } from 'lucide-react';

// Casing and icon matching helper
const getSkillConfig = (skillName) => {
  const nameLower = skillName.toLowerCase();
  
  if (nameLower.includes('react') || nameLower.includes('next')) {
    return {
      name: skillName,
      description: "用於構建動態與高效使用者介面的主流前端框架",
      icon: Code,
      level: 90,
      color: "from-emerald-400 to-teal-400",
      glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    };
  }
  if (nameLower.includes('tailwind') || nameLower.includes('css')) {
    return {
      name: skillName,
      description: "基於實用類別的 CSS 框架，實現快速且靈活的現代網頁排版與美感",
      icon: Wind,
      level: 95,
      color: "from-teal-400 to-cyan-400",
      glowColor: "group-hover:border-teal-500/30 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
    };
  }
  if (nameLower.includes('python')) {
    return {
      name: skillName,
      description: "語法優美且強大的多用途程式語言，適用於資料處理與自動化開發",
      icon: Terminal,
      level: 85,
      color: "from-cyan-400 to-emerald-400",
      glowColor: "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    };
  }
  if (nameLower.includes('ai') || nameLower.includes('prompt') || nameLower.includes('提示詞')) {
    return {
      name: skillName,
      description: "善用 LLM 工具（ChatGPT, Claude）與 Prompt 技術優化工作與開發效率",
      icon: Sparkles,
      level: 92,
      color: "from-emerald-400 via-teal-400 to-cyan-400",
      glowColor: "group-hover:border-teal-500/30 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
    };
  }
  if (nameLower.includes('typescript') || nameLower.includes('js') || nameLower.includes('javascript')) {
    return {
      name: skillName,
      description: "現代網頁開發核心程式語言，提供強大的靜態型別與程式健壯性",
      icon: Cpu,
      level: 88,
      color: "from-emerald-400 to-cyan-400",
      glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    };
  }
  if (nameLower.includes('sql') || nameLower.includes('db') || nameLower.includes('database') || nameLower.includes('資料庫') || nameLower.includes('mongo') || nameLower.includes('postgres')) {
    return {
      name: skillName,
      description: "關聯與非關聯式資料庫管理，處理資料架構規劃、查詢與效能優化",
      icon: Database,
      level: 82,
      color: "from-emerald-400 to-cyan-400",
      glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    };
  }

  // Generic Fallback
  return {
    name: skillName,
    description: "優秀的工程與研發相關能力，包含日常技術維護、功能擴增與團隊協作",
    icon: Award,
    level: 80,
    color: "from-slate-400 to-slate-200",
    glowColor: "group-hover:border-slate-800/80 group-hover:shadow-[0_0_30px_rgba(148,163,184,0.1)]",
  };
};

export default function Skills({ skills }) {
  // If not passed, use defaults
  const defaultSkills = ["React", "Tailwind CSS", "Python", "AI 溝通 / 提示詞工程"];
  const displaySkillsList = skills || defaultSkills;
  
  const skillsData = displaySkillsList.map(name => getSkillConfig(name));

  return (
    <section id="skills" className="py-20 px-6 lg:px-8 bg-slate-950/40 relative">
      {/* Decorative center background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest text-emerald-400 uppercase">
            My Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            專業技能
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            掌握前端核心技術與現代 AI 工具，設計高質感且實用的數位產品。
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((skill, idx) => {
            const IconComp = skill.icon;
            return (
              <div
                key={idx}
                className={`group glass-panel rounded-3xl p-8 border border-slate-900/80 transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900/30 ${skill.glowColor}`}
              >
                {/* Card Header */}
                <div className="flex flex-col space-y-4 mb-6">
                  <div className={`w-fit p-3.5 rounded-2xl bg-gradient-to-br ${skill.color} text-slate-950 shadow-lg`}>
                    <IconComp size={24} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{skill.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[40px]">{skill.description}</p>
                  </div>
                </div>

                {/* Card Body: Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-400">熟練度</span>
                    <span className="font-bold text-slate-400 group-hover:text-white transition-colors duration-300">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Progress bar container */}
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40 p-0.5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out origin-left`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
