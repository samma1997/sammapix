"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showValue?: boolean;
  label?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue, label, ...props }, ref) => {
  const value = props.value?.[0] ?? props.defaultValue?.[0] ?? 0;

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5]">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-mono text-gray-500 dark:text-[#737373]">{value}</span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-[#3A3A3A]">
          <SliderPrimitive.Range className="absolute h-full bg-gray-900 rounded-full dark:bg-[#E5E5E5]" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-gray-300 bg-white shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand hover:border-gray-400 hover:shadow dark:border-[#525252] dark:bg-[#2A2A2A] dark:hover:border-[#A3A3A3]" />
      </SliderPrimitive.Root>
    </div>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
