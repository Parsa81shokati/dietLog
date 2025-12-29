import FOOD_CATEGORIES from "@/lib/constants/categories";
import React, { useState } from "react";

function dashboard() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("milk");

  const [servingAmount, setServingAmount] = useState(1);
  const [servingUnit, setServingUnit] = useState("عدد");

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          servingAmount,
          servingUnit,
        }),
      });
      if (!res.ok) throw new Error("Error adding food");
      const newFood = await res.json();
      setFoods((prev) => [...prev, newFood]);
      setName("");

      setCategory("milk");
      setServingAmount(1);
      setServingUnit("عدد");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">مدیریت غذاها</h1>

      {/* فرم افزودن غذا */}
      <form
        onSubmit={handleAddFood}
        className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="نام غذا"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {FOOD_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="اندازه serving"
          value={servingAmount}
          min={0.1}
          step={0.1}
          onChange={(e) => setServingAmount(parseFloat(e.target.value))}
          required
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="واحد serving (عدد، قاشق، لیوان)"
          value={servingUnit}
          onChange={(e) => setServingUnit(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          افزودن غذا
        </button>
      </form>
    </div>
  );
}

export default dashboard;
