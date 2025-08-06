// /src/types/food.ts
export type Food = {
  id: string;
  reportNo: string;
  reportDate: string;
  endDate: string;
  name: string;
  expireDays: string; 
  category: string;
  manufacturer: string;
  industry: string;
  address: string;
  closeDate: string;
  barCode: string;

  brcdNo: string;
  cmpnyName: string;
  productName: string;
  lastUpdate: string;
  smallCategory: string;
  midCategory: string;
  bigCategory: string;

  quantity: number;

  storageType?: string; 
  expirePeriod?: string;
  buyDate?: string;
};
