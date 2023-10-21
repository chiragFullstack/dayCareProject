import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import add from '../../../Assets/add.png';
import activityReport from '../../../Assets/report.png';
import attendence from '../../../Assets/attendence.png';
import viewReport from '../../../Assets/viewReport.png';


function Adminprofile() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const roomid = urlSearchParams.get('roomid');
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
        console.log('sub Admin ID: ',principalId);
      fetchData();  
    },[]);
   
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiurl}/api/subadmin/getSubadminById?id=${principalId}`);
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
                <div className="allRecord">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={viewReport} className="img img-thumbnail"/>
                        </div>             
                        <div className="col-md-3">
                            <h1>Name: {name} </h1>
                            
                        </div>
                        <div className="col-md-3">
                            <h1>Contact</h1>
                            <hr/>
                            <p>Email: {email} </p>
                            <p>Phone:{contact} </p>
                            <hr/>
                            <h1>Address</h1>
                            <hr/>
                            <p>Address: {address} </p>
                            
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Adminprofile