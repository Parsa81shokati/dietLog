import { connectDB } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware";
import { User } from "@/lib/models/User";

export default async function handler(req, res) {
  await connectDB();

  try {
    await authMiddleware(req, res);
    const userId = req.userId;

    // گرفتن تنظیمات فعلی
    if (req.method === "GET") {
      const user = await User.findById(userId).select(
        "dayStartHour dayEndHour"
      );

      return res.status(200).json(user);
    }

    // ذخیره تنظیمات جدید
    if (req.method === "POST") {
      const { dayStartHour, dayEndHour } = req.body;

      if (typeof dayStartHour !== "number" || typeof dayEndHour !== "number") {
        return res.status(400).json({ error: "Invalid input" });
      }

      await User.findByIdAndUpdate(userId, {
        $set: { dayStartHour, dayEndHour },
      });

      return res.status(200).json({ message: "Settings saved" });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
