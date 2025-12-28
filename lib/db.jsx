import mongoose from "mongoose";

let isConnected = false; //بررسی می‌کند آیا اتصال قبلی وجود دارد یا نه.
export async function connectDB() {
  if (isConnected) {
    console.log("using existing database connection");
    return;
  } //اگر قبلاً اتصال برقرار شده، دوباره اتصال نساز
  if (mongoose.connections.length > 0) {
    isConnected = mongoose.connections[0].readyState === 1;
    if (isConnected) {
      console.log("using existing database connection");
      return;
    }
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("new connection created");
    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.log("database connection faild", error);
  }
}
