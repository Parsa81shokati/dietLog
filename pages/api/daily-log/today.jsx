import { connectDB } from "@/lib/db";
import { calculateRemainingUnits, getUserDay } from "@/lib/logic/logic";

import { authMiddleware } from "@/lib/middleware";
import { DailyLog } from "@/lib/models/DailyLog";
import { User } from "@/lib/models/User";
import { UserDiet } from "@/lib/models/UserDiet";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  await connectDB();

  await authMiddleware(req, res);
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const date = getUserDay(new Date(), user);

  const log = await DailyLog.findOne({ userId, date }).populate("foods.foodId");

  if (!log) return res.status(200).json(null);

  const diet = await UserDiet.findOne({ userId });

  const limits = diet.dailyLimits.toObject();
  const totals = log.totals;

  const remaining = calculateRemainingUnits(totals, limits);

  res.status(200).json({
    ...log.toObject(),
    limits,
    remaining,
  });
}
