import { cn } from "@/lib/utils"

function Skeleton({
  className,
  hidden = false, 
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary", className)}
      hidden={hidden} // Use hidden prop
      {...props}
    />
  )
}

export { Skeleton }
