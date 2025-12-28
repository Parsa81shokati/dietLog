import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  console.log("LOGIN API HIT");
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ userId: user._id });

  const isDev = process.env.NODE_ENV !== "production";
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=${
      isDev ? "Lax" : "None"
    }; ${isDev ? "" : "Secure"}`
  );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      hasDiet: user.hasDiet,
    },
  });
}
