import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../service/api';
import StockChart from './StockChart.jsx';
import StockDet from './StockDet.jsx';


function Stock() {
    const [stock, setStock] = useState(null);
    const [price, setPrice] = useState(0);
    const [diff, setDiff] = useState("0.00 (0.00%)");


    const [data, setData] = useState(() => JSON.parse(localStorage.getItem('selectedStock')) || null);

    let stockPrices = useSelector(state => state.stockPrices);
    let stocksData = useSelector(state => state.stocks);


    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getStockData({ link: data.link });
            if (response.isSuccess) {
                response.data.info.companyName = data.name;
                setStock(response.data);
            } else {
                console.log(response.data);
                console.log(response)
            }
        }

        fetchData();
    }, [data])

    // useEffect(() => {
    //     if (stockPrices) {
    //         let difference = `${parseFloat((-stockPrices[0] + stockPrices[stockPrices.length - 1]).toFixed(3))}(${parseFloat((Math.abs(-stockPrices[0] + stockPrices[stockPrices.length - 1]) / stockPrices[0] * 100)).toFixed(2)}%)`;
    //         setDiff(difference);
    //     }
    // }, [stockPrices])

    useEffect(() => {
        if (stocksData && data) {
            for (const ele of stocksData) {
                if (data.link == ele.companyLink) {
                    setPrice(Number(ele.marketPrice.slice(1).split(",").join("")).toFixed(2))
                    setDiff(ele.priceChange)
                }
            }
        }
    }, [stocksData])






    return (
        <>
            <div className='flex w-[100%]'>
                <div className='mt-10 ml-[8%] w-[50%]'>
                    <img src={stock?.info.logo} className='bg-white rounded-md' width={60} />
                    <h1 className='text-white font-bold text-[1.5rem] mt-5'>{stock?.info.companyName}</h1>
                    <div className='flex mt-4 justify-between w-[35%] items-center'>

                        <p className='text-white font-bold text-[1.7rem]'>₹{price}</p>
                        <p className={`${diff && diff[0] == '-' ? "text-red" : "text-green"} font-bold`}>{diff}</p>
                    </div>
                    <StockChart name={stock?.info.companyName} />
                    <div className='mt-16'>

                        <h3 className='text-2xl text-white font-extrabold'>Fundamentals</h3>
                        <div className='flex flex-wrap mt-10 mx-5 justify-between'>
                            {stock && Object.keys(stock.fundamentals).map((fundamental,idx) => (
                                <div key={idx} className='flex text-white text-lg w-[45%] justify-between items-center mb-4'>
                                    <p className='text-md opacity-50'>{fundamental}:</p>
                                    <p className='font-bold'>{stock?.fundamentals[fundamental]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <StockDet price={price} stock={stock?.info} diff={diff} />

            </div>

        </>

    )
}

export default Stock