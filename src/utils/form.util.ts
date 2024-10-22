import { GENDERS } from '@/global.constant'

export const getGenderValue = (value: boolean) => {
  if (value) return GENDERS[1].value
  if (value === false) return GENDERS[0].value
  return undefined
}
