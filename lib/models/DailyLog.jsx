import mongoose from "mongoose";
import FOOD_CATEGORIES from "../constants/categories";

const totalsSchema = {}; // یک ابجکت هست ک با دسته غذایی و مقداری ک کاربر در اون روز خورده است پر شود

FOOD_CATEGORIES.forEach((category) => {
  totalsSchema[category] = {
    type: Number,
    default: 0,
  };
}); // برای هر کتگوری یک مقدار باید ذخیره شود و اگر نباشد ۰ بذار

const DailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // شناسه کاربر
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  foods: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
      quantity: Number, //تعداد مصرف شده
      totalUnits: Number, //واحد مصرف واقعی
      createdAt: {
        type: Date,
        default: Date.now, // ⬅️ زمان ثبت غذا (UTC)
      },
    },
  ], // ارایه ای از غذاهای مصرف شده با تعداد اون غذا و واحد نهاییش
  totals: totalsSchema, //مجموع مصرف هر کتگوری در آن روز
});

DailyLogSchema.index({ userId: 1, date: 1 }, { unique: true }); //هر کاربر فقط یک لاگ در هر روز

export const DailyLog =
  mongoose.models.DailyLog || mongoose.model("DailyLog", DailyLogSchema);
