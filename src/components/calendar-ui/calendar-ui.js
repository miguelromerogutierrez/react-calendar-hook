// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import useCalendar from '../use-calendar';
import useControlledProp from '../use-controlled-prop';
import { getMonthNames, monthNamesCompress } from './helpers';
import { getDaySelected, getPastDaysSince } from './prop-getters';
import CalendarGrid from './calendar-grid';

import './calendar-ui.scss'

const getMonthName = getMonthNames(monthNamesCompress);

function Calendar({ onSelectedDate, from, to, date, sinceDate }) {
    const DATE = React.useMemo(() => date || new Date(), [date]);
    const [selectedDate, setSelectedDate] = useControlledProp(DATE, date !== null);
    const { calendar, nextMonth, prevMonth } = useCalendar({ from, to, date: DATE });

    const daySelectedMemo = React.useMemo(
        () => getDaySelected(selectedDate, calendar), [selectedDate, calendar.month, calendar.year]
    );
    const dayReferenceMemoOnMonth = React.useMemo(
        () => getPastDaysSince(calendar, sinceDate), [sinceDate, calendar.month, calendar.year]
    );

    const handleSelectedDay = React.useCallback(
        (e, day) => {
            const selectedDate = new Date(calendar.year, calendar.month, day);
            setSelectedDate(selectedDate);
            if (typeof onSelectedDate === 'function') {
                onSelectedDate(selectedDate);
            }
        },
        [calendar.year, calendar.month]
    );

    return (
        <div className="calendar">
            <div className="calendar--header">
                <div className="right">
                    <button className="btn-arrows" onClick={prevMonth}>{'<'}</button>
                    <button className="btn-arrows" onClick={nextMonth}>{'>'}</button>
                </div>
                <h1>{`${getMonthName(calendar.month)} ${calendar.year}`}</h1>
            </div>

            {<CalendarGrid
              days={calendar.daysOfMonth}
              daySelected={daySelectedMemo}
              pastDaysSince={dayReferenceMemoOnMonth}
              firstDayOfWeek={calendar.firstDayMonth}
              onSelectedDay={handleSelectedDay}
            />}
        </div>
    );
}

/* istanbul ignore next : TODO-CODE-COVERAGE */
Calendar.propTypes = {
    onSelectedDate: PropTypes.func,
    from: PropTypes.object,
    to: PropTypes.object,
    date: PropTypes.object,
    sinceDate: PropTypes.object
};

/* istanbul ignore next : TODO-CODE-COVERAGE */
Calendar.defaultProps = {
    onSelectedDate: () => { },
    from: { year: 1997, month: 0 },
    to: { year: new Date().getFullYear(), month: 11 },
    date: null,
    sinceDate: undefined
};

export default Calendar;
