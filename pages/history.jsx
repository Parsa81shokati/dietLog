import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { IoArrowBackOutline } from "react-icons/io5";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { useRouter } from "next/router";

dayjs.extend(jalaliday);

export default function MealHistory() {
  const { user, loading } = useAuth("/");
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    async function fetchHistory() {
      setLoadingHistory(true);

      const res = await fetch("/api/daily-log/history", {
        credentials: "include",
      });
      const data = await res.json();
      setHistory(data || []);
      setLoadingHistory(false);
    }

    fetchHistory();
  }, [user]);

  if (loading || loadingHistory)
    return <div className="text-center py-20">در حال بارگذاری...</div>;

  if (!history.length)
    return (
      <div className="text-center py-20 text-gray-500">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
        >
          <IoArrowBackOutline className="text-green-800 text-2xl" />
        </button>
        هنوز چیزی ثبت نکردی 🍽️
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📅 تاریخچه وعده‌ها
        </h1>
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
        >
          <IoArrowBackOutline className="text-green-800 text-2xl" />
        </button>
      </div>

      {history.map((day, idx) => {
        const shamsiDate = dayjs(day.date)
          .calendar("jalali")
          .locale("fa")
          .format("dddd D MMMM");

        return (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-4 space-y-3"
          >
            <h2 className="font-bold text-green-800">{shamsiDate}</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {day.foods.map((meal, i) => (
                <li
                  key={i}
                  className="flex gap-2 items-center p-2 rounded-lg hover:bg-green-50 transition"
                >
                  <span className="text-green-700 font-semibold text-sm">
                    🕘
                    {dayjs(meal.createdAt)
                      .calendar("jalali")
                      .locale("fa")
                      .format("HH:mm")}
                  </span>{" "}
                  <div className="flex items-center gap-2 text-sm md:text-base">
                    <span className="text-gray-500 text-sm">
                      {meal.quantity} {meal.foodId.servingUnit}
                    </span>
                    <span className="text-gray-600">{meal.foodId.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
