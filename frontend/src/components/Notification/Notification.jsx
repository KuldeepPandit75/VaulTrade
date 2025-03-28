import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Notification({ message, status }) {

    const [color,setColor]=useState()

    useEffect(()=>{
        if(status=='Success'){
            setColor('green')
        }else if(status=='Failed'){
            setColor('red')
        }else{
            setColor(null)
        }
    },[status])

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.notifPanel', {
            y: 200,
            scale: 0,
            ease: "back.out(1)",
            duration: 0.4
        })

        tl.to('.progress', {
            width: 0,
            duration: 5
        })

        tl.to('.notifPanel', {
            y: 200,
            scale: 0,
            ease: "back.in(1)",
            duration: 0.4
        })
    })

    return (
        <>
            <div className='notifPanel fixed bottom-4 right-4 w-[20vw] h-[5vw] bg-[#1b1b1b] rounded-lg border-[1px] border-opacity-30 border-gray-100 shadow-[0px_5px_10px_#ffffff11]'>
                <div className={`progress w-[92%] h-[2px] bg-${color} m-auto rounded-xl`}></div>
                <div className='flex items-center justify-between px-4 py-2 h-full'>
                    {
                        status == 'Success' ?
                            <FontAwesomeIcon icon={faCircleCheck} className={`text-${color} text-2xl`} />
                            :
                            status == 'Failed' ?
                                <FontAwesomeIcon icon={faCircleExclamation} className={`text-${color} text-2xl`}/>
                                :
                                <FontAwesomeIcon icon={faTriangleExclamation} className={`text-${color} text-2xl`} />


                    }
                    <div className='text-white w-[80%] font-bold text-lg'> {message}</div>

                </div>
            </div>
        </>
    )
}

export default Notification