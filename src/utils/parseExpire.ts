// /src/utils/parseExpire.ts
export interface ExpireInfo {
  storage: string; // 보관 방법
  period: string;  // 유통 기간
}

export function parseExpire(raw: string): ExpireInfo {
  if (!raw) return { storage: "정보 없음", period: "정보 없음" };

  let storage = "정보 없음";
  let period = "정보 없음";

  if (raw.includes("실온")) storage = "실온 보관";
  else if (raw.includes("냉장")) storage = "냉장 보관";
  else if (raw.includes("냉동")) storage = "냉동 보관";

  const yearMatch = raw.match(/(\d+)\s*년/);
  const monthMatch = raw.match(/(\d+)\s*(개월|월)/);
  const dayMatch = raw.match(/(\d+)\s*일/);

  if (yearMatch) {
    period = `${yearMatch[1]}년`;
  } else if (monthMatch) {
    period = `${monthMatch[1]}개월`;
  } else if (dayMatch) {
    period = `${dayMatch[1]}일`;
  }

  return { storage, period };
}
