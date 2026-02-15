import React, { useMemo, useState } from "react";

type DateValue = { year: number; month: number; day: number }; // month: 1-12

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function daysInMonth(year: number, month1to12: number): number {
  // JS Date: month is 0-based; day 0 gives last day of previous month
  return new Date(year, month1to12, 0).getDate();
}

export function DatePickerSection({
  years = [new Date().getFullYear()],
  initial,
  onSelect,
}: {
  years?: number[];
  initial?: Partial<DateValue>;
  onSelect: (d: DateValue) => void;
}) {
  const now = new Date();
  const [year, setYear] = useState(initial?.year ?? now.getFullYear());
  const [month, setMonth] = useState(initial?.month ?? (now.getMonth() + 1));
  const [day, setDay] = useState<number | null>(initial?.day ?? null);

  const maxDay = useMemo(() => daysInMonth(year, month), [year, month]);

  const days = useMemo(() => Array.from({ length: maxDay }, (_, i) => i + 1), [maxDay]);

  const commit = (nextDay: number) => {
    setDay(nextDay);
    onSelect({ year, month, day: nextDay });
  };

  // if user changes month/year and selected day becomes invalid, clear it
  React.useEffect(() => {
    if (day && day > maxDay) setDay(null);
  }, [maxDay, day]);

  return (
    <div className="lp__datePicker">
      {/* Year */}
      <div className="lp__dateRow">
        <div className="lp__dateRowLabel">Year</div>
        <div className="lp__chips">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={`lp__chip ${y === year ? "is-active" : ""}`}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Month */}
      <div className="lp__dateRow">
        <div className="lp__dateRowLabel">Month</div>
        <div className="lp__chips lp__chips--wrap">
          {MONTHS.map((m, idx) => {
            const mNum = idx + 1;
            return (
              <button
                key={m}
                type="button"
                className={`lp__chip ${mNum === month ? "is-active" : ""}`}
                onClick={() => setMonth(mNum)}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day */}
      <div className="lp__dateRow">
        <div className="lp__dateRowLabel">Day</div>

        <div className="lp__dayGrid" role="grid" aria-label="Select day">
          {days.map((d) => (
            <button
              key={d}
              type="button"
              className={`lp__day ${d === day ? "is-active" : ""}`}
              onClick={() => commit(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="lp__dateHint">
          {day
            ? `Selected: ${day} ${MONTHS[month - 1]} ${year}`
            : "Pick a day to load the reading."}
        </div>
      </div>
    </div>
  );
}
