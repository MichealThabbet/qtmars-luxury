const monthNames = ['توت', 'أبيب', 'مسرى', 'بؤونة', 'برمهات', 'برمودة', 'بشنس', 'بيبه', 'أمشير', 'نسنا', 'سمباط', 'بيباط', 'مسرا']

export function toCopticDate(date) {
  const year = date.getFullYear()
  const monthIndex = (date.getMonth() + 2 + date.getDate()) % 13
  const day = ((date.getDate() + date.getMonth() + 1) % 30) || 30
  const copticYear = year - 293

  return {
    year: copticYear,
    month: monthNames[monthIndex],
    day,
  }
}
