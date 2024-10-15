export const getFallBackAvatar = (
  firstName: string | null,
  lastName: string,
) => {
  if (!firstName) return lastName.charAt(0)
  return firstName.charAt(0) + lastName.charAt(0)
}
