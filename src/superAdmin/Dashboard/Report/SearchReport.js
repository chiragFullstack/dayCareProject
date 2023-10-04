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

function SearchReport() {
    //get all entries so we can show the record 
     let momentOne = moment();
     //get all entries so we can show the record 
     const urlSearchParams = new URLSearchParams(window.location.search);
     // Get the value of the "id" variable
     const roomid = urlSearchParams.get('roomid');
     const currentDate = new Date();  
      let formattedDate='';
        const [data, setData] = useState([]);
        const [fromdate, setFromDate] = useState([]);
        const [todate, setToDate] = useState([]);

        const history = useNavigate ();
        const { schoolId, setSchoolId,parentId,setParentId } = useContext(ContextData);
        //when the page or event is loaded then this method will automatically called 

        useEffect(() => {
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          
           formattedDate = `${year}-${month}-${day}`;
          fetchData();  
          console.log('---',parentId);
        },[]);
    
        const fetchData = async () => {
          try {
            if(roomid){
              const response = await axios.get(`http://54.172.2.94:5000/api/report/getReportByRoomId?id=${roomid}&fromdate=${formattedDate}`);
              setData(response?.data?.data);
              console.log(response.data.data);
            }
            if(parentId!==""){
              const response = await axios.get(`http://54.172.2.94:5000/api/report/getTodayReportByParentId?id=${parentId}&fromdate=${formattedDate}`);
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
            if(roomid){
              console.log(fromdate);
              console.log(todate);
              const response = await axios.get(`http://54.172.2.94:5000/api/report/getFullReportByRoomId?id=${roomid}&fromdate=${fromdate}&todate=${todate}`);
              setData(response?.data?.data);
              console.log(response.data);
            }
            if(parentId!==""){
              console.log(fromdate);
              console.log(todate);
              const response = await axios.get(`http://54.172.2.94:5000/api/report/getReportByParentId?id=${parentId}&fromdate=${fromdate}&todate=${todate}`);
              setData(response?.data?.data);
              console.log(response.data);
            }
          } catch (error) {
              console.error(error);
          }
      }
      

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
                 <h1>Search Report </h1> 
                 <form onSubmit={handleSubmit} encType='multiplart/form-data'>
                 <label>
                    from Date:
                    <input type="date" value={fromdate} onChange={(e)=>{
                        setFromDate(e.target.value);
                    }} />
                 </label>
                 <br />  
                 <label>
                    To Date:
                    <input type="date" value={todate} onChange={(e)=>{
                        setToDate(e.target.value);
                    }} />
                 </label>
                 <br /> 
                 <button type="submit" className='btn btn-primary'>View Report</button> 
                </form>
                 <table className="table table-striped table-hover fSize">
                    <thead>
                      <tr>
                        <th>Name </th> 
                        <th>Nap Time</th>
                        <th>Nap Duration</th>
                        <th>Meal Time</th>
                        <th>Meal Duration</th>
                        <th>Notes</th>
                        <th>Activity</th>
                        <th>Checkup time </th>
                        <th>Checkup Status </th>
                        <th>Allergy Status </th>
                        <th>Allergy Description </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item,index) => (
                        <tr key={index}>
                          <td>{item.studentname}</td>
                          <td>{item.naptime}</td>
                          <td>{item.napduration}</td>
                          <td>{item.mealtime}</td>
                          <td>{item.mealduration}</td>
                          <td>{item.notes}</td>
                          <td>{item.activity}</td>
                          <td>{item.checkuptime}</td>
                          <td>{item.checkupstatus}</td>
                          <td>{item.allergystatus}</td>
                          <td>{item.allergydescription}</td>
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

export default SearchReport