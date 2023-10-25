import './App.css';
import { useEffect, useState,React } from 'react'

import 'bootstrap/dist/css/bootstrap.css';

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
import AdminLogin from './superAdmin/AdminLogin';
import SelectChild from './superAdmin/Dashboard/Report/SelectChild';
import Addreport from './superAdmin/Dashboard/Report/Addreport';
import SearchReport from './superAdmin/Dashboard/Report/SearchReport';
import Childattendence from './superAdmin/Dashboard/Attendence/Childattendence';
import Attendencereport from './superAdmin/Dashboard/Attendence/Attendencereport';
import NoticeList from './superAdmin/Dashboard/Notice/NoticeList';
import AddNotes from './superAdmin/Dashboard/Notice/AddNotes';
import ChatRoomid from './superAdmin/Dashboard/chat/ChatRoomid';
import Message from './superAdmin/Dashboard/chat/Message';
import SendVideo from './superAdmin/Dashboard/chat/SendVideo';
import Adminprofile from './superAdmin/Dashboard/profile/Adminprofile';

import logo from './Assets/logo.jpeg';
import Staffprofile from './superAdmin/Dashboard/profile/Staffprofile';
import Parentprofile from './superAdmin/Dashboard/profile/Parentprofile';
import Alloption from './superAdmin/Dashboard/Adminworking/Alloption';

function App() {
  const [loginDashboard, setloginDashboard] = useState('hidden'); // useState to store First Name
  
  const [schoolId, setSchoolId] = useState("");

  const [parentId, setParentId] = useState("");

  const [loginType, setLoginType] = useState("");

  const [profileId, setProfileId] = useState("");

  const [principalId, setPrincipalId] = useState("");

  const [apiurl, setAPIUrl] = useState("http://54.172.2.94:5000");
 // const [apiurl, setAPIUrl] = useState("http://localhost:5000");
  
  return (
    <>
<nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <a className="navbar-brand logo">
         <img src={logo} height="60px" width="60px"/> Hello Everyone
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
        </div>
      </div>
    </nav>
<ContextData.Provider value={{loginType, setLoginType, schoolId, setSchoolId,parentId,setParentId,principalId,setPrincipalId,apiurl, setAPIUrl,profileId,setProfileId }}>
    <Router>
        <Routes>
          <Route path="/" element={<AdminLogin/>}/>
          <Route path='/Staff' element={<Staff/>}/>

          <Route path='/AddClass' element={<Addclass/>}/>
          <Route path="/Dashboard" element={<Alloption/>}/>
          
          <Route path="/Schoollist" element={<Schoollist/>}/>
          <Route path='/AddSchool' element={<AddSchool/>}/>
          <Route path='/Editschool' element={<Editschool/>}/>
          <Route path='/Schooldetails' element={<Schooldetails/>}/>
         

          <Route path="/Servicelist" element={<Servicelist/>}/>
          <Route path="/Addservice" element={<AddService/>}/>
          <Route path='/EditService' element={<EditService/>}/>

          <Route path="/SubadminList" element={<SubadminList/>}/>
          <Route path='/SubAdmin' element={<Subadmin/>}/>
          <Route path='/EditSubadmin' element={<EditSubadmin/>}/>
          <Route path='/Adminprofile' element={<Adminprofile/>}/>

          <Route path="/Allclaimedservice" element={<Allclaimedservice/>}/>
          <Route path="/Claimnewservice" element={<Claimnewservice/>}/>
          <Route path="/Editclaimservice" element={<Editclaimservice/>}/>


          <Route path="/AllRoom" element={<Roomlist/>}/>
          <Route path="/Addroom" element={<Addroom/>}/>
          <Route path="/EditRoom" element={<EditRoom/>}/>


          <Route path="/AllParent" element={<Parentlist/>}/>
          <Route path="/AddParent" element={<AddParent/>}/>
          <Route path="/EditParent" element={<EditParent/>}/>
          <Route path="/ParentDetails" element={<ParentDetails/>}/>
          <Route path='/Parentprofile' element={<Parentprofile/>}/>

          <Route path="/AllStaff" element={<StaffList/>}/>
          <Route path="/AddStaff" element={<AddStaff/>}/>
          <Route path="/EditStaff" element={<EditStaff/>}/>
          <Route path='/Staffprofile' element={<Staffprofile/>}/>

          <Route path="/Allchild" element={<Childlist/>}/>
          <Route path="/Addchild" element={<Addchild/>}/>
          <Route path="/Editchild" element={<Editchild/>}/>

          <Route path="/selectChild" element={<SelectChild/>}/>
          <Route path="/addReport" element={<Addreport/>}/>
          <Route path="/searchReport" element={<SearchReport/>}/>


          <Route path="/childAttendence" element={<Childattendence/>}/>
          <Route path="/attendenceReport" element={<Attendencereport/>}/>


          <Route path="/noticeList" element={<NoticeList/>}/>
          <Route path="/addNotes" element={<AddNotes/>}/>


          <Route path="/chatroomlist" element={<ChatRoomid/>}/>
          <Route path="/message" element={<Message/>}/>
          <Route path="/video" element={<SendVideo/>}/>
        </Routes>
      </Router>
    </ContextData.Provider>
    </>
    );
}

export default App;
