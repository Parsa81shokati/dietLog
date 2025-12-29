import { verifyToken } from "./jwt";

export async function authMiddleware(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
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
