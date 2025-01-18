import React, { useState } from 'react'

function Navbar({setTab,tab}) {

    const handleTabClick=()=>{
        if(tab=='Explore'){
            setTab('Dashboard');
        }else{
            setTab('Explore');
        }
    }

  return (
    <>
        <div className='border-b-[1px] w-[100vw] h-10 border-b-[rgba(255,255,255,0.3)] px-24 flex text-white mt-10'>
            <p className={`${tab=='Explore'?"border-b-[5px] border-b-[#449682]":""} text-xl font-semibold mx-2 px-4 cursor-pointer`} onClick={()=>handleTabClick()}>Explore</p>
            <p className={`${tab=='Explore'?"":"border-b-[5px] border-b-[#449682]"} text-xl font-semibold mx-2 px-4 cursor-pointer`} onClick={()=>handleTabClick()}>Dashboard</p>
        </div>
    </>
  )
}

export default Navbar