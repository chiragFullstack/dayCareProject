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
                            <span>Overview</span><br/>
                            <Classrecord/>
                        </div>
                        <div className="col-md-4 border personalDetails workingZone">
                            <span>Attendence Record</span><br/>
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