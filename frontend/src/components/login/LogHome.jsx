import React, { useEffect, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import LogBox from './LogBox';
import "@fontsource/afacad-flux";

function LogHome() {

  const [logState,setLogState]=useState(false);

  const handleLogBox=()=>{
    setLogState(true);
  }

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.search', {
      width: '0vw',
      duration: 0.8,
      ease: "power4.out",
    })

    tl.from('.quote', {
      y: -30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out'
    })


    tl.from('.asset', {
      y: -8,
      opacity: 0,
      duration: 3,
      ease: 'power4.out'
    })

    tl.to('.asset', {
      y: -8,
      repeat: -1,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true
    }, '-=2')

    tl.from('.candle', {
      y: -8,
      opacity: 0,
      duration: 3,
      ease: 'power4.out'
    }, "<")

    tl.to('.candle', {
      y: -8,
      repeat: -1,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true
    }, '-=2')


  })

  useEffect(() => {

    var subTitle = document.querySelector(".sub");
    var subCont = subTitle.textContent;
    console.log(subCont)

    var splitted = subCont.split("");


    var clutter = ""

    splitted.forEach((e,idx) => {
      clutter += `<span>${e}</span>`
      if(e==" "){
        clutter+=` `
      }
    })
    console.log(clutter)

    subTitle.innerHTML = clutter

    
    gsap.from('.sub span',{
      y:20,
      opacity:0,
      duration:0.5,
      stagger:0.01,
      delay:1.5
    })
  },[])

  return (
    <>
      <div className={`p-4 font-coolvetica overflow-hidden h-[100vh] filter ${logState?'brightness-50':""}`}>
        <div className='flex justify-between items-center'>
          <div className='flex items-center text-[1.5rem]'>
            <img src='/Asset 1.svg' className='h-[40px] px-4 py-2 box-content' />
            <h2 className='text-white ml-3'>VaulTrade</h2>
          </div>
          <div className='relative'>
            <input type='text' placeholder='Search' className={`search text-[rgba(255,255,255,0.5)] rounded-lg border-none px-4 py-1 pr-10 w-[25vw] bg-[#333] focus:outline-none focus:w-[30vw] transition-all`} />
            <span style={{ fontFamily: "FontAwesome" }} className='ml-[-30px] text-[rgba(255,255,255,0.5)]'>&#xf002;</span>
          </div>
          <div className='flex items-center'>
            <button className='text-white bg-[#449682] px-5 rounded-lg h-9 mr-6 hover:scale-[1.1] transition-all duration-200' onClick={()=>handleLogBox()}>Login/Register</button>
          </div>
        </div>
        <div className='text-center relative'>
          <h2 className='quote text-[rgba(255,255,255,0.9)] text-6xl mt-[20vh] leading-[4.5rem]'>Laxmi Chit Fund,<br /> right here</h2>
          <h2 className='sub text-[#449682] mt-5 text-xl overflow-hidden'>Built for scamming India.</h2>
          <img src='/candle.svg' className='candle h-[15rem] absolute right-0 bottom-[-50vh]' />
          <img src='/Asset 2.svg' className='asset h-[15rem] absolute left-0 bottom-[-45vh]' />
        </div>
      </div>
      {logState?<LogBox logState={logState} setLogState={setLogState}/>:<></>}
    </>
  )
}

export default LogHome