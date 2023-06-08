import "./Classrooms.css"
import "react-calendar/dist/Calendar.css"

import axiosRequest from "../../api/axios"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineClockCircle } from "react-icons/ai"
import Calendar from "react-calendar"

import { Floor } from "../../components/floor/Floor"
import { Room }  from "../../components/room/Room"
import { Reservation } from "../../components/reservation/Reservation"


export const Classrooms = ({connectedUser}) => {
  const [rooms, setRooms]                 = useState([])
  const [selectedFloor, setSelectedFloor] = useState(0)
  const [selectedRoom, setSelectedRoom]   = useState(null)
  const [showAddForm, setAddForm]         = useState(false)
  const [showRemoveForm, setRemoveForm]   = useState(false)
  const [showBookingForm, setBookingForm] = useState(false)
  const [clockDate, setClockDate]         = useState(new Date())
  const [calendarDate, setCalendarDate]   = useState(new Date())
  const [selectedDay, setSelectedDay]     = useState("")
  const [error, setError]                 = useState("")

  const navigate = useNavigate()
  const userAdmin = true

  console.log(rooms)


  const refreshDate = () => {
    setClockDate(new Date())
  }


  const selectCalendarDay = value => {
    const selectedDay = new Date(value)

    const newRooms = rooms.map(room => { return {...room, reservations: [] }})
    setRooms(newRooms)

    setSelectedDay(selectedDay.toDateString())
  }



  const handleAddRoom = async (event) => {
    event.preventDefault()

    const number = +event.target.room.value
    const floor  = +event.target.floor.value
    const seats  = +event.target.seats.value

    if (number < 0) {
      setError("Invalid room number!")

      event.target.room.style.borderColor = "#f70000"
      event.target.room.style.backgroundColor = "#920000"

      return
    }

    event.target.room.style.borderColor = "black"
    event.target.room.style.backgroundColor = "#466468"


    if (floor < 0) {
      setError("Invalid floor number!")

      event.target.floor.style.borderColor = "#f70000"
      event.target.floor.style.backgroundColor = "#920000"

      return
    }
    
    event.target.floor.style.borderColor = "black"
    event.target.floor.style.backgroundColor = "#466468"

    if (seats < 0) {
      setError("Invalid seats number!")

      event.target.seats.style.borderColor = "#f70000"
      event.target.seats.style.backgroundColor = "#920000"

      return
    }
        
    event.target.seats.style.borderColor = "black"
    event.target.seats.style.backgroundColor = "#466468"


    try {
      await axiosRequest.post("/classrooms", {number, floor, seats})
      setRooms([...rooms, {number, floor, seats}])
    }
    catch(e) {
      setError("Couldn't add the classroom!")
      return
    }

    setError("")
  }


  const handleRemoveRoom = async (event) => {
    event.preventDefault()

    const number = +event.target.room.value
    const floor  = +event.target.floor.value

    if (rooms.find(room => room.number === number && room.floor === floor) === undefined) {
      setError("Room Not Found!")
      return
    }

    if (number < 0) {
      setError("Invalid room number!")

      event.target.room.style.borderColor = "#f70000"
      event.target.room.style.backgroundColor = "#920000"

      return
    }

    event.target.room.style.borderColor = "black"
    event.target.room.style.backgroundColor = "#466468"


    if (floor < 0) {
      setError("Invalid floor number!")

      event.target.floor.style.borderColor = "#f70000"
      event.target.floor.style.backgroundColor = "#920000"

      return
    }
    
    event.target.floor.style.borderColor = "black"
    event.target.floor.style.backgroundColor = "#466468"


    try {
      await axiosRequest.delete("/classrooms", {number, floor})
      setRooms(rooms.filter(room => room.number !== number || room.floor !== floor))
    }
    catch(e) {
      setError("Couldn't remove the classroom!")
      return
    }

    setError("")
  }


  const handleBookClassroom = event => {
    event.preventDefault()

    const startTime = event.target.start.value
    const endTime = event.target.end.value
    const author = connectedUser.username

    
    const newRooms = rooms.map((room) => {
        return {...room, reservations: {start: startTime, end: endTime, author}}
    })

    setRooms(newRooms)
  }

  const bookingForm = () => {
    if (connectedUser)
      setBookingForm(!showBookingForm)
    else
      navigate("/login")
  }



  useEffect(() => {
    axiosRequest.get("/classrooms")
      .then(({data}) => {
        const newRooms = data.map(room => {
          return {
            ...room,
            reservations: [{
              start: "10: 07",
              end: "14: 00",
              author: "razvan"
            }]
          }
        })
        setRooms(newRooms)
      })
      .catch((error) => {
        console.log(error)
      })

    const timerId = setInterval(refreshDate, 1000)

    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])


  useEffect(() => {
    const floors = [...new Set(rooms.map(room => room.floor))].sort((a, b) => a - b)

    setSelectedFloor(floors[0])
  }, [rooms])



  return (
    <main className="classrooms">
      <section className={`classrooms-header ${(userAdmin && (showAddForm || showRemoveForm)) ? "mb-auto" : ""}`}>
        {
          userAdmin && 
          <div className="admin-buttons">
            <button onClick={() => { setAddForm(!showAddForm); setRemoveForm(false); setError("") }} className="add-room">
              + Add Room
            </button>

            <button onClick={() => { setRemoveForm(!showRemoveForm); setAddForm(false); setError("") }} className="remove-room">
              - Remove Room
            </button>
          </div>
        }

        {
          (userAdmin && showAddForm) &&
          <form onSubmit={handleAddRoom} className="admin-form">
            <h2>Add Room</h2>
            
            <label htmlFor="room" className="form-label">Room Number</label>
            <input type="number" name="room" id="room" className="form-input" min={0} placeholder={50} required />

            <label htmlFor="floor" className="form-label">Floor</label>
            <input type="number" name="floor" id="floor" className="form-input" min={0} placeholder={2} required />
            
            <label htmlFor="seats" className="form-label">Seats</label>
            <input type="number" name="seats" id="seats" className="form-input" min={0} placeholder={50} required />

            <span className="form-error">{error}</span>

            <button type="submit" className="admin-submit">Add Room</button>
          </form>
        }


        {
          (userAdmin && showRemoveForm) &&
          <form onSubmit={handleRemoveRoom} className="admin-form">
            <h2>Remove Room</h2>

            <label htmlFor="room" className="form-label">Room Number</label>
            <input type="number" name="room" id="room" className="form-input" min={0} placeholder={50} required />

            <label htmlFor="floor" className="form-label">Floor</label>
            <input type="number" name="floor" id="floor" className="form-input" min={0} placeholder={2} required />

            <span className="form-error">{error}</span>

            <button type="submit" className="admin-submit">Remove Room</button>
          </form>
        }

        <span className="clock">
          <AiOutlineClockCircle />
          <span className="clock-timer">
            {
              clockDate.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })
            }
          </span>
        </span>
      </section>

      {
        (userAdmin && (!showRemoveForm && !showAddForm)) &&
        <section className="classrooms-content">
          <section className="selector">
                  <div className="floors">
                    <h3>Floors:</h3>
                    <div className="floor-list">
                      {
                        [...new Set(rooms.map(room => room.floor))].sort((a, b) => a - b).map((floor, index) => 
                          <Floor 
                            key={index} 
                            setSelectedRoom={setSelectedRoom} 
                            setSelectedFloor={setSelectedFloor} 
                            selected={selectedFloor === floor} 
                            number={floor} 
                          />)
                      }
                    </div>
                  </div>


                  <div className="rooms">
                    <h3>Select a room:</h3>
                    <div className="room-list">
                      {
                        rooms.filter(room => room.floor === selectedFloor).map((room, index) => 
                          <Room 
                            key={index} 
                            setSelectedRoom={setSelectedRoom} 
                            seats={room.seats}
                            selected={room.floor === selectedFloor && room.number === selectedRoom} 
                            number={room.number} 
                          />) 
                      }
                    </div>
                  </div>

                  
          </section>

          <section className="schedule">
            {
              rooms && selectedRoom &&
              <div className="room-details">
                Room Schedule
                
                <Calendar onChange={setCalendarDate} value={calendarDate} locale="us" onClickDay={selectCalendarDay} />

                <span>{selectedDay}</span>

                <div className="reservations">
                    <Reservation from={rooms[0].reservations.start} to={rooms[0].reservations.end} by={rooms[0].reservations.author} />
                </div>

                <button className="book-classroom-button" onClick={bookingForm}>Book Classroom</button>

                {
                  showBookingForm &&
                  <form onSubmit={handleBookClassroom} className="booking-form">
                    <label htmlFor="start">Start Time:</label>
                    <input type="time" name="start" id="start" className="form-input" />

                    <label htmlFor="end">End Time:</label>
                    <input type="time" name="end" id="end" className="form-input" />

                    <button type="submit" className="form-submit">Submit Booking</button>
                  </form>
                }

              </div>
            }
          </section>
        </section>
      }
    </main>
  )
}