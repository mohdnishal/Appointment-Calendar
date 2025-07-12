import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './MonthNavigation.css'

function MonthNavigation({ currentDate, setCurrentDate, darkMode }) {
    const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  return (
    <div className="month-nav">
      <button onClick={handlePrev} className={`nav-btn ${darkMode ? 'dark' : ''}`}>
        <ChevronLeft className="icon" />
      </button>
      <h2 className="month-label">
        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </h2>
      <button onClick={handleNext} className={`nav-btn ${darkMode ? 'dark' : ''}`}>
        <ChevronRight className="icon" />
      </button>
    </div>
  )
}

export default MonthNavigation