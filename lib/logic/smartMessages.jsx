const MESSAGES = {
  startStrong: ["شروع پرقدرت 👊 ادامه بده!", "روزتو عالی شروع کردی 🌱"],
  almostDone: ["تقریباً تمومه، عالی پیش رفتی 👌", "یه قدم دیگه تا هدف 💪"],
  exceeded: ["حواست باشه از حد مجاز رد نشی ⚠️"],
  perfect: ["امروز عالی بودی، دمت گرم 🔥"],
};

function getRemainingSummary(remaining) {
  return Object.entries(remaining)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${v} واحد ${k}`)
    .join("، ");
}

export function getSmartMessage(log, limits) {
  if (!log) return null;

  const totals = log.totals || {};
  const remaining = {};

  for (const key in limits) {
    remaining[key] = limits[key] - (totals[key] || 0);
  }

  const totalUsed = Object.values(totals).reduce((a, b) => a + b, 0);

  // 🟢 هنوز چیزی نخورده
  if (totalUsed === 0) {
    return "شروع پرقدرت داشته باش 💪 هنوز چیزی ثبت نکردی!";
  }

  // 🔥 همه چی تموم شده دقیقاً
  const allPerfect = Object.values(remaining).every((v) => v === 0);
  if (allPerfect) {
    return "همه واحدها دقیق مصرف شدن، عالی بودی 🔥";
  }

  // ⚠️ رد شده
  const exceeded = Object.values(remaining).some((v) => v < 0);
  if (exceeded) {
    return "یه کم از حد مجاز رد شدی، فردا جبران می‌کنی 👌";
  }

  // 👌 نزدیک به اتمام
  const lowRemaining = Object.values(remaining).some((v) => v <= 2);
  if (lowRemaining) {
    return " عالی شروع کردی👌";
  }

  // 🌱 حالت نرمال
  return "عالی پیش میری 🌱 ادامه بده!";
}
