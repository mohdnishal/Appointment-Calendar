import React from 'react'
import './Desktopcalendar.css'

function DesktopCalendar({currentDate,selectedDate,setSelectedDate,getAppointmentsForDate,setShowAppointmentForm,setEditingAppointment,darkMode}) {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  const current = new Date(startDate);

  while (current <= lastDayOfMonth || current.getDay() !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
    return (
    <div className={`calendar-grid ${darkMode ? 'dark' : ''}`}>
      <div className="calendar-grid-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid-body">
        {days.map(day => {
          const dayAppointments = getAppointmentsForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div
              key={day.toISOString()}
              className={`calendar-cell ${!isCurrentMonth ? 'not-current-month' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => {
                if (!isCurrentMonth) return;
                setSelectedDate(day);
                setShowAppointmentForm(true);
              }}
            >
              <div className="calendar-date-number">
                {day.getDate()}
              </div>
              <div className="calendar-appointments">
                {dayAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="appointment-card"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingAppointment(apt);
                      setSelectedDate(day);
                      setShowAppointmentForm(true);
                    }}
                  >
                    <div className="apt-patient">{apt.patient}</div>
                    <div className="apt-detail">{apt.time} - {apt.doctor}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default DesktopCalendar