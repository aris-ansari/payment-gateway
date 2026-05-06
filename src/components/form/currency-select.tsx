interface CurrencySelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CurrencySelect({ value, onChange }: CurrencySelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={[
        "h-11 rounded-xl border border-slate-800",
        "bg-slate-950 px-4 text-sm text-slate-100",
        "outline-none transition-all",
        "focus:border-indigo-500",
      ].join(" ")}
    >
      <option value="INR">INR</option>

      <option value="USD">USD</option>
    </select>
  );
}
