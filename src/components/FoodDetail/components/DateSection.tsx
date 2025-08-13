// src/components/FoodDetail/components/DateSection.tsx
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/locale';
import { addDays } from 'date-fns';
import { useEffect } from 'react';
import Input from "./Input";
import PeriodUnitSelect, { type PeriodUnit } from "./PeriodUnitSelect";
import DBadge, { type BadgeTone } from '../../DBadge/DBadge';
import { useSettings } from '../../../hooks/useSettings';
import { dBadge } from '../../../pages/StoragePage/helpers';
import { parseExpire } from '../../../utils/parseExpire';
import "../datepickerStyles.css";

interface DateSectionProps {
  formData: any;
  setAndSave: (key: string, value: any) => void;
  left: { text: string; tone: BadgeTone };
  apiData?: any;
}

export default function DateSection({ formData, setAndSave, apiData }: DateSectionProps) {
  const settings = useSettings();
  const badge = dBadge(formData.endDate, settings);

  const createSafeDate = (dateValue: any): Date | null => {
    if (!dateValue) return null;
    try {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const formatDateString = (date: Date | null): string => {
    if (!date || isNaN(date.getTime())) return '';
    try {
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const parseTodays = (periodStr: string): number => {
    const { period } = parseExpire(periodStr);
    if (period === "정보 없음") return 0;

    const yearMatch = period.match(/(\d+)년/);
    const monthMatch = period.match(/(\d+)개월/);
    const dayMatch = period.match(/(\d+)일/);

    if (yearMatch) return parseInt(yearMatch[1]) * 365;
    if (monthMatch) {
      const months = parseInt(monthMatch[1]);
      return months === 12 ? 365 : months * 30;
    }
    if (dayMatch) return parseInt(dayMatch[1]);
    return 0;
  };

  useEffect(() => {
    if (typeof formData.expirePeriod === 'string') {
      const days = parseTodays(formData.expirePeriod);
      setAndSave("expirePeriod", days);
    }
  }, [formData.expirePeriod]);

  useEffect(() => {
    if (apiData && (!formData.expirePeriod || formData.expirePeriod === 0)) {
      const apiText = apiData?.POG_DAYCNT || '';
      if (apiText) {
        const days = parseTodays(apiText);
        if (days > 0) setAndSave("expirePeriod", days);
      }
    }
  }, [apiData, formData.expirePeriod]);

  const getPeriodValue = (): { value: number; unit: PeriodUnit } => {
    const period = formData.expirePeriod || 7;
    
    if (period === 365 || (period >= 365 && period % 365 === 0)) {
      return { value: period / 365, unit: 'year' };
    }
    if (period >= 30 && period % 30 === 0) {
      return { value: period / 30, unit: 'month' };
    }
    return { value: period, unit: 'day' };
  };

  const currentPeriod = getPeriodValue();

  const handlePeriodValueChange = (value: string) => {
    const numValue = parseInt(value, 10) || 1;
    let days = numValue;
    if (currentPeriod.unit === 'month') days = numValue * 30;
    else if (currentPeriod.unit === 'year') days = numValue * 365;
    
    setAndSave("expirePeriod", days);
    
    if (formData.buyDate) {
      const buyDate = new Date(formData.buyDate);
      const endDate = addDays(buyDate, days);
      setAndSave("endDate", formatDateString(endDate));
    }
  };

  const handlePeriodUnitChange = (unit: PeriodUnit) => {
    let days = currentPeriod.value;
    if (unit === 'month') days = currentPeriod.value * 30;
    else if (unit === 'year') days = currentPeriod.value * 365;
    
    setAndSave("expirePeriod", days);
    
    if (formData.buyDate) {
      const buyDate = new Date(formData.buyDate);
      const endDate = addDays(buyDate, days);
      setAndSave("endDate", formatDateString(endDate));
    }
  };

  const handleBuyDateChange = (date: Date | null) => {
    const dateStr = formatDateString(date);
    setAndSave("buyDate", dateStr);
    
    if (dateStr && formData.expirePeriod) {
      const endDate = addDays(date!, formData.expirePeriod);
      setAndSave("endDate", formatDateString(endDate));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setAndSave("endDate", formatDateString(date));
  };

  return (
    <>
      <div className="fd-row">
        <span className="fd-label">구매한 날짜 | 유통기한</span>
        <DatePicker
          selected={createSafeDate(formData.buyDate)}
          onChange={handleBuyDateChange}
          dateFormat="yyyy-MM-dd"
          locale={ko}
          maxDate={new Date()}
          placeholderText="구매일을 선택하세요"
          isClearable
          strictParsing
        />
        <span> | </span>
        <div className="period-input-group">
          <Input
            type="number"
            value={currentPeriod.value}
            onSave={handlePeriodValueChange}
          />
          <PeriodUnitSelect
            value={currentPeriod.unit}
            onChange={handlePeriodUnitChange}
          />
        </div>
      </div>

      <div className="fd-row">
        <span className="fd-label">유통기한 날짜 | D-day</span>
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
        <DBadge text={badge.text} tone={badge.tone} /> 
      </div>
    </>
  );
}
