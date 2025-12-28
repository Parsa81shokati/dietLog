import { connectDB } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware";
import { User } from "@/lib/models/User";

export default async function handler(req, res) {
  await connectDB();

  await authMiddleware(req, res);
  if (!req.userId) return; // 👈 خیلی مهم

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({
    id: user._id,
    email: user.email,
    hasDiet: user.hasDiet,
  });
}
