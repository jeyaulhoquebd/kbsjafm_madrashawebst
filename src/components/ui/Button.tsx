import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-800 text-white hover:bg-primary-700 active:bg-primary-900 shadow-sm',
  secondary:
    'bg-primary-100 text-primary-800 hover:bg-primary-200 active:bg-primary-300',
  outline:
    'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 active:bg-primary-100',
  ghost:
    'text-primary-700 hover:bg-primary-50 active:bg-primary-100',
  gold:
    'bg-gold-600 text-white hover:bg-gold-700 active:bg-gold-800 shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm min-h-[36px]',
  md: 'px-4 sm:px-5 py-2.5 text-sm sm:text-base min-h-[40px]',
  lg: 'px-5 sm:px-7 py-3 sm:py-3.5 text-base sm:text-lg min-h-[44px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200 ease-in-out
        focus-visible:outline-2 focus-visible:outline-primary-600 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
