import React, { useEffect, useState } from "react";
import axios from "axios";

const UserName = () => {
    const [user, setUser] = useState({})
    const token = localStorage.getItem("token")


    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`/api/getUser`, {
                headers: {
                    "Authorization": token
                }
            })
            setUser(response.data.user)
        }
        getUser()

    }, [])

    return (
        <p className="userName">{user.name}</p>
    )
}



export default UserName;