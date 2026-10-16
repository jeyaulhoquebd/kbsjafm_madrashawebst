import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export default function FormField({ label, error, required, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function TextInput({ error, className = '', ...props }: TextInputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
        error ? 'border-red-300' : 'border-neutral-300'
      } ${className}`}
      {...props}
    />
  );
}

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function TextAreaInput({ error, className = '', ...props }: TextAreaInputProps) {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
        error ? 'border-red-300' : 'border-neutral-300'
      } ${className}`}
      {...props}
    />
  );
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export function SelectInput({ error, className = '', children, ...props }: SelectInputProps) {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
        error ? 'border-red-300' : 'border-neutral-300'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
