import { Outlet, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/home/Header";
import Loader from "./components/loader/Loader";
import Notification from "./components/Notification/Notification";
import { API } from "./service/api";
import { setUniStocks } from "./features/slice";

function Layout() {
  const [userData, setUserData] = useState(null);
  const data = useSelector(state => state.user);
  const notifications = useSelector(state => state.notifications)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    setUserData(data);
  }, [data])

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await API.getStocks();
      if (response.isSuccess) {
        dispatch(setUniStocks(response.data));
      }
    }
    // setInterval(fetchStocks,4000);
    fetchStocks();

  }, [])

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