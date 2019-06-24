export function getRealPaymentDayByPeriod({ paymentDay, paymentPeriod, initialPeriod, finalPeriod }, calendar) {
  if (calendar.year >= finalPeriod.getFullYear() && calendar.month > finalPeriod.getMonth()) {
      return 0;
  } else if (paymentPeriod === 1) {
      return paymentDay;
  } else if (12 % paymentPeriod === 0) {
      const monthInitial = initialPeriod.getMonth();
      const monthCalendar = calendar.month;
      return Math.abs(monthCalendar - monthInitial) % paymentPeriod === 0 ? paymentDay : 0;
  }
  const yearInitial = initialPeriod.getFullYear();
  const monthInitial = initialPeriod.getMonth();
  const monthCalendar = calendar.month;
  const diffYears = Math.abs(calendar.year - yearInitial) * 12;
  const diffMonths = Math.abs(monthInitial - monthCalendar);
  if (monthInitial > monthCalendar) {
      return Math.abs(diffYears - diffMonths) % paymentPeriod === 0 ? paymentDay : 0;
  }
  return (diffYears + diffMonths) % paymentPeriod === 0 ? paymentDay : 0;
}

export function getMissedPaymentDate(missedDate, calendar) {
  if (calendar.year === missedDate.getFullYear() && calendar.month === missedDate.getMonth()) {
      return missedDate.getDate();
  }
  return 0;
}

export const getPaymentDate = (paymentDates = [], calendar) => {
  return paymentDates.reduce((day, date) => {
    if (calendar.year === date.getFullYear() && calendar.month === date.getMonth()) {
      return date.getDate();
    }
    return day;
  }, 0);
};

export function getDaySelected(date, calendar) {
  if (date instanceof Date && date.getFullYear() === calendar.year && date.getMonth() === calendar.month) return date.getDate();
  return 0;
}

export const getPastDaysSince = (calendar, date) => {
  const currentDate = date || new Date();
  if (currentDate.getFullYear() === calendar.year && currentDate.getMonth() === calendar.month) {
  return currentDate.getDate();
  } else if (
    currentDate.getFullYear() > calendar.year ||
    (currentDate.getFullYear() === calendar.year && currentDate.getMonth() > calendar.month)
    ) {
    return Infinity;
  }
  return -1;
};
