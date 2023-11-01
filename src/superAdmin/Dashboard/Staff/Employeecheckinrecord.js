import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';
import more from '../../../Assets/more.png';
import profile from '../../../Assets/profile.png';
const moment = require('moment');


function Employeecheckinrecord() {
    //get all entries so we can show the record 
    let momentOne = moment();
    //get all entries so we can show the record 
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const staffId = urlSearchParams.get('staffid');
    const currentDate = new Date();  
     let formattedDate='';
       const [data, setData] = useState([]);
       const [fromdate, setFromDate] = useState([]);
       const [todate, setToDate] = useState([]);

       const history = useNavigate ();
       const { schoolId, setSchoolId,parentId,apiurl } = useContext(ContextData);
       //when the page or event is loaded then this method will automatically called 

       useEffect(() => {
         const year = currentDate.getFullYear();
         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
         const day = String(currentDate.getDate()).padStart(2, '0');
         
          formattedDate = `${year}-${month}-${day}`;
         fetchData();  
         console.log(formattedDate);
       },[]);
       const fetchData = async () => {
         try {
           if(staffId){
             const response = await axios.get(`${apiurl}/api/staff/staffAttendenceReport?id=${staffId}&fromdate=${formattedDate}&todate=${formattedDate}`);
             setData(response?.data?.data);
             console.log(response.data.data);
           }
         } catch (error) {
           console.error(error); 
         }
       };
       const handleSubmit =async (event) => {
        event.preventDefault();
        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
       // formData.append('studentId', studentId);
        try {
          if(staffId){
            console.log(fromdate);
            console.log(todate);
            const response = await axios.get(`${apiurl}/api/staff/staffAttendenceReport?id=${staffId}&fromdate=${fromdate}&todate=${todate}`);
            setData(response?.data?.data);
            console.log(response.data);
          }
        } catch (error) {
            console.error(error);
        }
    }
  function dateConvert(displayDate){
    const date = new Date(displayDate);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
    return (
    <>
 
 <div className="maiv-div-box">
        <div className="sidebar">
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
          <div className="allRecord">
                 <h1>Attendence Report </h1> 
                 <form onSubmit={handleSubmit} encType='multiplart/form-data'>
                  <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                  from Date:
                                  <input type="date" value={fromdate} onChange={(e)=>{
                                      setFromDate(e.target.value);
                                  }} required />
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                  To Date:
                                  <input type="date" value={todate} onChange={(e)=>{
                                      setToDate(e.target.value);
                                  }} />
                                </label>
                            </div>
                        </div>
                    </div>
                  </div>
                 <br /> 
                 <button type="submit" className='btn btn-primary'>View Report</button> 
                </form>
                 <table className="table table-striped table-hover fSize">
                    <thead>
                      <tr>
                        <th>Student Id </th> 
                        <th>School Id</th>
                        <th>Date</th>
                        <th>Attendence</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.staffid}</td>
                          <td>{item.schoolid}</td>
                          <td>{dateConvert(item.attendencedate)}</td>
                          <td>{item.attendence.toString()}</td>
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

export default Employeecheckinrecord