import * as Hint from "@/components/ui/hint";
import * as Label from "@/components/ui/label";
import * as React from "react";

import { cn } from "@/utils/cn";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required = false,
  error,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label.Root>
        {label}
        {required && <Label.Asterisk />}
      </Label.Root>

      {children}

      {error && (
        <Hint.Root className="text-error-base">
          <Hint.Icon
            as={({ className, ...props }) => (
              <svg
                className={cn("size-4", className)}
                fill="currentColor"
                viewBox="0 0 20 20"
                {...props}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          />
          {error}
        </Hint.Root>
      )}

      {hint && !error && (
        <Hint.Root>
          <Hint.Icon
            as={({ className, ...props }) => (
              <svg
                className={cn("size-4", className)}
                fill="currentColor"
                viewBox="0 0 20 20"
                {...props}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          />
          {hint}
        </Hint.Root>
      )}
    </div>
  );
}
