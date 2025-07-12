import React, { useEffect, useState } from 'react';
import { DOCTORS, PATIENTS } from '../../data/data';
import './ApointmentForm.css';

function AppointmentForm({
  selectedDate,
  editingAppointment,
  appointments,
  setAppointments,
  setShowAppointmentForm,
  setEditingAppointment,
  darkMode
}) {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (editingAppointment) {
      setPatient(editingAppointment.patient || '');
      setDoctor(editingAppointment.doctor || '');
      setTime(editingAppointment.time || '');
    }
  }, [editingAppointment]);

  const handleSubmit = () => {
    if (!patient || !doctor || !time) {
      alert('Please fill all fields');
      return;
    }

    const appointmentData = {
      id: editingAppointment?.id || Date.now(),
      patient,
      doctor,
      time,
      date: selectedDate.toISOString().split('T')[0],
    };

    if (editingAppointment) {
      setAppointments(prev =>
        prev.map(apt => (apt.id === editingAppointment.id ? appointmentData : apt))
      );
    } else {

      setAppointments(prev => [...prev, appointmentData]);
    }

    
    setShowAppointmentForm(false);
    setEditingAppointment(null);
    setPatient('');
    setDoctor('');
    setTime('');
  };

  return (
    <div className="appointment-bigcontainer">
      <div className={`appointment-container ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2>{editingAppointment ? 'Edit Appointment' : 'New Appointment'}</h2>

        <div className="appointment-field">
          <label>Patient</label>
          <select
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className={darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
            required
          >
            <option value="">Select Patient</option>
            {PATIENTS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="appointment-field">
          <label>Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className={darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
            required
          >
            <option value="">Select Doctor</option>
            {DOCTORS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="appointment-field">
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
            required
          />
        </div>

        <div className="appointment-actions">
          <button type="button" className="btn-submit" onClick={handleSubmit}>
            {editingAppointment ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className={`btn-cancel ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => {
              setShowAppointmentForm(false);
              setEditingAppointment(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
