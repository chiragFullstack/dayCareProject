import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import add from '../../../Assets/add.png';
import activityReport from '../../../Assets/report.png';
import attendence from '../../../Assets/attendence.png';
import viewReport from '../../../Assets/viewReport.png';

function Childattendence() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const roomid = urlSearchParams.get('roomid');
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const { schoolId, setSchoolId,parentId,setParentId,loginType,principalId} = useContext(ContextData);
    
    const [childId, setChildId] = useState("");
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);
    const handleCheckboxChange = async(event) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            const formData = new FormData();
            formData.append('studentid', checkboxValue);
            formData.append('schoolId', schoolId);
            formData.append('attendenceby', principalId);
            formData.append('attendencefrom', loginType);
          try {
            const response = await axios.post('https://daycare-tas4.onrender.com/api/student/studentCheckIn', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('Student CheckIn');
          } catch (error) {
            console.error(error);
          }
        }else{
            console.log(checkboxValue)
            const formData = new FormData();
            formData.append('studentid', checkboxValue);
            formData.append('schoolId', schoolId);
          try {
            const response = await axios.post('https://daycare-tas4.onrender.com/api/student/studentCheckOut', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          
            alert('student Checkout ');
          } catch (error) {
            console.error(error);
          }

        }

    };

    const fetchData = async () => {
        try {
          if(roomid){
            const response = await axios.get(`https://daycare-tas4.onrender.com/api/student/getStudentByRoomId?id=${roomid}`);
            setData(response?.data?.data);
            console.log('roomID',roomid);
          }else{
            const response = await axios.get(`https://daycare-tas4.onrender.com/api/student/getStudentBySchoolId?id=${schoolId}`);
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
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <div className="allRecord">
                 <h1>Select Child for Attendence </h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Room No </th>
                        <th>Attendence</th>
                        <th>Attendence Report</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.roomid}</td>
                          <td>
                          <input type="checkbox"
                            className="checkBox" value={item.id}
                            id={`checkbox-${item.id}`}
                            onChange={handleCheckboxChange}
                            // checked={selectedCheckboxes.includes(item.id)}
                            />
                          </td>
                          <td>
                          <Link to={`/attendenceReport?studentid=${item.id}`}> 
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

export default Childattendence