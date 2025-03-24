import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Header from "./components/home/Header";
import Loader from "./components/loader/Loader";
import Notification from "./components/Notification/Notification";

function Layout() {
  const [userData, setUserData] = useState(null);
  const data = useSelector(state => state.user);
  const notifications=useSelector(state=>state.notifications)
  console.log(notifications)

  useEffect(() => {
    setUserData(data);
  }, [data])

  if (userData == null)
    return (<Loader />);

  return (
    <>
      <Header userData={userData} />
      <Outlet />
      {notifications.length != 0 && notifications.map((notification, idx) => (
        <Notification key={idx} message={notification.noti} status={notification.notiType} />

      ))}
    </>
  )
}

export default Layout