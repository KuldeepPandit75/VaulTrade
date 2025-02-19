import React, { useEffect, useState } from 'react'
import { API } from '../../service/api'
import { useSelector } from 'react-redux';


function Dashboard() {
    const [investments, setInvestments] = useState([]);
    const [investedVal, setInvestedVal] = useState(0);
    const [currVal,setCurrVal]=useState(0);
    const stocks=useSelector(state=>state.stocks);

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
        if (investments.length != 0 && stocks) {
            let calInvestedVal = 0;
            let calCurrVal=0;
            investments.map((investment, idx) => {
                calInvestedVal += parseFloat(investment.buyPrice.$numberDecimal*investment.stockQuantity)
                stocks.map(stock=>{
                    if (stock.name==investment.stockName){
                        console.log(stock.marketPrice.slice(1))
                        let demoVal=parseFloat(stock.marketPrice.slice(1).replace(/,/g,""))*investment.stockQuantity;
                        console.log(investment.stockName," ",demoVal)
                        calCurrVal+=demoVal
                    }
                })
            })
            setInvestedVal(calInvestedVal);
            setCurrVal(calCurrVal);
        }
    }, [investments])

    return (
        <>
            <div className="holdings">
                <h2 className='text-white font-bold ml-28 pl-2 text-lg mt-12'>Holdings ({investments.length})</h2>
                <div className="box ml-28 mt-6 border-[rgba(255,255,255,0.3)] border-[1px] rounded-xl overflow-hidden w-[55%]">
                    <div className="box1 flex justify-between bg-[#1b1b1b] items-center p-5 border-b-[1px] border-[rgba(255,255,255,0.3)]">
                        <div className="currVal text-white font-bold text-3xl">
                            <ul>
                                <li>₹{investedVal}</li>
                                <li className='text-lg font-normal'>Current Value</li>
                            </ul>
                        </div>
                        <div className="det text-white">
                            {/* <ul>
                                <li>Invested Value: ₹{investedVal}</li>
                                <li>Total Returns</li>
                                <li>1D Returns</li>
                            </ul> */}
                            <table className='text-left w-[12rem]'>
                                <tbody>
                                    <tr>
                                        <th>Invested Value</th>
                                        <th>₹{investedVal}</th>
                                    </tr>
                                    <tr>
                                        <th>Total Returns</th>
                                        <th className={investedVal<0?"text-red":"text-green"}>{investedVal-currVal}({(investedVal-currVal)/investedVal}%)</th>
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
                                    <th>Returns(%)</th>
                                    <th>Current (Invested)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investments.map((investment,idx)=>(
                                    <tr key={idx} className='border-b-[1px] border-[rgba(255,255,255,0.3)] hover:bg-[#1b1b1b] hover:cursor-pointer'>
                                        <th className='font-normal h-14'>
                                            {investment.stockName}
                                            <p className='text-sm text-[rgba(255,255,255,0.4)]'>{investment.stockQuantity} share</p>
                                        </th>
                                        <th className={investedVal<0?"text-red":"text-green"}>{investedVal-currVal}({(investedVal-currVal)/investedVal}%)</th>
                                        <th>{investment.buyPrice.$numberDecimal*investment.stockQuantity}</th>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="holdDet">

            </div>
        </>
    )
}

export default Dashboard