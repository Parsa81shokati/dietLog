import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SetupDiet() {
  const { user, loading } = useAuth("/"); // redirect if not logged in

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // redirect happens automatically
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-2">🥗 وقتشه رژیمتو ثبت کنی!</h1>
          <p className="text-gray-600 text-sm">
            برای اینکه بتونیم مصرف روزانت رو محاسبه کنیم و پیشرفتت رو نشون بدیم،
            ابتدا باید رژیمتو وارد کنی.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon="🍽️"
            title="ثبت وعده‌ها"
            desc="تمام وعده‌های روزانه رو راحت ثبت کن"
          />
          <FeatureCard
            icon="📊"
            title="واحدهای باقی‌مانده"
            desc="مقدار مجاز هر وعده رو ببین و برنامه‌ات رو کنترل کن"
          />
          <FeatureCard
            icon="⏰"
            title="یادآوری هوشمند"
            desc="با یادآوری‌های هوشمند، هیچ وعده‌ای از دست نمیره"
          />
        </div>

        {/* CTA */}
        <Link href="/setup-diet-custom">
          <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition">
            رژیمتو وارد کن
          </button>
        </Link>

        <p className="text-xs text-center text-gray-400 mt-2">
          بعداً هم می‌تونی رژیمتو ویرایش کنی
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-xl transition">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  );
}

// اگر بخوای بعداً از OptionCard و LimitRow هم استفاده کنی، میتونی مشابه زیر تغییرشون بدی:

function OptionCard({ icon, title, desc, active }) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-md cursor-pointer border-2 transition ${
        active
          ? "border-green-500 bg-green-50 hover:bg-green-100"
          : "border-transparent bg-white hover:bg-gray-50"
      }`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className="font-bold text-sm text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}

function LimitRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-3 shadow-sm">
      <span className="flex items-center gap-2 text-gray-700">
        {icon} {label}
      </span>
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-bold">
        {value}
      </span>
    </div>
  );
}
