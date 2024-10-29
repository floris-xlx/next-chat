import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "@nextui-org/spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none   disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-background text-primary-foreground hover:bg-hover bg-opacity-90",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        outline:
          "border border-input bg-transparent hover:bg-background text-foreground transition-all duration-200",
        
        outline_secondary:
          "border border-input bg-transparent hover:bg-hover-foreground text-foreground transition-all duration-200",

        outline_disabled: "border-secondary border-input bg-hover text-secondary-foreground ",

        icon: "bg-transparent hover:bg-accent hover:text-accent-foreground border rounded-full ",
        icon_hover: "bg-transparent hover:bg-hover hover:text-accent-foreground border rounded-full ",
        icon_naked: "bg-transparent hover:bg-hover hover:text-accent-foreground rounded-full  ",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        ghost: " hover:text-accent-foreground ",

        link: "text-brand-foreground underline-offset-4 hover:underline leading-sm text-md ",

        brand: "bg-brand text-brand-foreground hover:bg-brand/90 text-white font-medium",

        loading: "border border-input bg-transparent  text-secondary  ",
      },
      size: {
        default: "h-10 px-4 py-2 ",

        xsm: "h-6 rounded-md px-2",
        sm: "h-8 rounded-md px-3",
        md: "h-10 rounded-md px-4",
        md_full_mobile: "h-10 rounded-md px-2 w-full lg:w-auto",
        lg: "h-11 rounded-md px-8",

        icon_mini: "h-6 w-6",
        icon_small: "h-7 w-7",
        icon: "h-8 w-8",
        icon_naked: "h-10 w-10",

        full: "w-full h-10",

        link: "text-sm font-medium px-0 py-2"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  link?: string
  placeholder?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, link, variant, size, asChild = false, loading = false, disabled = false, ...props }, ref) => {

    const Comp = asChild ? Slot : "button"
    const computedVariant = disabled && variant === "outline" ? "outline_disabled" : (loading ? "loading" : variant)

    return (
      <Comp
        className={cn(
          buttonVariants({ variant: computedVariant, size, className }),
          disabled ? "cursor-not-allowed disabled:pointer-events-none" : ""
        )}
        ref={ref}
        placeholder={props.placeholder}
        disabled={disabled}
        {...props}
      >

        {loading && <Spinner size="sm" color="current" className='mr-3 ' />}
        {link ? (
          <a href={link} className="text-inherit">
            {props.children}
          </a>
        ) : (
          props.children
        )}

      </Comp>
    )
  }
)

Button.displayName = "Button"

export {
  Button,
  buttonVariants
}