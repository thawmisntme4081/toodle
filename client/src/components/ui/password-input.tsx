import React from 'react'

import { LucideEye } from '@/icons/LucideEye'
import { LucideEyeOff } from '@/icons/LucideEyeOff'

import { Input } from './input'

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>

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
