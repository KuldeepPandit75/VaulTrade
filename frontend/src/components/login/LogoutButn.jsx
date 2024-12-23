import React from 'react'
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../features/slice';

const clientId = "458563103734-rc683qfss1qkbu5acik81iic0t28c0iq.apps.googleusercontent.com"

function LogoutButn() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const onSuccess=()=>{
        console.log("Log out successfull!");
        dispatch(setUser(null));
        sessionStorage.clear();
        navigate("/login")
    }

  return (
    <div>
        <GoogleLogout clientId={clientId} buttonText='Logout' onLogoutSuccess={onSuccess} theme="dark"/>
    </div>
  )
}

export default LogoutButn