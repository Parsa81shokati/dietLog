import { useRouter } from "next/router";
import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { LuUtensils } from "react-icons/lu";
import { LuAlarmClock } from "react-icons/lu";

function SetupModal({ onClose }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">تنظیمات شخصی</h3>
        <button onClick={onClose}>
          <IoClose className="text-gray-400 text-2xl" />
        </button>
      </div>

      {/* Edit Diet */}
      <button
        onClick={() => router.push("/setup-diet-custom")}
        className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <LuUtensils className="text-green-600" />
          </div>
          <span className="font-medium text-gray-700">ویرایش رژیم غذایی</span>
        </div>
        <HiOutlineChevronLeft className="text-gray-400" />
      </button>

      {/* Sleep Time */}
      <button
        onClick={() => router.push("/sleep")}
        className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <LuAlarmClock className="text-blue-600" />
          </div>
          <span className="font-medium text-gray-700">تنظیم ساعت خواب</span>
        </div>
        <HiOutlineChevronLeft className="text-gray-400" />
      </button>
    </div>
  );
}

export default SetupModal;
