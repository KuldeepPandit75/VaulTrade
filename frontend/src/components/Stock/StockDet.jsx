import React, { useEffect, useState } from 'react'
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setUser } from '../../features/slice.js';


function StockDet({ price, stock }) {
    const [tab, setTab] = useState("buy");
    const [qty, setQty] = useState("");
    const [sellQty, setSellQty] = useState("");
    const [exceeding, setExceeding] = useState(false);
    const [investments, setInvestments] = useState([]);
    const [sellStockStatus, setSellStockStatus] = useState(null);
    const [noti, setNoti] = useState(null);
    const [notiType, setNotiType] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [diff, setDiff] = useState("0.00 (0.00%)");
    const [data, setData] = useState(() => JSON.parse(localStorage.getItem('selectedStock')) || null);

    const userData = useSelector(state => state.user)
    let stocksData = useSelector(state => state.stocks);


    const handleTabClick = () => {
        if (tab == "buy") {
            setTab("sell")
        } else {
            setTab("buy")
        }
    }

    useEffect(() => {
        setSellQty("")
        setSellStockStatus(null);
    }, [stock])

    useEffect(() => {
        if (noti && notiType) {
            dispatch(setNotification({ noti, notiType }))

        }
    }, [noti])

    const checkInvest = (name) => {
        for (let investment of investments) {
            if (investment.stockName == name) {
                setSellStockStatus(`You have ${investment.stockQuantity} Shares to sell.`);
                break;
            } else {
                setSellStockStatus("You have 0 Shares to sell.")
            }
        }
    }


    // useEffect(() => {
    //     let storedData = JSON.parse(sessionStorage.getItem("user"));
    //     setUserData(storedData);
    // }, [refresh])

    const handleQty = (e) => {
        setQty(Number(e.target.value))
    }

    useEffect(() => {

        if (Number(qty * price) > Number(userData?.balance.$numberDecimal)) {
            setExceeding(true);
        }
        if (Number(qty * price) < Number(userData?.balance.$numberDecimal)) {
            setExceeding(false);
        }
    }, [qty])


    const handleBuyBtn = async () => {

        if (qty != 0 && qty != null) {

            const reqData = {
                buyPrice: price,
                stockName: stock?.companyName,
                stockQuantity: null,
                email: userData.email,
                companyLink: stock?.companyLink
            }

            const response = await API.buyStock(reqData)

            if (response.isSuccess) {
                setNoti("Invested Succesfully");
                setNotiType("Success")
                setQty(null);
                dispatch(setUser(response.data))
                sessionStorage.setItem("user", JSON.stringify(response.data));
            } else {
                setNoti("Investment Failed!");
                setNotiType("Failed")
            }
        }

    }

    const handleSellBtn = async () => {
        for (let investment of investments) {
            if (investment.stockName == stock?.companyName && investment.email == userData.email) {
                if (investment.stockQuantity < sellQty) {
                    setNoti(`Insufficient Stock`)
                    setNotiType("Warning")
                }
            } else {
                const reqData = {
                    email: userData.email,
                    sellQty: sellQty,
                    sellPrice: price,
                    stockName: stock?.companyName
                }

                const response = await API.sellStock(reqData);

                if (response.isSuccess) {
                    setNoti('Sold Succesfully');
                    setNotiType("Success")
                    setSellQty(null);
                    dispatch(setUser(response.data));
                    sessionStorage.setItem("user", JSON.stringify(response.data));

                } else {
                    console.log(response)
                }
                // setRefresh(prev=>!prev)
                break;
            }
        }

    }

    useEffect(() => {
        const fetchInvestments = async () => {
            const response = await API.getUserInvestments();
            if (response.isSuccess) {
                setInvestments(response.data);
            } else {
                setInvestments(false)
            }
        }
        fetchInvestments();

    }, [userData])

    useEffect(() => {
        if (stocksData && data) {
            for (const ele of stocksData) {
                if (data.link == ele.companyLink) {
                    setDiff(ele.priceChange)
                }
            }
        }
    }, [stocksData])

    return (
        <>
            <div className='border-[1px] border-[rgba(255,255,255,0.2)] flex-1 mx-32 mt-20 mb-20 rounded-xl text-white h-[500px] flex flex-col sticky top-10'>
                <div className='heading px-5 border-b-inherit border-b-[1px] py-3'>
                    <h1 className='font-bold'>{stock?.companyName}</h1>
                    <h2 className='text-[rgba(255,255,255,0.5)] text-sm'>NSE ₹{price} {diff}</h2>
                </div>
                <div className='border-b-[1px] h-10 border-b-inherit flex text-white mt-4'>
                    <p className={`${tab == 'buy' ? "border-b-[5px] border-b-green text-green" : ""} text-xl font-semibold mx-2 px-4 cursor-pointer`} onClick={() => handleTabClick()}>Buy</p>
                    <p className={`${tab == 'buy' ? "" : "border-b-[5px] border-b-red text-red"} text-xl font-semibold mx-2 px-4 cursor-pointer`} onClick={() => handleTabClick()}>Sell</p>
                </div >
                {tab == 'buy' &&
                    <div className='border-inherit flex flex-col flex-1 justify-between'>
                        <div className='border-inherit h-1/4 flex flex-col justify-evenly'>
                            <div className='border-inherit flex justify-between px-5 items-center'>
                                <p>Qty <b>NSE</b></p>
                                <input placeholder='' type='number' className='bg-transparent border-[1px] border-inherit no-spinner text-right rounded-[5px] leading-8 px-2' value={qty} onChange={(e) => handleQty(e)} />
                            </div>
                            <div className='border-inherit flex justify-between px-5 items-center'>
                                <p>Price</p>
                                <input placeholder='' type='number' className='bg-transparent border-[1px] border-inherit no-spinner text-right rounded-[5px] leading-8 px-2' readOnly value={price} />
                            </div>
                        </div>
                        <div className='text-center h-1/3 flex flex-col justify-evenly items-center border-inherit'>
                            {
                                !exceeding
                                    ?
                                    <p className='opacity-40 text-sm'>Order will be executed at {price} or lower price</p>
                                    :
                                    <p className='bg-[#443921] rounded-sm px-2 py-1 mb-2'>Available amount is enough for {Math.floor(userData?.balance.$numberDecimal / price)} shares</p>
                            }
                            <hr className='border-inherit border-[1px] w-full' />
                            <div className='flex justify-between w-full px-5 mt-2'>
                                <p className='opacity-40 text-sm'>Balance: ₹{parseFloat(userData?.balance.$numberDecimal).toFixed(2)}</p>
                                <p className='opacity-40 text-sm'>Approx Req. : ₹{(qty * price).toFixed(2)}</p>
                            </div>
                            {
                                !exceeding
                                    ?
                                    <button className='bg-green w-[80%] scale-[0.99] rounded-lg h-[40px] text-xl font-bold hover:bg-[#449072] hover:scale-[1] transition-all my-3' onClick={handleBuyBtn}>Buy</button>
                                    :
                                    <div className='flex justify-between px-10 w-full my-3'>
                                        <button className='border-inherit border-[1px] rounded-lg px-3 py-1'>Buy {Math.floor(userData?.balance.$numberDecimal / price)} shares</button>
                                        <button className='bg-green px-3 py-1 rounded-lg' onClick={() => { navigate("/wallet") }}>Add Money</button>
                                    </div>

                            }
                        </div>
                    </div>
                }
                {tab == 'sell' &&
                    <div className='border-inherit flex flex-col flex-1 justify-between'>
                        <div className='border-inherit h-1/4 flex flex-col justify-evenly'>
                            <div className='border-inherit flex justify-between px-5 items-center'>
                                <p>Qty <b>NSE</b></p>
                                <input placeholder='' type='number' className='bg-transparent border-[1px] border-inherit no-spinner text-right rounded-[5px] leading-8 px-2' value={sellQty} onChange={(e) => { checkInvest(stock?.companyName); setSellQty(e.target.value) }} />
                            </div>
                            <div className='border-inherit flex justify-between px-5 items-center'>
                                <p>Price</p>
                                <input placeholder='' type='number' className='bg-transparent border-[1px] border-inherit no-spinner text-right rounded-[5px] leading-8 px-2' readOnly value={price} />
                            </div>
                        </div>
                        <div className='text-center h-1/3 flex flex-col justify-evenly items-center border-inherit'>
                            {!sellStockStatus ?
                                <p className='opacity-40 text-sm'>Order will be executed at {price} or higher price</p>
                                :
                                <p>{sellStockStatus}</p>
                            }
                            <hr className='border-inherit border-[1px] w-full' />
                            <div className='flex justify-between w-full px-5'>
                                <p className='opacity-40 text-sm'>Balance: ₹{parseFloat(userData?.balance.$numberDecimal).toFixed(2)}</p>
                                <p className='opacity-40 text-sm'></p>
                            </div>
                            <button className='bg-red w-[80%] scale-[0.99] rounded-lg h-[40px] text-xl font-bold hover:bg-[#ff484c] hover:scale-[1] transition-all' onClick={handleSellBtn}>Sell</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default StockDet