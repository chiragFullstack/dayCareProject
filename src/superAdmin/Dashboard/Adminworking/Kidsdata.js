import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";

export default function Kidsdata() {
    const { schoolId,loginType,apiurl} = useContext(ContextData);
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log('sub Admin ID: ',schoolId);
      fetchData();  
    },[]);
   
    const fetchData = async () => {
        try {
            
            const response = await axios.get(`${apiurl}/api/Dashboard/studentData?schoolId=${schoolId}`);
            setData(response?.data?.data);
            console.log('Kids  record=--',response?.data?.data);

            // setAddress(response?.data?.data[0].address);
        } catch (error) {
          console.error(error); 
        }
    };
  return (
    <>
        <div className="allRecord kidsProfileData">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Profile Pic</th>
                        <th>Name</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td><img src={item.picurl} className="kidImg"/></td>
                          <td>{item.name}</td>
                          <td>{item.gender}</td>
                        </tr>
                      )):(
                      <tr>
                        <td colSpan="3">No data available</td>
                      </tr>
                    )}
                                    </tbody>
            </table>
        </div>
    </>
  )
}
