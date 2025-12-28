import { connectDB } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware";
import { User } from "@/lib/models/User";
import { UserDiet } from "@/lib/models/UserDiet";

async function handler(req, res) {
  await connectDB();

  try {
    await authMiddleware(req, res);
    const userId = req.userId;

    if (req.method === "GET") {
      const diet = await UserDiet.findOne({ userId }); //پیدا کردن سند UserDiet مربوط به userId
      if (!diet) return res.status(404).json({ error: "Diet not found" });
      return res.status(200).json(diet);
    }

    if (req.method === "POST") {
      const { dailyLimits } = req.body;

      const existingDiet = await UserDiet.findOne({ userId });

      const diet = await UserDiet.findOneAndUpdate(
        { userId },
        { $set: { dailyLimits } },
        {
          upsert: true,
          new: true,
          runValidators: true,
          rawResult: true,
        }
      );

      if (!existingDiet) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { hasDiet: true } },
          { new: true }
        );
        console.log("UPDATED USER FROM DB:", updatedUser);
      }

      return res.status(existingDiet ? 201 : 200).json(diet);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export default handler;
