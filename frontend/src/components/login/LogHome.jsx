import React, { useEffect, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import LogBox from './LogBox';
import Header from '../home/Header';

function LogHome() {

  const [logState, setLogState] = useState(false);

  let userData = null;

  const storedData = sessionStorage.getItem("profileInfo");
  if (storedData) {
    try {
      userData = JSON.parse(storedData);
    } catch (error) {
      console.error("Invalid JSON data in sessionStorage:", error);
      // Optionally remove invalid data
      sessionStorage.removeItem("profileInfo");
    }
  }

  const handleLogBox = () => {
    setLogState(true);
  }

  useGSAP(() => {
    const tl = gsap.timeline();


    tl.from('.search', {
      width: '0vw',
      duration: 0.8,
      ease: "power1.inOut",
    })

    tl.from('.quote', {
      y: -30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out'
    })

    tl.from('.scamBtn', {
      opacity: 0,
      scale: 0,
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

    var splitted = subCont.split("");


    var clutter = ""

    splitted.forEach((e, idx) => {
      clutter += `<span>${e}</span>`
      if (e == " ") {
        clutter += ` `
      }
    })

    subTitle.innerHTML = clutter


    gsap.from('.sub span', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.01,
      delay: 1.5
    })
    const scamBtn = document.querySelector('.scamBtn');

    scamBtn.addEventListener('mouseenter', () => {
      gsap.to('.scamBtn', {
        scale: 1.1,
        duration: 0.3,
        ease: "power1.out",
      });
    });

    scamBtn.addEventListener('mouseleave', () => {
      gsap.to('.scamBtn', {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    });
  }, [])

  return (
    <>
      <div className={`p-4 font-afacad overflow-hidden h-[100vh] filter ${logState ? 'brightness-50' : ""}`}>
        <Header setLogState={setLogState} userData={userData} />
        <div className='text-center relative'>
          <h2 className='quote text-[rgba(255,255,255,0.9)] text-6xl mt-[20vh] leading-[4.5rem] font-extrabold'>Laxmi Chit Fund,<br /> right here</h2>
          <h2 className='sub text-[#449682] mt-5 text-xl overflow-hidden font-semibold'>Built for scamming India.</h2>
          <button className='scamBtn text-white bg-[#449682] px-5 rounded-lg h-9 hover:scale-[1.1] mt-5 font-semibold' onClick={() => handleLogBox()}>Get Scammed</button>
          <img src='/candle.svg' className='candle h-[15rem] absolute right-0 bottom-[-50vh]' />
          <img src='/Asset 2.svg' className='asset h-[15rem] absolute left-0 bottom-[-45vh]' />
        </div>
      </div>
      {logState ? <LogBox setLogState={setLogState} /> : <></>}
    </>
  )
}

export default LogHome