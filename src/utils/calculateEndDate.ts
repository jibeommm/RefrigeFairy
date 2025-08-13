// /src/utils/calculateEndDate.ts
export function calculateEndDate(buyDate: string, period: string | number): string {
  const buy = new Date(buyDate);
  
  if (typeof period === 'number') {
    buy.setDate(buy.getDate() + period);
    return buy.toISOString().split('T')[0];
  }
  
  if (typeof period === 'string') {
    if (period.includes('일')) {
      const days = parseInt(period.replace(/[^\d]/g, ''), 10) || 0;
      buy.setDate(buy.getDate() + days);
    } else if (period.includes('개월')) {
      const months = parseInt(period.replace(/[^\d]/g, ''), 10) || 0;
      buy.setMonth(buy.getMonth() + months);
    } else if (period.includes('년')) {
      const years = parseInt(period.replace(/[^\d]/g, ''), 10) || 0;
      buy.setFullYear(buy.getFullYear() + years);
    }
    
    return buy.toISOString().split('T')[0];
  }
  
  buy.setDate(buy.getDate() + 14);
  return buy.toISOString().split('T')[0];
}
