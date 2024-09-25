import * as React from 'react'

import { LucideEye, LucideEyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Input } from './input'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        suffix={
          showPassword ? (
            <LucideEye
              className="select-none"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <LucideEyeOff
              className="select-none"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
