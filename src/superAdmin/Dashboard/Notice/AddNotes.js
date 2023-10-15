import React, { useState,useEffect,useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  Link,useNavigate
} from "react-router-dom";
import Leftmenu from "../Leftmenu";
import axios from 'axios';
import ContextData from '../../Context/ContextData';

function AddNotes() {

    const history = useNavigate ();
      const[data,setData]=useState([]);

      const { schoolId,apiurl } = useContext(ContextData);
      const [message, setMessage] = useState('');
      let noticedate=new Date();
      function convertDate(){
        const date = new Date(noticedate);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
     }
      const handleSubmit =async (event) => {
        event.preventDefault();
        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('schoolId',schoolId );
        formData.append('message',message);
        formData.append('noticedate',convertDate().toString());
        try {
            const response = await axios.post(`${apiurl}/api/Notice/addNotice`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data);
            history('/noticeList');
          } catch (error) {
            console.error(error);
          }
    }
  return (
    <>
      <div className="maiv-div-box">
        <div className="sidebar">
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <form onSubmit={handleSubmit} encType='multiplart/form-data'>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <label>
                            Message:
                            <input type="text" value={message} onChange={(e)=>{
                                setMessage(e.target.value);
                            }} />
                          </label>
                      </div>
                  </div>
              </div>
             
              <br />
             
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNotes