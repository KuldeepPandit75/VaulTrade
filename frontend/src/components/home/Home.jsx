import React from 'react'
import LogoutButn from '../login/LogoutButn'
import Navbar from './Navbar'

function Home() {

  const userData=JSON.parse(sessionStorage.getItem("profileInfo"));
  console.log(userData)

  return (
    <div className='px-5 pt-4'>
      <Navbar userData={userData}/>
      <LogoutButn/>
    </div>
  )
}

export default Home