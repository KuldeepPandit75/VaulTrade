import React, { useEffect, useState } from 'react'
import StockCard from '../Stock/StockCard'
import {API} from '../../service/api.js'

function Explore() {
  const [stocks,setStocks]=useState(null);
  useEffect(()=>{
    const fetchStocks=async()=>{
      const response= await API.getStocks();
      if(response.isSuccess){
        console.log(response.data);
        
        setStocks(response.data);
      }else{
        setStocks(false)
      }
    }
    setInterval(fetchStocks,5000);
    fetchStocks();

  },[])
  return (
    <div className='m-auto mt-10 flex flex-wrap justify-evenly'>
        {stocks?.map((stock,idx)=>(
          <StockCard key={idx} stock={stock}/>
        ))}
    </div>
  )
}

export default Explore