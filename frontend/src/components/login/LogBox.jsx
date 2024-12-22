import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoginButn from './LoginButn';


function LogBox({ setLogState }) {

  const handleClose = () => {
    setLogState(false)
  }

  return (
    <>
      <div className={`font-afacad-flux fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[65vh] w-[55vw] bg-[#222] rounded-xl overflow-hidden flex`}>
        <div className='relative w-[40%]'>
          <img src='/logbg1.jpg' className='h-[65vh] w-full object-cover' />
          <h3 className='absolute top-[4rem] left-10 text-[#449682] text-2xl leading-8 font-extrabold'>Get your<br /> Investment,<br /> Doubled in <br />21 Days.</h3>
        </div>
        <div className='items-center flex flex-col flex-1 relative'>
          <p className='text-[#bfbfbf] text-3xl mt-10 font-extrabold'>Welcome to VaulTrade</p>
          <FontAwesomeIcon icon={faXmark} onClick={() => handleClose()} className='absolute top-5 right-5 cursor-pointer text-[#bfbfbf]' />
          <div className='mt-10'>
            <LoginButn />
          </div>
          <div>
            <p className='text-[#bfbfbf] mt-10'>OR</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <input type='text' placeholder='Enter Your Email Address' className='bg-[rgba(0,0,0,0)] border-b-2 px-2 pr-20 w-[300px] mt-8 focus:outline-none text-[#bfbfbf]' />
            <input type='text' placeholder='Enter Your Password' className='bg-[rgba(0,0,0,0)] border-b-2 px-2 pr-20 w-[300px] mt-3 focus:outline-none text-[#bfbfbf]' />
            <button className='scamBtn text-white bg-[#449682] rounded-lg h-8 hover:scale-[1.1] mt-8 font-semibold w-[40%]' onClick={()=>handleLogBox()}>Continue</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogBox