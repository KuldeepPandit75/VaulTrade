import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/slice';
import { useNavigate } from 'react-router-dom';
import { gapi } from "gapi-script";

const clientId = "458563103734-rc683qfss1qkbu5acik81iic0t28c0iq.apps.googleusercontent.com"

function LoginButn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("Login Success!", res.profileObj);

        dispatch(setUser(res.profileObj));

        sessionStorage.setItem("profileInfo", JSON.stringify(res.profileObj));

        navigate("/")

        var accessToken = gapi.auth.getToken().access_token;

        const now = new Date();
        now.setTime(now.getTime() + 1 * 60 * 60 * 1000); // Add 1 hour (in milliseconds)
        const expires = now.toUTCString();
        document.cookie = `access_token=${accessToken}; expires=${expires}; path=/; samesite=Lax`;
    }

    const onFailure = (res) => {
        console.log("Login Failed! res: ", res);
    }


    return (
        <div>
            <GoogleLogin clientId={clientId} buttonText='Continue with Google' onSuccess={onSuccess} onFailure={onFailure} cookiePolicy='single_host_origin' isSignedIn={true} theme='dark' />
        </div>
    )
}

export default LoginButn