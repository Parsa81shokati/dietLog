import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { useState } from "react";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import SetupModal from "./SetupModal";

dayjs.extend(jalaliday);
export default function HeaderStatus({ date, onOpenSetup }) {
  const [open, setOpen] = useState(false);
  const shamsiDate = dayjs(date)
    .calendar("jalali") // فعال کردن تقویم شمسی
    .locale("fa") // فارسی کردن ماه و روز
    .format("dddd D MMMM "); // مثال: شنبه، ۶ دی ۱۴۰۴

  console.log(date);
  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
      <FiCalendar className="text-gray-500 text-xl" />

      <p className="font-medium text-sm md:text-base flex-1">
        امروز: {shamsiDate}
      </p>

      <div className="flex justify-around gap-8">
        <div className=" text-green-600 flex items-center">
          <FiCheckCircle className="text-lg" />
          <span className="text-xs md:text-sm font-medium">رژیمت فعاله</span>
        </div>
        <IoSettingsSharp
          onClick={onOpenSetup}
          className="text-lg md:text-2xl text-gray-600"
        />
      </div>
      {open && <SetupModal />}
    </div>
  );
}
