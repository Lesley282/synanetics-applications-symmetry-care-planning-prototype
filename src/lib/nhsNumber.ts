export function isValidNhsNumber(raw: string): boolean {
  return /^\d{10}$/.test(raw)
}

export function formatNhsNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean)
  return parts.join(' ')
}
