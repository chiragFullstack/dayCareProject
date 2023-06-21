import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    Outlet,
    Link
  } from 'react-router-dom';

function Dashboard() {
  return (
    <>
<div className="container-fluid login">
            <div className="row">
                <div className='col-md-12'>
                    <h1 class="heading-section">Welcome to Admin Dashboard</h1>
                </div>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-2 leftSide'>
                            <h1 className='heading-section'>Menu Links </h1>
                            <ul>
                                <li>Services</li>
                                <li>School</li>
                                <li>SudAdmin</li>
                            </ul>
                        </div>
                        
                        <div className='col-md-10 rightSide'>
                            Working Area 
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    <Link to="/">Back to Login</Link>
    </>
  )
}

export default Dashboard