import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function LogBox({ logState, setLogState }) {
  const handleClose = () => {
    setLogState(false)
  }
  return (
    <>
      <div className={`font-coolvetica fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[65vh] w-[55vw] bg-[#222] rounded-xl overflow-hidden flex`}>
        <div className='relative w-[40%]'>
          <img src='/logbg1.jpg' className='h-[65vh] w-full object-cover' />
          <h3 className='absolute top-[4rem] left-10 text-[#449682] text-2xl leading-8'>Get your<br /> Investment,<br /> Doubled in <br />30 Days.</h3>
        </div>
        <div className='items-center flex flex-col flex-1 relative'>
          <p className='text-[#bfbfbf] text-3xl mt-10'>Welcome to VaulTrade</p>
          <FontAwesomeIcon icon={faXmark} onClick={() => handleClose()} className='absolute top-5 right-5 cursor-pointer text-[#bfbfbf]' />
          <div className='border-solid border-[0.001px] border-white text-white px-14 py-1 rounded-[5px] my-auto transition-all hover:scale-[1.05] cursor-pointer' >
            Continue with Google
          </div>
        </div>
      </div>
    </>
  )
}

export default LogBox