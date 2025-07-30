import { useQuery } from '@tanstack/react-query';
import { fetchBarcode } from '../api/fetchBarcode';
import type { Food } from '../types/food';

export function useBarcodeQuery(barcode: string) {
  return useQuery<Food>({
    queryKey: ['barcode', barcode],
    queryFn: () => fetchBarcode(barcode),
    enabled: !!barcode,
  });
}
