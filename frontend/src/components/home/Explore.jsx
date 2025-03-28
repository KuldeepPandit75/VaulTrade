import React, { useEffect, useState } from 'react'
import StockCard from '../Stock/StockCard'
import { API } from '../../service/api.js'
import { useDispatch, useSelector } from 'react-redux';
import { setStock, setSymbol, setUniStocks } from '../../features/slice.js'
import { Navigate, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '../loader/Loader.jsx';


function Explore() {

  gsap.registerPlugin(ScrollTrigger)

  const [stocks, setStocks] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stocksData = useSelector(state => state.stocks)

  useEffect(() => {
    if (stocksData) {
      setStocks(stocksData)
    }
  }, [stocksData])

  const openStock = async (stock) => {

    const selectedStockInfo = {
      link: stock.companyLink,
      name: stock.name
    }

    dispatch(setStock(selectedStockInfo));
    localStorage.setItem('selectedStock',JSON.stringify(selectedStockInfo))
    navigate(`/stock`);
    console.log("stock opened");

    fetch(`${import.meta.env.VITE_BOT_URL}/predictu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: `${stock.name}` }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSymbol(data.answer.trim()))
      })
      .catch((error) => console.error("Error:", error));

  };



  // useGSAP(() => {
  //   gsap.utils.toArray(".stockCard").forEach((card) => {
  //     gsap.fromTo(
  //       card,
  //       { opacity: 0, scale: 0.8 }, // Initial state (before scrolling)
  //       {
  //         opacity: 1,
  //         scale: 1,
  //         duration: 0.6,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: card,
  //           start: "top 95%", // Animation starts when the card enters viewport
  //           toggleActions: "play none none reverse", // Plays only once
  //         },
  //       }
  //     );
  //   });
  // }, [stocks]);

  if (stocks == null)
    return <Loader />

  return (
    <div className='m-auto mt-10 flex flex-wrap justify-evenly'>
      {stocks &&
        stocks.slice(0, 50).map((stock, idx) => (
          <div onClick={() => openStock(stock)} key={idx}>
            <StockCard stock={stock} />
          </div>
        ))}
    </div>
  )
}

export default Explore