import { useState } from 'react'
import {Provider} from "react-redux"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './app/store';

function App() {

  const [userAuthorized, setUserAuthorized]=useState(false);

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Login/>}/>
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
