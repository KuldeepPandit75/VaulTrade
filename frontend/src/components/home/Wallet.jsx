import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../service/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/slice';

function Wallet() {
    const [userData, setUserData] = useState(null);
    const [tab, setTab] = useState('add');
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();

    const handleTabClick = () => {
        if (tab == 'add') {
            setTab('withdraw')
        } else {
            setTab('add')
        }
    }

    const handleAmountIncrease = (e) => {
        if (e.target.innerText == "+100") {
            let newAmount = amount + 100;
            setAmount(newAmount)
        } else {
            let newAmount = amount + 500;
            setAmount(newAmount)
        }
    }

    useEffect(() => {
        let storedData = JSON.parse(sessionStorage.getItem("user"));
        setUserData(storedData);
    }, [])

    const handleAddMoney = async () => {
        const response = await API.addMoney({ addAmount: amount })

        if (response.isSuccess) {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            dispatch(setUser(response.data));
            console.log("Updated Data: ",response.data)
            setUserData(response.data)
        }
    }

    return (
        <>
            <div className='border-b-[1px] w-[100vw] h-10 border-b-[rgba(255,255,255,0.3)] px-24 flex text-white mt-10'>
                <p className={`border-b-[5px] border-b-[#449682] text-xl font-semibold mx-2 px-4 cursor-pointer`} >INR Balance</p>
            </div>
            <div className='flex justify-evenly mt-10'>
                <div className='text-white flex-col flex border-[rgba(255,255,255,0.3)] border-[1px] rounded-xl w-1/2 h-[230px]'>
                    <div className='p-5'>
                        <p className='text-lg text-[rgba(255,255,255,0.5)]'>For Stocks, F&O</p>
                        <h1 className='text-5xl'>₹{userData?.balance.$numberDecimal}</h1>
                    </div>
                    <hr className='border-inherit border-t-[1px]' />
                    <div className='font-bold py-4 flex justify-between px-4 items-center'>
                        <p>Used Balance</p>
                        <p>₹{userData?.investedAmount.$numberDecimal}</p>
                    </div>
                    <hr className='border-inherit border-t-[1px]' />

                    <div className='font-bold py-4 cursor-pointer flex justify-between px-4 items-center'>
                        <p>All Transaction</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
                <div className='w-1/4 border-[rgba(255,255,255,0.3)] border-[1px] rounded-xl flex flex-col h-[400px]'>
                    <div className='border-b-[1px] border-b-[rgba(255,255,255,0.3)] flex text-white mt-4 px-4'>
                        <p className={`${tab == 'add' ? "border-b-[3px] border-b-[#449682] text-green" : ""} text-sm font-semibold mx-0 px-4   cursor-pointer pb-2`} onClick={() => handleTabClick()}>Add Money</p>
                        <p className={`${tab == 'add' ? "" : "border-b-[3px] border-b-[#449682] text-green"} text-sm font-semibold mx-2 px-4 cursor-pointer pb-2`} onClick={() => handleTabClick()}>Withdraw</p>
                    </div>
                    {tab == 'add' &&
                        <div className='relative flex flex-col justify-between flex-1 '>
                            <div className='flex items-center justify-between px-4 mt-5'>
                                <p className='text-white'>Enter Amount</p>
                                <div className='flex items-center'>
                                    <p className='text-green mr-[-15px] z-10'>₹</p>
                                    <input type='number' placeholder='0' className='bg-[#1b352d] text-green focus:outline-none rounded-[3px] leading-8 text-right px-2 no-spinner placeholder-green font-bold' value={amount} onChange={(e)=>{setAmount(Number(e.target.value))}}/>
                                </div>
                            </div>
                            <div className='flex absolute right-10 top-20 justify-around w-1/3'>
                                <p className='text-green bg-[#1b352d] rounded-lg p-1 border-[1px] border-green cursor-pointer' onClick={(e) => handleAmountIncrease(e)}>+100</p>
                                <p className='text-green bg-[#1b352d] rounded-lg p-1 border-[1px] border-green cursor-pointer' onClick={(e) => handleAmountIncrease(e)}>+500</p>
                            </div>
                            <button className='bg-green text-white font-bold rounded-lg py-2 m-6 hover:bg-[#2f5c4e]' onClick={handleAddMoney}>Add Money</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Wallet