import React from 'react'


function Navbar({setLogState,userData}) {

    const handleLogBox=()=>{
        setLogState(true);
      }

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex items-center text-[1.5rem]'>
                    <img src='/Asset 1.svg' className='h-[40px] px-4 py-2 box-content' />
                    <h2 className='text-white ml-3 font-extrabold'>VaulTrade</h2>
                </div>
                <div className='relative'>
                    <input type='text' placeholder='Search' className={`search text-[rgba(255,255,255,0.5)] rounded-lg border-none px-4 py-1 pr-10 w-[25vw] bg-[#333] focus:outline-none focus:w-[30vw] transition-all font-semibold`} />
                    <span style={{ fontFamily: "FontAwesome" }} className='ml-[-30px] text-[rgba(255,255,255,0.5)]'>&#xf002;</span>
                </div>
                <div className='flex items-center'>
                    {userData==null ?
                        <button className='text-white bg-[#449682] px-5 rounded-lg h-9 mr-6 hover:scale-[1.1] transition-all duration-200 font-semibold' onClick={() => handleLogBox()}>Login/Register</button>
                        :
                        <>
                            <img src={userData.imageUrl} className='rounded-[50%] h-11 ml-16'/>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar