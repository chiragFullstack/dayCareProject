
import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";

function Ratiodata() {
    const { schoolId,loginType,apiurl} = useContext(ContextData);
    const [data, setData] = useState([]);
    const history = useNavigate ();
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('sub Admin ID: ',schoolId);
      fetchData();  
    },[]);
   
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiurl}/api/Dashboard/ratioData?schoolId=${schoolId}`);
            setData(response?.data?.data);
            console.log('Ratio record=--',response?.data?.data);
        } catch (error) {
          console.error(error); 
        }
    };

  return (
    <>
      <div className='viewdata'>
        {data.map((item, index) => (
          <div key={index} className="ratioClass">
            <h3>Room Number: {item.roomNo}</h3>
            <p>Student / Staff</p>
            <p> {item.studentCount[0].totalstudent} / {item.staffCount[0].totalstaff}</p>
          </div>
        ))}        
       
    </div>
    </>
  )
}

export default Ratiodata