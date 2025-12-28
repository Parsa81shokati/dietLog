import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, //بهتر است قبل از ذخیره، lowercase شود و validation ساده برای ایمیل اضافه شود.
  password: { type: String, required: true },
  hasDiet: {
    type: Boolean,
    default: false,
    required: true,
  },

  dayStartHour: {
    type: Number,
    default: 7,
  },
  dayEndHour: {
    type: Number,
    default: 2,
  }, //استفاده میشهgetUserDay
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
