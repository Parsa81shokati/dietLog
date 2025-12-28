import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export default function SleepSettings() {
  const { user, loading } = useAuth("/"); // redirect if not logged in

  const router = useRouter();
  const [sleepTime, setSleepTime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");

  useEffect(() => {
    fetch("/api/user/day-settings", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.dayStartHour !== undefined) {
          setWakeTime(`${data.dayStartHour.toString().padStart(2, "0")}:00`);
          setSleepTime(`${data.dayEndHour.toString().padStart(2, "0")}:00`);
        }
      });
  }, []);

  async function saveSettings() {
    const token = localStorage.getItem("token");

    const dayStartHour = Number(wakeTime.split(":")[0]);
    const dayEndHour = Number(sleepTime.split(":")[0]);

    await fetch("/api/user/day-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ dayStartHour, dayEndHour }),
    });

    router.back();
  }
  if (loading) return <div>Loading...</div>;
  if (!user) return null; // redirect happens automatically
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            {/* <ArrowLeft className="text-gray-500" /> */}
          </button>
          <h1 className="text-xl font-bold">ساعت خواب و بیداری</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          {/* Sleep */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                {/* <Moon className="text-indigo-600" /> */}
              </div>
              <div>
                <p className="font-medium">ساعت خواب</p>
                <p className="text-sm text-gray-500">
                  زمانی که معمولاً می‌خوابی
                </p>
              </div>
            </div>

            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="border rounded-xl py-2 px-3"
            />
          </div>

          {/* Wake */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                {/* <Sun className="text-yellow-600" /> */}
              </div>
              <div>
                <p className="font-medium">ساعت بیدار شدن</p>
                <p className="text-sm text-gray-500">شروع روزت از این ساعته</p>
              </div>
            </div>

            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="border rounded-xl py-2 px-3"
            />
          </div>

          {/* Hint */}
          <div className="text-sm text-gray-500 leading-relaxed">
            🧠 وعده‌هایی که بعد از ساعت خواب ثبت می‌شن، برای روز بعد حساب می‌شن.
          </div>
        </div>

        {/* Save */}

        <button
          onClick={saveSettings}
          disabled={loading}
          className="w-full bg-green-500 disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold text-lg"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}
