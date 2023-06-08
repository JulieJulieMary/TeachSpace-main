import "./Room.css"

import { BiChair } from "react-icons/bi"

export const Room = ({setSelectedRoom, selected, number, seats}) => {

  const changeRoom = () => {
    setSelectedRoom(number)
  }

  return (
    <div className="room-wrapper">
      <button onClick={changeRoom} className={`room ${selected ? "room-selected" : ""}`}>
        {number}
      </button>
      <div className="seats">
        <BiChair />
        <span>
          {seats}
        </span>
      </div>
    </div>

  )
}