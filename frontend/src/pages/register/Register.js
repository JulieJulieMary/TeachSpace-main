import "./Register.css"
import "../../styles/Form.css"

import logo from "../../assets/images/logo.png"
import axiosRequest from "../../api/axios"

import { HiEye } from "react-icons/hi"
import { HiEyeOff } from "react-icons/hi"

import validator from "validator"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"



export const Register = ({setConnectedUser}) => {
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()

    const email     = event.target.email.value.trim()
    const firstname = event.target.firstname.value.trim()
    const lastname  = event.target.lastname.value.trim()
    const username  = event.target.username.value.trim()
    const password  = event.target.password.value.trim()
    const confirmPassword = event.target.confirmPassword.value.trim()


    // !EMAIL VALIDATION

    if (!validator.isEmail(email)) {
      setError("Invalid Email!")

      event.target.email.style.borderColor = "#f70000"
      event.target.email.style.backgroundColor = "#920000"

      return
    }

    event.target.email.style.borderColor = "black"
    event.target.email.style.backgroundColor = "#466468"


    // !PASSWORD VALIDATION
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!")

      event.target.password.style.borderColor = "#f70000"
      event.target.password.style.backgroundColor = "#920000"

      event.target.confirmPassword.style.borderColor = "#f70000"
      event.target.confirmPassword.style.backgroundColor = "#920000"

      return
    }

    event.target.confirmPassword.style.borderColor = "black"
    event.target.confirmPassword.style.backgroundColor = "#466468"


    if (!validator.isStrongPassword(password)) {
      setError("Enter a stronger password!")

      event.target.password.style.borderColor = "#f70000"
      event.target.password.style.backgroundColor = "#920000"

      return
    }

    event.target.password.style.borderColor = "black"
    event.target.password.style.backgroundColor = "#466468"


    // !FIRSTNAME VALIDATION

    if (firstname.length < 3) {
      setError("The first name must contain at least 3 letters.")

      event.target.firstname.style.borderColor = "#f70000"
      event.target.firstname.style.backgroundColor = "#920000"

      return
    }

    if (firstname.length > 15) {
      setError("The first name can contain maximum 15 letters.")

      event.target.firstname.style.borderColor = "#f70000"
      event.target.firstname.style.backgroundColor = "#920000"

      return
    }

    // if (/^[A-Za-z]*$/.test(firstname)) {
    //   setError("The first name must contain only letters.")

    //   event.target.firstname.style.borderColor = "#f70000"
    //   event.target.firstname.style.backgroundColor = "#920000"

    //   return
    // }

    event.target.firstname.style.borderColor = "black"
    event.target.firstname.style.backgroundColor = "#466468"


    // !LASTNAME VALIDATION

    if (lastname.length < 3) {
      setError("The last name must contain at least 3 letters.")

      event.target.lastname.style.borderColor = "#f70000"
      event.target.lastname.style.backgroundColor = "#920000"

      return
    }

    if (lastname.length > 15) {
      setError("The last name can contain maximum 15 letters.")

      event.target.lastname.style.borderColor = "#f70000"
      event.target.lastname.style.backgroundColor = "#920000"

      return
    }

    // if (/^[A-Za-z]*$/.test(lastname)) {
    //   setError("The last name must contain only letters.")

    //   event.target.lastname.style.borderColor = "#f70000"
    //   event.target.lastname.style.backgroundColor = "#920000"

    //   return
    // }

    event.target.lastname.style.borderColor = "black"
    event.target.lastname.style.backgroundColor = "#466468"


    // !USERNAME VALIDATION
    
    if (username.length < 6) {
      setError("The username must contain at least 6 letters.")

      event.target.username.style.borderColor = "#f70000"
      event.target.username.style.backgroundColor = "#920000"

      return
    }

    if (username.length > 20) {
      setError("The last name can contain maximum 20 letters.")

      event.target.username.style.borderColor = "#f70000"
      event.target.username.style.backgroundColor = "#920000"

      return
    }

    // if (/^[A-Za-z0-9]*$/.test(username)) {
    //   setError("The username must contain only letters and numbers.")

    //   event.target.username.style.borderColor = "#f70000"
    //   event.target.username.style.backgroundColor = "#920000"

    //   return
    // }

    event.target.username.style.borderColor = "black"
    event.target.username.style.backgroundColor = "#466468"


    try {
      const { data } = await axiosRequest.post("/register", {email, password, username, firstname, lastname})
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
      <form onSubmit={handleRegister} className="auth-form">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <h1 className="form-title">Create An Account!</h1>

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

        <div className="name-forms">
          <div className="input-wrapper">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              className="form-input"
              type="text"
              id="firstname"
              placeholder="First Name"
              minLength={3}
              maxLength={15}
              required    
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              className="form-input"
              type="text"
              id="lastname"
              placeholder="Last Name"
              minLength={3}
              maxLength={15}
              required    
            />
          </div>
        </div>



        <div className="input-wrapper">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            id="username"
            placeholder="Username"
            minLength={6}
            maxLength={20}
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
        
        <button type="submit" className="form-submit">Register Your Account</button>


        <div className="link-wrapper">
          <span>Already have an account? </span>
          <Link to="/login" className="form-link">Login here</Link>
        </div>
      </form>
    </main>
  )
}