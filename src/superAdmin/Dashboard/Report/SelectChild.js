import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import add from '../../../Assets/add.png';
import activityReport from '../../../Assets/report.png';

function SelectChild() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        // Get the value of the "id" variable
        const roomid = urlSearchParams.get('roomid');
        //get all entries so we can show the record 
        const [data, setData] = useState([]);
        const history = useNavigate ();
        const { schoolId, setSchoolId,parentId,setParentId } = useContext(ContextData);
        
        const [childId, setChildId] = useState("");
        //when the page or event is loaded then this method will automatically called 
        useEffect(() => {
          fetchData();  
        },[]);
      
     const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
          setChildId((prevChildId) => prevChildId + checkboxValue + ",");
        }
        console.log(childId);
     };
        const fetchData = async () => {
          try {
            if(roomid){

              const response = await axios.get(`http://54.172.2.94:5000/api/student/getStudentByRoomId?id=${roomid}`);
              setData(response?.data?.data);
              console.log('roomID',roomid);
            }else{
              const response = await axios.get(`http://54.172.2.94:5000/api/student/getStudentBySchoolId?id=${schoolId}`);
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
                 <h1>select Child to Add Report </h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Room No </th>
                        <th>Select to Add Report</th>
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
                          <img src={activityReport}/>
                          <input type="checkbox"
                            className="checkBox" value={item.id}
                            id={`checkbox-${item.id}`}
                            onChange={handleCheckboxChange}
                            // checked={selectedCheckboxes.includes(item.id)}
                            />
                          </td>
                        </tr>
                      )):(
                      <tr>
                        <td colSpan="3">No data available</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                  <button
                        className="btn btn-success"
                        onClick={() => history(`/Addreport?id=${childId}`)}
                      >
                        Activity Report
                    </button>

          </div>
          </div>
          
        </div>
      </div>

    </>
  )
}

export default SelectChild