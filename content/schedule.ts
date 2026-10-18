import { SYSTEM } from "./system.generated";

// Language forms are presentation; the selected ISO weekdays exist only in the registry.
const weekdays = [
  { ja: "月", en: "Monday", short: "Mon" },
  { ja: "火", en: "Tuesday", short: "Tue" },
  { ja: "水", en: "Wednesday", short: "Wed" },
  { ja: "木", en: "Thursday", short: "Thu" },
  { ja: "金", en: "Friday", short: "Fri" },
  { ja: "土", en: "Saturday", short: "Sat" },
  { ja: "日", en: "Sunday", short: "Sun" },
];
export const roastDays = Object.freeze(SYSTEM.roast_days.map((day) => Object.freeze(weekdays[day - 1])));
