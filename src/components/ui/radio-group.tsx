"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils"; // Utility for conditional classNames (if you have one)

export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioGroupItem = ({
  className,
  ...props
}: RadioGroupPrimitive.RadioGroupItemProps) => (
  <RadioGroupPrimitive.Item
    className={cn(
      "h-4 w-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
      "data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
  </RadioGroupPrimitive.Item>
);