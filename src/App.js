import React from 'react';
import './App.css';
import Calendar from './components/calendar-ui';

function App() {
  return (
    <div className="App">
      <Calendar
        from={{ year: 2017, month: 0 }}
        to={{ year: 2020, month: 10 }}
        sinceDate={new Date()}
      />
    </div>
  );
}

export default App;
