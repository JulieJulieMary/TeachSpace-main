import "./NotFound.css"

import { AiFillHome } from "react-icons/ai"

import { Link } from "react-router-dom"


export const NotFound = () => {

  return (
    <main className="not-found">
      <h1>404</h1>
      <h3>Page Not Found!</h3>
      <Link to="/"><AiFillHome />Back To Homepage</Link>
    </main>
  )
}