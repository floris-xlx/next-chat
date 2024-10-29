import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { prettyString } from "@/utils/format-utils"
import { cn } from "@/lib/utils"


const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        foreground:
          "border-transparent bg-background text-foreground",

        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        enterprise: "border-transparent bg-amber/30 text-primary opacity-90",
        developer: "border-transparent bg-pink-600/80 text-white opacity-80",
        "light-blue": "border-transparent bg-blue-400 text-blue-500 bg-opacity-30 font-[500]",
        "light-yellow": "border-transparent bg-yellow text-yellow-600  font-[500]",
        "dark-yellow": "border-transparent bg-yellow-300 text-yellow-600 bg-opacity-30 font-[500]",
        "light-green": "border-transparent bg-green-300 text-green-600 bg-opacity-30 font-[500]",
        lime: "border-lime-300 bg-lime-300 text-lime-600 bg-opacity-30 font-[500]",
        emerald: "border-emerald-300 bg-emerald-300 text-emerald-600 bg-opacity-30 font-[500]",
        cyan: "border-cyan-300 bg-cyan-300 text-cyan-600 bg-opacity-30 font-[500]",
        indigo: "border-indigo-300 bg-indigo-300 text-indigo-600 bg-opacity-30 font-[500]",
        pink: "border-pink-300 bg-pink-300 text-pink-600 bg-opacity-30 font-[500]",
        purple: "border-purple-300 bg-purple-300 text-purple-600 bg-opacity-30 font-[500]",
        rose: "border-rose-300 px-2 py-1 bg-rose-300/20  text-rose-600 bg-opacity-30 font-[500]",
        orange: "border-orange-300 bg-orange-300 text-orange-600 bg-opacity-30 font-[500]",
        yellow: "border-yellow-300 bg-yellow-300 text-yellow-600 bg-opacity-30 font-[500]",
        amber: "border-transparent bg-amber-300 text-amber-600 bg-opacity-30 font-[500]",
        squared: "rounded-md bg-primary text-black bg-black bg-opacity-20",
        brand: "border-transparent bg-[var(--color-brand-accent)] text-[var(--color-brand-text)] bg-opacity-10 font-[500] text-opacity-50",
        unapproved: "border-transparent bg-secondary text-foreground bg-opacity-30 font-[500]",
        invalid: "border-transparent bg-red-300 text-red-500 bg-opacity-20 font-[500]",
        loss: "border-transparent bg-red-300 text-red-500 bg-opacity-20 font-[500]",
        tp: "border-transparent bg-green-300 text-green-600 bg-opacity-30 font-[500]",

        unreached: "tracking-wide border-transparent bg-red-300 text-red-300 bg-opacity-30 font-[500] text-center",
        reached: "tracking-wide border-transparent bg-yellow-300 text-yellow-600 dark:text-yellow-300 bg-opacity-30 font-[500]",
        success: "tracking-wide border-transparent bg-green-300 text-green-300 bg-opacity-30 font-[500]",
        failed: "tracking-wide border-transparent bg-red-400 text-red-400 bg-opacity-30 font-[500]",
        treating: "tracking-wide border-transparent bg-orange-300 text-orange-300 bg-opacity-30 font-[500] text-center",
      },
      size: {
        mini: "px-0.5 py-0.5 text-[10px] max-h-[20px]",
        small: "px-1.5 py-0.5 text-[11px]",
        fixated_small: "px-1.5 py-0.5 text-[11px] w-[60] overflow-hidden text-ellipsis ",
        medium: "px-2 py-0.5 text-sm",
        large: "px-2 py-1 text-base",
        squared: "px-[5px] py-[1opx] text-sm text-[12px] font-[400] rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",

    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  size?: "small" | "medium" | "large" | "mini" | "squared" | "fixated_small";
  text?: string;
  hide?: boolean;
  prefixDot?: boolean;
}

const variantMapping = {
  "enterprise": "enterprise",
  "developer": "developer",
  "user": "light-blue",
  "owner": "light-yellow",
  "admin": "light-green",
  "brand": "brand",
  "unapproved": "reached",
  "requested_access": "dark-yellow",
  "invalid": "invalid",
  "loss": "loss",
  "tp1": "tp",
  "tp2": "tp",
  "tp3": "tp",
  "active": "light-green",
  "pending": "light-blue",
  "invite_pending": "light-yellow",
  "paid": "light-green",
  "buy": "light-green",
  "sell": "loss",
  "founder": "light-blue",
  "unreached": "unreached",
  "reached": "reached",
  "success": "success",
  "failed": "failed",
  "treating": "treating",
  "entry": "amber",
  "archived": "light-yellow",
  'get': 'light-green',
  'post': 'light-blue',
  'put': 'light-yellow',
  'delete': 'light-red',
  'patch': 'light-purple',
  'options': 'light-orange',
  'head': 'light-cyan',
  'trace': 'light-pink',
  
};

function Badge({ className, variant, size, text, hide, prefixDot, children, ...props }: BadgeProps) {
  if (hide) return null;

  const variantToUse = variantMapping[text?.toLowerCase()] || variant;
  const color = variantToUse?.split('-')[0]; // Extract the base color from the variant

  return (
    <div className={cn(badgeVariants({ variant: variantToUse, size }), className)} {...props}>
      {prefixDot && (
        <span className={`bg-${color}-500 size-2 rounded-sm mr-[5px]`} aria-hidden="true"></span>
      )}
      {prettyString(text)}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
