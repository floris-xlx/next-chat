"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

// Create a context for the shape
const AvatarShapeContext = React.createContext<"round" | "square">("round")

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & { shape?: "round" | "square" }
>(({ className, shape = "round", ...props }, ref) => (
  <AvatarShapeContext.Provider value={shape}>
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-8 w-8 shrink-0 overflow-hidden",
        shape === "round" ? "rounded-full" : "rounded-md",
        className
      )}
      {...props}
    />
  </AvatarShapeContext.Provider>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  const shape = React.useContext(AvatarShapeContext)
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", shape === "round" ? "rounded-full" : "rounded-md", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  const shape = React.useContext(AvatarShapeContext)
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted",
        shape === "round" ? "rounded-full" : "rounded-md",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
