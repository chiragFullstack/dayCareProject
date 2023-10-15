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
        const [isVisible, setIsVisible] = useState(false);
        const history = useNavigate ();
        const { schoolId, setSchoolId,parentId,setParentId,apiurl } = useContext(ContextData);
        
        const [childId, setChildId] = useState("");
        //when the page or event is loaded then this method will automatically called 
        useEffect(() => {
          fetchData(); 
          console.log('child ID---',childId);
          if(childId.toString().includes(',')>0){
            setIsVisible(true);
          } 
        },[]);

      function checkReport(){
        if(childId.toString().includes(',')){
          history(`/Addreport?id=${childId}`)
        }else{
          alert('Select Child First');
        }
      }
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
              const response = await axios.get(`${apiurl}/api/student/getStudentByRoomId?id=${roomid}`);
              setData(response?.data?.data);
              console.log('roomID',roomid);
            }else{
              const response = await axios.get(`${apiurl}/api/student/getStudentBySchoolId?id=${schoolId}`);
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
                 <h1>Activity Report </h1> 
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
                      onClick={ checkReport}
                      style={{ display:data.length==0?'none':'block'}}>
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