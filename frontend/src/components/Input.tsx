import React from "react";

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Input({ label, type = "text", value, onChange, error }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 
        ${error ? "border-red-500 ring-red-300" : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"}`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}