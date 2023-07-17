import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function SuperAdminLogin() {
    const [username, setUserName] = useState('') // useState to store First Name
    const [userError, setUserError] = useState('') // useState to store First Name
    const [password, setPassword] = useState('') // useState to store Last Name
    const history = useNavigate ();
    function checkLogin(){
        if(username!=='' && password!==''){
            if(username==='admin' && password==='admin'){
                setUserError('Welcome to the Day Care pannel');
                localStorage.setItem('userType','superAdmin');
            }else if(username!=='admin' || password!=='admin'){
                setUserError('Please check Your User Name or Password');        
            }
        }else {
            setUserError('must need to fill User Name or Password');        
        }
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        //here we will hit the api to match 
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        try {
            const response = await axios.post('http://localhost:5000/api/login',formData);
            console.log(response.data);
            history('/Dashboard');
          } catch (error) {
            console.error(error);
          }

    }
  return (
    <>        
        <div className="container-fluid login">
            <div className="row">
                <div className='col-md-12'>
                    <div className='container mt-3'>
                    <h1>Super Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="userName" 
                                placeholder='Enter User Name'
                                className='form-control'
                                value={username}
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password" name="userPassword" 
                                placeholder='Enter Password'
                                className='form-control'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <input type="button" value="Sign In" 
                        className="btn btn-success button"
                        onClick={()=>{
                            checkLogin();
                        }}
                        />
                        <button type="submit" className='btn btn-primary'>Submit</button>
                        <span className="error">{userError}</span>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SuperAdminLogin;