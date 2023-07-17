import logo from './logo.svg';
import './App.css';
import { useEffect, useState,React } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import SuperAdminLogin from './superAdmin/SuperAdminLogin';
import Dashboard from './superAdmin/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './superAdmin/Home';
import Staff from './superAdmin/Dashboard/Staff';
import Subadmin from './superAdmin/Dashboard/Subadmin/Subadmin';
import Addclass from './superAdmin/Dashboard/Addclass';
import AddSchool from './superAdmin/Dashboard/School/AddSchool';
import Editschool from './superAdmin/Dashboard/School/Editschool';
import Schoollist from './superAdmin/Dashboard/School/Schoollist';
import Servicelist from './superAdmin/Dashboard/Service/Servicelist';
import AddService from './superAdmin/Dashboard/Service/AddService';
import EditService from './superAdmin/Dashboard/Service/EditService';
import SubadminList from './superAdmin/Dashboard/Subadmin/SubadminList';
import EditSubadmin from './superAdmin/Dashboard/Subadmin/EditSubadmin';
import Allclaimedservice from './superAdmin/Dashboard/Claimedservice/Allclaimedservice';
import Claimnewservice from './superAdmin/Dashboard/Claimedservice/Claimnewservice';
import Editclaimservice from './superAdmin/Dashboard/Claimedservice/Editclaimservice';
import Roomlist from './superAdmin/Dashboard/Addroom/Roomlist';
import Addroom from './superAdmin/Dashboard/Addroom/Addroom';
import EditRoom from './superAdmin/Dashboard/Addroom/EditRoom';
import Schooldetails from './superAdmin/Dashboard/School/Schooldetails';
import ContextData from './superAdmin/Context/ContextData';
import Parentlist from './superAdmin/Dashboard/Parent/Parentlist';
import AddParent from './superAdmin/Dashboard/Parent/AddParent';
import EditParent from './superAdmin/Dashboard/Parent/EditParent';
import ParentDetails from './superAdmin/Dashboard/Parent/ParentDetails';
import StaffList from './superAdmin/Dashboard/Staff/StaffList';
import AddStaff from './superAdmin/Dashboard/Staff/AddStaff';
import EditStaff from './superAdmin/Dashboard/Staff/EditStaff';
import Childlist from './superAdmin/Dashboard/Child/Childlist';
import Addchild from './superAdmin/Dashboard/Child/Addchild';
import Editchild from './superAdmin/Dashboard/Child/Editchild';

function App() {
  const [loginDashboard, setloginDashboard] = useState('hidden'); // useState to store First Name
  
  const [schoolId, setSchoolId] = useState("");

  const [parentId, setParentId] = useState("");

  // useEffect=()=>{
  //     if(localStorage.getItem('userType')=='superAdmin'){
  //         setloginDashboard('visible');
  //     }else{
  //       setloginDashboard('hidden');
  //     }
  // }
  return (
    <>
     
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <a className="navbar-brand logo">
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
            <a className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" >
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" >
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   
<ContextData.Provider value={{ schoolId, setSchoolId,parentId,setParentId }}>
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Superlogin" element={<SuperAdminLogin/>}/>
          <Route path='/Staff' element={<Staff/>}/>

          <Route path='/AddClass' element={<Addclass/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          
          <Route path="/Schoollist" element={<Schoollist/>}/>
          <Route path='/AddSchool' element={<AddSchool/>}/>
          <Route path='/Editschool/:id' element={<Editschool/>}/>
          <Route path='/Schooldetails/:id' element={<Schooldetails/>}/>
         

          <Route path="/Servicelist" element={<Servicelist/>}/>
          <Route path="/Addservice" element={<AddService/>}/>
          <Route path='/EditService/:id' element={<EditService/>}/>

          <Route path="/SubadminList" element={<SubadminList/>}/>
          <Route path='/SubAdmin' element={<Subadmin/>}/>
          <Route path='/EditSubadmin/:id' element={<EditSubadmin/>}/>

          <Route path="/Allclaimedservice" element={<Allclaimedservice/>}/>
          <Route path="/Claimnewservice" element={<Claimnewservice/>}/>
          <Route path="/Editclaimservice/:id" element={<Editclaimservice/>}/>


          <Route path="/AllRoom" element={<Roomlist/>}/>
          <Route path="/Addroom" element={<Addroom/>}/>
          <Route path="/EditRoom/:id" element={<EditRoom/>}/>


          <Route path="/AllParent" element={<Parentlist/>}/>
          <Route path="/AddParent" element={<AddParent/>}/>
          <Route path="/EditParent/:id" element={<EditParent/>}/>
          <Route path="/ParentDetails/:id" element={<ParentDetails/>}/>

          <Route path="/AllStaff" element={<StaffList/>}/>
          <Route path="/AddStaff" element={<AddStaff/>}/>
          <Route path="/EditStaff/:id" element={<EditStaff/>}/>

          <Route path="/Allchild" element={<Childlist/>}/>
          <Route path="/Addchild" element={<Addchild/>}/>
          <Route path="/Editchild/:id" element={<Editchild/>}/>

        </Routes>
      </Router>
    </ContextData.Provider>
    </>
    );
}

export default App;
