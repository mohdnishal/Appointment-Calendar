import './App.css';
import AppointmentCalendar from './pages/AppointmentCalendar';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppointmentCalendar/>}/>
      </Routes>
    </Router>
  );
}

export default App;
