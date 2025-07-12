import React from 'react'
import { Plus, User, UserCheck, Clock, Edit3, Trash2 } from 'lucide-react';
import './MobileCalendar.css'

function MobileCalendar({selectedDate,setSelectedDate,appointments,setShowAppointmentForm,setEditingAppointment,deleteAppointment,darkMode}) {
    const dayAppointments = (appointments || []).filter(
  (apt) => apt.date === selectedDate.toISOString().split('T')[0]
);

  return (
    <div className="mobile-calendar">
      <div className={`date-picker ${darkMode ? 'dark' : ''}`}>
        <label>Select Date</label>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>

      <div className={`appointments-card ${darkMode ? 'dark' : ''}`}>
        <div className="card-header">
          <h2>{selectedDate.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}</h2>
          <button onClick={() => setShowAppointmentForm(true)} className="add-btn">
            <Plus className="icon" />
          </button>
        </div>

        <div className="appointment-list">
          {dayAppointments.length === 0 ? (
            <p className="no-appointments">No appointments scheduled</p>
          ) : (
            dayAppointments.map(apt => (
              <div key={apt.id} className="appointment-item">
                <div className="appointment-info">
                  <div className="info-line">
                    <User className="icon" />
                    {apt.patient}
                  </div>
                  <div className="info-line">
                    <UserCheck className="icon" />
                    {apt.doctor}
                  </div>
                  <div className="info-line">
                    <Clock className="icon" />
                    {apt.time}
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    onClick={() => {
                      setEditingAppointment(apt);
                      setShowAppointmentForm(true);
                    }}
                  >
                    <Edit3 className="icon" />
                  </button>
                  <button onClick={() => deleteAppointment(apt.id)} className="delete">
                    <Trash2 className="icon" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileCalendar