import { DailyLog } from "../models/DailyLog";
import { Food } from "../models/Food";

function getUserDay(dateNow, user) {
  const now = new Date(dateNow);
  const dayStartHour = user.dayStartHour ?? 7; // ساعت شروع روز
  const dayEndHour = user.dayEndHour ?? 2; // ساعت پایان روز (می‌تواند روز بعد باشد)

  let day = new Date(now); //کپی تاریخ برای محاسبات بعدی

  // اگر ساعت فعلی قبل از شروع روز باشد و روز شروع از روز پایان بزرگ‌تر باشد (مثلاً 7 صبح تا 2 بامداد)، روز قبل در نظر گرفته می‌شود.
  if (now.getHours() < dayStartHour && dayStartHour > dayEndHour) {
    day.setDate(day.getDate() - 1); //تنظیم روز به روز قبل.
  }

  return day.toISOString().split("T")[0]; //خروجی به فرمت YYYY-MM-DD برای ذخیره در دیتابیس.
}

async function startDailyLog(user) {
  const date = getUserDay(new Date(), user); //دریافت تاریخ روزانه مطابق ساعت شروع و پایان کاربر

  const existing = await DailyLog.findOne({ userId: user._id, date }); //چک کردن وجود لاگ روزانه برای کاربر
  if (existing) return existing; //اگر لاگ روزانه وجود داشت همان را برگردان

  return DailyLog.create({
    userId: user._id,
    date,
  }); //اگر لاگ روزانه وجود ندارد، یک سند جدید ساخته می‌شود.
}

async function addFoodToDailyLog({ user, foodId, quantity }) {
  const date = getUserDay(new Date(), user); //گرفتن تاریخ روز با توجه به user.

  const food = await Food.findById(foodId);
  if (!food) throw new Error("Food not found"); // اطلاعات غذا را از دیتابیس می‌گیرد و جلوگیری از ذخیره‌ی داده‌ی نامعتبر

  // پیدا کردن لاگ روزانه یا ساختن خودکار
  let dailyLog = await DailyLog.findOne({ userId: user._id, date });

  if (!dailyLog) {
    dailyLog = await DailyLog.create({
      userId: user._id,
      date,
      foods: [],
      totals: {},
    });
  } // ایجاد لاگ جدید اگر وجود نداشت

  dailyLog.foods.push({
    foodId,
    quantity,
    totalUnits: quantity,
    createdAt: new Date(),
  }); //چه غذایی چقدر چند واحد

  // جمع کردن واحدها
  if (!dailyLog.totals[food.category]) dailyLog.totals[food.category] = 0;
  dailyLog.totals[food.category] += quantity;

  await dailyLog.save();
  return dailyLog;
}

//از هر کتگوری چند تا مونده
function calculateRemainingUnits(dailyTotals, dailyLimits) {
  const remaining = {};

  for (const key in dailyLimits) {
    remaining[key] = dailyLimits[key] - (dailyTotals[key] || 0);
  }

  return remaining;
}

export {
  calculateRemainingUnits,
  startDailyLog,
  addFoodToDailyLog,
  getUserDay,
};
