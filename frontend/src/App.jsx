import { useEffect, useState } from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate} from 'react-router-dom'
import LogHome from './components/login/LogHome';
import Home from './components/home/Home';
import { API } from './service/api.js';
import Loader from './components/loader/Loader';
import PrivateRoute from './PrivateRoute.jsx';
import { useDispatch } from 'react-redux';
import { setUser } from './features/slice.js';
import Layout from './Layout.jsx';
import Stock from './components/Stock/Stock.jsx';
import Wallet from './components/home/Wallet.jsx';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  async function fetchGoogleData() {
    try {
      let response = await API.getUserInfo();
      if(response.isSuccess){
        console.log(response)
        sessionStorage.setItem("user",JSON.stringify(response.data));
        dispatch(setUser(response.data));
      }else{
        sessionStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGoogleData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/login' element={<LogHome/>}/>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='stock' element={<PrivateRoute><Stock/></PrivateRoute>}/>
          <Route path='wallet' element={<PrivateRoute><Wallet/></PrivateRoute>}/>
        </Route>
      </>
    )
  )

  return (
      <RouterProvider router={router}/>
  )
}

export default App
