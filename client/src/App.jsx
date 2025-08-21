import react  from 'react'
import './App.css'
import Header from './components/Header'
import Tasks from './components/Tasks'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserProtectedWrapper from './wrapper/userProtectedWrapper';
import PublicWrapper from './wrapper/PublicWrapper';


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
            <PublicWrapper>
            <Login />
          </PublicWrapper>}
         />
        <Route path="/login" element={
          <PublicWrapper>
            <Login />
          </PublicWrapper>} />
        <Route path="/register" element={
          <PublicWrapper>
          <Register />
        </PublicWrapper>
          } />
        <Route path="/dashboard" element={
          <UserProtectedWrapper>
            <Dashboard />
          </UserProtectedWrapper>
          } />

      </Routes>
    </div>
  );
};

export default App;
