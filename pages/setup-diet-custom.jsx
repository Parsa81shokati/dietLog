import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { IoArrowBackOutline } from "react-icons/io5";

const CATEGORIES = [
  { key: "milk", label: "شیر", icon: "🥛" },
  { key: "meat", label: "گوشت", icon: "🥩" },
  { key: "bread", label: "نان", icon: "🍞" },
  { key: "fat", label: "چربی", icon: "🫒" },
  { key: "sugar", label: "قند", icon: "🍬" },
  { key: "vegetables", label: "سبزیجات", icon: "🥦" },
];

export default function SetupDietCustom() {
  const { user, loading } = useAuth("/"); // redirect if not logged in

  const router = useRouter();

  const [limits, setLimits] = useState({
    milk: 0,
    meat: 0,
    bread: 0,
    fat: 0,
    sugar: 0,
    vegetables: 0,
  });

  const [initialLimits, setInitialLimits] = useState(null);

  const [saving, setSaving] = useState(false);

  // ===============================
  // Fetch diet on page load
  // ===============================
  useEffect(() => {
    async function fetchDiet() {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("/api/diet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();

          if (data?.dailyLimits) {
            setLimits(data.dailyLimits);
            setInitialLimits(data.dailyLimits);
          } else {
            setInitialLimits(limits);
          }
        } else {
          setInitialLimits(limits);
        }
      } catch (err) {
        console.error("Failed to fetch diet", err);
        setInitialLimits(limits);
      } finally {
      }
    }

    fetchDiet();
  }, []);

  // ===============================
  // Helpers
  // ===============================
  function changeValue(key, delta) {
    setLimits((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  }
  const hasChanges =
    initialLimits && JSON.stringify(limits) !== JSON.stringify(initialLimits);

  // ===============================
  // Save diet
  // ===============================
  async function saveDiet() {
    if (!hasChanges) return;

    setSaving(true);

    await fetch("/api/diet", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ dailyLimits: limits }),
    });

    setInitialLimits(limits);
    setSaving(false);

    router.push("/dashboard");
  }

  // ===============================
  // Loading state
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        در حال بارگذاری رژیم...
      </div>
    );
  }
  if (!user) return null; // redirect happens automatically

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-xl text-center font-bold">
            واحدهای مجاز روزانه رژیم
          </h1>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
          >
            <IoArrowBackOutline className="text-green-800 text-2xl" />
          </button>
        </div>

        {/* Units List */}
        <div className="bg-white rounded-2xl shadow divide-y">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-2 font-medium">
                <span className="text-xl">{cat.icon}</span>
                {cat.label}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeValue(cat.key, -1)}
                  className="w-9 h-9 rounded-lg bg-green-100 text-green-700 text-xl"
                >
                  −
                </button>

                <span className="w-6 text-center font-bold">
                  {limits[cat.key]}
                </span>

                <button
                  onClick={() => changeValue(cat.key, +1)}
                  className="w-9 h-9 rounded-lg bg-green-100 text-green-700 text-xl"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={saveDiet}
          disabled={!hasChanges || saving}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition
    ${
      hasChanges
        ? "bg-green-500 text-white hover:bg-green-700"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
        >
          {saving ? "در حال ذخیره..." : "ذخیره رژیم"}
        </button>

        {!hasChanges && (
          <p className="text-xs text-center text-gray-400">
            برای فعال شدن دکمه، مقادیر رو تغییر بده
          </p>
        )}
      </div>
    </div>
  );
}
