import React, { useEffect, useState } from 'react'
import StockCard from '../Stock/StockCard'
import { API } from '../../service/api.js'
import { useDispatch } from 'react-redux';
import { setStock, setSymbol, setUniStocks } from '../../features/slice.js'
import { Navigate, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';


function Explore() {

  gsap.registerPlugin(ScrollTrigger)

  const [stocks, setStocks] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openStock = async (stock) => {
    dispatch(setStock({
      link: stock.companyLink,
      name: stock.name

    }));
    navigate("/stock");
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

  useGSAP(() => {
    gsap.utils.toArray(".stockCard").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8 }, // Initial state (before scrolling)
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%", // Animation starts when the card enters viewport
            toggleActions: "play none none reverse", // Plays only once
          },
        }
      );
    });
  }, [stocks]);

  return (
    <div className='m-auto mt-10 flex flex-wrap justify-evenly'>
      {stocks &&
        stocks.map((stock, idx) => (
          <div onClick={() => openStock(stock)} key={idx}>
            <StockCard stock={stock} />
          </div>
        ))}
    </div>
  )
}

export default Explore