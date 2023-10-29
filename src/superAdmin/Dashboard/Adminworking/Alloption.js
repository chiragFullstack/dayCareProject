import  { useState,useEffect,useContext,React  } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    Outlet,
    Link,
  } from "react-router-dom";

import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import Classrecord from "./Classrecord";
import Activityreport from "./Activityreport";
import Kidsdata from "./Kidsdata";
import AttendenceGraph from "./AttendenceGraph";

function Alloption() {
    const { schoolId,loginType} = useContext(ContextData);
  return (
    <>
    <div className="maiv-div-box">
        <div className="sidebar">
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
                <div className="allRecord profileSection">
                    <div className="row justify-content-around">
                    {loginType==='admin' || loginType==='staff'?
                        <>
                         <div className="col-md-4 border personalDetails workingZone">
                            <span>Attendence Graph </span><br/><br/>
                            <AttendenceGraph/>
                        </div>
                         <div className="col-md-4 border personalDetails workingZone">
                            <span>Activity Record</span><br/><br/>
                            <Activityreport/>
                        </div>
                        <div className="col-md-4 border personalDetails workingZone">
                            <span>Overview</span><br/><br/>
                            <Classrecord/>
                        </div>
                        
                      <div className="row my-3">
                          <div className="col-md-12 border personalDetails">
                            <h1 className="m-3">Kids Details Section</h1><hr/>
                              <Kidsdata/>
                          </div>
                       </div>
                        </>
                        :''
                    }
                        

                        
                        <div className="col-md-4 personalDetails">
                           
                            
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Alloption