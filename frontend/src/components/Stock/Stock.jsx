import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../service/api';
import StockChart from './StockChart.jsx';
import StockDet from './StockDet.jsx';
import Loader from '../loader/Loader.jsx';


function Stock() {
    const [stock, setStock] = useState(null);
    const [price, setPrice] = useState(0);
    const [diff, setDiff] = useState("0.00 (0.00%)");
    
    
    let data = useSelector(state => state.stock);
    let stockPrices = useSelector(state => state.stockPrices);
    let stocksData = useSelector(state => state.stocks);

    

    useEffect(() => {

        const fetchData = async () => {
            const response = await API.getStockData({ link: data.link });
            if (response.isSuccess) {
                console.log(response.data)
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

    

    

    // useEffect(() => {
    //     console.log(data)
    //     if (stocksData || data) {

    //         for (const ele of stocksData) {
    //             if (data.link == ele.companyLink) {
    //                 setPrice(Number(ele.marketPrice.slice(1).split(",").join("")).toFixed(2))
    //                 setDiff(ele.priceChange)
    //             }
    //         }
    //     }
    // }, [stocksData])

    
    

    if(stock==null)
        return <Loader/>


    return (
        <div className='flex w-[100%]'>
            <div className='mt-10 ml-[8%] w-[50%]'>
                <img src={stock?.stockImage} className='bg-white rounded-md' width={60} />
                <h1 className='text-white font-bold text-[1.5rem] mt-5'>{stock?.stockName}</h1>
                <div className='flex mt-4 justify-between w-[35%] items-center'>

                    <p className='text-white font-bold text-[1.7rem]'>{stock?.stockPrice}</p>
                    <p className={`${stock?.priceChange[0] == '-' ? "text-red" : "text-green"} font-bold`}>{stock.priceChange}</p>
                </div>
                <StockChart name={stock?.stockName} />
            </div>
            <StockDet stock={stock}/>
        </div>
    )
}

export default Stock