import React from 'react';
import { ExternalLink } from 'lucide-react';

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    width={props.size || 24}
    height={props.size || 24}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Portfolio({ projects }) {
  const defaultProjects = [
    {
      title: "AI 智慧記帳本",
      description: "用 React 開發的個人理財工具，支援語音或文字記帳，能以 AI 自動為消費做分類，並產出精美圖表分析收支情況。",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Tailwind CSS", "OpenAI API", "LocalStorage"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      color: "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    },
    {
      title: "去中心化虛擬資產交易所",
      description: "基於 Web3 與智能合約的去中心化交易平台，支援實時 K 線圖表、冷錢包連接認證與跨鏈代幣兌換功能。",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "TypeScript", "Tailwind CSS", "Ethers.js", "Web3"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      color: "border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
    },
    {
      title: "智慧型雲端生產力筆記",
      description: "支援雙向連結、Markdown 語法與多裝置同步的筆記 App，內建 AI 自動整理、標籤分類與文章摘要助手。",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Node.js", "MongoDB", "Express", "Zustand"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      color: "border-teal-500/20 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
    }
  ];

  const displayProjects = projects || defaultProjects;

  return (
    <section id="portfolio" className="py-20 px-6 lg:px-8 relative">
      {/* Background radial soft lights */}
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            Creative Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            精選作品展示
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            展示近期研發成果，體現出對細節與效能的極致追求。
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <div
              key={index}
              className={`group glass-panel rounded-3xl overflow-hidden border bg-slate-900/40 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${
                project.color || "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
              }`}
            >
              
              {/* Card Image Wrapper */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-slate-900">
                <img
                  src={project.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Floating tags layer on image hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags && project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-800 bg-slate-950/50 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/10 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons Action Group */}
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-900/60">
                  <a
                    href={project.demoUrl || "https://example.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    查看專案
                    <ExternalLink size={14} className="ml-1.5" />
                  </a>
                  
                  <a
                    href={project.githubUrl || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white transform hover:-translate-y-0.5 transition-all duration-300"
                    aria-label="View Code"
                  >
                    <Github size={16} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
