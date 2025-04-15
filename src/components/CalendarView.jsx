import React, { useState } from 'react';
import './CalendarView.css';

const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasksForDay = getTasksForDate(date);
      const isCurrentDay = isToday(date);
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isCurrentDay ? 'today' : ''}`}
        >
          <div className="day-number">
            {day}
            {isCurrentDay && <span className="today-indicator">Today</span>}
          </div>
          {tasksForDay.length > 0 && (
            <div className="task-indicator">
              {tasksForDay.length} task{tasksForDay.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-button">&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={goToNextMonth} className="nav-button">&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day-header">Sun</div>
        <div className="calendar-day-header">Mon</div>
        <div className="calendar-day-header">Tue</div>
        <div className="calendar-day-header">Wed</div>
        <div className="calendar-day-header">Thu</div>
        <div className="calendar-day-header">Fri</div>
        <div className="calendar-day-header">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarView;
