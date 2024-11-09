// src/App.jsx
import UserList from './components/UserList';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
