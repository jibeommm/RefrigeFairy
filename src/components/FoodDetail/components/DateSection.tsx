// src/components/FoodDetail/components/DateSection.tsx

import DatePicker from "react-datepicker";
import { ko } from 'date-fns/locale';
import Input from "./Input";
import PeriodUnitSelect, { type PeriodUnit } from "./PeriodUnitSelect";
import DBadge, { type BadgeTone } from '../../DBadge/DBadge';
import { useSettings } from '../../../hooks/useSettings';
import { dBadge } from '../../../pages/StoragePage/helpers';
import "../datepickerStyles.css";

interface DateSectionProps {
  formData: any;
  setAndSave: (key: string, value: any) => void;
  left: { text: string; tone: BadgeTone };
}

export default function DateSection({ formData, setAndSave }: DateSectionProps) {
  const settings = useSettings();          
  const badge = dBadge(formData.endDate, settings);  

  const getPeriodValue = (): { value: number; unit: PeriodUnit } => {
    const period = formData.expirePeriod || 14;
    if (typeof period === 'number') {
      if (period >= 365 && period % 365 === 0) return { value: period / 365, unit: 'year' };
      if (period >= 30 && period % 30 === 0) return { value: period / 30, unit: 'month' };
      return { value: period, unit: 'day' };
    }
    return { value: 14, unit: 'day' };
  };

  const currentPeriod = getPeriodValue();

  const handlePeriodValueChange = (value: string) => {
    const numValue = parseInt(value, 10) || 1;
    let days = numValue;
    if (currentPeriod.unit === 'month') days = numValue * 30;
    else if (currentPeriod.unit === 'year') days = numValue * 365;
    setAndSave("expirePeriod", days);
  };

  const handlePeriodUnitChange = (unit: PeriodUnit) => {
    let days = currentPeriod.value;
    if (unit === 'month') days = currentPeriod.value * 30;
    else if (unit === 'year') days = currentPeriod.value * 365;
    setAndSave("expirePeriod", days);
  };

  return (
    <>
      <div className="fd-row">
        <span className="fd-label">구매한 날짜 | 유통기한</span>
        <DatePicker
          selected={formData.buyDate ? new Date(formData.buyDate) : null}
          onChange={(date) => {
            const dateStr = date?.toISOString().split('T')[0] || '';
            setAndSave("buyDate", dateStr);
          }}
          dateFormat="yyyy-MM-dd"
          locale={ko}
          maxDate={new Date()}
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
          selected={formData.endDate ? new Date(formData.endDate) : null}
          onChange={(date) => {
            const dateStr = date?.toISOString().split('T')[0] || '';
            setAndSave("endDate", dateStr);
          }}
          dateFormat="yyyy-MM-dd"
          locale={ko}
        />
        <span> | </span>
        <DBadge text={badge.text} tone={badge.tone} /> 
      </div>
    </>
  );
}
