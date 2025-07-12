import React, { useEffect, useState } from 'react'
import {DOCTORS,PATIENTS} from '../../data/data'
import './ApointmentForm.css'
function AppointmentForm({selectedDate,editingAppointment,setAppointments,setShowAppointmentForm,setEditingAppointment,darkMode}) {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');
  useEffect(()=>{
    if(editingAppointment)
    {
      setPatient(editingAppointment.patient ||'')
      setDoctor(editingAppointment.doctor ||'')
      setTime(editingAppointment.time||'')
    }
  },[editingAppointment])
  const handleSubmit = () => {
  if (!patient || !doctor || !time) return;

  const appointmentData = {
    id: editingAppointment?.id || Date.now(),
    patient,
    doctor,
    time,
    date: selectedDate.toISOString().split('T')[0],
  };

  setAppointments(prev => {
    const safePrev = Array.isArray(prev) ? prev : [];

    return editingAppointment
      ? safePrev.map(a => a.id === editingAppointment.id ? appointmentData : a)
      : [...safePrev, appointmentData];
  });

  setShowAppointmentForm(false);
  setEditingAppointment(null);
};

  return (
    <div className='appointment-bigcontainer'>
      <div className={`appointment-container ${darkMode?'bg-gray-800 text-white':'bg-white'}`} >
        <h2>{editingAppointment ? 'Edit Appointment' : 'New Appointment'}</h2>
        <div className='appointment-field'>
          <label>Patient</label>
          <select value={patient} className={`${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`} onChange={(e)=>setPatient(e.target.value)}required>
            <option value=''>select Patient</option>
            {PATIENTS.map(i=>(
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className='appointment-field'>
          <label>Doctors</label>
          <select value={doctor} className={`${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`} onChange={(e)=>setDoctor(e.target.value)}required>
            <option value=''>select Doctors</option>
            {DOCTORS.map(i=>(
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className='appointment-field'>
          <label>Time</label>
          <input type='time' value={time} onChange={(e)=>setTime(e.target.value)}className={`${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`} required/>
        </div>
        <div className='appointment-actions'>
          <button className='btn-submit' onClick={handleSubmit} type='button'>{editingAppointment ? 'Update' : 'Create'}</button>
          <button className={`btn-cancel ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`} onClick={() => {
                setShowAppointmentForm(false);
                setEditingAppointment(null);
              }} type='button'>cancel</button>
        </div>

      </div>

    </div>
  )
}

export default AppointmentForm