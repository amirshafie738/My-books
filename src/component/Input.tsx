import type { InputHTMLAttributes } from "react";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, ...props }: Props) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;