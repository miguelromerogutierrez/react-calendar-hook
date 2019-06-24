export function daysInMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}

export function firstDayAtMonth(year, month) {
  return (new Date(year, month, 1)).getDay();
}
