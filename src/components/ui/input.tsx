import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-foreground px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border",
        icon: "pl-10",
        disabled: "bg-hover text-secondary-foreground  cursor-not-allowed ",
      },
      size: {
        sm: "h-9",
        md: "h-10 text-[16px]",
        lg: "h-12",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

type InputVariantProps = Omit<VariantProps<typeof inputVariants>, 'size'>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariantProps {
  label?: string
  icon?: React.ReactNode // New prop for icon
  size?: 'sm' | 'md' | 'lg'; // Define size separately to resolve conflict
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    type,
    id,
    name,
    icon,
    variant,
    size,
    disabled,
    onChange,
    ...props
  }, ref) => {
    const inputId = type || id;
    const inputName = type || name;

    return (
      <div className="relative">
        {label && inputId && (
          <label htmlFor={inputId} className="block text-sm font-medium text-muted-foreground mb-[2px]">
            {label}
          </label>
        )}
        {icon && <div>{icon}</div>}
        <input
          type={type}
          id={inputId}
          name={inputName}
          autoComplete={type}
          className={cn(
            inputVariants({ variant: disabled ? "disabled" : variant, size, className })
          )}
          ref={ref}
          disabled={disabled}
          readOnly={disabled}
          // we have to default to '' here instead of null because of a bug in react

          onChange={onChange}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
