import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Header from "./components/home/Header";
import Loader from "./components/loader/Loader";

function Layout() {
  const [userData, setUserData] = useState(null);
  const data=useSelector(state=>state.user);

  useEffect(() => {
    setUserData(data);
  }, [data])

  if(userData==null) 
    return (<Loader/>);

  return (
    <>
      <Header userData={userData} />
      <Outlet/>
    </>
  )
}

export default Layout