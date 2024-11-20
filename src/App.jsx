import UserList from './components/UserList';
import Login from './components/Login';
import Home from './components/home';
import Header from './components/ui/shared/header';  // Import Header
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className='relative h-full w-full min-h-[100dvh]'>
      <Router>
        {/* Header is now outside Routes and will be present on all pages */}
        <Header />

        {/* Content of the app */}
        <div className='relative w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
