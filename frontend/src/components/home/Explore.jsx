import React, { useEffect, useState } from 'react'
import StockCard from '../Stock/StockCard'
import { API } from '../../service/api.js'
import { useDispatch } from 'react-redux';
import { setStock, setSymbol, setUniStocks } from '../../features/slice.js'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Explore() {
  const [stocks, setStocks] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const openStock = async (stock) => {
    dispatch(setStock(stock.companyLink));
    navigate("/stock");
    console.log("stock opened");

    fetch(`${import.meta.env.VITE_BOT_URL}/predictu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: `${stock.name}`}),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSymbol(data.answer.trim()))
      })
      .catch((error) => console.error("Error:", error));

  };

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await API.getStocks();
      if (response.isSuccess) {

        setStocks(response.data);
        dispatch(setUniStocks(response.data));
      } else {
        setStocks(false)
      }
    }
    // setInterval(fetchStocks,4000);
    fetchStocks();

  }, [])
  return (
    <div className='m-auto mt-10 flex flex-wrap justify-evenly'>
      {stocks?.map((stock, idx) => (
        <div onClick={() => openStock(stock)} key={idx}>
          <StockCard stock={stock} />
        </div>
      ))}
    </div>
  )
}

export default Explore