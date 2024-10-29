import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-20",
        md: "h-28",
        lg: "h-36",
      }
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type TextareaVariantProps = Omit<VariantProps<typeof textareaVariants>, 'size'>;

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, TextareaVariantProps {
  size?: 'sm' | 'md' | 'lg';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, onChange, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({ size, className })
        )}
        ref={ref}
        onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
