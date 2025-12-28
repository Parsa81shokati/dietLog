import mongoose from "mongoose";
import FOOD_CATEGORIES from "../constants/categories";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: FOOD_CATEGORIES,
    required: true,
  },

  servingAmount: { type: Number, required: true, min: 0.1 }, // اندازه serving (مثلاً 1 عدد، 5 قاشق، 0.5 لیوان)
  servingUnit: { type: String, required: true }, // واحد serving (عدد، قاشق، لیوان)
});

export const Food = mongoose.models.Food || mongoose.model("Food", FoodSchema);
