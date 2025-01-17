import React from 'react'

function StockCard({stock}) {
  return (
    <>
        <div className='bg-[#1b1b1b] border-[1px] border-opacity-30 border-gray-100 h-[6rem] w-[16rem] rounded-lg m-5 '>
          <h3>{stock.companyName}</h3>
        </div>
    </>
  )
}

export default StockCard