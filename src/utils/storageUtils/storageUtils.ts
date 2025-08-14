/* src/utils/storageUtils/storageUtils.ts */
import type { Food } from '../../types/food';

export function groupByStorage(list: Food[]) {
  const grouped: Record<"냉동" | "냉장" | "실온", Food[]> = { 냉동: [], 냉장: [], 실온: [] };

  list.forEach((item) => {
    if (item.storageType === '냉동') {
      grouped["냉동"].push(item);
    } else if (item.storageType === '냉장') {
      grouped["냉장"].push(item);
    } else {
      grouped["실온"].push(item);
    }
  });

  return grouped;
}
