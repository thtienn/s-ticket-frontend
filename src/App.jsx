// src/App.jsx
import UserList from './components/UserList';
import Home from './components/home';
import Booking from './components/Booking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventDetail from './components/EventDetail';
import AddEvent from './components/AddEvent';
// import './App.css';

const App = () => {
  return (
    <div className='relative h-full w-full min-h-[100dvh] overflow-x-hidden overscroll-y-scroll'>
      <div className='relative w-full overflow-x-hidden'>
        <div className='relative min-h-[100dvh] w-full'>
          <Router>
            <Routes>
              <Route path="/user-list" element={<UserList />} />
              <Route path="/" element={<Home />} />
              <Route path="/event-detail/:id" element={<EventDetail />} />
              <Route path="/booking/:event_id/:show_id" element={<Booking />} />
              <Route path="/add-event" element={<AddEvent />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
};


export default App;