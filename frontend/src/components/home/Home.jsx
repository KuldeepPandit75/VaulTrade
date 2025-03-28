import React, { useEffect, useState } from 'react'
import LogoutButn from '../login/LogoutButn'
import Header from './Header'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Explore from './Explore'
import Dashboard from './Dashboard'


function Home() {
  const [tab,setTab]=useState('Explore');
  

  return (
    <>
      <Navbar setTab={setTab} tab={tab}/>
    <div className='overflow-x-hidden'>
      { tab=='Explore' ?
        <Explore/>: <Dashboard/>
      }
    </div>
    
    </>
  )
}

export default Home