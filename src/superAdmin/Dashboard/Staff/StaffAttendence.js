import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import add from '../../../Assets/add.png';
import activityReport from '../../../Assets/report.png';
import attendence from '../../../Assets/attendence.png';
import viewReport from '../../../Assets/viewReport.png';


function StaffAttendence() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const roomid = urlSearchParams.get('roomid');
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const { principalId,schoolId,loginType,apiurl} = useContext(ContextData);
    const [childId, setChildId] = useState("");
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);
    const handleCheckboxChange = async(event) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            const formData = new FormData();
            formData.append('staffid', checkboxValue);
            formData.append('schoolid', schoolId);
          try {
            const response = await axios.post(`${apiurl}/api/staff/staffCheckIn`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('Staff Checked In');

          } catch (error) {
            console.error(error);
          }
        }else{
            console.log(checkboxValue)
            const formData = new FormData();
            formData.append('staffid', checkboxValue);
            formData.append('schoolid', schoolId);
          try {
            const response = await axios.post(`${apiurl}/api/staff/staffCheckOut`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('staff Checkout');
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();  
    };


    const fetchData = async () => {
        try {
          if(schoolId && loginType==='admin'){
            const response = await axios.get(`${apiurl}/api/staff/getStaffListBySchoolId?schoolId=${schoolId}`);
            setData(response?.data?.data);
            console.log('attendence record=--',response?.data?.data);
          }else if(schoolId && loginType==='staff'){
            const response = await axios.get(`${apiurl}/api/staff/getSingleStaffBySchoolId?schoolId=${schoolId}&staffId=${principalId}`);
            setData(response?.data?.data);
          }
        } catch (error) {
          console.error(error); 
        }
    };

  return (
    <>
            <div className="maiv-div-box">
        <div className="sidebar">
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <div className="allRecord">
                 <h1>Attendence </h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Designation </th>
                        <th>Gender </th>
                        <th>Attendence</th>
                        <th>status</th>
                        <th>Attendence Report</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.designation}</td>
                          <td>{item.gender}</td>
                          <td>
                          <input type="checkbox"
                            className="checkBox" value={item.id}
                            id={`checkbox-${item.id}`}
                            onChange={handleCheckboxChange}
                            checked={item.checkinStatus===true?true:false}
                            // checked={selectedCheckboxes.includes(item.id)}
                            />
                          </td>
                          <td>{item.checkinStatus===true?'Checked In':'Checked Out'}</td>
                          <td>
                          <Link to={`/employeecheckingrecord?staffid=${item.id}`}> 
                            <img src={viewReport} title="View Report"/> 
                          </Link>
                          </td>
                        </tr>
                      )):(
                      <tr>
                        <td colSpan="3">No data available</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
            </div>
            </div>
          
        </div>
      </div>

    </>
  )
}

export default StaffAttendence