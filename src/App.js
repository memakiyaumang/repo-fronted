import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import { lazy,Suspense } from 'react';


const Login = lazy(()=>import('./components/Login'))
const Dashboard = lazy(()=>import('./components/Dashboard'))
const AddUser  = lazy(()=>import('./components/AddUser'))
const EditUser = lazy(()=>import('./components/EditUser'))


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
        <Route path="/users/add" element={<AuthRoute><AddUser /></AuthRoute>} />
        <Route path="/edit-user/:id" element={<AuthRoute><EditUser /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;