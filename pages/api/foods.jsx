import { connectDB } from "@/lib/db";
import { Food } from "@/lib/models/Food";

export default async function handler(req, res) {
  await connectDB();
  try {
    if (req.method === "GET") {
      const foods = await Food.find();
      return res.status(200).json({ foods });
    }
    if (req.method === "POST") {
      const { name, category, servingAmount, servingUnit } = req.body;

      if (!name || !category || !servingAmount || !servingUnit) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const food = await Food.create({
        name,
        category,
        servingAmount,
        servingUnit,
      });

      res.status(201).json(food);
    }
  } catch (err) {
    return res.status(500).json({ message: " error get data" });
  }
}
