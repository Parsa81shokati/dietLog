import { connectDB } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware";
import { DailyLog } from "@/lib/models/DailyLog";
import { Food } from "@/lib/models/Food";

async function handler(req, res) {
  await connectDB();

  try {
    await authMiddleware(req, res);
    const userId = req.userId;

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // گرفتن تمام لاگ‌های کاربر
    const logs = await DailyLog.find({ userId })
      .sort({ date: -1 }) // مرتب‌سازی بر اساس تاریخ جدیدترین
      .populate("foods.foodId", "name servingUnit"); // جزئیات غذا

    // تبدیل هر log به فرمت دلخواه
    const result = logs.map((log) => ({
      date: log.date,
      foods: log.foods.map((f) => ({
        foodId: {
          name: f.foodId.name,
          servingUnit: f.foodId.servingUnit,
        },
        quantity: f.quantity,
        createdAt: f.createdAt,
      })),
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export default handler;
