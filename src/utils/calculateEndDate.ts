// /src/utils/calculateEndDate.ts
export function calculateEndDate(buyDate: string, period: string): string {
    const date = new Date(buyDate);

    if (period.includes("년")) {
        const years = parseInt(period.replace("년", ""));
        date.setFullYear(date.getFullYear() + years);
    } else if (period.includes("개월")) {
        const months = parseInt(period.replace("개월", ""));
        date.setMonth(date.getMonth() + months);
    } else if (period.includes("일")) {
        const days = parseInt(period.replace("일", ""));
        date.setDate(date.getDate() + days);
    }

    return date.toISOString().split("T")[0];
}
