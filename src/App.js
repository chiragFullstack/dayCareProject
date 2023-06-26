import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import SuperAdminLogin from './superAdmin/SuperAdminLogin';
import Dashboard from './superAdmin/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './superAdmin/Home';
import Staff from './superAdmin/Dashboard/Staff';
import Subadmin from './superAdmin/Dashboard/Subadmin';
import Addclass from './superAdmin/Dashboard/Addclass';
import AddSchool from './superAdmin/Dashboard/AddSchool';

function App() {
  const [loginDashboard, setloginDashboard] = useState('hidden'); // useState to store First Name
  
  useEffect=()=>{
      if(localStorage.getItem('userType')=='superAdmin'){
          setloginDashboard('visible');
      }else{
        setloginDashboard('hidden');
      }
  }
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">
          Day Care Services 
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
            <a className="nav-link" href="javascript:void(0)">
                Home
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="javascript:void(0)">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Superlogin" element={<SuperAdminLogin/>}/>
          <Route path='/Staff' element={<Staff/>}/>
          <Route path='/AddSchool' element={<AddSchool/>}/>
          <Route path='/SubAdmin' element={<Subadmin/>}/>
          <Route path='/AddClass' element={<Addclass/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>

    </>
    );
}

export default App;
