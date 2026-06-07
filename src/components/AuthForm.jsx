import React, { useState } from 'react';

export default function AuthForm({ users, setUsers, onLoginSuccess, onCancel }) {
    const [isSignUp, setIsSignUp] = useState(false); // 控制目前是註冊還是登入畫面
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            // ─── 註冊邏輯 ───
            // 1. 檢查密碼是否一致
            if (password !== confirmPassword) {
                alert('兩次輸入的密碼不相同！');
                return;
            }

            // 2. 檢查 Email 是否已經被註冊過
            const isExist = users.some(user => user.email.toLowerCase() === email.toLowerCase());
            if (isExist) {
                alert('此 Email 帳號已被註冊！');
                return;
            }

            // 3. 建立新會員（利用時間戳記產生隨機 id）
            const newUser = {
                id: Date.now(), // 給予大於 1000 的獨立 ID
                email: email,
                password: password
            };

            // 4. 回傳給 App.jsx 更新狀態
            setUsers([...users, newUser]);
            alert('帳號註冊成功！系統已為您自動切換至登入畫面。');

            // 註冊完後自動清空密碼並切換到登入頁
            setPassword('');
            setConfirmPassword('');
            setIsSignUp(false);

        } else {
            // ─── 登入邏輯 ───
            // 尋找帳號密碼是否完全吻合
            const matchedUser = users.find(
                user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
            );

            if (matchedUser) {
                alert('登入成功！歡迎回來。');
                onLoginSuccess(matchedUser); // 告訴 App.jsx 登入成功並傳遞會員資料
            } else {
                alert('帳號或密碼錯誤，請再試一次。');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto pt-24 pb-12 px-4 relative z-10">
            {/* 玻璃擬態卡片外殼 */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">

                {/* 標題與切換分頁 */}
                <div className="text-center space-y-2">
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-wider uppercase">
                        {isSignUp ? 'Join Us' : 'Welcome Back'}
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        {isSignUp ? '建立人才帳號' : '登入您的帳號'}
                    </h2>
                    <p className="text-xs text-slate-400">
                        {isSignUp ? '註冊後即可建立並發布您的個人專屬簡歷' : '登入以查看您的簡歷狀態與進行編輯'}
                    </p>
                </div>

                {/* 表單本體 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1.5 tracking-wider">
                            EMAIL 帳號
                        </label>
                        <input
                            type="email"
                            required
                            /* 👑 這裡把原本的 example@mail.com 改成一般的中文提示字（或者留空 "" 也可以） */
                            placeholder="請輸入您的 Email 帳號"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1.5 tracking-wider">
                            設定密碼
                        </label>
                        <input
                            type="password"
                            required
                            /* 👑 這裡把密碼的 placeholder 改成文字提示，這樣才不會有一點一點的點點點偽裝成密碼 */
                            placeholder="請輸入密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all text-sm"
                        />
                    </div>

                    {/* 如果是註冊模式，多跳出一個「確認密碼」輸入框 */}
                    {isSignUp && (
                        <div className="animate-fade-in">
                            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 tracking-wider">
                                再次確認密碼
                            </label>
                            <input
                                type="password"
                                required
                                /* 👑 同步修正註冊時的密碼提示字 */
                                placeholder="請再次輸入密碼確認"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all text-sm"
                            />
                        </div>
                    )}

                    {/* 按鈕功能區 */}
                    <div className="pt-2 space-y-2">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/10"
                        >
                            {isSignUp ? '註冊新帳號' : '登入市集系統'}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full py-3 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 font-semibold text-sm hover:text-slate-200 hover:bg-slate-900 transition-all"
                        >
                            取消返回
                        </button>
                    </div>
                </form>

                {/* 切換登入/註冊模式的按鈕 */}
                <div className="text-center pt-2 border-t border-slate-850">
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            // 切換時順便把密碼框清空
                            setPassword('');
                            setConfirmPassword('');
                        }}
                        className="text-xs text-slate-400 hover:text-emerald-400 underline transition-colors"
                    >
                        {isSignUp ? '已經有帳號了？點此返回登入' : '還沒有帳號？點此免費註冊一個'}
                    </button>
                </div>

            </div>
        </div>
    );
}