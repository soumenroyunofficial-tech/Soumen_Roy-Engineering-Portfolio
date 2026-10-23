export function Field({
  label,
  value,
  onChange,
  multiline = false,
  className = '',
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  rows?: number;
}) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
