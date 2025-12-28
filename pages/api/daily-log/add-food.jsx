import { connectDB } from "@/lib/db";
import { addFoodToDailyLog } from "@/lib/logic/logic";
import { authMiddleware } from "@/lib/middleware";
import { User } from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  await connectDB();

  await authMiddleware(req, res);
  const userId = req.userId;

  const { foodId, quantity } = req.body;

  if (!userId || !foodId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const today = new Date().toISOString().split("T")[0];

  const log = await addFoodToDailyLog({
    user,
    date: today,
    foodId,
    quantity,
  }); //جدا کردن logic از API

  res.status(200).json(log);
}
