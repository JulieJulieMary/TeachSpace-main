import "./Reservation.css"

import { Link } from "react-router-dom"

export const Reservation = ({from, to, by}) => {
  return (
    <div className="reservation">
        <span> From: {from} </span>
        <span> To: {to} </span>
        <span> By: <Link to={`/profiles/${by}`} className="author">{by}</Link></span>
        <div className="reservation-bottom"></div>
    </div>
  )
}