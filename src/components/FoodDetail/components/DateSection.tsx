// src/components/FoodDetail/components/DateSection.tsx

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useEffect } from "react";
import Input from "./Input";
import PeriodUnitSelect, { type PeriodUnit } from "./PeriodUnitSelect";
import DBadge from "../../DBadge/DBadge";
import type { Food } from "../../../types/food";
import { useSettings } from "../../../hooks/useSettings";
import { calculateEndDate } from "../../../utils/calculateEndDate";
import { parseExpire } from "../../../utils/parseExpire";
import "../css/datepicker.css";

interface Props {
  food: Food;
  formData: any;
  setAndSave: (key: string, value: any) => void;
  apiData?: any;
}

export default function DateSection({ food, formData, setAndSave, apiData }: Props) {
  const settings = useSettings();

  const createSafeDate = (dateValue: any): Date | null => {
    if (!dateValue) return null;
    try {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const formatDate = (date: Date | null): string =>
    date ? date.toISOString().split("T")[0] : "";

  const updateEndDate = (days: number) => {
    if (formData.buyDate) {
      const endDate = calculateEndDate(formData.buyDate, days);
      setAndSave("endDate", endDate);
    }
  };

  useEffect(() => {
    if (apiData && (!formData.expirePeriod || formData.expirePeriod === 0)) {
      const apiText = apiData?.POG_DAYCNT || "";
      if (apiText) {
        const { days } = parseExpire(apiText);
        if (days && days > 0) setAndSave("expirePeriod", days);
      }
    }
  }, [apiData, formData.expirePeriod]);

  const getPeriodValue = (): { value: number; unit: PeriodUnit } => {
    const period = formData.expirePeriod || 7;
    if (period >= 365 && period % 365 === 0) {
      return { value: period / 365, unit: "year" };
    }
    if (period >= 30 && period % 30 === 0) {
      return { value: period / 30, unit: "month" };
    }
    return { value: period, unit: "day" };
  };

  const currentPeriod = getPeriodValue();

  const convertToDays = (value: number, unit: PeriodUnit): number => {
    if (unit === "month") return value * 30;
    if (unit === "year") return value * 365;
    return value;
  };

  const handlePeriodValueChange = (value: string) => {
    const numValue = parseInt(value, 10) || 1;
    const days = convertToDays(numValue, currentPeriod.unit);
    setAndSave("expirePeriod", days);
    updateEndDate(days);
  };

  const handlePeriodUnitChange = (unit: PeriodUnit) => {
    const days = convertToDays(currentPeriod.value, unit);
    setAndSave("expirePeriod", days);
    updateEndDate(days);
  };

  const handleBuyDateChange = (date: Date | null) => {
    const dateStr = formatDate(date);
    setAndSave("buyDate", dateStr);
    if (dateStr && formData.expirePeriod) {
      updateEndDate(formData.expirePeriod);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setAndSave("endDate", formatDate(date));
    if (formData.buyDate && date) {
      const buyDateObj = new Date(formData.buyDate);
      const diffMs = date.getTime() - buyDateObj.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setAndSave("expirePeriod", diffDays);
      }
    }
  };

  const foodWithEndDate = { ...food, endDate: formData.endDate };

  return (
    <>
      <div className="foodDetailrow">
        <span className="foodDetaillabel">구매한 날짜 | 유통기한</span>
        <DatePicker
          selected={createSafeDate(formData.buyDate)}
          onChange={handleBuyDateChange}
          dateFormat="yyyy-MM-dd"
          locale={ko}
          isClearable
          strictParsing
        />
        <span> | </span>
        <div className="period-input-group">
          <Input type="number" value={currentPeriod.value} onSave={handlePeriodValueChange} />
          <PeriodUnitSelect value={currentPeriod.unit} onChange={handlePeriodUnitChange} />
        </div>
      </div>

      <div className="foodDetailrow">
        <span className="foodDetaillabel">유통기한 날짜 | D-day</span>
        <DatePicker
          selected={createSafeDate(formData.endDate)}
          onChange={handleEndDateChange}
          dateFormat="yyyy-MM-dd"
          locale={ko}
          placeholderText="유통기한을 선택하세요"
          isClearable
          strictParsing
        />
        <span> | </span>
        <DBadge food={foodWithEndDate} settings={settings.expirySettings} />
      </div>
    </>
  );
}
