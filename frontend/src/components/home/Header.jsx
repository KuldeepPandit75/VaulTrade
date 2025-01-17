import React, { useEffect, useState } from 'react'
import LogoutButn from '../login/LogoutButn';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


function Header({ setLogState , userData=null }) {

    const location = useLocation();
    const [dropState, setDropState] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [search, setSearch] = useState("");
    const [focus, setFocus] = useState(false);

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

    const handleKeyDown=(e)=>{
        if(e.key=="Enter"){
            let URI=`https://api.polygon.io/v3/reference/tickers?${search.length==0?"":(search.length<3?`ticker=${search.toUpperCase()}&`:`search=${search}&`)}market=stocks&active=true&limit=100&apiKey=4h3QWPlH6G_BBEMqOADOBA03UiQS9r68`
        axios.get(URI)
        .then((res)=>{
            setStocks(res.data.results)
            console.log(res.data.results)
        })
        console.log(URI)
        }
    }

    return (
        <>
            <div className='flex justify-between items-center px-5 pt-4'>
                <div className='flex items-center text-[1.5rem]'>
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
                            setTimeout(()=>{
                                setFocus(false)
                            },150)
                        }}
                        onKeyDown={(e)=>handleKeyDown(e)}
                    />
                    <span style={{ fontFamily: "FontAwesome" }} className='ml-[-30px] text-[rgba(255,255,255,0.5)]'>&#xf002;</span>
                </div>
                {stocks && focus &&

                    <div className='absolute top-[70px] bg-[#121212] z-10 rounded-lg w-[30vw] left-[50.5%] -translate-x-1/2 border-[1px] border-opacity-50 border-[#d1d1d1]'>
                        {stocks.slice(0, 5).map((stock, idx) => (
                            <Link to={`/${idx}`} key={idx}>
                            <div className='px-3 py-2 hover:bg-[#1b1b1b] overflow-hidden cursor-pointer rounded-lg text-[#d1d1d1]' key={idx}>
                                <h3 className='font-extrabold'>{stock.name}</h3>
                                <p>{stock.ticker}</p>
                            </div>
                            </Link>
                        ))}
                    </div>
                }
                <div className='flex items-center relative'>
                    {userData == null ? (
                        <button className='text-white bg-[#449682] px-5 rounded-lg h-9 mr-6 hover:scale-[1.1] transition-all duration-200 font-semibold' onClick={() => handleLogBox()}>Login/Register</button>
                    ) : (
                        <>
                            {userData.picture ? (
                                <img src={userData.picture} className='rounded-[50%] h-11 ml-16 cursor-pointer' onClick={() => handleProfileClick()} />) : <img src={userData.imageUrl} className='rounded-[50%] h-11 ml-16 cursor-pointer' onClick={() => handleProfileClick()} />}
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