
import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import add from '../../../Assets/add.png';
import activityReport from '../../../Assets/report.png';
import attendence from '../../../Assets/attendence.png';
import viewReport from '../../../Assets/pro_pic.png';

function Staffprofile() {

    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const { schoolId,principalId,apiurl} = useContext(ContextData);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [contact,setContact]=useState('');
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('sub Staff ID: ',principalId);
      fetchData();  
    },[]);
   
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiurl}/api/staff/staffById?id=${principalId}`);
            setData(response?.data?.data);
            console.log('Profile record=--',response?.data?.data);
            setName(response?.data?.data[0].name);
            setEmail(response?.data?.data[0].email);
            setContact(response?.data?.data[0].contact);
            setAddress(response?.data?.data[0].address);
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
                <div className="allRecord profileSection">
                    <div className="row justify-content-around">
                        <div className="col-12 pb-2 mb-1">
                          <h2>Staff Profile</h2>
                        </div>
                        <div className="col-md-3 border pb-2">
                          <img src={viewReport} className="img img-fluid profileImg rounded-circle"/>
                          <div className="profile_age py-2">
                              <p>{name}</p>
                              <span className="w-100 text-center d-block"></span>
                          </div>
                        </div>             
                        <div className="col-md-4 personalDetails">
                            <h4 className="mb-3">Personal Details:  </h4>
                            <p><b>Name:</b> {name}</p>
                        </div>
                        <div className="col-md-4 personalDetails">
                            <h4 className="mb-3">Contact Details:</h4>
                            <p><b>Email:</b> {email} </p>
                            <p><b>Phone:</b>{contact} </p>
                            
                            <br/>
                            <h4 className="mb-3">Address</h4>
                            <p>{address} </p>
                            
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Staffprofile