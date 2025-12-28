import FOOD_CATEGORIES from "@/lib/constants/categories";
import { useState } from "react";
import AddFoodModal from "./AddFoodModal";

export default function PrimaryActions({ onAddMeal }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* دکمه‌های اصلی */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:bg-green-700 "
        >
          <span className="text-2xl"> +</span> ثبت غذا
        </button>
        <button
          onClick={() => router.push("/history")}
          className="bg-gray-100 px-4 rounded-xl flex items-center gap-1 hover:bg-gray-200 transition"
        >
          📅 تاریخچه
        </button>
        <button className="bg-gray-100 px-4 rounded-xl">📊</button>
        <AddFoodModal open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}
