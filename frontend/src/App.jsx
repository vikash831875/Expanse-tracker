import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import ExpenseAnalysis from './pages/ExpenseAnalysis.jsx'; // <--- IMPORT THIS
import { useState } from 'react';
import RefreshHandler from './RefreshHandler.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
        {/* Existing Home Route */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        
        {/* NEW ROUTE FOR GRAPH & HISTORY PAGE */}
        <Route path='/analysis' element={<PrivateRoute element={<ExpenseAnalysis />} />} />
      </Routes>
    </div>
  );
}

export default App;