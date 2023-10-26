import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";

function Activityreport() {
    const { schoolId,loginType,apiurl} = useContext(ContextData);
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const [activitydata,setActivityData]=useState(0);
    const [videodata,setVideoData]=useState(0);
    const [messagedata,setMessageData]=useState(0);
    const [avg,setAvg]=useState(0.0);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('sub Admin ID: ',schoolId);
      fetchData();  
    },[]);
   
    const fetchData = async () => {
        try {
            setData([]);
            const response = await axios.get(`${apiurl}/api/Dashboard/activityData?schoolId=${schoolId}`);
            setData(JSON.stringify(response?.data?.data));
            console.log('Profile record=--',response?.data?.data);
             setActivityData(response?.data?.data.activityCount);
            setVideoData(response?.data?.data.videoCount);
            setMessageData(response?.data?.data.messageCount);
            // setAddress(response?.data?.data[0].address);
        } catch (error) {
          console.error(error); 
        }
    };
  return (
    <>
     <div className='viewdata'>
        <table className="table table-striped table-hover">
            <tr>
                <td>Total Activity Report</td>
                <td>{activitydata}</td>
            </tr>
            <tr>
                <td>Total Photos and Video Data</td>
                <td>{videodata}</td>
            </tr>
            <tr>
                <td>total Message Sent</td>
                <td>{messagedata}</td>
            </tr>
        </table>
       
    </div>
    </>
  )
}

export default Activityreport