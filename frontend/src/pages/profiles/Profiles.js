import "./Profiles.css"


import axiosRequest from "../../api/axios"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


export const Profiles = () => {
    const { username } = useParams()
    const [user, setUser] = useState(null)




    useEffect(() => {
        axiosRequest.get(`/users/${username}`)
          .then(({data}) => { setUser(data) })
          .catch((error) => { console.log(error) })
    }, [])
    

    return (
        <main className="profiles">
            {
                user ?
                <div className="user-profile">
                    <div className="profile-header">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="Profile Picture" className="avatar" />
                        <div className="username">
                            <h3>Username:</h3>
                            <span>{user.username}</span>
                        </div>
                    </div>
                    <div className="profile-body">
                        <div className="firstname">
                            <h3>Firstname:</h3>
                            <span>{user.firstname}</span>
                        </div>
                        <div className="lastname">
                            <h3>Lastname:</h3>
                            <span>{user.lastname}</span>
                        </div>
                        <div className="email">
                            <h3>Email:</h3>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div> :
                <div className="user-profile">
                    <div className="profile-header">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="Profile Picture" className="avatar" />
                        <div className="username">
                            <h3>Username:</h3>
                            <span>USER NOT FOUND!</span>
                        </div>
                    </div>
                    <div className="profile-body">
                        <div className="firstname">
                            <h3>Firstname:</h3>
                            <pan>-</pan>
                        </div>
                        <div className="lastname">
                            <h3>Lastname:</h3>
                            <span>-</span>
                        </div>
                        <div className="email">
                            <h3>Email:</h3>
                            <span>-</span>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}