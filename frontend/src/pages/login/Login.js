import "./Login.css"
import "../../styles/Form.css"

import logo from "../../assets/images/logo.png"
import axiosRequest from "../../api/axios"

import { HiEye } from "react-icons/hi"
import { HiEyeOff } from "react-icons/hi"

import validator from "validator"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"



export const Login = ({setConnectedUser}) => {
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()


  const handleLogin = async (event) => {
    event.preventDefault()

    const email = event.target.email.value.trim()
    const password = event.target.password.value.trim()


    if (!validator.isEmail(email)) {
      setError("Invalid Email!")

      event.target.email.style.borderColor = "#f70000"
      event.target.email.style.backgroundColor = "#920000"

      return
    }

    event.target.email.style.borderColor = "black"
    event.target.email.style.backgroundColor = "#466468"


    if (!validator.isStrongPassword(password)) {
      setError("Invalid Password!")

      event.target.password.style.borderColor = "#f70000"
      event.target.password.style.backgroundColor = "#920000"

      return
    }

    event.target.password.style.borderColor = "black"
    event.target.password.style.backgroundColor = "#466468"


    try {
      const { data } = await axiosRequest.post("/login", {email, password})
      localStorage.setItem("userProfile", JSON.stringify(data))
      setConnectedUser(data)
      navigate("/")
    }
    catch(e) {
      setError("Invalid Credentials!")
      return
    }


    setError("")
  }


  return (
    <main>
      <form onSubmit={handleLogin} className="auth-form">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <h1 className="form-title">Welcome Back!</h1>

        <div className="input-wrapper">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            id="email"
            placeholder="Enter your email"
            required    
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="form-label">Password</label>
          
          <div className="password-wrapper">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              minLength={8}
              autoComplete="off"
              required
            />
            <button className="show-password-button" onClick={event => {
                event.preventDefault()
                setShowPassword(!showPassword)
              }
            }>
              {
                showPassword ? 
                  <HiEye />: 
                  <HiEyeOff />
              }
            </button>
          </div>
        </div>

        <div className="link-wrapper">
          <Link to="/forgot" className="form-link">Forgot password?</Link>
        </div>

        <span className="form-error">{error}</span>
        
        <button type="submit" className="form-submit">Sign Into Your Account</button>


        <div className="link-wrapper">
          <span>Don't have an account? </span>
          <Link to="/register" className="form-link">Register here</Link>
        </div>
      </form>
    </main>
  )
}