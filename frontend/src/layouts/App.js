import "./App.css"

import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"

import { Main }       from "../pages/main/Main"
import { Login }      from "../pages/login/Login"
import { Reset }      from "../pages/reset/Reset"
import { Forgot }     from "../pages/forgot/Forgot"
import { Register }   from "../pages/register/Register"
import { NotFound }   from "../pages/not-found/NotFound"
import { Classrooms } from "../pages/classrooms/Classrooms"
import { Profiles }   from "../pages/profiles/Profiles"
import { Account }    from "../pages/account/Account"


export const App = () => {
  const [connectedUser, setConnectedUser] = useState(() => {
    const user = localStorage.getItem("userProfile")

    if (!user)
      return JSON.parse(user)
    
    return null
  })

  return (
    <>
      <Header connectedUser={connectedUser} setConnectedUser={setConnectedUser} />
      <Routes>
        <Route path="/"                   element={<Main />}       />
        <Route path="/account"            element={<Account />}    />
        <Route path="/profiles/:username" element={<Profiles />}   />
        <Route path="/reset"              element={<Reset />}      />
        <Route path="/classrooms"         element={<Classrooms connectedUser={connectedUser} />} />


        <Route path="/login"    element={!connectedUser ? <Login    setConnectedUser={setConnectedUser} /> : <Navigate to="/" replace={true} />} />
        <Route path="/register" element={!connectedUser ? <Register setConnectedUser={setConnectedUser} /> : <Navigate to="/" replace={true} />} />
        <Route path="/forgot"   element={!connectedUser ? <Forgot /> : <Navigate to="/" replace={true} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}