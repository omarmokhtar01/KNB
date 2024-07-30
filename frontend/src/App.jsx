// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './components/Public';
import Protected from './components/Protected';
import Admin from './components/Admin';
import SubAdmin from './components/SubAdmin';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from './components/Unauthorized';


function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
        <Route index path="/" element={<Public />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} requiredRole="admin" />} />
          <Route path="/subAdmin" element={<ProtectedRoute element={<SubAdmin />} requiredRole="subAdmin" />} />
          <Route path="/user" element={<ProtectedRoute element={<Protected />} requiredRole="user" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
