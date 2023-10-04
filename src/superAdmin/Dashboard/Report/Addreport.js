import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

import activityIcon from '../../../Assets/activity.png';
import mealIcon from '../../../Assets/meal.png';
import healthIcon from '../../../Assets/health.png';
import notesIcon from '../../../Assets/notes.png';
import allergyIcon from '../../../Assets/allergy.png';
import sleepIcon from '../../../Assets/sleep.png';

function Addreport() {
     //get all entries so we can show the record 
     const urlSearchParams = new URLSearchParams(window.location.search);
     // Get the value of the "id" variable
     const id = urlSearchParams.get('id');

     const [studentId, setStudentId] = useState(id);
     const [naptime, setNapTime] = useState("");
     const [napduration, setNapDuration] = useState("");
     const [mealtime, setMealTime] = useState("");
     const [mealtype, setMealType] = useState("");
     const [notes, setNotes] = useState("");
     const [checkuptime, setCheckupTime] = useState("");
     const [checkupstatus, setCheckupStatus] = useState("");
     const [allergystatus, setAllergyStatus] = useState("");
     const [allergydescription, setAllergyDescription] = useState("");
     const [activity, setActivity] = useState("");

     const history = useNavigate ();
     const { schoolId, setSchoolId,parentId,setParentId } = useContext(ContextData);
     
     const [reportId, setReportId] = useState(null);
     //when the page or event is loaded then this method will automatically called 
     useEffect(() => {
        console.log('add report all child Id',id);
            
     },[]);
   
  const reportType = (Id) => {
    setReportId(Id);
     console.log(Id);
  };
    
  const handleSubmit =async (event) => {
    event.preventDefault();

    //here we need to call the API to post the data to the backend server 
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('reportType', reportId);
    formData.append('naptime', naptime);
    formData.append('napduration', napduration);
    formData.append('mealtime', mealtime);
    formData.append('mealtype', mealtype);
    formData.append('allergystatus', allergystatus);
    formData.append('allergydescription', allergydescription);
    formData.append('checkuptime', checkuptime);
    formData.append('checkupstatus', checkupstatus);
    formData.append('activity', activity);
    formData.append('notes', notes);

    try {
        const response = await axios.post('http://54.172.2.94:5000/api/report/addReport', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        history('/selectChild');
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
                <img src={activityIcon} className="reportIcon" onClick={() => reportType(0)} />
                <img src={healthIcon} className="reportIcon"    onClick={() => reportType(1)}/>
                <img src={mealIcon} className="reportIcon" onClick={() => reportType(2)}/>
                <img src={sleepIcon} className="reportIcon" onClick={() => reportType(3)}/>
                <img src={allergyIcon} className="reportIcon" onClick={() => reportType(4)}/>
                
                <img src={notesIcon} className="reportIcon" onClick={() => reportType(5)}/>
            </div>
            <div>   
            <form onSubmit={handleSubmit} encType='multiplart/form-data'>
                { reportId===0?<>
                    <label style={{ display:reportId===0?'block':'none'}}>
                    Activity:
                    <input type="text" value={activity} onChange={(e)=>{
                        setActivity(e.target.value);
                    }} />
                 </label>
                  <br />  
                </>:null}
           
              { reportId===1 ? <>
                <label style={{ display:reportId===1?'block':'none'}}>
                Checkup Time:
                <input type="text" value={checkuptime} onChange={(e)=>{
                    setCheckupTime(e.target.value);
                }} />
              </label>
              <br />
              <label style={{ display:reportId===1?'block':'none'}}>
                Checkup status:
                <input type="text" value={checkupstatus} onChange={(e)=>{
                    setCheckupStatus(e.target.value);
                }} />
              </label>
              <br />
                </>:null}
             
            {reportId ===2? <>
                <label style={{ display:reportId===2?'block':'none'}}>
                Meal Time:
                <input type="text" value={mealtime} onChange={(e)=>{
                    setMealTime(e.target.value);
                }} />
              </label>
              <br />
                <label style={{ display:reportId===2?'block':'none'}}>
                    Meal Type:
                    <input type="text" value={mealtype} onChange={(e)=>{
                        setMealType(e.target.value);
                    }} />
                </label>
            <br />
            </>:null}
            
            { reportId ===3? <>
                <label style={{ display:reportId===3?'block':'none'}}>
                Nap Time:
                <input type="text" value={naptime} onChange={(e)=>{
                    setNapTime(e.target.value);
                }} />
              </label>
              <br />
            <label style={{ display:reportId===3?'block':'none'}}>
                Nap Duration:
                <input type="text" value={napduration} onChange={(e)=>{
                    setNapDuration(e.target.value);
                }} />
            </label>
            <br />
          
            </> :null }
          
           
            { reportId===4?
                <>
                <label style={{ display:reportId===4?'block':'none'}}>
                    Allergy Status:
                    <input type="text" style={{ border:"1px solid #a6cbff",borderRadius:'10px' }} value={allergystatus} onChange={(e)=>{
                        setAllergyStatus(e.target.value);
                    }} />
                </label>
                <br />
                <label style={{ display:reportId===4?'block':'none'}}>
                    Allergy Description:
                    <input type="text" value={allergydescription} onChange={(e)=>{
                        setAllergyDescription(e.target.value);
                    }} />
                </label>
                <br /></>
            :null}
            { reportId ===5 ? <>
                <label style={{ display:reportId===5?'block':'none'}}>
                Notes:
                <input type="text" value={notes} onChange={(e)=>{
                    setNotes(e.target.value);
                }} />
              </label>
              <br />
            
            </>:null}
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>

            </div>

          </div>
        </div>
      </div>
    
    </>
  )
}

export default Addreport