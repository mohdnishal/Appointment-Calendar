import React, { useEffect, useRef, useState } from 'react'
import LoginForm from '../components/loginForm/LoginForm'
import AppointmentForm from '../components/AppointmentForm/AppointmentForm'
import { Plus } from 'lucide-react';
import CalendarHeader from '../components/CalenderHeader/CalendarHeader';
import MonthNavigation from '../components/MonthNavigation/MonthNavigation';
import DesktopCalendar from '../components/DesktopCalendar/DesktopCalendar';
import MobileCalendar from '../components/Mobilecalendar/MobileCalendar';
import './Appointmentpages.css'

function AppointmentCalendar() {
    const [isAuthenticated,setIsAuthenticated]=useState(()=>{
        const stored=localStorage.getItem('login')
        return stored ? true:false
    })
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterPatient, setFilterPatient] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMobile, setIsMobile] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
    const hasMounted = useRef(false);

useEffect(() => {
  const saved = localStorage.getItem('clinic-appointments');
  try {
    const parsed = JSON.parse(saved);
    setAppointments(Array.isArray(parsed) ? parsed : []);
  } catch {
    setAppointments([]);
  }
}, []);

useEffect(() => {
  if (hasMounted.current) {
    localStorage.setItem('clinic-appointments', JSON.stringify(appointments));
  } else {
    hasMounted.current = true;
  }
}, [appointments]);

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const matchesDate = apt.date === dateStr;
      const matchesDoctor = !filterDoctor || apt.doctor === filterDoctor;
      const matchesPatient = !filterPatient || apt.patient === filterPatient;
      return matchesDate && matchesDoctor && matchesPatient;
    });
  };
    if(!isAuthenticated)
    {
        return<LoginForm setIsAuthenticated={setIsAuthenticated}/>
    }
  return (
    <div className={`main-container ${darkMode ? 'dark' : ''}`}>
        <div className="calendar-wrapper">
            <CalendarHeader darkMode={darkMode} setDarkMode={setDarkMode} filterDoctor={filterDoctor} setFilterDoctor={setFilterDoctor} filterPatient={filterPatient} setFilterPatient={setFilterPatient} />
            {!isMobile && <MonthNavigation currentDate={currentDate} setCurrentDate={setCurrentDate} darkMode={darkMode} />}
             {isMobile ? (
          <MobileCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            appointments={appointments}
            setShowAppointmentForm={setShowAppointmentForm}
            setEditingAppointment={setEditingAppointment}
            deleteAppointment={(id) => setAppointments((prev) => prev.filter((a) => a.id !== id))}
            darkMode={darkMode}
          />
        ) : (
          <DesktopCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            getAppointmentsForDate={getAppointmentsForDate}
            setShowAppointmentForm={setShowAppointmentForm}
            setEditingAppointment={setEditingAppointment}
            darkMode={darkMode}
          />
        )}
        {!isMobile && (
          <button
            onClick={() => setShowAppointmentForm(true)}
            className="add-btn"
          >
            <Plus className="icon" />
          </button>
        )}
        {showAppointmentForm && (
          <AppointmentForm
            selectedDate={selectedDate}
            appointments={appointments}
            setAppointments={setAppointments}
            editingAppointment={editingAppointment}
            setEditingAppointment={setEditingAppointment}
            setShowAppointmentForm={setShowAppointmentForm}
            darkMode={darkMode}
          />
        )}
        </div>
        
    </div>
  )
}

export default AppointmentCalendar