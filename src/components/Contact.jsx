import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact({ talentName, talentEmail }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success state after a while
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  const displayName = talentName || "我";
  const displayEmail = talentEmail || "alex@example.com";

  return (
    <section id="contact" className="py-20 px-6 lg:px-8 bg-slate-950/40 relative">
      {/* Decorative lighting blobs */}
      <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest text-emerald-400 uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            與 {displayName} 聯絡
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            對我的專業專長感興趣？非常歡迎透過以下表單或管道與我取得聯繫！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Contact Info Detail Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 glass-panel rounded-3xl p-8 border border-slate-900 bg-slate-900/20">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
                  開始一個新合作？
                </h3>
                <p className="text-sm text-slate-400 font-light mt-2 leading-relaxed">
                  請填寫右側表單或直接寄信到我的 Email。我通常會在 24 小時內回覆。
                </p>
              </div>

              {/* Detail Items */}
              <div className="space-y-6">
                
                {[
                  { icon: Mail, label: "電子信箱", val: displayEmail, href: `mailto:${displayEmail}`, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                  { icon: Phone, label: "聯絡電話", val: "+886 912 345 678", href: "tel:+886912345678", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                  { icon: MapPin, label: "工作地點", val: "台灣 (支援遠端/混合工作)", href: null, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" }
                ].map((item, index) => {
                  const IconComp = item.icon;
                  const Container = item.href ? 'a' : 'div';
                  return (
                    <Container
                      key={index}
                      href={item.href}
                      className={`flex items-center space-x-4 p-4 rounded-2xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/50 hover:border-slate-700/60 transition-all duration-300 ${item.href ? 'cursor-pointer' : ''}`}
                    >
                      <div className={`p-3 rounded-xl border ${item.color}`}>
                        <IconComp size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">{item.label}</p>
                        <p className="text-sm font-bold text-slate-200 mt-0.5">{item.val}</p>
                      </div>
                    </Container>
                  );
                })}
                
              </div>
            </div>

            {/* Sub-note */}
            <div className="pt-6 border-t border-slate-900 text-xs text-slate-500 leading-relaxed font-light">
              * 經由此表單傳送的訊息皆會安全發送給對應的候選人。
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-slate-900 bg-slate-900/20 relative overflow-hidden flex flex-col justify-center">
            {isSuccess ? (
              /* Success Anim Block */
              <div className="text-center py-16 space-y-4 animate-fade-in">
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-bounce">
                  <CheckCircle2 size={48} className="stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">感謝您的來信！</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto font-light leading-relaxed">
                  訊息已成功送出！系統已收到您的聯絡資訊，將會自動轉交給 {displayName}。
                </p>
              </div>
            ) : (
              /* Actual form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    您的姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="例如：王小明"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    電子信箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    訊息內容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="請輸入您想對我說的話..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 disabled:opacity-55 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/15 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      傳送中...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      送出訊息
                      <Send size={15} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
