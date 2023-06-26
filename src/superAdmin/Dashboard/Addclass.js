import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  Link,
} from "react-router-dom";
import Leftmenu from "./Leftmenu";


function Addclass() {
    const [name, setName] = useState('');
    const [schoolId, setSchoolId] = useState('');
      const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here, e.g., send data to the server
        console.log('Name:', name);
        // Reset form fields
        setName('');
      };

  return (
    <>
          <div className="maiv-div-box">
        <div className="sidebar">
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <form onSubmit={handleSubmit}>
              <label>
              Class Name:
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.target.value);
                }} />
              </label>
              
              <br />
              
              <label>
                School Name:
                <input type="text" value={schoolId} onChange={(e)=>{
                    setSchoolId(e.target.value);
                }} />
              </label>
              <br />
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Addclass