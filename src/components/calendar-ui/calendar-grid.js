/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

/* istanbul ignore next : TODO-CODE-COVERAGE */
const cx = classnames.bind({
  rule1: 'calendar-grid__day',
  rule2: 'active',
  rule3: 'empty',
  rule5: 'past-day'
});

export default function CalendarGrid({
  days,
  firstDayOfWeek,
  onSelectedDay,
  daySelected,
  daysOfMonth,
  pastDaysSince
}) {
  let printDay = 1;
  let dayOfWeek = 0;
  let boot = false;
  const mapDays = [];
  const handleClick = e => {
    const day = e.currentTarget.dataset && e.currentTarget.dataset.value;
    if (typeof onSelectedDay === 'function') {
      onSelectedDay(e, +day);
    }
  };
  while (printDay <= days) {
    if (boot) {
      mapDays.push(
        <div
          className={cx({
            rule1: true,
            rule2: daySelected === printDay,
            rule5: pastDaysSince > printDay
          })}
          onClick={handleClick}
          data-value={printDay}
          data-testid={`day-${printDay}`}
        >
          <span className="calendar-grid__day--print">
            {printDay++}
          </span>
        </div>
      );
    } else if (!boot && firstDayOfWeek === dayOfWeek) {
      boot = true;
      mapDays.push(
        <span
          key={`day-${printDay}`}
          className={cx({
            rule1: true,
            rule2: daySelected === printDay,
            rule5: pastDaysSince > printDay
          })}
          onClick={handleClick}
          data-value={printDay}
        >
          {printDay++}
        </span>
      );
    } else {
      dayOfWeek++;
      mapDays.push(<span className={cx({ rule1: true, rule3: true })} />);
    }
  }

  return (
    <div className="calendar-grid">
      <div className="calendar-grid__days-of-month">
        {daysOfMonth.map((day, i) => <span key={`day-${day}-${i}`}>{day}</span>)}
      </div>
      <div className="grid">
        {mapDays}
      </div>
    </div>);
}

/* istanbul ignore next : TODO-CODE-COVERAGE */
CalendarGrid.propTypes = {
  days: PropTypes.number.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
  onSelectedDay: PropTypes.func,
  daySelected: PropTypes.number,
  daysOfMonth: PropTypes.array,
  pastDaysSince: PropTypes.number
};

/* istanbul ignore next : TODO-CODE-COVERAGE */
CalendarGrid.defaultProps = {
  onSelectedDay: () => { },
  daySelected: 0,
  daysOfMonth: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  pastDaysSince: 0
};
