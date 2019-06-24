import React from 'react';
import { firstDayAtMonth, daysInMonth } from './helpers';

export default function useCalendar({ from, to, date }) {
    const [calendar, setCalendar] = React.useState({
        year: date.getFullYear(),
        month: date.getMonth(),
        daysOfMonth: 0,
        firstDayMonth: 0
    });

    React.useEffect(() => {
        const currentDate = !date ? new Date() : new Date(date);
        const daysOfMonth = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        const firstDayMonth = firstDayAtMonth(currentDate.getFullYear(), currentDate.getMonth());
        setCalendar({
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            daysOfMonth,
            firstDayMonth
        });
    }, [date]);

    const nextYear = React.useCallback(
        () => {
            const newYear = Math.min(calendar.year + 1, Number(to.year));
            const daysOfMonth = daysInMonth(newYear, calendar.month);
            const firstDayMonth = firstDayAtMonth(newYear, calendar.month);
            setCalendar({
                year: newYear,
                month: calendar.month,
                daysOfMonth,
                firstDayMonth
            });
        },
        [calendar.year]
    );

    const prevYear = () => {
        const newYear = Math.max(calendar.year - 1, Number(from.year));
        const daysOfMonth = daysInMonth(newYear, calendar.month);
        const firstDayMonth = firstDayAtMonth(newYear, calendar.month);
        setCalendar({
            year: newYear,
            month: calendar.month,
            daysOfMonth,
            firstDayMonth
        });
    };

    const nextMonth = React.useCallback(
        () => {
            let month =
                to.year === calendar.year
                    ? Math.min(calendar.month + 1, Number(to.month))
                    : calendar.month + 1;
            let year = calendar.year;
            if (month === 12) {
                year = Math.min(year + 1, to.year);
                month = year === to.year ? calendar.month : 0;
            }
            setCalendar({
                year,
                month,
                daysOfMonth: daysInMonth(year, month),
                firstDayMonth: firstDayAtMonth(year, month)
            });
        },
        [calendar.year, calendar.month]
    );

    const prevMonth = React.useCallback(
        () => {
            let month =
                from.year === calendar.year
                    ? Math.max(calendar.month - 1, Number(from.month))
                    : calendar.month - 1;
            let year = calendar.year;
            if (month === -1) {
                year = Math.max(year - 1, from.year);
                month = year === from.year ? calendar.month : 11;
            }
            setCalendar({
                year,
                month,
                daysOfMonth: daysInMonth(year, month),
                firstDayMonth: firstDayAtMonth(year, month)
            });
        },
        [calendar.year, calendar.month]
    );

    return {
        calendar,
        nextYear,
        prevYear,
        nextMonth,
        prevMonth
    };
}
