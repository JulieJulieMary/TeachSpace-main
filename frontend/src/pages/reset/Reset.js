import "./Reset.css"
import "../../styles/Form.css"

import logo from "../../assets/images/logo.png"

import { HiEye } from "react-icons/hi"
import { HiEyeOff } from "react-icons/hi"

import validator from "validator"

import { useState } from "react"
import { Link } from "react-router-dom"


export const Reset = () => {
  const [error, setError] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const handleReset = async (event) => {
    event.preventDefault()

    const password = event.target.password.value.trim()
    const confirmPassword = event.target.confirmPassword.value.trim()

    
    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (!validator.isStrongPassword(password)) {
      setError("Invalid Password!")
      return
    }


    setError("")
  }


  return (
    <main>
      <form onSubmit={handleReset} className="auth-form">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <h1 className="form-title">Reset Your Password</h1>


        <div className="input-wrapper">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          
          <div className="password-wrapper">
            <input
              className="form-input"
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="••••••••"
              minLength={8}
              autoComplete="off"
              required
            />
            <button className="show-password-button" onClick={event => {
                event.preventDefault()
                setShowNewPassword(!showNewPassword)
              }
            }>
              {
                showNewPassword ? 
                  <HiEye />: 
                  <HiEyeOff />
              }
            </button>
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="password-wrapper">
            <input
              className="form-input"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              minLength={8}
              autoComplete="off"
              required
            />
            <button className="show-password-button" onClick={event => {
                event.preventDefault()
                setShowConfirmPassword(!showConfirmPassword)
              }
            }>
              {
                showConfirmPassword ? 
                  <HiEye />: 
                  <HiEyeOff />
              }
            </button>
          </div>
        </div>

        <span className="form-error">{error}</span>
        
        <button type="submit" className="form-submit">Change Password</button>
      </form>
    </main>
  )
}