// /src/api/fetchBarcode.ts
import type { Food } from "../types/food";

const API_KEY = import.meta.env.VITE_FOOD_API_KEY as string;


export async function fetchBarcode(barcode: string): Promise<Food> {
  if (!barcode) throw new Error("바코드가 필요합니다.");

  const urlC005 = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5/BAR_CD=${barcode}`;
  const res1 = await fetch(urlC005);
  if (!res1.ok) throw new Error("C005 API 호출 실패");
  const data1 = await res1.json();
  const item1 = data1?.C005?.row?.[0];

  const urlI2570 = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/I2570/json/1/5/BRCD_NO=${barcode}`;
  const res2 = await fetch(urlI2570);
  const data2 = await res2.json().catch(() => null);
  const item2 = data2?.I2570?.row?.[0];

  return {
    id: barcode,

    name: item1?.PRDLST_NM || "정보 없음",
    reportNo: item1?.PRDLST_REPORT_NO || "정보 없음",
    reportDate: item1?.PRMS_DT || "정보 없음",
    endDate: item1?.END_DT || "정보 없음",
    expireDays: item1?.POG_DAYCNT || "정보 없음",
    category: item1?.PRDLST_DCNM || "정보 없음",
    manufacturer: item1?.BSSH_NM || "정보 없음",
    industry: item1?.INDUTY_NM || "정보 없음",
    address: item1?.SITE_ADDR || "정보 없음",
    closeDate: item1?.CLSBIZ_DT || "정보 없음",
    barCode: item1?.BAR_CD || barcode,

    brcdNo: item2?.BRCD_NO || barcode,
    cmpnyName: item2?.CMPNY_NM || "정보 없음",
    productName: item2?.PRDT_NM || "정보 없음",
    lastUpdate: item2?.LAST_UPDT_DTM || "정보 없음",
    smallCategory: item2?.PRDLST_NM || "정보 없음",
    midCategory: item2?.HRNK_PRDLST_NM || "정보 없음",
    bigCategory: item2?.HTRK_PRDLST_NM || "정보 없음",

    quantity: 1,
  };
}
