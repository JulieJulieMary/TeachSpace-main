import "./Footer.css"

import logo from "../../assets/images/logo.png"

import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
    </footer>
  )
}