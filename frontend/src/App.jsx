import { useEffect, useState } from 'react'
import {Provider} from "react-redux"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './app/store';
import LogHome from './components/login/LogHome';
import Home from './components/home/Home';
import {gapi} from "gapi-script";

const clientId = "458563103734-rc683qfss1qkbu5acik81iic0t28c0iq.apps.googleusercontent.com"

function App() {

  const [userAuthorized, setUserAuthorized]=useState(false);

  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };
    
    gapi.load('client:auth2',start);
  })

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
