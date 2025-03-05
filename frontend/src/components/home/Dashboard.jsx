import React, { useEffect, useState } from 'react'
import { API } from '../../service/api'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StockDet from '../Stock/StockDet';


function Dashboard() {
    const [investments, setInvestments] = useState();
    const [investedVal, setInvestedVal] = useState(0);
    const [currVal, setCurrVal] = useState(0);
    const stocks = useSelector(state => state.stocks);
    const [selectedStock, setSelectedStock] = useState(null);
    const [userData, setUserData] = useState(null);
    const dispatch=useDispatch();

    let data = useSelector(state => state.user)

    const stockTrend = (investment) => {
        for (let stock of stocks) {
            let mpInNum = parseFloat(stock.marketPrice.slice(1).replace(/,/g, ""))
            if (stock.name == investment.stockName) {
                if ((mpInNum - investment.buyPrice.$numberDecimal)[0] == "-") {
                    return "loss"
                }
                else {
                    return 'profit'
                }
            }
        }
    }

    const returnVal = (investment) => {
        for (let stock of stocks) {
            let mpInNum = parseFloat(stock.marketPrice.slice(1).replace(/,/g, ""))
            if (stock.name == investment.stockName) {
                return (((mpInNum - investment.buyPrice.$numberDecimal) * investment.stockQuantity).toFixed(2))
            }
        }
    }

    const returnPcent = (investment) => {
        for (let stock of stocks) {
            if (stock.name == investment.stockName) {
                return returnVal(investment) / (investment.buyPrice.$numberDecimal * investment.stockQuantity)
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

    }, [])

    useEffect(() => {
        if (investments && investments.length != 0 && stocks) {
            let calInvestedVal = 0;
            let calCurrVal = 0;
            investments.map((investment, idx) => {
                calInvestedVal += parseFloat(investment.buyPrice.$numberDecimal * investment.stockQuantity)
                stocks.map(stock => {
                    if (stock.name == investment.stockName) {
                        console.log(stock.marketPrice.slice(1))
                        let demoVal = parseFloat(stock.marketPrice.slice(1).replace(/,/g, "")) * investment.stockQuantity;
                        console.log(investment.stockName, " ", demoVal)
                        calCurrVal += demoVal
                    }
                })
            })
            setInvestedVal(calInvestedVal);
            setCurrVal(calCurrVal);
        }
    }, [investments, stocks])

    useEffect(() => {
        if (data) {

            setUserData(data);
        }
    }, [data])

    const handleStockClick=(selectStock)=>{
        let matchStock;
        for (let stock of stocks){
            if(stock.name==selectStock.stockName){
                // stock.companyName=stock.name;
                matchStock={...stock,companyName:stock.name};
            }
        }
        setSelectedStock(matchStock);
    }

    return (
        <div className='flex justify-between'>
            {
                investments ?
                    <>
                        <div className="holdings w-[60%]">
                            <h2 className='text-white font-bold ml-28 pl-2 text-lg mt-12 '>Holdings ({investments?.length})</h2>
                            <div className="box ml-28 mt-6 border-[rgba(255,255,255,0.3)] border-[1px] rounded-xl overflow-hidden">
                                <div className="box1 flex justify-between bg-[#1b1b1b] items-center p-5 border-b-[1px] border-[rgba(255,255,255,0.3)]">
                                    <div className="currVal text-white font-bold text-3xl">
                                        <ul>
                                            <li>₹{investedVal}</li>
                                            <li className='text-lg font-normal'>Current Value</li>
                                        </ul>
                                    </div>
                                    <div className="det text-white">
                                        <table className='text-left w-[18rem]'>
                                            <tbody>
                                                <tr>
                                                    <th>Invested Value</th>
                                                    <th>₹{investedVal}</th>
                                                </tr>
                                                <tr>
                                                    <th>Total Returns</th>
                                                    <th className={currVal - investedVal < 0 ? "text-red" : "text-green"}>{(currVal - investedVal).toFixed(2)} ({((currVal - investedVal) / investedVal).toFixed(4)}%)</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="box2 w-full">
                                    <table className='w-full text-white '>
                                        <thead className='border-b-[1px] border-dashed border-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.4)]'>
                                            <tr className='h-10'>
                                                <th className='w-80'>Company</th>
                                                <th>Market Price</th>
                                                <th>Returns (%)</th>
                                                <th>Current (Invested)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {investments.map((investment, idx) => (
                                                <tr key={idx} onClick={()=>handleStockClick(investment)} className='border-b-[1px] border-[rgba(255,255,255,0.3)] hover:bg-[#1b1b1b] hover:cursor-pointer'>
                                                    <th className='font-normal h-14'>
                                                        {investment.stockName}
                                                        <p className='text-sm text-[rgba(255,255,255,0.4)]'>{investment.stockQuantity} share</p>
                                                    </th>
                                                    <th>{stocks.map(stock => {
                                                        if (stock.name == investment.stockName) {
                                                            return stock.marketPrice
                                                        }
                                                    })}</th>
                                                    <th className={stockTrend(investment) == "loss" ? "text-red" : "text-green"}>
                                                        {returnVal(investment)} ({(returnPcent(investment) * 100).toFixed(2)}%)
                                                    </th>

                                                    <th>{((investment.buyPrice.$numberDecimal * investment.stockQuantity) + parseFloat(returnVal(investment))).toFixed(2)} ({(investment.buyPrice.$numberDecimal * investment.stockQuantity).toFixed(2)})</th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {
                            selectedStock ?
                                
                                <StockDet stock={selectedStock} price={Number(selectedStock.marketPrice.slice(1).split(",").join("")).toFixed(2)}/>
                                :
                                <div className="holdDet border-[rgba(255,255,255,0.3)] border-[1px] rounded-xl w-[25%] mx-auto h-[30rem] mt-24 content-center place-items-center text-[rgba(255,255,255,0.9)] relative">
                                    <img src='/Cursor.svg' width={200} />
                                    <h6 className='mt-8 '>Select a Stock to get Started</h6>
                                    <hr />
                                    <p className='opacity-60 text-sm absolute bottom-5 left-7'>Balance: ₹{parseFloat(userData?.balance.$numberDecimal).toFixed(2)}</p>
                                    <Link to='/wallet' className='text-white decoration-dotted underline absolute bottom-5 right-7 opacity-50'>Add Money</Link>
                                </div>
                                

                        }
                    </>
                    :
                    <>
                        <div className='text-white h-[70vh] place-content-center place-items-center w-full text-xl font-extrabold'>
                            <p>Start Investing to monitor your stocks here.</p>
                        </div>
                    </>
            }

        </div>
    )
}

export default Dashboard