import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../service/api';
import StockChart from './StockChart.jsx';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../features/slice.js';


function Stock() {
    const [stock, setStock] = useState(null);
    const [price, setPrice] = useState(0);
    const [diff, setDiff] = useState("0.00 (0.00%)");
    const [tab, setTab] = useState("buy");
    const [qty, setQty] = useState(null);
    const [exceeding, setExceeding] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    let data = useSelector(state => state.stock);
    let stockPrices = useSelector(state => state.stockPrices);
    let stocksData=useSelector(state=>state.stocks)

    const handleTabClick = () => {
        if (tab == "buy") {
            setTab("sell")
        } else {
            setTab("buy")
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await API.getStockData({ link: data });
            if (response.isSuccess) {
                setStock(response.data);
            } else {
                console.log(response.data);

            }
        }

        fetchData();
    }, [data])

    useEffect(() => {
        if (stockPrices) {
            let difference = `${parseFloat((-stockPrices[0] + stockPrices[stockPrices.length - 1]).toFixed(3))} (${parseFloat((Math.abs(-stockPrices[0] + stockPrices[stockPrices.length - 1]) / stockPrices[0] * 100)).toFixed(2)}%)`;
            setDiff(difference);
        }
    }, [stockPrices])

    useEffect(() => {
        let storedData = JSON.parse(sessionStorage.getItem("user"));
        setUserData(storedData);
    }, [])

    const handleQty = (e) => {
        const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
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

    useEffect(()=>{
        if(stocksData || data){
            for (const ele of stocksData){
                if(data==ele.companyLink){
                    setPrice(Number(ele.marketPrice.slice(1).split(",").join("")))
                    setDiff(ele.priceChange)
                }
            }
        }
    },[stocksData])

    const handleBuyBtn= async()=>{

        if(qty!=0 && qty!=null){
            
            const reqData={
                buyPrice:price,
                stockName: stock?.companyName,
                email:userData.email
            }
    
            const response=await API.buyStock(reqData)
    
            if(response.isSuccess){
                alert("Invested Succesfully");
                setQty(null);
                dispatch(setUser(response.data))
                sessionStorage.setItem("user",JSON.stringify(response.data));
            }else{
                alert("Investment Failed!");
            }
        }

    }

    console.log(stock)


    return (
        <div className='flex w-[100%]'>
            <div className='mt-10 ml-[8%] w-[50%]'>
                <img src={stock?.logo} className='bg-white rounded-md' width={60} />
                <h1 className='text-white font-bold text-[1.5rem] mt-5'>{stock?.companyName}</h1>
                <div className='flex mt-4 justify-between w-[35%] items-center'>

                    <p className='text-white font-bold text-[1.7rem]'>₹{price}</p>
                    <p className={`${diff && diff[0] == '-' ? "text-red" : "text-green"} font-bold`}>{diff}</p>
                </div>
                <StockChart name={stock?.companyName} />
            </div>
            <div className='border-[1px] border-[rgba(255,255,255,0.2)] flex-1 mx-32 mt-20 mb-20 rounded-xl text-white h-[500px] flex flex-col sticky top-10'>
                <div className='heading px-5 border-b-inherit border-b-[1px] py-3'>
                    <h1 className='font-bold'>{stock?.companyName}</h1>
                    <h2 className='text-[rgba(255,255,255,0.5)] text-sm'>NSE ₹{price} ({diff.split("(")[1]}</h2>
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
                                <input placeholder='' type='number' className='bg-transparent border-[1px] border-inherit no-spinner text-right rounded-[5px] leading-8 px-2' />
                            </div>
                            <div className='border-inherit flex justify-between px-5 items-center'>
                                <p>Price</p>
                                <input placeholder='' type='number' className='bg-transparent border-[1px] border-inherit no-spinner text-right rounded-[5px] leading-8 px-2' readOnly value={price} />
                            </div>
                        </div>
                        <div className='text-center h-1/3 flex flex-col justify-evenly items-center border-inherit'>
                            <p className='opacity-40 text-sm'>Order will be executed at {price} or higher price</p>
                            <hr className='border-inherit border-[1px] w-full' />
                            <div className='flex justify-between w-full px-5'>
                                <p className='opacity-40 text-sm'>Balance: ₹{userData?.balance.$numberDecimal}</p>
                                <p className='opacity-40 text-sm'></p>
                            </div>
                            <button className='bg-red w-[80%] scale-[0.99] rounded-lg h-[40px] text-xl font-bold hover:bg-[#ff484c] hover:scale-[1] transition-all'>Sell</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Stock