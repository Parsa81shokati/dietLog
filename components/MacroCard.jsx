export default function MacroCard({
  title,
  icon,
  used,
  limits,
  strokeColor,
  bgColor,
}) {
  // const percent = Math.min((used /  limits) * 100, 100);
  console.log(limits);
  const radius = 45; // شعاع دایره
  const stroke = 8; // ضخامت دایره
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(used / limits, 1);
  const strokeDashoffset = circumference - percent * circumference;

  const overLimit = used > limits;

  const baseColor = overLimit ? "#ef4444" : strokeColor; // رنگ پر شده
  const backgroundColor = overLimit ? "#fee2e2" : bgColor; // رنگ خالی

  return (
    <div className="bg-white rounded-xl gap-2 shadow px-2 py-8 flex flex-col items-center">
      <div className="flex mb-2">
        <span className="text-2xl "> {icon}</span>{" "}
        <p className="text-lg md:text-xl font-semibold">{title}</p>
      </div>
      <div className="drop-shadow-2xl">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke={backgroundColor}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke={baseColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={overLimit ? "#dc2626" : "#000"}
            className="font-bold text-base"
          >
            {limits} / {used}
          </text>
        </svg>
      </div>
      <p
        className={`text-sm mt-2 ${
          overLimit ? "text-red-600" : "text-gray-500"
        }`}
      >
        {overLimit
          ? `${used - limits} واحد اضافی مصرف شده!`
          : `${limits - used} واحد مانده`}
      </p>
    </div>
  );
}
