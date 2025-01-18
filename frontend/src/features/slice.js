import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null,
    stock:null,
    stocks:null,
    symbol:null,
    stockPrices:null,
}

export const slice=createSlice({
    name:'VaulTrade',
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload;
        },
        setStock(state,action){
            state.stock=action.payload;
        },
        setUniStocks(state,action){
            state.stocks=action.payload;
        },
        setSymbol(state,action){
            state.symbol=action.payload;
        },
        setStockPrices(state,action){
            state.stockPrices=action.payload;
        }
    }
})

export const {setUser,setStock,setUniStocks,setSymbol,setStockPrices} =slice.actions;

export default slice.reducer