import { useState } from "react";
import { useRouter } from "next/router";
import { GoShieldCheck } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOpen } from "react-icons/md";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const url = isRegister ? "/api/auth/register" : "/api/auth/login";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      alert(data.error || "خطا در ورود/ثبت نام");
      return;
    }

    if (!data.user.hasDiet) {
      router.replace("/setup-diet");
    } else {
      router.replace("/dashboard");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <GoShieldCheck className="text-green-600 text-2xl" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 text-sm font-medium">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 rounded-lg transition ${
              !isRegister ? "bg-white text-green-600 shadow" : "text-gray-500"
            }`}
          >
            ورود
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 rounded-lg transition ${
              isRegister ? "bg-white text-green-600 shadow" : "text-gray-500"
            }`}
          >
            ثبت‌نام
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-vazirmatn font-medium">
            {isRegister ? "خوش اومدی 👋" : "خوش برگشتی 👋"}
          </h1>

          <p className="text-sm text-gray-500">
            {isRegister
              ? "برای ادامه اطلاعاتت رو وارد کن"
              : "برای ادامه وارد حساب کاربریت شو"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="absolute right-2 top-3 h-7 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <AiOutlineMail className="text-green-700 text-lg " />
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="absolute right-2 top-3 h-7 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <MdLockOpen className="text-green-700 text-lg " />
            </span>
          </div>

          {!isRegister && (
            <div className="text-left text-xs text-green-600 cursor-pointer">
              رمز عبور را فراموش کرده‌ای؟
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition"
          >
            {isRegister ? "ثبت‌نام" : "ورود"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          با ورود یا ثبت‌نام، قوانین استفاده را می‌پذیرید
        </p>
      </div>
    </div>
  );
}
