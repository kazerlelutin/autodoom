/**
 *
 * @param d The number of seconds
 * @returns The number of seconds in the format 00:00:00
 */
export function secondsToHms(d: number): string {
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)

  const hDisplay = h > 0 ? (h < 10 ? '0' : '') + h + ':' : '00:'
  const mDisplay = m > 0 ? (m < 10 ? '0' : '') + m + ':' : '00:'
  const sDisplay = s > 0 ? (s < 10 ? '0' : '') + s : '00'
  return hDisplay + mDisplay + sDisplay
}
