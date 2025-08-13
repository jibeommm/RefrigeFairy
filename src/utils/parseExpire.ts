// /src/utils/parseExpire.ts
export interface ExpireInfo {
  storage: string; 
  period: string;
  days?: number;
}

export function parseExpire(raw: string): ExpireInfo {
  if (!raw) return { storage: "정보 없음", period: "정보 없음", days: 0 };

  let storage = "정보 없음";
  let period = "정보 없음";
  let days = 0;

  if (raw.includes("실온")) storage = "실온";
  else if (raw.includes("냉장")) storage = "냉장";
  else if (raw.includes("냉동")) storage = "냉동";

  const yearMatch = raw.match(/(\d+)\s*년/);
  const monthMatch = raw.match(/(\d+)\s*(개월|월)/);
  const dayMatch = raw.match(/(\d+)\s*일/);

  if (yearMatch) {
    const years = parseInt(yearMatch[1]);
    period = `${years}년`;
    days = years * 365;
  } else if (monthMatch) {
    const months = parseInt(monthMatch[1]);
    period = `${months}개월`;
    days = months === 12 ? 365 : months * 30;
  } else if (dayMatch) {
    const dayNum = parseInt(dayMatch[1]);
    period = `${dayNum}일`;
    days = dayNum;
  }

  return { storage, period, days };
}
