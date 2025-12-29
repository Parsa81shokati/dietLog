import { verifyToken } from "./jwt";

export async function authMiddleware(req, res) {
  const token = req.cookies.token; // 👈 فقط از cookie

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
