import React, { useEffect, useState } from 'react'

function StockCard({ stock }) {
  const [perf, setPerf] = useState(null);
  useEffect(()=>{

    if (stock.priceChange[0] == "-") {
      setPerf(false)
      
    } else {
      setPerf(true)
      
    }
  },[])
  return (
    <>
      <div className='stockCard bg-[#1b1b1b] border-[1px] border-opacity-30 border-gray-100 h-[6rem] w-[16rem] rounded-lg m-5 p-3 flex flex-col justify-between hover:scale-[1.05]'>
        <p className='text-white font-bold text-[1.1rem]'>{stock.name}</p>
        <div className='flex justify-between'>

        <p className='text-white font-bold'>{stock.marketPrice}</p>
        <p className={`${perf?"text-green":"text-red"}`}>{stock.priceChange}</p>
        </div>
      </div>
    </>
  )
}

export default StockCard