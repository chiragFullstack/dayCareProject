import React from 'react'
import './dashboard.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    Outlet,
    Link
  } from 'react-router-dom';
import Leftmenu from './Leftmenu';

function Dashboard() {
  return (
    <>
<div className="maiv-div-box">
        <div className="sidebar">
            <p className="logo pb-2">BREES</p>
            <hr className=""/>
            <Leftmenu/>
        </div>   
        <div className="right-box">
            <div className="db-content-display">
            </div>
        </div> 
    </div>
    </>
  )
}

export default Dashboard