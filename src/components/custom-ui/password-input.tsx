import { forwardRef, useState } from 'react'

import { IconEye, IconEyeOff } from '@/icons'
import { cn } from '@/lib/utils'

import { Input, InputProps } from '../ui/input'

export type PasswordInputProps = InputProps & {
  hasSuffix?: boolean
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, hasSuffix, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('border-none', className)}
        {...props}
        ref={ref}
        suffix={
          hasSuffix && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 end-0 bg-white flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-primary dark:text-neutral-600 dark:focus:text-primary"
            >
              {showPassword ? <IconEye /> : <IconEyeOff />}
            </button>
          )
        }
      />
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
