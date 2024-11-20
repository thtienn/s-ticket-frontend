// src/App.jsx
import UserList from './components/UserList';
import Login from './components/Login';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className='relative h-full w-full min-h-[100dvh] overflow-x-hidden overscroll-y-scroll'>
      <div className='relative w-full overflow-x-hidden'>
        <div className='relative min-h-[100dvh] w-full'>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
};


export default App;