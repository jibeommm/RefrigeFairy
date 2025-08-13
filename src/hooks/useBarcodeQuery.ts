// /src/hooks/useBarcodeQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchBarcode } from "../api/fetchBarcode";
import type { Food } from "../types/food";

export function useBarcodeQuery(barcode: string) {
  console.log('바코드 값:', barcode);
  console.log('쿼리 실행 여부:', !!barcode && barcode.trim().length > 0);
  
  return useQuery<Food>({
    queryKey: ["barcode", barcode],
    queryFn: () => {
      console.log('API 호출 시작:', barcode);
      return fetchBarcode(barcode);
    },
    enabled: !!barcode && barcode.trim().length > 0,
    staleTime: 1000 * 60, 
  });
}
