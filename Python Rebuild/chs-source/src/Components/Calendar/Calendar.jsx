import { useState } from "react";


const Calendar = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div>
      {daysOfWeek.map((day) => (
        <button key={day} onClick={() => handleDayClick(day)} className={selectedDay === day ? 'selected' : ''}>
          {day}
        </button>
      ))}
    </div>
  );
};

export default Calendar
