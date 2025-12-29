import { useEffect, useRef, useState } from "react";

export default function AddFoodModal({ open, onClose, onSuccess }) {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const amountRef = useRef(null);

  useEffect(() => {
    if (!open || foods.length) return;
    fetch("/api/foods", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setFoods(data.foods));
  }, [open]);

  useEffect(() => {
    if (selectedFood && amountRef.current) {
      amountRef.current.focus();
    }
  }, [selectedFood]);

  const filteredFoods =
    query.length > 0
      ? foods.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
      : [];

  const units = selectedFood ? Number(amount) / selectedFood.servingAmount : 0;

  async function handleSubmit() {
    if (!selectedFood || !amount || amount <= 0) return;

    setLoading(true);

    await fetch("/api/daily-log/add-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        foodId: selectedFood._id,
        quantity: units,
      }),
    });
    if (onSuccess) {
      await onSuccess(); // 👈 رفرش دیتا
    }
    setLoading(false);
    reset();
    onClose();
  }

  function reset() {
    setQuery("");
    setSelectedFood(null);
    setAmount("");
  }

  if (!open) return null;
  console.log(selectedFood);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-l from-green-600 to-emerald-500 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 text-white/70 hover:text-white text-lg"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-center">🍽️ ثبت غذا</h2>
          <p className="text-sm text-center text-white/80 mt-1">
            غذای مصرف‌شده و مقدارش رو وارد کن
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedFood(null);
              }}
              placeholder="جستجوی غذا (مثلاً نان، برنج...)"
              className="w-full border border-gray-200 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-green-400 outline-none"
            />

            {filteredFoods.length > 0 && !selectedFood && (
              <div className="absolute z-20 mt-2 w-full bg-white border rounded-2xl shadow max-h-60 overflow-y-auto">
                {filteredFoods.map((food) => (
                  <button
                    key={food._id}
                    onClick={() => {
                      setSelectedFood(food);
                      setQuery(food.name);
                    }}
                    className="w-full text-right px-4 py-3 hover:bg-green-50 transition"
                  >
                    <div className="font-medium">{food.name}</div>
                    <div className="text-xs text-gray-400">
                      هر واحد = {food.servingAmount} {food.servingUnit}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Food Card */}
          {selectedFood && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-bold text-green-800">
                  {selectedFood.name}
                </div>
                <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                  هر واحد = {selectedFood.servingAmount}{" "}
                  {selectedFood.servingUnit}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  ref={amountRef}
                  type="number"
                  step="0.5"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="مثلاً 0.5"
                  className="flex-1 border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                />
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {selectedFood.servingUnit}
                </span>
              </div>

              <div className="text-xs text-gray-600 bg-white/60 rounded-xl p-2 text-center">
                مجموعاً{" "}
                <b className="text-green-700">
                  {amount ? amount / selectedFood.servingAmount : 0} واحد
                </b>{" "}
                ثبت می‌شود.
              </div>
            </div>
          )}

          {!selectedFood && (
            <div className="text-center text-sm text-gray-400 py-6">
              🔍 غذات رو جستجو کن
            </div>
          )}

          {/* Submit */}
          <button
            disabled={!selectedFood || !amount || loading}
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold transition"
          >
            {loading ? "در حال ثبت..." : "ثبت غذا "}
          </button>
        </div>
      </div>
    </div>
  );
}
