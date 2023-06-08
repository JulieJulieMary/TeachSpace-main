import "./Header.css"

import logo from "../../assets/images/logo.png"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export const Header = ({connectedUser, setConnectedUser}) => {
  const [showUserMenu, setUserMenu] = useState(false)

  const navigate = useNavigate()

  const toggleUserMenu = () => {
    setUserMenu(!showUserMenu)
  }

  const logoutUser = () => {
    localStorage.removeItem("userProfile")
    setConnectedUser(null)
    navigate("/")
  }


  return (
    <header>
        <Link to="/" className="header-logo">
          <img src={logo} alt="Logo" />
          <h2>
            TeachSpace
          </h2>
        </Link>
        
      {
        connectedUser &&
          <button className="user-profile-button" onClick={() => toggleUserMenu()}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="Profile Picture" className="avatar-header" />
            <h4 className="username">{connectedUser.username}</h4>
          </button>
      }


      {
        showUserMenu &&
        <div className="user-menu">
          <Link to="/account"  className="user-menu-link" onClick={() => setUserMenu(false)}>Account</Link>
          <Link to={`/profiles/${connectedUser.username}`}  className="user-menu-link" onClick={() => setUserMenu(false)}>Profile</Link>
          <Link to="/settings" className="user-menu-link" onClick={() => setUserMenu(false)}>Settings</Link>
          <button className="user-menu-link" onClick={() => logoutUser()}>Logout</button>
        </div>
      } 


      {
        !connectedUser &&
        <div className="auth-buttons">
          <Link to="/login"    className="login-button">Log In</Link>
          <Link to="/register" className="signup-button">Sign Up</Link>
        </div>
      }
    </header>
  )
}