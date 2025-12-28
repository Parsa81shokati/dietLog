export default function MealsTimeline({ meals }) {
  function formatIranTime(date) {
    return new Date(date).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tehran",
    });
  }
  if (!meals || meals.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center text-gray-400 font-medium">
        امروز هنوز چیزی ثبت نکردی 🍽️
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">
        لیست وعده‌های امروز
      </h3>
      <ul className="space-y-3 max-h-[300px] overflow-y-auto">
        {meals.map((meal, i) => {
          // محاسبه مقدار واقعی مصرفی
          const amountConsumed = meal.quantity * meal.foodId.servingAmount;
          const unit = meal.foodId.servingUnit;

          return (
            <li
              key={i}
              className="flex items-center justify-between gap-3 p-3 rounded-xl transition"
            >
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-green-700 font-semibold">
                  🕘 {formatIranTime(meal.createdAt)}
                </span>
                <span className="text-sm text-gray-600">
                  {amountConsumed} {unit}
                </span>
                <span className="font-medium text-gray-800">
                  {meal.foodId.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
