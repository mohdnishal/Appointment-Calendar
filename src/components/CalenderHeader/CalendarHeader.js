import React from 'react'
import {DOCTORS,PATIENTS} from '../../data/data'
import { Calendar, Filter, Moon, Sun } from 'lucide-react';
import './CalendarHeader.css'

function CalendarHeader({darkMode,setDarkMode,filterDoctor,setFilterDoctor,filterPatient,setFilterPatient}) {
  return (
    <div className="calendar-header">
      <div className="header-left">
        <h1 className="header-title">
          <Calendar className="icon text-blue" />
          Clinic Calendar
        </h1>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode-btn">
          {darkMode ? <Sun className="icon yellow" /> : <Moon className="icon gray" />}
        </button>
      </div>
      <div className="header-right">
        <Filter className="icon gray" />
        <select
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
          className={`filter-select ${darkMode ? 'dark' : ''}`}
        >
          <option value="">All Doctors</option>
          {DOCTORS.map(doc => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>

        <select
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
          className={`filter-select ${darkMode ? 'dark' : ''}`}
        >
          <option value="">All Patients</option>
          {PATIENTS.map(pat => (
            <option key={pat} value={pat}>{pat}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CalendarHeader