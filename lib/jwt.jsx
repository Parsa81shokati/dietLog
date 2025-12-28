import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const SECRET = process.env.JWT_SECRET;

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" }); //تولید JWT با اعتبار ۷ روز.
}

function verifyToken(token) {
  return jwt.verify(token, SECRET); //بررسی صحت JWT و بازگرداندن payload.
}

export { signToken, verifyToken };
