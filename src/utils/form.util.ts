export const getBooleanValue = (value: boolean) => {
  if (value) return 'female'
  if (value === false) return 'male'
  return undefined
}
