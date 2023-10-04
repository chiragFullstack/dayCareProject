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

function Childlist() {
  
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const { schoolId, setSchoolId,parentId,setParentId } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
      if(parentId==""){
        history('/Allchild');
      }
    },[]);
    function formatDate(date) {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const fetchData = async () => {
      try {
        console.log('Parent ID ',parentId);
        const response = await axios.get(`http://54.172.2.94:5000/api/student/getStudentByparentId?id=${parentId}`);
        setData(response?.data?.data);
        console.log(response.data.data[0].dateofbirth);
      } catch (error) {
        console.error(error); 
      }
    };
    async function deleteChild(id){
        console.log(id);
        await axios.delete(`http://54.172.2.94:5000/api/student/deleteStudent?id=${id}`);
        fetchData();  
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
          <Link to={`/AddChild`} ><img src={add}/> </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View Child Details </h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image </th> 
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>School Id </th>
                        <th>Room Id </th>
                        <th>Parent Id </th>
                        
                        
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td><img src={item.pic_url?item.pic_url:profile} style={{height:'50px',width:'50px' }}/></td>
                          <td>{item.name}</td>
                          <td>{formatDate(item.dateofbirth)}</td>
                          <td>{item.schoolid}</td>
                          <td>{item.roomid}</td>
                          <td>{item.parentid}</td>
                         
                          <td>
                          <Link to={`/Editchild?id=${item.id}`} > <img src={edit} /> </Link>
                             <span onClick={(e)=> deleteChild(item.id)}>
                                <img src={del}/>
                            </span>
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

export default Childlist