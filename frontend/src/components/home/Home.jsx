import React, { useEffect, useState } from 'react'
import LogoutButn from '../login/LogoutButn'
import Header from './Header'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Explore from './Explore'


function Home() {
  const [tab,setTab]=useState('Explore');


  return (
    <div className='overflow-x-hidden'>
      <Navbar setTab={setTab} tab={tab}/>
      { tab=='Explore' ?
        <Explore/>: null
      }
    </div>
  )
}

export default Home