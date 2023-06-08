import "./Main.css"


import { Link } from "react-router-dom"

export const Main = () => {

  return (
    <main className="main">
      <div>
        <h3>CLASSROOM BOOKING MADE EASY</h3>
        <h1>TeachSpace</h1>
        <h4>Conveniently choose between classrooms in just a few clicks:</h4>
        <Link to="/classrooms" className="classroom-link">BOOK CLASSROOMS</Link>
      </div>
    </main>
  )
}