import React, { useEffect, useState } from 'react'
import LogoutButn from '../login/LogoutButn'
import Navbar from './Navbar'

function Home() {

  const [userData, setUserData] = useState(null)

  useEffect(() => {

    let data = null;
    const storedData = sessionStorage.getItem("profileInfo");
    if (storedData) {
      try {
        data = JSON.parse(storedData);
      } catch (error) {
        console.error("Invalid JSON data in sessionStorage:", error);
        // Optionally remove invalid data
        sessionStorage.removeItem("profileInfo");
      }
    }
    setUserData(data);
  }, [])


  return (
    <div className='px-5 pt-4'>
      <Navbar userData={userData} />
    </div>
  )
}

export default Home