interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      {children}

      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}