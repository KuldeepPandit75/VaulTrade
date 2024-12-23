import React, { useState } from 'react'

function Navbar() {
    const [tab,setTab]=useState(true);

    const handleTabClick=()=>{
        if(tab){
            setTab(false);
        }else{
            setTab(true);
        }
    }

  return (
    <>
        <div className='border-b-[1px] w-[100vw] h-10 border-b-[rgba(255,255,255,0.3)] px-10 flex text-white mt-10'>
            <p className={`${tab?"border-b-[5px] border-b-[#449682]":""} text-xl font-semibold mx-2 px-4 cursor-pointer`} onClick={()=>handleTabClick()}>Explore</p>
            <p className={`${tab?"":"border-b-[5px] border-b-[#449682]"} text-xl font-semibold mx-2 px-4 cursor-pointer`} onClick={()=>handleTabClick()}>Dashboard</p>
        </div>
    </>
  )
}

export default Navbar