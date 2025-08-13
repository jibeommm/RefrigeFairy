// /src/hooks/useBarcodeQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchBarcode } from "../api/fetchBarcode";
import type { Food } from "../types/food";

export function useBarcodeQuery(barcode: string) {
  return useQuery<Food>({
    queryKey: ["barcode", barcode],
    queryFn: () => {
      return fetchBarcode(barcode);
    },
    enabled: !!barcode && barcode.trim().length > 0,
    staleTime: 1000 * 60, 
  });
}
