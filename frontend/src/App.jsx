import { useState } from 'react'
import {Provider} from "react-redux"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './app/store';
import LogHome from './components/login/LogHome';
import Home from './components/home/Home';

function App() {

  const [userAuthorized, setUserAuthorized]=useState(false);

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/login' element={<LogHome/>}/>
        <Route path='/'>
          <Route path='home' element={<Home/>}/>
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
