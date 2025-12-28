import mongoose from "mongoose";
import FOOD_CATEGORIES from "../constants/categories";

const dailyLimitsSchema = {};

FOOD_CATEGORIES.forEach((category) => {
  dailyLimitsSchema[category] = {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  };
}); // برای هر کتگوری یه ابجکت داینامیک میسازه شامل نام کتگوری و تعدادی ک توی رژیم هست

const DailyLimitsSchema = new mongoose.Schema(
  dailyLimitsSchema,
  { _id: false } // خیلی مهم
);

const UserDietSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  dailyLimits: dailyLimitsSchema, // برای هر کاربر یک رژیم
});

export const UserDiet =
  mongoose.models.UserDiet || mongoose.model("UserDiet", UserDietSchema);
