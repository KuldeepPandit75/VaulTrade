import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/slice';
import { useNavigate } from 'react-router-dom';

const clientId = "458563103734-rc683qfss1qkbu5acik81iic0t28c0iq.apps.googleusercontent.com"

function LoginButn() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const onSuccess = (res) => {
        console.log("Login Success!",res.profileObj);
        dispatch(setUser(res.profileObj));
        sessionStorage.setItem("profileInfo",JSON.stringify(res.profileObj))
        navigate("/")
    }

    const onFailure = (res) => {
        console.log("Login Failed! res: ", res);
    }


    return (
        <div>
            <GoogleLogin clientId={clientId} buttonText='Continue with Google' onSuccess={onSuccess} onFailure={onFailure} cookiePolicy='single_host_origin' isSignedIn={true} theme='dark'/>
        </div>
    )
}

export default LoginButn