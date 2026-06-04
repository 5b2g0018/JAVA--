import React, { useState } from 'react';
import { Plus, Trash2, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RegisterForm({ onPublish, onCancel }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [motto, setMotto] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80');
  const [email, setEmail] = useState('');
  
  // Skill states
  const popularSkills = [
    'React', 'Tailwind CSS', 'Python', 'AI 溝通 / 提示詞工程', 
    'TypeScript', 'Node.js', 'Figma UI/UX', 'SQL / Database'
  ];
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState('');

  // Dynamic Portfolio projects state
  const [projects, setProjects] = useState([
    { title: '', description: '', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', tags: '' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddProject = () => {
    setProjects(prev => [...prev, { 
      title: '', 
      description: '', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 
      tags: '' 
    }]);
  };

  const handleRemoveProject = (index) => {
    if (projects.length === 1) return; // Keep at least one
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index, field, value) => {
    setProjects(prev => prev.map((proj, i) => 
      i === index ? { ...proj, [field]: value } : proj
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Compile skills list
    const parsedCustom = customSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    const finalSkills = [...selectedSkills, ...parsedCustom];

    if (finalSkills.length === 0) {
      alert("請至少選擇或輸入一項技能！");
      return;
    }

    // Format projects
    const finalProjects = projects.map(proj => ({
      ...proj,
      tags: proj.tags ? proj.tags.split(',').map(t => t.trim()).filter(t => t.length > 0) : []
    }));

    setIsSubmitting(true);

    const newTalent = {
      id: Date.now(), // Unique ID
      name,
      title,
      motto,
      avatar,
      email,
      skills: finalSkills,
      portfolio: finalProjects
    };

    setTimeout(() => {
      onPublish(newTalent);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Delay redirection back to home
      setTimeout(() => {
        onCancel(); // redirects back
      }, 1500);
    }, 1000);
  };

  return (
    <section className="py-24 px-6 lg:px-8 relative max-w-5xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button 
        onClick={onCancel}
        className="mb-8 flex items-center text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
      >
        <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
        返回人才市集
      </button>

      {showSuccess ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] py-24 space-y-6">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-bounce">
            <CheckCircle2 size={48} className="stroke-[2.5]" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100">發布成功！</h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto font-light">
            您的履歷已成功登錄到 TalentHub。正在為您轉回首頁人才市集...
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-slate-900 bg-slate-900/10 p-8 lg:p-10">
          
          <div className="mb-10 border-b border-slate-900 pb-6">
            <h2 className="text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
              登錄你的數位履歷
            </h2>
            <p className="text-sm text-slate-400 font-light mt-2">
              填寫下方基本欄位、專長與精選作品，立即讓有招募需求的企業與團隊看見你！
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Grid for Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Basic Information */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 border-l-2 border-emerald-400 pl-3">
                  基本資料
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">真實姓名 / 暱稱 *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例如：陳大同"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">專業職稱 *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="例如：Senior Frontend Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">個人簡介 / 座右銘 *</label>
                  <input
                    type="text"
                    required
                    value={motto}
                    onChange={(e) => setMotto(e.target.value)}
                    placeholder="熱愛學習新技術，用程式解決生活中的大小事。"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">聯絡 Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">頭像照片連結 (Unsplash 佔位圖已預填)</label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Right Column: Skills Selection */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-l-2 border-cyan-400 pl-3">
                  技術專長 *
                </h3>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400">常用熱門標籤 (可複選)</label>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map((skill, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                          selectedSkills.includes(skill)
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">自訂其他技能 (以英文逗號分開)</label>
                  <input
                    type="text"
                    value={customSkills}
                    onChange={(e) => setCustomSkills(e.target.value)}
                    placeholder="Django, Web3.js, Docker, NextJS..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-300"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Section: Portfolio builder */}
            <div className="space-y-6 pt-4 border-t border-slate-900">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 border-l-2 border-emerald-400 pl-3">
                  精選作品集 (至少填寫 1 項)
                </h3>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>新增一個作品</span>
                </button>
              </div>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div 
                    key={index}
                    className="relative p-6 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-4 group/item hover:border-slate-700 transition-colors"
                  >
                    {/* Delete item button */}
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className="absolute top-4 right-4 p-2 rounded-lg border border-transparent text-slate-500 hover:text-rose-400 hover:border-rose-500/10 hover:bg-rose-500/5 transition-all cursor-pointer"
                        title="刪除此作品"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    <span className="inline-block text-xs font-bold text-slate-500">
                      專案項目 #{index + 1}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500">作品名稱 *</label>
                        <input
                          type="text"
                          required
                          value={project.title}
                          onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                          placeholder="例如：AI 智慧記帳本"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500">技術標籤 (以逗號分開)</label>
                        <input
                          type="text"
                          value={project.tags}
                          onChange={(e) => handleProjectChange(index, 'tags', e.target.value)}
                          placeholder="React, OpenAI API, Tailwind CSS"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500">作品介紹說明 *</label>
                      <textarea
                        required
                        rows="3"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                        placeholder="介紹這個作品的功能、使用的主要技術，以及解決了什麼痛點..."
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500">作品截圖網址 (Unsplash 佔位圖已預填)</label>
                      <input
                        type="url"
                        value={project.image}
                        onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-100 text-xs focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-4 pt-6 border-t border-slate-900">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 hover:shadow-lg hover:shadow-emerald-500/15 disabled:opacity-50 transform hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                {isSubmitting ? (
                  "發布中..."
                ) : (
                  <>
                    <span>發布履歷</span>
                    <Send size={15} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-4 rounded-xl text-sm font-bold text-slate-400 border border-slate-850 hover:border-slate-700 hover:text-white bg-slate-900/10 transition-all cursor-pointer"
              >
                取消
              </button>
            </div>

          </form>

        </div>
      )}
    </section>
  );
}
