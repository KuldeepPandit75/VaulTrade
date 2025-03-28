import React, { useEffect, useState } from 'react'
import LogoutButn from '../login/LogoutButn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { setStock, setSymbol } from '../../features/slice';
import { useDispatch, useSelector } from 'react-redux';
import levenshtein from 'fast-levenshtein';
import { API } from '../../service/api';


function Header({ setLogState, userData = null }) {

    const location = useLocation();
    const [dropState, setDropState] = useState(false);
    const [stocks, setStocks] = useState();
    const [search, setSearch] = useState("");
    const [focus, setFocus] = useState(false);
    const stocksData=useSelector(state=> state.stocks)
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleLogBox = () => {
        setLogState(true);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleProfileClick = () => {
        if (location.pathname != "/login") {
            if (dropState) {
                setDropState(false)
            } else {
                setDropState(true)
            }
        }
    }

    const handleKeyDown = async(e) => {
        if (e.key == "Enter") {
            
            const response= await API.stockSearch({query:search})

            if(response.isSuccess){
                setStocks(response.data?.slice(0,5))
            }
    
        }
    }

    const goHome = () => {
        navigate("/")
    }

    const handleWalletClick = () => {
        navigate("/wallet")
    }

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo('.logo,.walletIcon,.loginBtn,.dp', {
            y: -20,
            opacity: 0,
        }, {
            y: 0,
            opacity: 100,
            stagger: 0.4,
        })
    }, [])

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

    return (
        <>
            <div className={`flex justify-between items-center px-24 pt-4 ${location.pathname == "/" ? "bg-[#111]" : ""}  z-[10000]`}>
                <div className='logo flex items-center text-[1.5rem] cursor-pointer' onClick={goHome}>
                    <img src='/Asset 1.svg' className='h-[40px] px-4 py-2 box-content' />
                    <h2 className='text-white ml-3 font-extrabold'>VaulTrade</h2>
                </div>
                <div className='absolute left-1/2 -translate-x-1/2'>
                    <input
                        type='text'
                        placeholder='Search'
                        className={`search text-[rgba(255,255,255,0.5)] rounded-lg border-none px-4 py-1 pr-10 w-[25vw] bg-[#333] focus:outline-none focus:w-[30vw] transition-all font-semibold`}
                        value={search}
                        onChange={(e) => handleSearch(e)}
                        onFocus={() => setFocus(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                setFocus(false)
                            }, 150)
                        }}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <span style={{ fontFamily: "FontAwesome" }} className='ml-[-30px] text-[rgba(255,255,255,0.5)]'>&#xf002;</span>
                </div>
                {stocks &&

                    <div className={`absolute top-[70px] bg-[#121212] z-10 rounded-lg w-[30vw] left-[50.5%] -translate-x-1/2 border-[1px] border-opacity-50 border-[#d1d1d1]  ${focus ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}transition-all duration-200`}>
                        {stocks.slice(0, 5).map((stock, idx) => (
                                <div key={idx} className='px-3 py-2 hover:bg-[#1b1b1b] overflow-hidden cursor-pointer rounded-lg text-[#d1d1d1]' onClick={()=>openStock(stock)}>
                                    <h3 className='font-extrabold'>{stock.name}</h3>
                                    {/* <p>{stock.ticker}</p> */}
                                </div>
                        ))}
                    </div>
                }

                <div className='flex items-center relative'>
                    {userData == null ? (
                        <button className='loginBtn text-white bg-[#449682] px-5 rounded-lg h-9 mr-6 hover:scale-[1.1] font-semibold' onClick={() => handleLogBox()}>Login/Register</button>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" height="24" width="24" className='walletIcon hover:bg-[rgba(255,255,255,0.1)] rounded-[50%] h-10 w-10 p-2 cursor-pointer ' onClick={() => handleWalletClick()}><path fill="white" d="M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm8-4q-.825 0-1.412-.587A1.93 1.93 0 0 1 11 15V9q0-.825.588-1.412A1.93 1.93 0 0 1 13 7h7q.824 0 1.413.588Q22 8.175 22 9v6q0 .824-.587 1.413A1.93 1.93 0 0 1 20 17zm7-2V9h-7v6zm-4-1.5q.625 0 1.063-.437.437-.438.437-1.063t-.437-1.062A1.45 1.45 0 0 0 16 10.5q-.625 0-1.062.438A1.45 1.45 0 0 0 14.5 12q0 .624.438 1.063.437.437 1.062.437"></path></svg>
                            {userData.picture ? (

                                <img src={userData.picture} className='dp rounded-[50%] h-11 ml-10 cursor-pointer hover:scale-[1.1] ' onClick={() => handleProfileClick()} />) : <img src={userData.imageUrl} className='rounded-[50%] h-11 ml-16 cursor-pointer hover:scale-[1.05] transition-all duration-200' onClick={() => handleProfileClick()} />}

                            <div className={`absolute top-14 ${dropState ? "block" : "hidden"}`}>

                                <LogoutButn />
                            </div>
                        </>
                    )
                    }
                </div>
            </div>

        </>
    )
}

export default Header