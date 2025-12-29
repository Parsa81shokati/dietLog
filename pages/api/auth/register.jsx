import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  await connectDB();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const hashed = await bcrypt.hash(password, 10); //هش کردن پسورد

  const user = await User.create({ email, password: hashed });
  const token = signToken({ userId: user._id });
  const isDev = process.env.NODE_ENV !== "production";

  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      hasDiet: user.hasDiet,
    },
  });
}
