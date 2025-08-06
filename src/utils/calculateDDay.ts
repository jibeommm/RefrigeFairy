export function calculateDDay(endDate: string): { label: string; color: string } {
  if (!endDate) return { label: "정보 없음", color: "gray" };

  const today = new Date();
  const expireDate = new Date(endDate);

  const diffTime = expireDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    if (diffDays <= 3) {
      return { label: `D-${diffDays}`, color: "red" };
    } else if (diffDays <= 7) {
      return { label: `D-${diffDays}`, color: "orange" };
    } else {
      return { label: `D-${diffDays}`, color: "white" };
    }
  } else if (diffDays === 0) {
    return { label: "D-Day", color: "red" };
  } else {
    return { label: `D+${Math.abs(diffDays)}`, color: "black" }; 
  }
}
