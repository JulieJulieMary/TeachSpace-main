import "./Floor.css"

export const Floor = ({setSelectedRoom, setSelectedFloor, selected, number}) => {

  const changeFloor = () => {
    setSelectedFloor(number)
    setSelectedRoom(null)
  }

  return (
    <button onClick={changeFloor} className={`floor ${selected ? "floor-selected" : ""}`}>{number}</button>
  )
}