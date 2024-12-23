import { useEffect, useState } from 'react'
import {Provider} from "react-redux"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './app/store';
import LogHome from './components/login/LogHome';
import Home from './components/home/Home';
import {gapi} from "gapi-script";
import axios from 'axios'
import { API } from './service/api.js';
import Loader from './components/loader/Loader';

const clientId = "458563103734-rc683qfss1qkbu5acik81iic0t28c0iq.apps.googleusercontent.com"

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };
    
    gapi.load('client:auth2',start);

  },[])

  async function fetchGoogleData() {
    try {
      let response = await API.getUserInfo();
      if(response){
        sessionStorage.setItem("profileInfo",JSON.stringify(response.data))
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
        <Route path='/'>
          <Route path='' element={<Home/>}/>
        </Route>
      </>
    )
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
