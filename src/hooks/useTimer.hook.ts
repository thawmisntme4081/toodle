import { useEffect, useState } from 'react'

export const useTimer = (
  initCount: number,
  trigger: () => void,
  triggerCondition = true,
) => {
  const [count, setCount] = useState(initCount)

  useEffect(() => {
    if (!triggerCondition) return

    const timer = setInterval(() => setCount((prev) => prev - 1), 1000)

    if (count === 0) {
      clearInterval(timer)
      trigger()
    }

    return () => clearInterval(timer)
  }, [count, triggerCondition, trigger])

  return count
}
