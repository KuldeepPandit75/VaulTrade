import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../features/slice';
import Cookies from 'js-cookie'

const clientId = "458563103734-rc683qfss1qkbu5acik81iic0t28c0iq.apps.googleusercontent.com"

function LogoutButn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    console.log("Log out successfull!");
    dispatch(setUser(null));
    sessionStorage.clear();
    navigate("/login");
    Cookies.remove("access_token");
  }

  return (
    <div>
      <button onClick={logout} style={{ background: 'dark', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButn