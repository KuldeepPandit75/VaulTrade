import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { setStockPrices } from '../../features/slice.js';

Chart.register(...registerables);

const StockChart = ({ name }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [interval,setInterval]=useState('5m')
    const [range,setRange]=useState('1d')
    const [symb, setSymb] = useState(false);
    const dispatch = useDispatch();
    let symbol = useSelector(state => state.symbol);

    useEffect(() => {
        if (symbol) {

            setSymb(symbol);
        }
    }, [symbol])

    useEffect(() => {
        if (symb) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://yh-finance.p.rapidapi.com/stock/v3/get-chart', {
                        params: {
                            symbol: symb,
                            interval: interval, // Daily interval
                            range: range, // Data for the past month
                        },
                        headers: {
                            // 'X-RapidAPI-Key': '531bfa0b64msh4343f14f2248216p1fe7b6jsn6ed36ca4a83f',
                            // 'X-RapidAPI-Key': '4b1e96553emsh490b676a17fbfc1p1af089jsneb4f5261d65b',
                            'X-RapidAPI-Key': '83e8ae16fdmsh9bdacb4e2298123p1cb58djsn3ef05da5c299',
                            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                        },
                    });

                    const data = response.data.chart.result[0];
                    const dates = data.timestamp.map(timestamp => new Date(timestamp * 1000).toLocaleString());
                    const prices = data.indicators.quote[0].close;

                    dispatch(setStockPrices(prices));

                    // Destroy the existing chart instance before creating a new one
                    if (chartInstance.current) {
                        chartInstance.current.destroy();
                    }

                    // Create the new chart instance
                    chartInstance.current = new Chart(chartRef.current, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [
                                {
                                    label: `${name} Stock Price`,
                                    data: prices,
                                    borderColor: `${prices[0] > prices[prices.length - 1] ? "#df484c" : "#449682"}`,
                                    fill: false,
                                    pointRadius:0
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false, // Allows custom height
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    display: false
                                },
                                tooltip: {
                                    enabled: true,
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        display: false,  // Remove the X axis labels
                                    },
                                    grid: {
                                        display: false
                                    }
                                },
                                y: {
                                    ticks: {
                                        display: false,  // Remove the Y axis labels
                                    },
                                    grid: {
                                        display: false,
                                    }
                                },
                            },
                        },
                    });
                } catch (error) {
                    console.error('Error fetching stock data:', error);
                }
            };
            fetchData();
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [symb,range]);


    return (
        <>
            <div style={{ height: '400px', width: '100%', marginTop: '15px' }}>
                <canvas ref={chartRef} ></canvas>
            </div>
            <div className='text-white flex w-[100%] justify-around'>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='1d'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("1m"); setRange("1d")}}>1D</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='5d'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("15m"); setRange("5d")}}>5D</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='1mo'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("60m"); setRange("1mo")}}>1M</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='3mo'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("1d"); setRange("3mo")}}>3M</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='6mo'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("1d"); setRange("6mo")}}>6M</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='1y'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("1wk"); setRange("1y")}}>1Y</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='5y'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("1wk"); setRange("5y")}}>5Y</p>
                <p className={`cursor-pointer border-[1px] rounded-xl px-2 ${range=='max'?"border-[rgba(255,255,255,1)] font-bold":"border-[rgba(255,255,255,0.3)]"}`} onClick={()=>{setInterval("1mo"); setRange("max")}}>All</p>
            </div>
        </>
    );
};

export default StockChart;
