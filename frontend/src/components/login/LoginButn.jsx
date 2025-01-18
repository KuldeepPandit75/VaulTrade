import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // To fetch user profile data
import { setUser } from '../../features/slice';
import Cookies from 'js-cookie';
import { API } from '../../service/api';

function LoginButn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Use the token to fetch user info
        const { access_token } = tokenResponse;

        Cookies.set("access_token",access_token,{expires:1,path:''});

        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          { headers: { Authorization: `Bearer ${access_token}` } }
        );

        const userInfo = userInfoResponse.data;
        const response= await API.login({data:userInfo});
        console.log(response)
        if(response.isSuccess){
          
          console.log("User Info:", response.data);
          
          
          // Dispatch user info to Redux
          dispatch(setUser(response.data));
          
          // Store user info in session storage (optional)
          sessionStorage.setItem("user", JSON.stringify(response.data));
          
          // Navigate to home or dashboard
          navigate("/");
        }else{
          alert("Error Logging In!")
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return (
    <button
      onClick={() => login()}
      style={{
        background: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
      }}
    >
      Login with Google
    </button>
  );
}

export default LoginButn;
