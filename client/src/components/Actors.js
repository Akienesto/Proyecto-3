import React, { useEffect, useState } from "react";
import axios from "axios";

const Actors = () => {
    const [actors, setActors] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getActors = async () => {
            const response = await axios.get("http://localhost:5000/api/allActors",{
                headers :{
                    "Authorization" : token
                }
            })
            console.log(response)
            setActors(response.data.allActors)
        }
        getActors()
    },[])


    return(
        <div>
            {
                actors.map(Actor =>{
                    return(
                        <div key={Actor._id}>
                            <img href={Actor.image} className="images"/>
                            <h2>{Actor.name}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Actors