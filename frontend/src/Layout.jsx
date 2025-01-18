import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Header from "./components/home/Header";

function Layout() {
  const [userData, setUserData] = useState(null);
  const data=useSelector(state=>state.user);

  useEffect(() => {
    setUserData(data);
  }, [data])

  return (
    <>
      <Header userData={userData} />
      <Outlet/>
    </>
  )
}

export default Layout