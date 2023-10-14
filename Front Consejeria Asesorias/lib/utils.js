export function validateNonEmptyFields(arrayToValidate) {
  if (arrayToValidate.length === 0) return false

  for (const field of arrayToValidate) {
    if (field.trim() === "") return false
  }

  return true
}
