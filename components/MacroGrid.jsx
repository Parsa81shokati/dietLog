import MacroCard from "./MacroCard";

const CATEGORY_META = {
  meat: {
    title: "پروتئین",
    icon: "🥩",
    strokeColor: "#ef4444",
    bgColor: "#fecaca",
  },
  bread: {
    title: "نان و غلات",
    icon: "🍞",
    strokeColor: "#f97316",
    bgColor: "#fed7aa",
  },
  vegetables: {
    title: "سبزیجات",
    icon: "🥦",
    strokeColor: "#22c55e",
    bgColor: "#bbf7d0",
  },
  milk: {
    title: "لبنیات",
    icon: "🥛",
    strokeColor: "#3b82f6",
    bgColor: "#bfdbfe",
  },
  fat: {
    title: "چربی",
    icon: "🫒",
    strokeColor: "#eab308",
    bgColor: "#fef9c3",
  },
  sugar: {
    title: "قند",
    icon: "🍭",
    strokeColor: "#ec4899",
    bgColor: "#fbcfe8",
  },
  fruit: {
    title: "میوه",
    icon: "🍎",
    strokeColor: "#f97316", // یا رنگ دلخواه
    bgColor: "#fed7aa",
  },
};

export default function MacroGrid({ log }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(CATEGORY_META).map(([key, category]) => (
        <MacroCard
          key={key}
          title={category.title}
          icon={category.icon}
          used={log?.totals[key] || 0} // استفاده از log
          limits={log?.limits[key]}
          strokeColor={category.strokeColor}
          bgColor={category.bgColor}
        />
      ))}
    </div>
  );
}
