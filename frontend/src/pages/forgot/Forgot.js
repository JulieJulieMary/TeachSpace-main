import "./Forgot.css"
import "../../styles/Form.css"

import logo from "../../assets/images/logo.png"

import validator from "validator"

import { useState } from "react"
import { Link } from "react-router-dom"


export const Forgot = () => {
  const [error, setError] = useState("")


  const handleForgot = async (event) => {
    event.preventDefault()

    const email = event.target.email.value.trim()


    if (!validator.isEmail(email)) {
      setError("Invalid Email!")

      event.target.email.style.borderColor = "#f70000"
      event.target.email.style.backgroundColor = "#920000"

      return
    }

    event.target.email.style.borderColor = "black"
    event.target.email.style.backgroundColor = "#466468"




    setError("")
  }


  return (
    <main>
      <form onSubmit={handleForgot} className="auth-form">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <h1 className="form-title">Forgot Password?</h1>

        <div className="input-wrapper">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input
            className="form-input"
            type="email"
            id="email"
            placeholder="Enter your email"
            required    
          />
        </div>
        <div className="link-wrapper">
          <Link to="/login" className="form-link">Back to Login</Link>
        </div>

        <span className="form-error">{error}</span>
        
        <button type="submit" className="form-submit">Find Password</button>
      </form>
    </main>
  )
}